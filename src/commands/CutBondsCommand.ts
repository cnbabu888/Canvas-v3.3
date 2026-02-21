import type { Command } from './Command';


import { Bond } from '../molecular/Bond';
import { Vec2D } from '../math/Vec2D';

export class CutBondsCommand implements Command {
    public description = 'Cut Bonds';
    private molecule: any;
    private bondIdsToCut: string[];
    private mode: 'homolytic' | 'heterolytic';
    private addRetroArrow: boolean;

    // State for undo
    private removedBonds: Bond[] = [];
    private oldCharges: Map<string, number> = new Map();
    private oldRadicals: Map<string, number> = new Map();
    private addedBadges: any[] = [];
    private addedArrow: any = null;

    // Derived displacement
    private fragmentDisplacements: Map<string, Vec2D> = new Map();

    constructor(molecule: any, bondIds: string[], mode: 'homolytic' | 'heterolytic', addRetroArrow: boolean = false) {
        this.molecule = molecule;
        this.bondIdsToCut = [...bondIds];
        this.mode = mode;
        this.addRetroArrow = addRetroArrow;
    }

    execute(): void {
        this.removedBonds = [];
        this.oldCharges.clear();
        this.oldRadicals.clear();
        this.fragmentDisplacements.clear();
        this.addedBadges = [];
        this.addedArrow = null;

        // Determine fragments *before* cutting for correct MW calculation 
        // We will just do a simple component search, but we need ChemUtils, which is a bit messy to import here due to dependency cycle.
        // Let's compute mass roughly based on atoms inside the CutBondsCommand or rely on post-cut MW.
        // Actually, let's just create badges for the atoms involved in the cut to keep it localized.

        let centerPos = new Vec2D(0, 0);
        let validCuts = 0;

        this.bondIdsToCut.forEach(bondId => {
            const bond = this.molecule.bonds.get(bondId);
            if (bond) {
                this.removedBonds.push(bond);

                const atomA = this.molecule.atoms.get(bond.atomA);
                const atomB = this.molecule.atoms.get(bond.atomB);

                if (atomA && atomB) {
                    // Record old state
                    if (!this.oldCharges.has(atomA.id)) this.oldCharges.set(atomA.id, atomA.charge || 0);
                    if (!this.oldCharges.has(atomB.id)) this.oldCharges.set(atomB.id, atomB.charge || 0);

                    // Assign Charges based on electronegativity (simplified)
                    if (this.mode === 'heterolytic') {
                        // Very simplified electronegativity check. 
                        // In reality, heteroatoms get the -, C gets the +.
                        // If same, random or based on substitution.
                        const isAHetero = atomA.element !== 'C' && atomA.element !== 'H';
                        const isBHetero = atomB.element !== 'C' && atomB.element !== 'H';

                        if (isAHetero && !isBHetero) {
                            atomA.charge = (atomA.charge || 0) - 1;
                            atomB.charge = (atomB.charge || 0) + 1;
                        } else if (!isAHetero && isBHetero) {
                            atomA.charge = (atomA.charge || 0) + 1;
                            atomB.charge = (atomB.charge || 0) - 1;
                        } else {
                            // Default: A gets +, B gets -
                            atomA.charge = (atomA.charge || 0) + 1;
                            atomB.charge = (atomB.charge || 0) - 1;
                        }
                    } else {
                        // Homolytic: radicals. We don't have a robust radical renderer yet, 
                        // but we can just leave neutral for now, or add a radical property.
                        (atomA as any).radical = ((atomA as any).radical || 0) + 1;
                        (atomB as any).radical = ((atomB as any).radical || 0) + 1;

                        // We should track this for undo
                        if (!this.oldRadicals.has(atomA.id)) this.oldRadicals.set(atomA.id, (atomA as any).radical - 1);
                        if (!this.oldRadicals.has(atomB.id)) this.oldRadicals.set(atomB.id, (atomB as any).radical - 1);
                    }

                    centerPos = centerPos.add(atomA.pos).add(atomB.pos);
                    validCuts += 2;

                    // Badges for fragments
                    // A simple heuristic: badge near the cut ends 
                    if (!this.molecule.badges) this.molecule.badges = [];

                    // Add badge for Atom A side
                    const badgeA = {
                        id: 'badge_' + Math.random().toString(36).substr(2, 9),
                        pos: atomA.pos.add(atomA.pos.minus(atomB.pos).normalize().scale(20)),
                        text: '-', // Needs formula/MW, but we keep it simple for now, or we can just say "Fragment"
                        atomId: atomA.id
                    };
                    const badgeB = {
                        id: 'badge_' + Math.random().toString(36).substr(2, 9),
                        pos: atomB.pos.add(atomB.pos.minus(atomA.pos).normalize().scale(20)),
                        text: '-',
                        atomId: atomB.id
                    };
                    this.addedBadges.push(badgeA, badgeB);
                    this.molecule.badges.push(badgeA, badgeB);
                }

                this.molecule.removeBond(bondId);
            }
        });

        if (validCuts > 0 && this.addRetroArrow) {
            centerPos = centerPos.scale(1 / validCuts);
            const arrow = {
                id: 'arrow_' + Math.random().toString(36).substr(2, 9),
                type: 'RETROSYNTHESIS',
                start: centerPos.add(new Vec2D(-40, 20)),
                end: centerPos.add(new Vec2D(40, -20))
            };
            if (!this.molecule.arrows) this.molecule.arrows = [];
            this.molecule.arrows.push(arrow);
            this.addedArrow = arrow;
        }

        // We can update the badges text post-cut if we had a MW calculator here.
        // For visual sake, we leave it as Fragment A / B, or we calculate exact MW in the CanvasEngine via ChemUtils when rendering!
    }

    undo(): void {
        // Restore bonds
        this.removedBonds.forEach(bond => {
            this.molecule.addBond(bond);
        });

        // Restore charges
        this.oldCharges.forEach((charge, atomId) => {
            const atom = this.molecule.atoms.get(atomId);
            if (atom) atom.charge = charge;
        });

        // Restore radicals
        this.oldRadicals.forEach((rad, atomId) => {
            const atom = this.molecule.atoms.get(atomId);
            if (atom) (atom as any).radical = rad === 0 ? undefined : rad;
        });

        // Remove badges
        if (this.molecule.badges) {
            this.molecule.badges = this.molecule.badges.filter((b: any) => !this.addedBadges.includes(b));
        }

        // Remove arrow
        if (this.addedArrow && this.molecule.arrows) {
            this.molecule.arrows = this.molecule.arrows.filter((a: any) => a.id !== this.addedArrow.id);
        }
    }

    redo(): void {
        this.execute();
    }
}
