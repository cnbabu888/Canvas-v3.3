
export interface LabWare {
    id: string;
    type: 'beaker' | 'flask' | 'test-tube' | 'round-bottom';
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}

export class LabWareRenderer {
    static draw(ctx: CanvasRenderingContext2D, item: LabWare) {
        ctx.save();
        ctx.translate(item.x, item.y);

        // Draw based on type
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(200, 220, 255, 0.3)'; // Glassy

        if (item.type === 'beaker') {
            this.drawBeaker(ctx, item.width, item.height);
        } else if (item.type === 'flask') {
            this.drawFlask(ctx, item.width, item.height);
        } else if (item.type === 'test-tube') {
            this.drawTestTube(ctx, item.width, item.height);
        } else if (item.type === 'round-bottom') {
            this.drawRoundBottom(ctx, item.width, item.height);
        }

        ctx.restore();
    }

    private static drawBeaker(ctx: CanvasRenderingContext2D, w: number, h: number) {
        ctx.beginPath();
        ctx.moveTo(-w / 2, -h / 2);
        ctx.lineTo(-w / 2, h / 2 - 5);
        ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2 + 5, h / 2);
        ctx.lineTo(w / 2 - 5, h / 2);
        ctx.quadraticCurveTo(w / 2, h / 2, w / 2, h / 2 - 5);
        ctx.lineTo(w / 2, -h / 2);
        ctx.stroke();

        // Liquid
        ctx.fillStyle = 'rgba(100, 150, 255, 0.2)';
        ctx.fillRect(-w / 2 + 2, 0, w - 4, h / 2 - 2);

        // Rim
        ctx.beginPath();
        ctx.ellipse(0, -h / 2, w / 2, 4, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    private static drawFlask(ctx: CanvasRenderingContext2D, w: number, h: number) {
        // Erlenmeyer
        ctx.beginPath();
        ctx.moveTo(-w / 4, -h / 2); // Neck top left
        ctx.lineTo(-w / 4, -h / 4); // Neck bottom left
        ctx.lineTo(-w / 2, h / 2 - 5); // Base left
        ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2 + 5, h / 2);
        ctx.lineTo(w / 2 - 5, h / 2); // Base right
        ctx.quadraticCurveTo(w / 2, h / 2, w / 2, h / 2 - 5);
        ctx.lineTo(w / 4, -h / 4); // Neck bottom right
        ctx.lineTo(w / 4, -h / 2); // Neck top right
        ctx.stroke();

        // Liquid
        ctx.fillStyle = 'rgba(100, 150, 255, 0.2)';
        ctx.beginPath();
        ctx.moveTo(-w / 3, 0);
        ctx.lineTo(-w / 2 + 2, h / 2 - 2);
        ctx.lineTo(w / 2 - 2, h / 2 - 2);
        ctx.lineTo(w / 3, 0);
        ctx.fill();

        // Rim
        ctx.beginPath();
        ctx.ellipse(0, -h / 2, w / 4, 3, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    private static drawTestTube(ctx: CanvasRenderingContext2D, w: number, h: number) {
        ctx.beginPath();
        const r = w / 2;
        ctx.moveTo(-r, -h / 2);
        ctx.lineTo(-r, h / 2 - r);
        ctx.arc(0, h / 2 - r, r, Math.PI, 0, true); // Bottom curve
        ctx.lineTo(r, -h / 2);
        ctx.stroke();

        // Liquid
        ctx.fillStyle = 'rgba(100, 150, 255, 0.2)';
        ctx.fillRect(-r + 1, 0, w - 2, h / 2 - r);
        ctx.beginPath();
        ctx.arc(0, h / 2 - r, r - 1, 0, Math.PI, false);
        ctx.fill();

        // Rim
        ctx.beginPath();
        ctx.ellipse(0, -h / 2, r, 2, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    private static drawRoundBottom(ctx: CanvasRenderingContext2D, w: number, h: number) {
        const r = w / 2;
        ctx.beginPath();
        ctx.moveTo(-w / 4, -h / 2);
        ctx.lineTo(-w / 4, -h / 4);
        // Bulb
        ctx.arc(0, 0, r, Math.PI * 1.3, Math.PI * 1.7, true);
        // Wait, arc args are start/end angle.
        // Need to connect neck to bulb.
        // Simple: draw circle for bulb, rect for neck.

        ctx.moveTo(w / 4, -h / 4);
        ctx.lineTo(w / 4, -h / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, h / 2 - r, r, 0, Math.PI * 2);
        ctx.stroke();

        // Rim
        ctx.beginPath();
        ctx.ellipse(0, -h / 2, w / 4, 3, 0, 0, Math.PI * 2);
        ctx.stroke();
    }
}
