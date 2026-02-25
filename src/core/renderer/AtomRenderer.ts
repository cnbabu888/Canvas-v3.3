import { Atom } from '../../molecular/Atom';
import { Bond } from '../../molecular/Bond';
import { ChemUtils } from '../../chem/ChemUtils';

import { CPK_COLORS } from '../../styles/StyleManager';
import type { CanvasStyle } from '../../styles/StyleManager';

/**
 * Publication-grade atom label renderer.
 *
 * Implements exact ChemDraw-quality label rendering:
 *  - Carbon: hidden in skeleton (shown only when isolated or charged)
 *  - Heteroatoms: always shown with bold weight
 *  - Implicit H with correct side placement based on bond angles
 *  - Subscript H count at 75% font, 3px down
 *  - Charge superscript at 75% font, 5px up
 *  - Isotope superscript before element symbol
 *  - Background halo knockout for clean bond termination
 *  - Scale-independent sizing (font/halo stay fixed regardless of zoom)
 */
export class AtomRenderer {

    static drawAtom(
        ctx: CanvasRenderingContext2D,
        atom: Atom,
        connectedBonds: Bond[],
        style: CanvasStyle,
        scale: number = 1,
        atomsMap?: Map<string, Atom>,
    ) {
        const { x, y } = atom.pos;

        // ─── Implicit H calculation ───
        // Use pre-calculated implicitHCount if available, otherwise calculate
        let bondOrderSum = 0;
        connectedBonds.forEach(b => bondOrderSum += b.order);
        const hCount = atom.implicitHCount > 0 ? atom.implicitHCount : ChemUtils.getImplicitHydrogens(atom.element, bondOrderSum, atom.charge);

        // ─── VALENCY ERROR HALO ───
        // Draw red glow around atoms that exceed their max valence
        if (atom.hasValencyError) {
            const errorRadius = (style.atomFontSize * 0.9) / scale;
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, errorRadius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
            ctx.lineWidth = 1.5 / scale;
            ctx.stroke();
            // Inner ring
            ctx.beginPath();
            ctx.arc(x, y, errorRadius * 0.6, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
            ctx.lineWidth = 1 / scale;
            ctx.stroke();
            ctx.restore();
        }

        // ─── Should we draw the label? ───
        // CARBON RULES:
        //  - NEVER show C label in skeleton formula (standard chemistry)
        //  - Exception: show C when atom has zero bonds (isolated atom)
        //  - Exception: show C when atom has charge (e.g., carbocation C+)
        const el = atom.element.toUpperCase();
        if (el === 'C' && connectedBonds.length > 0 && atom.charge === 0) {
            return; // Standard skeleton: hide backbone C
        }

        // ─── H PLACEMENT: determine which side using bond angles ───
        // Count bonds going LEFT vs RIGHT of atom
        // Put H on the side with FEWER bonds
        // If equal: put H on RIGHT (default)
        let alignHydrogensRight = true;

        if (connectedBonds.length > 0 && atomsMap) {
            let bondsLeft = 0;
            let bondsRight = 0;

            connectedBonds.forEach(b => {
                const neighborId = b.atomA === atom.id ? b.atomB : b.atomA;
                const neighbor = atomsMap.get(neighborId);
                if (neighbor) {
                    const dx = neighbor.pos.x - atom.pos.x;
                    if (dx < -0.01) bondsLeft++;
                    else if (dx > 0.01) bondsRight++;
                    // Vertical bonds (dx ≈ 0) don't count for L/R
                }
            });

            // Put H on side with FEWER bonds
            if (bondsLeft < bondsRight) {
                alignHydrogensRight = false; // fewer bonds on left → H goes left
            } else if (bondsRight < bondsLeft) {
                alignHydrogensRight = true;  // fewer bonds on right → H goes right
            }
            // If equal: default right (already set)
        }

        // ─── Build label parts ───
        const mainLabel = atom.element;
        let leftLabel = '';
        let rightLabel = '';
        let leftSub = '';
        let rightSub = '';

        // H placement
        if (hCount > 0) {
            if (alignHydrogensRight) {
                rightLabel = 'H';
                if (hCount > 1) rightSub = hCount.toString();
            } else {
                leftLabel = 'H';
                if (hCount > 1) leftSub = hCount.toString();
            }
        }

        // ─── Font setup (scale-independent) ───
        const fontSize = style.atomFontSize / scale;
        const subFontSize = style.subscriptFontSize / scale;
        const fontWeight = 'bold'; // Heteroatom labels always bold
        const fontStr = `${fontWeight} ${fontSize}px ${style.atomFont}`;
        const subFontStr = `${fontWeight} ${subFontSize}px ${style.atomFont}`;

        // ─── Atom color ───
        // ACS/RSC/Wiley: ALL black #000000
        // Chemora Modern: colored by element
        let atomColor = style.color;
        if (style.colorByElement && atom.element !== 'C') {
            atomColor = CPK_COLORS[atom.element] || style.color;
        }

        // ═══════════════════════════════════════════
        //  MEASURE total label width for halo knockout
        // ═══════════════════════════════════════════
        const haloMargin = style.marginWidth / scale;

        ctx.font = fontStr;
        const mainMetrics = ctx.measureText(mainLabel);
        const mainW = mainMetrics.width;
        const halfMain = mainW / 2;
        const gap = 1 / scale; // 1px gap between label parts

        // Measure isotope (before element)
        let isotopeW = 0;
        const isotope = atom.isotope;
        if (isotope) {
            ctx.font = subFontStr;
            isotopeW = ctx.measureText(isotope.toString()).width + gap;
        }

        // Measure left H + sub
        let leftW = 0;
        if (leftLabel) {
            ctx.font = fontStr;
            leftW += ctx.measureText(leftLabel).width + gap;
            if (leftSub) {
                ctx.font = subFontStr;
                leftW += ctx.measureText(leftSub).width;
            }
        }

        // Measure right H + sub
        let rightW = 0;
        if (rightLabel) {
            ctx.font = fontStr;
            rightW += ctx.measureText(rightLabel).width + gap;
            if (rightSub) {
                ctx.font = subFontStr;
                rightW += ctx.measureText(rightSub).width;
            }
        }

        // Measure charge
        let chargeW = 0;
        if (atom.charge !== 0) {
            let chargeLabel = atom.charge > 0 ? '+' : '−';
            if (Math.abs(atom.charge) > 1) chargeLabel = `${Math.abs(atom.charge)}${chargeLabel}`;
            ctx.font = subFontStr;
            chargeW = ctx.measureText(chargeLabel).width + gap;
        }

        const totalW = isotopeW + leftW + mainW + rightW + chargeW;

        // ═══════════════════════════════════════════
        //  HALO KNOCKOUT — clear rectangle behind label
        // ═══════════════════════════════════════════
        const haloH = fontSize * 1.3;
        const haloFullW = totalW + haloMargin * 2;
        // Center of the full label string (accounting for isotope + left side)
        const labelCenterX = x + (rightW + chargeW - isotopeW - leftW) / 2;

        ctx.fillStyle = style.backgroundColor;
        ctx.fillRect(
            labelCenterX - haloFullW / 2,
            y - haloH / 2,
            haloFullW,
            haloH,
        );

        // ═══════════════════════════════════════════
        //  DRAW ISOTOPE (superscript BEFORE element symbol)
        // ═══════════════════════════════════════════
        ctx.fillStyle = atomColor;

        if (isotope) {
            ctx.font = subFontStr;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            // Position: right edge at (x - halfMain - gap), shifted UP 5px
            const isoX = x - halfMain - gap;
            ctx.fillText(isotope.toString(), isoX, y - (5 / scale));
        }

        // ═══════════════════════════════════════════
        //  DRAW LEFT H (e.g. "H₂N")
        // ═══════════════════════════════════════════
        if (leftLabel) {
            // Draw subscript first (leftmost), then H letter
            let cursorX = x - halfMain - gap;

            // Draw H
            ctx.font = fontStr;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(leftLabel, cursorX, y);

            // Draw subscript to the LEFT of H
            if (leftSub) {
                const hLabelW = ctx.measureText(leftLabel).width;
                ctx.font = subFontStr;
                ctx.textAlign = 'right';
                // Subscript: 3px DOWN from baseline
                ctx.fillText(leftSub, cursorX - hLabelW, y + (3 / scale));
            }
        }

        // ═══════════════════════════════════════════
        //  DRAW ELEMENT SYMBOL (center)
        // ═══════════════════════════════════════════
        ctx.font = fontStr;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = atomColor;
        ctx.fillText(mainLabel, x, y);

        // ═══════════════════════════════════════════
        //  DRAW RIGHT H (e.g. "NH₂")
        // ═══════════════════════════════════════════
        if (rightLabel) {
            const hx = x + halfMain + gap;

            ctx.font = fontStr;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(rightLabel, hx, y);

            if (rightSub) {
                ctx.font = fontStr;
                const hLabelW = ctx.measureText(rightLabel).width;
                ctx.font = subFontStr;
                ctx.textAlign = 'left';
                // Subscript: 3px DOWN from baseline
                ctx.fillText(rightSub, hx + hLabelW, y + (3 / scale));
            }
        }

        // ═══════════════════════════════════════════
        //  DRAW CHARGE (superscript AFTER everything)
        // ═══════════════════════════════════════════
        if (atom.charge !== 0) {
            let chargeLabel = atom.charge > 0 ? '+' : '−'; // proper minus sign (U+2212)
            if (Math.abs(atom.charge) > 1) chargeLabel = `${Math.abs(atom.charge)}${chargeLabel}`;

            // Calculate horizontal offset: past element + right H + right sub
            let offsetX = halfMain;
            if (rightLabel) {
                ctx.font = fontStr;
                offsetX += ctx.measureText(rightLabel).width + gap;
                if (rightSub) {
                    ctx.font = subFontStr;
                    offsetX += ctx.measureText(rightSub).width;
                }
            }

            ctx.font = subFontStr;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = atomColor; // Same color as atom label
            // Superscript: 5px UP from baseline
            ctx.fillText(chargeLabel, x + offsetX + gap, y - (5 / scale));
        }
    }
}
