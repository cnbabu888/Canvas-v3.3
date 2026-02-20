import { Bond, BondType } from '../../molecular/Bond';
import { Atom } from '../../molecular/Atom';

import type { CanvasStyle } from '../../styles/StyleManager';

export class BondRenderer {
    static drawBond(ctx: CanvasRenderingContext2D, bond: Bond, atomA: Atom, atomB: Atom, style: CanvasStyle, scale: number = 1) {
        const p1 = atomA.pos;
        const p2 = atomB.pos;
        const dist = p1.distance(p2);
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        ctx.save();
        ctx.translate(p1.x, p1.y);
        ctx.rotate(angle);

        // Standard Bond Settings
        // Invariant visual width: divide logical width by scale factor
        ctx.lineWidth = style.bondWidth / scale;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = style.color;
        ctx.fillStyle = style.color;

        // Spacing based on style. Does NOT scale visually either! So we divide by scale as well if it's an absolute value, but currently it's a fraction of distance.
        // Wait, the specification says: "Double bond spacing: stays fixed at 7px regardless of zoom" -> This means the physical space on screen should be constant.
        // Let's implement fixed physical spacing. The style specifies "doubleBondSpacing as relative fraction". But we want it fixed?
        // Let's use bondLength * spacing ratio / scale.
        const doubleBondSpacing = (style.bondLength * (style.doubleBondSpacing || 0.18)) / scale;


        switch (bond.type) {
            case BondType.SINGLE:
                this.drawLine(ctx, 0, 0, dist, 0);
                break;

            case BondType.DOUBLE:
                // Double bonds: one inner, one outer. Trim inner.
                // For simplicity here, we center them symmetrically. In StructureOptimizer we will shift them.
                const trim = dist * 0.10; // 10% trim each side
                this.drawLine(ctx, 0, -doubleBondSpacing / 2, dist, -doubleBondSpacing / 2);
                this.drawLine(ctx, trim, doubleBondSpacing / 2, dist - trim, doubleBondSpacing / 2);
                break;

            case BondType.TRIPLE:
                this.drawLine(ctx, 0, 0, dist, 0);
                this.drawLine(ctx, 0, -doubleBondSpacing, dist, -doubleBondSpacing);
                this.drawLine(ctx, 0, doubleBondSpacing, dist, doubleBondSpacing);
                break;

            case BondType.WEDGE_SOLID:
                // Perfect sharp triangle, no rounded edges
                ctx.lineJoin = 'miter';
                const baseWidth = 4 / scale; // Fixed 4px width regardless of zoom
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(dist, -baseWidth / 2);
                ctx.lineTo(dist, baseWidth / 2);
                ctx.closePath();
                ctx.fill();
                break;

            case BondType.WEDGE_HASH:
                // 6 parallel lines getting wider
                const lines = 6;
                const minWidth = 0.5 / scale;
                const maxWidth = 4 / scale;
                for (let i = 1; i <= lines; i++) {
                    const frac = i / lines;
                    const x = dist * frac;
                    const w = minWidth + (maxWidth - minWidth) * frac;
                    this.drawLine(ctx, x, -w / 2, x, w / 2);
                }
                break;

            case BondType.WAVY:
                this.drawWavy(ctx, dist, 3, 2 / scale); // 3 cycles, 2px amplitude fixed
                break;

            case BondType.DATIVE:
                // Arrow
                this.drawLine(ctx, 0, 0, dist - 10, 0);
                // Arrowhead
                ctx.beginPath();
                ctx.moveTo(dist - 10, -5);
                ctx.lineTo(dist, 0);
                ctx.lineTo(dist - 10, 5);
                ctx.stroke();
                break;

            case BondType.RESONANCE:
                // Solid outer line + one DASHED inner line
                const innerSpacing = doubleBondSpacing;
                this.drawLine(ctx, 0, 0, dist, 0); // Outer
                ctx.setLineDash([3 / scale, 2 / scale]); // Dash pattern: 3px on, 2px off (scaled)
                this.drawLine(ctx, 0, innerSpacing, dist, innerSpacing); // Inner dashed
                ctx.setLineDash([]);
                break;

            case BondType.ZERO_ORDER:
                ctx.setLineDash([2, 5]);
                this.drawLine(ctx, 0, 0, dist, 0);
                ctx.setLineDash([]);
                break;

            case BondType.BOLD:
                ctx.lineWidth = 4;
                this.drawLine(ctx, 0, 0, dist, 0);
                break;

            case BondType.HOLLOW_WEDGE:
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(dist, -dist * 0.15); // Wide end
                ctx.lineTo(dist, dist * 0.15);
                ctx.closePath();
                ctx.stroke();
                ctx.stroke();
                break;

            case BondType.QUADRUPLE:
                // 4 lines
                const s = doubleBondSpacing;
                this.drawLine(ctx, 0, -s * 1.5, dist, -s * 1.5);
                this.drawLine(ctx, 0, -s * 0.5, dist, -s * 0.5);
                this.drawLine(ctx, 0, s * 0.5, dist, s * 0.5);
                this.drawLine(ctx, 0, s * 1.5, dist, s * 1.5);
                break;

            case BondType.HYDROGEN:
                // Dashed
                ctx.setLineDash([3, 3]);
                this.drawLine(ctx, 0, 0, dist, 0);
                ctx.setLineDash([]);
                break;

            case BondType.IONIC:
                // Dotted
                ctx.setLineDash([1, 4]);
                this.drawLine(ctx, 0, 0, dist, 0);
                ctx.setLineDash([]);
                break;

            default:
                this.drawLine(ctx, 0, 0, dist, 0);
                break;
        }

        ctx.restore();
    }

    private static drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    private static drawWavy(ctx: CanvasRenderingContext2D, dist: number, cycles: number, amplitude: number) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const steps = cycles * 2;
        const stepLen = dist / steps;
        for (let i = 0; i < steps; i++) {
            const x = i * stepLen;
            const y = (i % 2 === 0 ? 1 : -1) * amplitude;
            ctx.lineTo(x + stepLen / 2, y);
            ctx.lineTo(x + stepLen, 0);
        }
        ctx.stroke();
    }
}
