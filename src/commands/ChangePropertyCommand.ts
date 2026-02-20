import type { Command } from './Command';
import { Molecule } from '../molecular/Molecule';
import { BondType } from '../molecular/Bond';

interface PropertyChange {
    type: 'atom' | 'bond';
    id: string;
    property: string; // 'element', 'charge', 'order', 'type'
    value: any;
    oldValue: any;
}

export class ChangePropertyCommand implements Command {
    private molecule: Molecule;
    private changes: PropertyChange[];

    constructor(molecule: Molecule, changes: PropertyChange[]) {
        this.molecule = molecule;
        this.changes = changes;
    }

    execute() {
        this.applyChanges(false);
    }

    undo() {
        this.applyChanges(true);
    }

    private applyChanges(isUndo: boolean) {
        this.changes.forEach(change => {
            const val = isUndo ? change.oldValue : change.value;

            if (change.type === 'atom') {
                const atom = this.molecule.atoms.get(change.id);
                if (atom) {
                    if (change.property === 'element') atom.element = val;
                    if (change.property === 'charge') atom.charge = val;
                }
            } else if (change.type === 'bond') {
                const bond = this.molecule.bonds.get(change.id);
                if (bond) {
                    if (change.property === 'order') bond.order = val;
                    if (change.property === 'type') bond.type = val as BondType;
                }
            }
        });
    }
}
