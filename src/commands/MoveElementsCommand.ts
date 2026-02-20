
import type { Command } from './Command';
import { Molecule } from '../molecular/Molecule';
import { Vec2D } from '../math/Vec2D';

export class MoveElementsCommand implements Command {
    private molecule: Molecule;
    private atomIds: string[];
    private delta: Vec2D;

    constructor(molecule: Molecule, atomIds: string[], delta: Vec2D) {
        this.molecule = molecule;
        this.atomIds = atomIds;
        this.delta = delta;
    }

    execute() {
        this.atomIds.forEach(id => {
            const atom = this.molecule.atoms.get(id);
            if (atom) {
                atom.pos = atom.pos.add(this.delta);
            }
        });
    }

    undo() {
        this.atomIds.forEach(id => {
            const atom = this.molecule.atoms.get(id);
            if (atom) {
                atom.pos = atom.pos.sub(this.delta);
            }
        });
    }
}
