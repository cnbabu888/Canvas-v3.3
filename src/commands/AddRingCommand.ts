import type { Command } from './Command';
import { Molecule } from '../molecular/Molecule';
import { Atom } from '../molecular/Atom';
import { Bond } from '../molecular/Bond';
import { Vec2D } from '../math/Vec2D';

interface RingData {
    points: Vec2D[];
    fusionAtoms?: { index: number, atomId: string }[]; // connect ring vertex 'index' to existing 'atomId'
}

export class AddRingCommand implements Command {
    private molecule: Molecule;
    private ringData: RingData;
    private createdAtomIds: string[] = [];
    private createdBondIds: string[] = [];

    constructor(molecule: Molecule, ringData: RingData) {
        this.molecule = molecule;
        this.ringData = ringData;
    }

    execute() {
        const { points, fusionAtoms } = this.ringData;
        const newAtoms: Atom[] = [];
        const ringAtomIds: string[] = new Array(points.length).fill('');

        // 1. Identify or Create Atoms
        points.forEach((pos, index) => {
            const fusion = fusionAtoms?.find(f => f.index === index);
            if (fusion) {
                // Reuse existing atom
                ringAtomIds[index] = fusion.atomId;
            } else {
                // Create new atom
                const id = crypto.randomUUID();
                const atom = new Atom(id, 'C', pos); // Default to carbon
                this.molecule.addAtom(atom);
                this.createdAtomIds.push(atom.id);
                ringAtomIds[index] = atom.id;
                newAtoms.push(atom);
            }
        });

        // 2. Create Bonds between ring atoms
        for (let i = 0; i < ringAtomIds.length; i++) {
            const idA = ringAtomIds[i];
            const idB = ringAtomIds[(i + 1) % ringAtomIds.length];

            // Check if bond already exists (for fusion edge)
            const existingBond = this.findBond(idA, idB);
            if (!existingBond) {
                const id = crypto.randomUUID();
                // Bond(id, atomA, atomB, order, type)
                const bond = new Bond(id, idA, idB, 1, 'SINGLE');
                this.molecule.addBond(bond);
                this.createdBondIds.push(bond.id);
            }
        }
    }

    undo() {
        // Remove created bonds
        this.createdBondIds.forEach(id => this.molecule.removeBond(id));
        this.createdBondIds = [];

        // Remove created atoms
        this.createdAtomIds.forEach(id => this.molecule.removeAtom(id));
        this.createdAtomIds = [];
    }

    private findBond(idA: string, idB: string): Bond | undefined {
        if (!this.molecule.bonds) return undefined;
        // Molecule.bonds is a Map<string, Bond>
        for (const bond of this.molecule.bonds.values()) {
            if ((bond.atomA === idA && bond.atomB === idB) ||
                (bond.atomA === idB && bond.atomB === idA)) {
                return bond;
            }
        }
        return undefined;
    }
}
