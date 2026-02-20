import { Bond, BondType } from '../../molecular/Bond';
import { Atom } from '../../molecular/Atom';

import type { CanvasStyle } from '../../styles/StyleManager';

export class BondRenderer {
    static drawBond(ctx: CanvasRenderingContext2D, bond: Bond, atomA: Atom, atomB: Atom, style: CanvasStyle) {
        const p1 = atomA.pos;
        const p2 = atomB.pos;
        const dist = p1.distance(p2);
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        ctx.save();
        ctx.translate(p1.x, p1.y);
        ctx.rotate(angle);

        // Standard Bond Settings
        // Style Settings
        ctx.lineWidth = style.bondWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = style.color;
        ctx.fillStyle = style.color;

        // Spacing based on style
        const doubleBondSpacing = dist * (style.doubleBondSpacing || 0.18) / 2;

        switch (bond.type) {
            case BondType.SINGLE:
                this.drawLine(ctx, 0, 0, dist, 0);
                break;

            case BondType.DOUBLE:
                this.drawLine(ctx, 0, -doubleBondSpacing, dist, -doubleBondSpacing);
                this.drawLine(ctx, 0, doubleBondSpacing, dist, doubleBondSpacing);
                break;

            case BondType.TRIPLE:
                this.drawLine(ctx, 0, 0, dist, 0);
                this.drawLine(ctx, 0, -doubleBondSpacing, dist, -doubleBondSpacing);
                this.drawLine(ctx, 0, doubleBondSpacing, dist, doubleBondSpacing);
                break;

            case BondType.WEDGE_SOLID:
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(dist, -dist * 0.15); // Wide end
                ctx.lineTo(dist, dist * 0.15);
                ctx.closePath();
                ctx.fill();
                break;

            case BondType.WEDGE_HASH:
                // Series of lines
                const hashSpacing = 5;
                for (let x = 2; x < dist; x += hashSpacing) {
                    const w = (x / dist) * (dist * 0.3); // Width increases
                    this.drawLine(ctx, x, -w / 2, x, w / 2);
                }
                break;

            case BondType.WAVY:
                this.drawWavy(ctx, dist);
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
                // Dashed single line? Or one solid one dashed? Assuming dashed for now or search standard.
                // Usually resonance bond is like partial double. 
                // Let's draw Single + Dashed
                this.drawLine(ctx, 0, 0, dist, 0);
                ctx.setLineDash([5, 5]);
                this.drawLine(ctx, 0, doubleBondSpacing, dist, doubleBondSpacing);
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

    private static drawWavy(ctx: CanvasRenderingContext2D, dist: number) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const steps = 10;
        const stepLen = dist / steps;
        for (let i = 0; i < steps; i++) {
            const x = i * stepLen;
            const y = (i % 2 === 0 ? 1 : -1) * 3;
            ctx.lineTo(x + stepLen / 2, y);
            ctx.lineTo(x + stepLen, 0);
        }
        ctx.stroke();
    }
}
