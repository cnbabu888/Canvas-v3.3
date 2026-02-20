// @ts-nocheck

import type { Arrow } from '../../chem/Arrow';
import { ArrowType } from '../../chem/Arrow';
import { Vec2D } from '../../math/Vec2D';
import type { CanvasStyle } from '../../styles/StyleManager';

export class ArrowRenderer {
    static drawArrow(ctx: CanvasRenderingContext2D, arrow: Arrow, style: CanvasStyle) {
        ctx.save();
        ctx.strokeStyle = arrow.selected ? style.color : '#000';
        ctx.fillStyle = arrow.selected ? style.color : '#000';
        ctx.lineWidth = 2; // Standard arrow width

        switch (arrow.type) {
            case ArrowType.SYNTHESIS:
                this.drawStraightArrow(ctx, arrow.start, arrow.end);
                break;
            case ArrowType.RETROSYNTHESIS:
                this.drawRetroArrow(ctx, arrow.start, arrow.end);
                break;
            case ArrowType.EQUILIBRIUM:
                this.drawEquilibriumArrow(ctx, arrow.start, arrow.end);
                break;
            case ArrowType.RESONANCE:
                this.drawResonanceArrow(ctx, arrow.start, arrow.end);
                break;
            case ArrowType.MECHANISM:
                this.drawCurvedArrow(ctx, arrow);
                break;
            default:
                this.drawStraightArrow(ctx, arrow.start, arrow.end);
                break;
        }

        ctx.restore();
    }

    private static drawStraightArrow(ctx: CanvasRenderingContext2D, start: Vec2D, end: Vec2D) {
        // Line
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        // Arrowhead
        this.drawArrowHead(ctx, start, end);
    }

    private static drawRetroArrow(ctx: CanvasRenderingContext2D, start: Vec2D, end: Vec2D) {
        // Double line with hollow head? Or standard retro arrow =>
        const vec = end.sub(start);
        const len = vec.length();
        const dir = vec.normalize();

        ctx.save();
        ctx.translate(start.x, start.y);
        const angle = Math.atan2(dir.y, dir.x);
        ctx.rotate(angle);

        // Draw body double line
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -3);
        ctx.lineTo(len - 10, -3);
        ctx.moveTo(0, 3);
        ctx.lineTo(len - 10, 3);
        ctx.stroke();

        // Draw Filled Head
        ctx.beginPath();
        ctx.moveTo(len - 10, -6);
        ctx.lineTo(len, 0);
        ctx.lineTo(len - 10, 6);
        ctx.lineTo(len - 10, -6); // Close for fill
        ctx.stroke(); // Or fill? Standard is outline usually, but filled often used.
        // Retro arrow head is usually open triangle?
        // Let's assume standard => style.

        ctx.restore();
    }

    private static drawEquilibriumArrow(ctx: CanvasRenderingContext2D, start: Vec2D, end: Vec2D) {
        const vec = end.sub(start);
        const len = vec.length();
        const dir = vec.normalize();
        const perp = new Vec2D(-dir.y, dir.x);

        ctx.save();
        ctx.translate(start.x, start.y);
        const angle = Math.atan2(dir.y, dir.x);
        ctx.rotate(angle);

        // Top half (Left to Right)
        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(len, -2);
        // Half Head
        ctx.moveTo(len - 6, -6);
        ctx.lineTo(len, -2);
        ctx.stroke();

        // Bottom half (Right to Left)
        ctx.beginPath();
        ctx.moveTo(0, 2);
        ctx.lineTo(len, 2);
        // Half Head
        ctx.moveTo(6, 6);
        ctx.lineTo(0, 2); // Correct? Bottom arrow points LEFT (to start)
        ctx.stroke();

        ctx.restore();
    }

    private static drawResonanceArrow(ctx: CanvasRenderingContext2D, start: Vec2D, end: Vec2D) {
        // Double headed <->
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        this.drawArrowHead(ctx, start, end); // End head
        this.drawArrowHead(ctx, end, start); // Start head (reversed)
    }

    private static drawCurvedArrow(ctx: CanvasRenderingContext2D, arrow: Arrow) {
        if (!arrow.controlPoints || arrow.controlPoints.length === 0) {
            this.drawStraightArrow(ctx, arrow.start, arrow.end);
            return;
        }

        ctx.beginPath();
        ctx.moveTo(arrow.start.x, arrow.start.y);

        const cp = arrow.controlPoints[0];
        // Quadratic
        ctx.quadraticCurveTo(cp.x, cp.y, arrow.end.x, arrow.end.y);
        ctx.stroke();

        // Head at end
        // Calculate tangent at end t=1
        // Derivative of Quadratic Bezier: 2(1-t)(P1-P0) + 2t(P2-P1)
        // At t=1: 2(P2-P1)
        const tangent = arrow.end.sub(cp).normalize();
        const angle = Math.atan2(tangent.y, tangent.x);

        const headLen = 8;
        const headAngle = Math.PI / 6;

        ctx.beginPath();
        ctx.moveTo(arrow.end.x, arrow.end.y);
        ctx.lineTo(
            arrow.end.x - headLen * Math.cos(angle - headAngle),
            arrow.end.y - headLen * Math.sin(angle - headAngle)
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(arrow.end.x, arrow.end.y);
        ctx.lineTo(
            arrow.end.x - headLen * Math.cos(angle + headAngle),
            arrow.end.y - headLen * Math.sin(angle + headAngle)
        );
        ctx.stroke();
    }

    private static drawArrowHead(ctx: CanvasRenderingContext2D, from: Vec2D, to: Vec2D) {
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        const headLen = 8;
        const headAngle = Math.PI / 6;

        ctx.beginPath();
        ctx.moveTo(to.x, to.y);
        ctx.lineTo(
            to.x - headLen * Math.cos(angle - headAngle),
            to.y - headLen * Math.sin(angle - headAngle)
        );
        ctx.lineTo(
            to.x - headLen * Math.cos(angle + headAngle),
            to.y - headLen * Math.sin(angle + headAngle)
        );
        ctx.lineTo(to.x, to.y);
        ctx.fill();
    }
}
