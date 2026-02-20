import { Vec2D } from './Vec2D';

export class Matrix2D {
    // stored as [a, b, c, d, e, f]
    // corresponding to matrix:
    // [ a c e ]
    // [ b d f ]
    // [ 0 0 1 ]
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;

    constructor(
        a: number = 1,
        b: number = 0,
        c: number = 0,
        d: number = 1,
        e: number = 0,
        f: number = 0
    ) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
    }

    static identity(): Matrix2D {
        return new Matrix2D();
    }

    multiply(m: Matrix2D): Matrix2D {
        return new Matrix2D(
            this.a * m.a + this.c * m.b,
            this.b * m.a + this.d * m.b,
            this.a * m.c + this.c * m.d,
            this.b * m.c + this.d * m.d,
            this.a * m.e + this.c * m.f + this.e,
            this.b * m.e + this.d * m.f + this.f
        );
    }

    inverse(): Matrix2D {
        const det = this.a * this.d - this.b * this.c;
        if (det === 0) {
            console.warn("Matrix2D: determinant is zero, cannot invert");
            return new Matrix2D();
        }
        const invDet = 1 / det;
        return new Matrix2D(
            this.d * invDet,
            -this.b * invDet,
            -this.c * invDet,
            this.a * invDet,
            (this.c * this.f - this.d * this.e) * invDet,
            (this.b * this.e - this.a * this.f) * invDet
        );
    }

    scale(sx: number, sy: number): Matrix2D {
        return new Matrix2D(
            this.a * sx,
            this.b * sx,
            this.c * sy,
            this.d * sy,
            this.e,
            this.f
        );
    }

    translate(x: number, y: number): Matrix2D {
        return new Matrix2D(
            this.a,
            this.b,
            this.c,
            this.d,
            this.a * x + this.c * y + this.e,
            this.b * x + this.d * y + this.f
        );
    }

    transformPoint(p: Vec2D): Vec2D {
        return new Vec2D(
            this.a * p.x + this.c * p.y + this.e,
            this.b * p.x + this.d * p.y + this.f
        );
    }
}
