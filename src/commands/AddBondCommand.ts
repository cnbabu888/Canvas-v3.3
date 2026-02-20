import type { Command } from './Command';
import { Molecule } from '../molecular/Molecule';
import { Bond } from '../molecular/Bond';

export class AddBondCommand implements Command {
    private molecule: Molecule;
    private bond: Bond;

    constructor(molecule: Molecule, bond: Bond) {
        this.molecule = molecule;
        this.bond = bond;
    }

    execute() {
        this.molecule.addBond(this.bond);
    }

    undo() {
        this.molecule.removeBond(this.bond.id);
    }
}
