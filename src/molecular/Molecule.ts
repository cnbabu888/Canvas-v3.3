import { Atom } from './Atom';
import { Bond } from './Bond';

export class Molecule {
    atoms: Map<string, Atom>;
    bonds: Map<string, Bond>;
    // Adjacency list for fast traversal: atomId -> list of bondIds
    adjacency: Map<string, string[]>;

    constructor() {
        this.atoms = new Map();
        this.bonds = new Map();
        this.adjacency = new Map();
    }

    addAtom(atom: Atom) {
        this.atoms.set(atom.id, atom);
        if (!this.adjacency.has(atom.id)) {
            this.adjacency.set(atom.id, []);
        }
    }

    removeAtom(id: string) {
        this.atoms.delete(id);

        // Remove connected bonds
        const connectedBonds = this.adjacency.get(id) || [];
        connectedBonds.forEach(bondId => {
            this.removeBond(bondId);
        });

        this.adjacency.delete(id);
    }

    addBond(bond: Bond) {
        if (!this.atoms.has(bond.atomA) || !this.atoms.has(bond.atomB)) {
            console.warn(`Cannot add bond ${bond.id}: atoms not found`);
            return;
        }

        this.bonds.set(bond.id, bond);

        // Update adjacency
        this.adjacency.get(bond.atomA)?.push(bond.id);
        this.adjacency.get(bond.atomB)?.push(bond.id);
    }

    removeBond(id: string) {
        const bond = this.bonds.get(id);
        if (!bond) return;

        this.bonds.delete(id);

        // Update adjacency - remove from atomA list
        const listA = this.adjacency.get(bond.atomA);
        if (listA) {
            this.adjacency.set(bond.atomA, listA.filter(bId => bId !== id));
        }

        // Update adjacency - remove from atomB list
        const listB = this.adjacency.get(bond.atomB);
        if (listB) {
            this.adjacency.set(bond.atomB, listB.filter(bId => bId !== id));
        }
    }

    getAtom(id: string): Atom | undefined {
        return this.atoms.get(id);
    }

    getBond(id: string): Bond | undefined {
        return this.bonds.get(id);
    }

    // Helper to get all bonds connected to an atom
    getConnectedBonds(atomId: string): Bond[] {
        const bondIds = this.adjacency.get(atomId) || [];
        // filter out undefineds just in case
        return bondIds.map(bid => this.bonds.get(bid)).filter((b): b is Bond => !!b);
    }
}
