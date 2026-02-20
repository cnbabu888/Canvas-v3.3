
import { Molecule } from '../molecular/Molecule';
import { Atom } from '../molecular/Atom';


export interface ValidationError {
    atomId: string;
    type: 'error' | 'warning';
    message: string;
}

export class ValidationEngine {

    static validate(molecule: Molecule): ValidationError[] {
        const errors: ValidationError[] = [];

        molecule.atoms.forEach(atom => {
            const valenceError = this.checkValence(atom, molecule);
            if (valenceError) errors.push(valenceError);

            // Future: Geometry checks (clashes, abnormal bond angles)
        });

        return errors;
    }

    private static checkValence(atom: Atom, molecule: Molecule): ValidationError | null {
        // Simple Valence Check
        // H=1, C=4, N=3/4, O=2, F/Cl/Br/I=1, P=3/5, S=2/4/6
        const valenceMap: { [key: string]: number[] } = {
            'H': [1],
            'C': [4],
            'N': [3, 4],
            'O': [2],
            'F': [1], 'Cl': [1], 'Br': [1], 'I': [1],
            'P': [3, 5],
            'S': [2, 4, 6]
        };

        const allowed = valenceMap[atom.element];
        if (!allowed) return null; // Unknown element, skip check

        // Calculate current Valence
        // Sum of bond orders + implicit hydrogens
        const bonds = molecule.getConnectedBonds(atom.id);
        let bondOrderSum = 0;
        bonds.forEach(b => bondOrderSum += b.order);

        // Implicit Hydrogens?
        // Our system handles auto-hydrogens visually, but here we check EXPLICIT bonds + implicit if model supports it.
        // If we assumed "fill valence", then user can't violate it easily unless they add too many bonds.
        // Let's check for EXCEEDING max valence.

        const maxValence = Math.max(...allowed);

        // If bondOrderSum > maxValence -> Error
        if (bondOrderSum > maxValence) {
            return {
                atomId: atom.id,
                type: 'error',
                message: `Valence exceeded: ${atom.element} has ${bondOrderSum} bonds (Max ${maxValence})`
            };
        }

        // Check for "Radical" or "Incomplete" (Warning)?
        // Only if not standard valences.
        // E.g. Carbon with 3 bonds and no charge -> Radical or Carbo-cation.
        // If charge is 0, efficient check:
        if (atom.charge === 0 && !allowed.includes(bondOrderSum)) {
            // It might be fine (e.g. intermediate), so just a warning or ignore?
            // "Texas Carbon" is the big one.
            // Let's stick to Exceeded Valence = Error.
        }

        return null;
    }
}
