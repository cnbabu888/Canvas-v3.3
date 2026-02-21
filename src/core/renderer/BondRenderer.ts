import { Bond, BondType } from '../../molecular/Bond';
import { Atom } from '../../molecular/Atom';
import type { CanvasStyle } from '../../styles/StyleManager';

/**
 * Publication-grade bond renderer.
 * Targets ChemDraw ACS 1996 quality: clean lines, proper geometry,
 * bond shortening at heteroatom labels, scale-independent sizing.
 */
export class BondRenderer {


    /**
     * Whether an atom should have its label drawn (and thus bonds shortened).
     * Backbone C with bonds and zero charge is hidden.
     */
    private static shouldShowLabel(atom: Atom, connectedBondCount: number): boolean {
        if (atom.element.toUpperCase() === 'C' && connectedBondCount > 0 && atom.charge === 0) {
            return false;
        }
        return true;
    }

    /**
     * Main entry point. Draws one bond between atomA and atomB.
     * @param ringCentroid — if this bond is part of a ring, pass the ring centroid
     *                       so the inner double bond line offsets toward the center.
     */
    static drawBond(
        ctx: CanvasRenderingContext2D,
        bond: Bond,
        atomA: Atom,
        atomB: Atom,
        style: CanvasStyle,
        scale: number = 1,
        connectedBondsA?: number,
        connectedBondsB?: number,
        ringCentroid?: { x: number; y: number },
    ) {
        const p1 = atomA.pos;
        const p2 = atomB.pos;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const fullDist = Math.sqrt(dx * dx + dy * dy);
        if (fullDist < 0.1) return; // Degenerate bond

        const angle = Math.atan2(dy, dx);

        // ─── Bond shortening at heteroatom labels ───
        const shortenA = this.shouldShowLabel(atomA, connectedBondsA ?? 1)
            ? (style.marginWidth + style.atomFontSize * 0.35) / scale
            : 0;
        const shortenB = this.shouldShowLabel(atomB, connectedBondsB ?? 1)
            ? (style.marginWidth + style.atomFontSize * 0.35) / scale
            : 0;

        const startT = shortenA / fullDist;
        const endT = 1 - shortenB / fullDist;
        if (startT >= endT) return;

        const effectiveDist = (endT - startT) * fullDist;
        const effectiveStartX = startT * fullDist;

        // ─── Setup canvas ───
        ctx.save();
        ctx.translate(p1.x, p1.y);
        ctx.rotate(angle);

        const lw = style.bondWidth / scale;
        ctx.lineWidth = lw;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = style.color;
        ctx.fillStyle = style.color;

        const dbSpacing = (style.bondLength * style.doubleBondSpacing) / scale;
        const hashGap = style.hashSpacing / scale;

        const x0 = effectiveStartX;
        const x1 = effectiveStartX + effectiveDist;

        switch (bond.type) {

            // ═══════════════════════════════════════
            //  SINGLE BOND
            // ═══════════════════════════════════════
            case BondType.SINGLE:
                this.drawLine(ctx, x0, 0, x1, 0);
                break;

            // ═══════════════════════════════════════
            //  DOUBLE BOND — ring-aware offset
            //  If in a ring: inner line toward centroid
            //  If not in ring: asymmetric (outer full, inner trimmed)
            // ═══════════════════════════════════════
            case BondType.DOUBLE: {
                const half = dbSpacing / 2;
                const trim = effectiveDist * 0.10; // 10% trim each end on inner line

                if (ringCentroid) {
                    // RING DOUBLE BOND: inner line offsets toward ring center
                    // Determine which side of the bond the centroid is on
                    // Bond midpoint in world coords
                    const midX = (p1.x + p2.x) / 2;
                    const midY = (p1.y + p2.y) / 2;
                    // Perpendicular direction (in world space)
                    const perpX = -(p2.y - p1.y) / fullDist;
                    const perpY = (p2.x - p1.x) / fullDist;
                    // Dot product to see which side centroid is on
                    const dot = (ringCentroid.x - midX) * perpX + (ringCentroid.y - midY) * perpY;
                    // In rotated local coords: positive dot → centroid is on -Y side (above), negative → +Y (below)
                    const innerSide = dot > 0 ? -1 : 1;

                    // Outer line (full length, opposite side from centroid)
                    this.drawLine(ctx, x0, 0, x1, 0);
                    // Inner line (trimmed, toward centroid)
                    this.drawLine(ctx, x0 + trim, innerSide * dbSpacing, x1 - trim, innerSide * dbSpacing);
                } else {
                    // NON-RING DOUBLE BOND: standard asymmetric
                    // Outer line (full length, shifted up)
                    this.drawLine(ctx, x0, -half, x1, -half);
                    // Inner line (trimmed, shifted down)
                    this.drawLine(ctx, x0 + trim, half, x1 - trim, half);
                }
                break;
            }

            // ═══════════════════════════════════════
            //  TRIPLE BOND — center + two symmetrical outers
            // ═══════════════════════════════════════
            case BondType.TRIPLE: {
                const triSpace = dbSpacing * 0.85;
                this.drawLine(ctx, x0, 0, x1, 0);
                this.drawLine(ctx, x0, -triSpace, x1, -triSpace);
                this.drawLine(ctx, x0, triSpace, x1, triSpace);
                break;
            }

            // ═══════════════════════════════════════
            //  WEDGE SOLID — filled triangle, clean miter join
            // ═══════════════════════════════════════
            case BondType.WEDGE_SOLID: {
                const baseW = style.wedgeBaseWidth / scale;
                ctx.lineJoin = 'miter';
                ctx.beginPath();
                ctx.moveTo(x0, 0);
                ctx.lineTo(x1, -baseW / 2);
                ctx.lineTo(x1, baseW / 2);
                ctx.closePath();
                ctx.fill();
                break;
            }

            // ═══════════════════════════════════════
            //  WEDGE HASH (dashed wedge) — evenly spaced lines
            //  growing from point to base width
            // ═══════════════════════════════════════
            case BondType.WEDGE_HASH: {
                const baseW = style.wedgeBaseWidth / scale;
                // Number of hash lines based on hash spacing
                const numLines = Math.max(3, Math.round(effectiveDist / hashGap));
                ctx.lineWidth = Math.max(0.5 / scale, lw * 0.8);
                for (let i = 1; i <= numLines; i++) {
                    const frac = i / numLines;
                    const px = x0 + effectiveDist * frac;
                    const halfW = (baseW / 2) * frac;
                    this.drawLine(ctx, px, -halfW, px, halfW);
                }
                break;
            }

            // ═══════════════════════════════════════
            //  WAVY BOND — smooth sinusoidal via quadratic Bézier
            // ═══════════════════════════════════════
            case BondType.WAVY: {
                const amplitude = 2.5 / scale;
                const cycles = 4;
                const segments = cycles * 2;
                const segLen = effectiveDist / segments;
                ctx.beginPath();
                ctx.moveTo(x0, 0);
                for (let i = 0; i < segments; i++) {
                    const startX = x0 + i * segLen;
                    const endX = startX + segLen;
                    const cpY = (i % 2 === 0 ? -1 : 1) * amplitude;
                    ctx.quadraticCurveTo(startX + segLen * 0.5, cpY, endX, 0);
                }
                ctx.stroke();
                break;
            }

            // ═══════════════════════════════════════
            //  DATIVE (coordinate) BOND — line + arrowhead
            // ═══════════════════════════════════════
            case BondType.DATIVE: {
                const arrowLen = 6 / scale;
                const arrowW = 3 / scale;
                // Shaft
                this.drawLine(ctx, x0, 0, x1 - arrowLen, 0);
                // Arrowhead (filled triangle)
                ctx.beginPath();
                ctx.moveTo(x1, 0);
                ctx.lineTo(x1 - arrowLen, -arrowW);
                ctx.lineTo(x1 - arrowLen, arrowW);
                ctx.closePath();
                ctx.fill();
                break;
            }

            // ═══════════════════════════════════════
            //  RESONANCE / AROMATIC — solid + dashed
            // ═══════════════════════════════════════
            case BondType.RESONANCE: {
                const half = dbSpacing / 2;
                // Solid outer
                this.drawLine(ctx, x0, -half, x1, -half);
                // Dashed inner
                ctx.setLineDash([3 / scale, 2 / scale]);
                this.drawLine(ctx, x0, half, x1, half);
                ctx.setLineDash([]);
                break;
            }

            // ═══════════════════════════════════════
            //  ZERO ORDER — dotted line
            // ═══════════════════════════════════════
            case BondType.ZERO_ORDER:
                ctx.setLineDash([2 / scale, 4 / scale]);
                this.drawLine(ctx, x0, 0, x1, 0);
                ctx.setLineDash([]);
                break;

            // ═══════════════════════════════════════
            //  BOLD — extra thick single
            // ═══════════════════════════════════════
            case BondType.BOLD:
                ctx.lineWidth = (style.bondWidth * 3) / scale;
                this.drawLine(ctx, x0, 0, x1, 0);
                break;

            // ═══════════════════════════════════════
            //  HOLLOW WEDGE — outline triangle
            // ═══════════════════════════════════════
            case BondType.HOLLOW_WEDGE: {
                const baseW = style.wedgeBaseWidth / scale;
                ctx.lineJoin = 'miter';
                ctx.beginPath();
                ctx.moveTo(x0, 0);
                ctx.lineTo(x1, -baseW / 2);
                ctx.lineTo(x1, baseW / 2);
                ctx.closePath();
                ctx.stroke();
                break;
            }

            // ═══════════════════════════════════════
            //  QUADRUPLE BOND
            // ═══════════════════════════════════════
            case BondType.QUADRUPLE: {
                const s4 = dbSpacing * 0.6;
                this.drawLine(ctx, x0, -s4 * 1.5, x1, -s4 * 1.5);
                this.drawLine(ctx, x0, -s4 * 0.5, x1, -s4 * 0.5);
                this.drawLine(ctx, x0, s4 * 0.5, x1, s4 * 0.5);
                this.drawLine(ctx, x0, s4 * 1.5, x1, s4 * 1.5);
                break;
            }

            // ═══════════════════════════════════════
            //  HYDROGEN BOND — short dashes
            // ═══════════════════════════════════════
            case BondType.HYDROGEN:
                ctx.setLineDash([3 / scale, 3 / scale]);
                this.drawLine(ctx, x0, 0, x1, 0);
                ctx.setLineDash([]);
                break;

            // ═══════════════════════════════════════
            //  IONIC BOND — sparse dots
            // ═══════════════════════════════════════
            case BondType.IONIC:
                ctx.setLineDash([1 / scale, 4 / scale]);
                this.drawLine(ctx, x0, 0, x1, 0);
                ctx.setLineDash([]);
                break;

            default:
                this.drawLine(ctx, x0, 0, x1, 0);
                break;
        }

        ctx.restore();
    }

    // ─── Helper: simple line ───
    private static drawLine(
        ctx: CanvasRenderingContext2D,
        x1: number, y1: number,
        x2: number, y2: number,
    ) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}
