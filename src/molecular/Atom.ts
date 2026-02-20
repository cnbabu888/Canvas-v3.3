import { Vec2D } from '../math/Vec2D';

export class Atom {
    id: string;
    element: string;
    pos: Vec2D;
    charge: number;
    hydrogenCount: number;
    valence: number; // Max valence, or current? User prompt says "Valence". Let's store max or explicit.

    constructor(id: string, element: string = 'C', pos: Vec2D) {
        this.id = id;
        this.element = element;
        this.pos = pos;
        this.charge = 0;
        this.hydrogenCount = 0; // Default, often auto-calculated but stored for override
        this.valence = 4; // Default for Carbon
    }
}
