import { Molecule } from '../molecular/Molecule';
import { Atom } from '../molecular/Atom';
import { Bond } from '../molecular/Bond';
import { Vec2D } from '../math/Vec2D';

export type StereoLabel = 'R' | 'S' | 'E' | 'Z' | null;

export class StereoEngine {

    /**
     * Analyzes the molecule and returns a map of atom IDs to their stereo labels.
     */
    static analyzeStereochemistry(molecule: Molecule): Map<string, StereoLabel> {
        const labels = new Map<string, StereoLabel>();

        molecule.atoms.forEach(atom => {
            // Tetrahedral Stereocenters (Chiral Centers)
            if (this.isPotentialStereocenter(atom, molecule)) {
                const label = this.determineChirality(atom, molecule);
                if (label) labels.set(atom.id, label);
            }

            // TODO: Double Bond (E/Z) logic would go here
        });

        return labels;
    }

    private static isPotentialStereocenter(atom: Atom, molecule: Molecule): boolean {
        // Must be Carbon (mostly), sp3, 4 neighbors.
        // Simplified: 4 bonds (or 3 + implicit H)
        // Must have unique substituents.
        if (atom.element !== 'C' && atom.element !== 'N') return false; // Basic scope

        const bonds = molecule.getConnectedBonds(atom.id);
        if (bonds.length < 3 || bonds.length > 4) return false;

        // Check if has at least one wedge/hash bond implies intent?
        // Or just geometry. For 2D drawing, we rely on Wedge/Hash.
        const hasStereoBond = bonds.some(b => b.type === 'WEDGE_SOLID' || b.type === 'WEDGE_HASH');
        return hasStereoBond;
    }

    private static determineChirality(center: Atom, molecule: Molecule): 'R' | 'S' | null {
        const bonds = molecule.getConnectedBonds(center.id);
        const neighbors: { atom: Atom, bond: Bond, priority: number, dir: Vec2D }[] = [];

        // 1. Identify Neighbors
        bonds.forEach(bond => {
            const neighborId = bond.atomA === center.id ? bond.atomB : bond.atomA;
            const neighbor = molecule.getAtom(neighborId);
            if (neighbor) {
                neighbors.push({
                    atom: neighbor,
                    bond: bond,
                    priority: 0,
                    dir: neighbor.pos.sub(center.pos)
                });
            }
        });

        // Implicit Hydrogen handling
        if (neighbors.length === 3) {
            // Virtual H
            // Priority will likely be lowest (unless lone pair on N etc, but lets assume Carbon)
            neighbors.push({
                atom: new Atom('H_impl', 'H', center.pos), // Logic placeholder
                bond: null as any,
                priority: -1, // Lowest
                dir: new Vec2D(0, 0) // Direction matters for projection...
            });
        }

        // 2. Calculate CIP Priorities
        // Sort descent: 1 (High) -> 4 (Low)
        // For now, simple Atomic Number based.
        neighbors.forEach(n => {
            n.priority = this.getAtomicNumber(n.atom.element);
        });

        // Sort by priority desc
        neighbors.sort((a, b) => b.priority - a.priority);

        // Handle ties (Shell expansion - simplified)
        // If priorities check out (no ties), proceed.

        // Check for ties
        // TODO: Implement recursive shell expansion for ties.

        // 3. Determine Geometry (3D from 2D projection)
        // We have 4 groups. 
        // Lowest priority group (4) direction?
        // If bond is Hashed -> It's back (Away).
        // If bond is Wedged -> It's front (Toward).

        // Find group 4 (lowest priority)
        const group4 = neighbors[3];
        const group4Bond = group4.bond;

        // Simple Rule:
        // Look at 1 -> 2 -> 3.
        // Clockwise = R, Counter = S.
        // IF Group 4 is Back (Dash/Hash) -> Keep Result.
        // IF Group 4 is Front (Wedge) -> Flip Result.
        // IF Group 4 is Plane -> Complex (need 3D embedding or vector math).

        if (!group4Bond) {
            // Implicit H case.
            // If any other bond is Wedged, H is Dashed (Back).
            // If any other bond is Dashed, H is Wedged (Front).
            const wedge = neighbors.find(n => n.bond && n.bond.type === 'WEDGE_SOLID');
            const dash = neighbors.find(n => n.bond && n.bond.type === 'WEDGE_HASH');

            let isBack = true;
            if (wedge) isBack = true; // H is pushed back
            else if (dash) isBack = false; // H is pushed front

            return this.calculateClockwise(neighbors.slice(0, 3), center, isBack ? 'keep' : 'flip');
        } else {
            // Explicit Group 4
            if (group4Bond.type === 'WEDGE_HASH') { // Dash
                return this.calculateClockwise(neighbors.slice(0, 3), center, 'keep');
            } else if (group4Bond.type === 'WEDGE_SOLID') { // Wedge
                return this.calculateClockwise(neighbors.slice(0, 3), center, 'flip');
            }
        }

        return null;
    }

    // Returns R or S based on 1->2->3 arrangement on the plane
    private static calculateClockwise(
        top3: { atom: Atom, dir: Vec2D }[],
        _center: Atom,
        mode: 'keep' | 'flip'
    ): 'R' | 'S' {
        // ...

        // Sum of angles? 
        // Let's just normalize vectors and get angles.
        // Sum of angles? 
        // Let's just normalize vectors and get angles.
        // const angles = top3.map(n => Math.atan2(n.dir.y, n.dir.x)); // -PI to PI (Unused)

        // We need to see if traversing 1 -> 2 -> 3 goes CW or CCW.
        // Map 1,2,3 to their angles.
        // If angles are decreasing (cyclic) -> CCW (since Y is down, PI is down-ish?)
        // Wait, standard atan2: Y down means positive Y is down.
        // (10, 0) -> 0 rad
        // (0, 10) -> PI/2 rad (Down)
        // (0, -10) -> -PI/2 rad (Up)

        // So increasing angle is CW ( 0 -> PI/2 -> PI ).
        // Decreasing angle is CCW.

        // Let's determien if 1->2->3 is CW or CCW.
        // We can just verify if 2 is "between" 1 and 3 in the CW direction side.

        // Let's use the signed area (shoelace) of the triangle 1-2-3?
        // Area = 0.5 * (x1(y2-y3) + x2(y3-y1) + x3(y1-y2))
        // If Area > 0 -> CW (Y-down). 
        // If Area < 0 -> CCW.

        const p1 = top3[0].dir;
        const p2 = top3[1].dir;
        const p3 = top3[2].dir;

        const shoelace = (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y));

        const isCW = shoelace > 0;

        const result = isCW ? 'R' : 'S'; // Clockwise = R (Rectus/Right)

        if (mode === 'flip') return result === 'R' ? 'S' : 'R';
        return result;
    }

    private static getAtomicNumber(element: string): number {
        const table: { [key: string]: number } = {
            'H': 1, 'C': 6, 'N': 7, 'O': 8, 'F': 9, 'P': 15, 'S': 16, 'Cl': 17, 'Br': 35, 'I': 53
        };
        return table[element] || 0;
    }
}
