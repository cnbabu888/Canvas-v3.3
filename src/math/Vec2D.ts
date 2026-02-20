export class Vec2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(v: Vec2D): Vec2D {
        return new Vec2D(this.x + v.x, this.y + v.y);
    }

    sub(v: Vec2D): Vec2D {
        return new Vec2D(this.x - v.x, this.y - v.y);
    }

    scale(s: number): Vec2D {
        return new Vec2D(this.x * s, this.y * s);
    }

    dot(v: Vec2D): number {
        return this.x * v.x + this.y * v.y;
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    distance(v: Vec2D): number {
        return this.sub(v).length();
    }

    rotate(angleObj: number | Vec2D): Vec2D {
        // If angleObj is a number, treat as radians
        // If angleObj is a Vec2D, rotate *around* that point? 
        // Requirement says "rotate". Usually means rotate vector by angle.
        // Or rotate point around origin.
        // Let's implement rotate by angle (radians) around origin (0,0) first.
        // If we need rotate around point, we can do sub(center).rotate(angle).add(center)

        // Let's assume input is radians for now based on standard math libs
        const angle = typeof angleObj === 'number' ? angleObj : 0;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Vec2D(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        );
    }

    clone(): Vec2D {
        return new Vec2D(this.x, this.y);
    }

    equals(v: Vec2D): boolean {
        return this.x === v.x && this.y === v.y;
    }

    mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vec2D {
        const m = this.mag();
        if (m === 0) return new Vec2D(0, 0);
        return new Vec2D(this.x / m, this.y / m);
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}
