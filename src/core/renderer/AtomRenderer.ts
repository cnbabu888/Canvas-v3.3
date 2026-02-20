import { Atom } from '../../molecular/Atom';
import { Bond } from '../../molecular/Bond';
import { ChemUtils } from '../../chem/ChemUtils';

import { CPK_COLORS } from '../../styles/StyleManager';
import type { CanvasStyle } from '../../styles/StyleManager';

export class AtomRenderer {
    static drawAtom(ctx: CanvasRenderingContext2D, atom: Atom, connectedBonds: Bond[], style: CanvasStyle, scale: number = 1, atomsMap?: Map<string, Atom>) {
        const { x, y } = atom.pos;
        let bondOrderSum = 0;
        connectedBonds.forEach(b => bondOrderSum += b.order);

        const hCount = ChemUtils.getImplicitHydrogens(atom.element, bondOrderSum, atom.charge);

        // 1. Determine if we should draw the label at all
        let shouldDraw = true;

        // Hide standard backbone Carbons
        if (atom.element.toUpperCase() === 'C' && connectedBonds.length > 0 && atom.charge === 0) {
            shouldDraw = false;
        }

        if (!shouldDraw) return;

        // Determine left vs right H alignment based on bond center of mass
        let alignHydrogensRight = true;

        if (connectedBonds.length > 0 && atomsMap) {
            let cx = 0, cy = 0;
            connectedBonds.forEach(b => {
                const neighborId = b.atomA === atom.id ? b.atomB : b.atomA;
                const neighbor = atomsMap.get(neighborId);
                if (neighbor) {
                    cx += neighbor.pos.x - atom.pos.x;
                    cy += neighbor.pos.y - atom.pos.y;
                }
            });
            // If the center of mass of neighbors is to the right (cx > 0), place Hydrogens on the LEFT.
            if (cx > 0.01) {
                alignHydrogensRight = false;
            }
        }

        let mainLabel = atom.element;
        let leftLabel = '';
        let rightLabel = '';
        let leftSub = '';
        let rightSub = '';

        if (hCount > 0) {
            // Let's implement a quick heuristic: if there's only 1 bond, and it goes right, H goes left.
            // For now, without position data, default to right.
            if (alignHydrogensRight) {
                rightLabel = 'H';
                if (hCount > 1) rightSub = hCount.toString();
            } else {
                leftLabel = 'H';
                if (hCount > 1) leftSub = hCount.toString();
            }
        }

        // 3. Draw the combined Text with Halos
        const fontSize = style.atomFontSize / scale;
        const subFontSize = style.subscriptFontSize / scale;

        ctx.font = `bold ${fontSize}px ${style.atomFont}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Custom Coloring check
        let atomColor = style.color;
        if (style.colorByElement && atom.element !== 'C' && atom.element !== 'H') {
            atomColor = CPK_COLORS[atom.element] || style.color;
        }

        ctx.fillStyle = atomColor;
        ctx.strokeStyle = style.backgroundColor;
        ctx.lineWidth = style.marginWidth / scale; // Fixed width halo!

        // Draw Element Symbol
        ctx.strokeText(mainLabel, x, y);
        ctx.fillText(mainLabel, x, y);

        const elementMetrics = ctx.measureText(mainLabel);
        const halfWidth = elementMetrics.width / 2;

        // Draw Left H
        if (leftLabel) {
            ctx.font = `bold ${fontSize}px ${style.atomFont}`;
            ctx.textAlign = 'right';
            const hx = x - halfWidth - (1 / scale);
            ctx.strokeText(leftLabel, hx, y);
            ctx.fillText(leftLabel, hx, y);

            if (leftSub) {
                const subOffset = ctx.measureText(leftLabel).width;
                ctx.font = `bold ${subFontSize}px ${style.atomFont}`;
                ctx.textAlign = 'right';
                ctx.strokeText(leftSub, hx - subOffset, y + (4 / scale));
                ctx.fillText(leftSub, hx - subOffset, y + (4 / scale));
            }
        }

        // Draw Right H
        if (rightLabel) {
            ctx.font = `bold ${fontSize}px ${style.atomFont}`;
            ctx.textAlign = 'left';
            const hx = x + halfWidth + (1 / scale);
            ctx.strokeText(rightLabel, hx, y);
            ctx.fillText(rightLabel, hx, y);

            if (rightSub) {
                const subOffset = ctx.measureText(rightLabel).width;
                ctx.font = `bold ${subFontSize}px ${style.atomFont}`;
                ctx.textAlign = 'left';
                ctx.strokeText(rightSub, hx + subOffset, y + (4 / scale));
                ctx.fillText(rightSub, hx + subOffset, y + (4 / scale));
            }
        }

        // Draw Charge
        if (atom.charge !== 0) {
            let chargeLabel = atom.charge > 0 ? '+' : '-';
            if (Math.abs(atom.charge) > 1) chargeLabel = `${Math.abs(atom.charge)}${chargeLabel}`;

            // Calculate offset based on whether we drew a subscript or just main text
            let offsetBase = halfWidth;
            if (rightLabel) {
                ctx.font = `bold ${fontSize}px ${style.atomFont}`;
                offsetBase += ctx.measureText(rightLabel).width;
                if (rightSub) {
                    ctx.font = `bold ${subFontSize}px ${style.atomFont}`;
                    offsetBase += ctx.measureText(rightSub).width;
                }
            }

            ctx.font = `bold ${subFontSize}px ${style.atomFont}`;
            ctx.textAlign = 'left';
            ctx.strokeText(chargeLabel, x + offsetBase, y - (6 / scale));
            ctx.fillText(chargeLabel, x + offsetBase, y - (6 / scale));
        }
    }
}
