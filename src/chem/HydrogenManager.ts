// @ts-nocheck
import { Molecule } from '../molecular/Molecule';
import { Atom } from '../molecular/Atom';
import { getElement, getMaxValence, getCommonValences } from './elements';

/**
 * HydrogenManager — Calculates implicit hydrogens and validates valency
 * 
 * Chemistry rules:
 * - Carbon: valence 4 → C with 3 bonds = CH, C with 2 bonds = CH₂, etc.
 * - Nitrogen: valence 3 → N with 2 bonds = NH, N with 1 bond = NH₂
 * - Oxygen: valence 2 → O with 1 bond = OH
 * - Halogens: valence 1 → no implicit H when bonded
 * - Charge affects: cation reduces H by 1, anion adds H by 1 (simplified)
 */
export class HydrogenManager {

    /**
     * Calculate implicit hydrogen count for a single atom
     */
    static calculateImplicitH(atom: Atom, molecule: Molecule): number {
        const bonds = molecule.getConnectedBonds(atom.id);
        let bondOrderSum = 0;
        bonds.forEach(b => bondOrderSum += b.order);

        const el = getElement(atom.element);
        if (!el) return 0; // Unknown element

        // Find the best matching valence
        const valences = el.valence;
        let bestValence = valences[0]; // Default to first

        // Find the smallest valence that >= bondOrderSum
        for (const v of valences.sort((a, b) => a - b)) {
            if (v >= bondOrderSum) {
                bestValence = v;
                break;
            }
        }

        // Adjust for charge
        let implicitH = bestValence - bondOrderSum - atom.charge;
        if (implicitH < 0) implicitH = 0;

        return implicitH;
    }

    /**
     * Check if adding a bond would exceed valency
     * Returns true if the bond can be added without violating chemistry
     */
    static canAddBond(atom: Atom, molecule: Molecule, newBondOrder: number = 1): boolean {
        const bonds = molecule.getConnectedBonds(atom.id);
        let bondOrderSum = 0;
        bonds.forEach(b => bondOrderSum += b.order);

        const maxValence = getMaxValence(atom.element);
        return (bondOrderSum + newBondOrder) <= maxValence;
    }

    /**
     * Get current bond order sum for an atom
     */
    static getBondOrderSum(atom: Atom, molecule: Molecule): number {
        const bonds = molecule.getConnectedBonds(atom.id);
        let sum = 0;
        bonds.forEach(b => sum += b.order);
        return sum;
    }

    /**
     * Update implicit hydrogens and valency errors for ALL atoms in molecule
     */
    static updateAll(molecule: Molecule): void {
        molecule.atoms.forEach(atom => {
            atom.implicitHCount = this.calculateImplicitH(atom, molecule);

            // Check valency
            const bondOrderSum = this.getBondOrderSum(atom, molecule);
            const maxValence = getMaxValence(atom.element);
            atom.hasValencyError = bondOrderSum > maxValence;
        });
    }

    /**
     * Update only the atoms affected by a bond change (the two endpoints)
     */
    static updateAffected(molecule: Molecule, atomIds: string[]): void {
        atomIds.forEach(id => {
            const atom = molecule.atoms.get(id);
            if (atom) {
                atom.implicitHCount = this.calculateImplicitH(atom, molecule);
                const bondOrderSum = this.getBondOrderSum(atom, molecule);
                const maxValence = getMaxValence(atom.element);
                atom.hasValencyError = bondOrderSum > maxValence;
            }
        });
    }

    /**
     * Format the atom label with implicit hydrogens
     * e.g., "C" with 3H → "CH₃", "N" with 2H → "NH₂", "O" with 1H → "OH"
     */
    static formatAtomLabel(atom: Atom): string {
        if (atom.element === 'C' && !atom.hasValencyError && atom.charge === 0) {
            // Carbon is typically not shown unless terminal or has special properties
            return '';
        }

        let label = atom.element;
        const hCount = atom.implicitHCount;

        if (hCount > 0) {
            label += 'H';
            if (hCount > 1) {
                label += hCount.toString(); // Will be rendered as subscript
            }
        }

        // Add charge
        if (atom.charge !== 0) {
            if (atom.charge === 1) label += '⁺';
            else if (atom.charge === -1) label += '⁻';
            else if (atom.charge > 0) label += atom.charge + '⁺';
            else label += Math.abs(atom.charge) + '⁻';
        }

        return label;
    }
}
