import type { Command } from './Command';
import { Molecule } from '../molecular/Molecule';
import { Vec2D } from '../math/Vec2D';

export class LayoutCommand implements Command {
    private molecule: Molecule;
    private oldPositions: Map<string, Vec2D>;
    private newPositions: Map<string, Vec2D>;

    constructor(molecule: Molecule, newPositions?: Map<string, Vec2D>) {
        this.molecule = molecule;
        this.oldPositions = new Map();
        this.newPositions = newPositions || new Map();

        // Snapshot current positions
        if (this.molecule.atoms) {
            this.molecule.atoms.forEach(atom => {
                this.oldPositions.set(atom.id, new Vec2D(atom.pos.x, atom.pos.y));
            });
        }
    }

    /**
     * Call this after calculating new positions but BEFORE applying them to the molecule,
     * OR pass newPositions in constructor if already known.
     * If using this method, the molecule should still have OLD positions when this is called, 
     * but we might need to capture new ones if they are applied externally?
     * 
     * BETTER PATTERN:
     * 1. Capture Old State (Constructor)
     * 2. Perform Layout (Calculate new positions)
     * 3. Capture New State (setNewPositions)
     * 4. Execute (Apply New State)
     */
    public setNewPositions(positions: Map<string, Vec2D>) {
        this.newPositions = positions;
    }

    execute() {
        if (!this.newPositions || this.newPositions.size === 0) return;
        this.applyPositions(this.newPositions);
    }

    undo() {
        this.applyPositions(this.oldPositions);
    }

    private applyPositions(positions: Map<string, Vec2D>) {
        positions.forEach((pos, atomId) => {
            const atom = this.molecule.atoms.get(atomId);
            if (atom) {
                atom.pos = new Vec2D(pos.x, pos.y);
            }
        });
    }
}
