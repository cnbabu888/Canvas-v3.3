import type { Command } from './Command';
import { Molecule } from '../molecular/Molecule';
import { Atom } from '../molecular/Atom';

export class AddAtomCommand implements Command {
    private molecule: Molecule;
    private atom: Atom;

    constructor(molecule: Molecule, atom: Atom) {
        this.molecule = molecule;
        this.atom = atom;
    }

    execute() {
        this.molecule.addAtom(this.atom);
    }

    undo() {
        this.molecule.removeAtom(this.atom.id);
    }
}
