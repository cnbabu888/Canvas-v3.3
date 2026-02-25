import { Vec2D } from '../math/Vec2D';

export class Atom {
    id: string;
    element: string;
    pos: Vec2D;
    charge: number;
    hydrogenCount: number;    // Explicit hydrogens
    implicitHCount: number;   // Auto-calculated implicit hydrogens
    valence: number;
    isotope?: number;         // e.g. 13 for ¹³C, 2 for ²H, 18 for ¹⁸O
    hasValencyError: boolean; // True when bond order sum exceeds max valence

    constructor(id: string, element: string = 'C', pos: Vec2D) {
        this.id = id;
        this.element = element;
        this.pos = pos;
        this.charge = 0;
        this.hydrogenCount = 0;
        this.implicitHCount = 0;
        this.valence = 4;
        this.hasValencyError = false;
    }
}
