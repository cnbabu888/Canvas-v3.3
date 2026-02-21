import type { Command } from './Command';
import { Molecule } from '../molecular/Molecule';
import { Atom } from '../molecular/Atom';
import { Bond } from '../molecular/Bond';

export class RemoveElementsCommand implements Command {
    public description = 'Remove Elements';
    private molecule: Molecule;
    private atomIdsToRemove: string[];
    private bondIdsToRemove: string[];

    // State for undo
    private removedAtoms: Atom[] = [];
    private removedBonds: Bond[] = [];
    private adjacentBondsRemoved: Bond[] = []; // Bonds removed because their atom was removed

    constructor(molecule: Molecule, atomIds: string[], bondIds: string[]) {
        this.molecule = molecule;
        this.atomIdsToRemove = [...atomIds];
        this.bondIdsToRemove = [...bondIds];
    }

    execute(): void {
        this.removedAtoms = [];
        this.removedBonds = [];
        this.adjacentBondsRemoved = [];

        // 1. Remove explicitly requested bonds
        this.bondIdsToRemove.forEach(bondId => {
            const bond = this.molecule.bonds.get(bondId);
            if (bond) {
                this.removedBonds.push(bond);
                this.molecule.removeBond(bondId);
            }
        });

        // 2. Remove atoms and any connected bonds that weren't explicitly requested
        this.atomIdsToRemove.forEach(atomId => {
            const atom = this.molecule.atoms.get(atomId);
            if (atom) {
                this.removedAtoms.push(atom);

                // Find and remove connected bonds
                const connectedBonds = Array.from(this.molecule.bonds.values()).filter(
                    b => b.atomA === atomId || b.atomB === atomId
                );

                connectedBonds.forEach(bond => {
                    this.adjacentBondsRemoved.push(bond);
                    this.molecule.removeBond(bond.id);
                });

                this.molecule.removeAtom(atomId);
            }
        });
    }

    undo(): void {
        // Restore in reverse order: Atoms first, then bonds
        this.removedAtoms.forEach(atom => {
            this.molecule.addAtom(atom);
        });

        this.adjacentBondsRemoved.forEach(bond => {
            this.molecule.addBond(bond);
        });

        this.removedBonds.forEach(bond => {
            this.molecule.addBond(bond);
        });
    }

    redo(): void {
        this.execute();
    }
}
