// @ts-nocheck
import type { Command } from './Command';
import { Molecule } from '../molecular/Molecule';
import type { Template } from '../chem/Template';
import { Vec2D } from '../math/Vec2D';
import { Atom } from '../molecular/Atom';
import { Bond } from '../molecular/Bond';
import { generateId } from '../utils/idGenerator';

export class AddTemplateCommand implements Command {
    private molecule: Molecule;
    private template: Template;
    private position: Vec2D;
    private sproutFromAtomId: string | null;

    // Undo tracking
    private createdAtomIds: string[] = [];
    private createdBondIds: string[] = [];

    constructor(molecule: Molecule, template: Template, position: Vec2D, sproutFromAtomId: string | null = null) {
        this.molecule = molecule;
        this.template = template;
        this.position = position;
        this.sproutFromAtomId = sproutFromAtomId;
    }

    execute() {
        const atomIdMap = new Map<number, string>(); // Template Index -> Real Atom ID

        // 1. Create Atoms
        this.template.atoms.forEach((tAtom, index) => {
            const atom = new Atom(generateId(), tAtom.element, new Vec2D(this.position.x + tAtom.x, this.position.y + tAtom.y));
            atom.charge = tAtom.charge || 0;

            this.molecule.atoms.set(atom.id, atom);
            atomIdMap.set(index, atom.id);
            this.createdAtomIds.push(atom.id);
        });

        // 2. Create Bonds within Template
        this.template.bonds.forEach(tBond => {
            const idA = atomIdMap.get(tBond.from);
            const idB = atomIdMap.get(tBond.to);
            if (idA && idB) {
                let order = 1;
                if (tBond.type === 'DOUBLE') order = 2;
                if (tBond.type === 'TRIPLE') order = 3;

                const bond = new Bond(generateId(), idA, idB, order, tBond.type as any);
                this.molecule.bonds.set(bond.id, bond);
                this.createdBondIds.push(bond.id);
            }
        });

        // 3. Sprout Link (if applicable)
        if (this.sproutFromAtomId) {
            // Connect sprout source to the First Atom (index 0) of template
            const attachToId = atomIdMap.get(0);
            if (attachToId) {
                const bond = new Bond(generateId(), this.sproutFromAtomId, attachToId, 1, 'SINGLE');
                this.molecule.bonds.set(bond.id, bond);
                this.createdBondIds.push(bond.id);
            }
        }
    }

    undo() {
        this.createdBondIds.forEach(id => this.molecule.bonds.delete(id));
        this.createdAtomIds.forEach(id => this.molecule.atoms.delete(id));
        this.createdBondIds = [];
        this.createdAtomIds = [];
    }
}
