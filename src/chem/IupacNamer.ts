
import { Molecule } from '../molecular/Molecule';
import { Atom } from '../molecular/Atom';


export class IupacNamer {

    static generateName(molecule: Molecule): string {
        if (molecule.atoms.size === 0) return '';

        // 1. Identify Functional Groups & Priority
        // MVP: Detect OH, COOH, NH2, Halogens, Double/Triple Bonds.
        // Assign Priority: COOH > OH > NH2 > = > # > R

        // 2. Find Principal Chain
        // Longest chain containing Principal Group -> Max Unsaturation -> Length.

        // 3. Numbering
        // Lowest locant for FG -> Unsaturation -> Substituents

        // 4. Assemble Name

        // --- Simplified MVP Implementation ---
        // Just find longest carbon chain for alkanes/alkenes first.

        const carbons = Array.from(molecule.atoms.values()).filter(a => a.element === 'C');
        if (carbons.length === 0) return 'Inorganic / Unknown';

        // Find longest path in Carbon skeleton
        const chain = this.findLongestCarbonChain(molecule);
        if (chain.length === 0) return 'Unknown';

        // Base Name
        let name = this.getAlkaneName(chain.length);

        // Detect Unsaturation (Double/Triple Bonds in chain)
        const doubleBonds = this.countBondsInChain(molecule, chain, 'DOUBLE');
        const tripleBonds = this.countBondsInChain(molecule, chain, 'TRIPLE');

        if (doubleBonds > 0) {
            name = name.replace('ane', 'ene'); // Simplistic
            if (doubleBonds > 1) name = name.replace('ene', 'adiene');
        } else if (tripleBonds > 0) {
            name = name.replace('ane', 'yne');
        }

        // Detect Functional Groups (Suffixes)
        // Check atoms connected to chain
        let suffix = '';
        for (const c of chain) {
            const bonds = molecule.getConnectedBonds(c.id);
            for (const b of bonds) {
                const neighborId = b.atomA === c.id ? b.atomB : b.atomA;
                const neighbor = molecule.getAtom(neighborId);
                if (!neighbor) continue;

                if (neighbor.element === 'O') {
                    // OH? =O?
                    const oBonds = molecule.getConnectedBonds(neighbor.id);
                    if (oBonds.length === 1 && b.order === 1) {
                        // Alcohol (-ol)
                        suffix = 'ol';
                    } else if (b.order === 2) {
                        // Ketone/Aldehyde
                        // If C is terminal -> al, else -> one
                        suffix = 'one'; // Simplified
                    }
                }
            }
        }

        if (suffix) {
            name = name.replace(/e$/, '') + suffix;
        }

        return name;
    }

    private static findLongestCarbonChain(molecule: Molecule): Atom[] {
        // BFS/DFS to find longest path of C atoms
        const carbons = Array.from(molecule.atoms.values()).filter(a => a.element === 'C');
        if (carbons.length === 0) return [];

        let maxPath: Atom[] = [];

        // Check paths from every terminal carbon (degree 1)
        const terminals = carbons.filter(c => {
            const cBonds = molecule.getConnectedBonds(c.id).filter(b => {
                const other = molecule.getAtom(b.atomA === c.id ? b.atomB : b.atomA);
                return other?.element === 'C';
            });
            return cBonds.length <= 1;
        });

        const starts = terminals.length > 0 ? terminals : [carbons[0]];

        for (const start of starts) {
            const visited = new Set<string>();
            const path: Atom[] = [];
            this.dfsChain(molecule, start, visited, path, (p) => {
                if (p.length > maxPath.length) {
                    maxPath = [...p];
                }
            });
        }

        return maxPath;
    }

    private static dfsChain(mol: Molecule, current: Atom, visited: Set<string>, currentPath: Atom[], onPathEnd: (p: Atom[]) => void) {
        visited.add(current.id);
        currentPath.push(current);

        const neighbors = mol.getConnectedBonds(current.id)
            .map(b => mol.getAtom(b.atomA === current.id ? b.atomB : b.atomA))
            .filter(a => a && a.element === 'C' && !visited.has(a.id)) as Atom[];

        if (neighbors.length === 0) {
            onPathEnd(currentPath);
        } else {
            for (const n of neighbors) {
                this.dfsChain(mol, n, new Set(visited), [...currentPath], onPathEnd);
            }
        }
    }

    private static getAlkaneName(n: number): string {
        const names = [
            '', 'methane', 'ethane', 'propane', 'butane', 'pentane',
            'hexane', 'heptane', 'octane', 'nonane', 'decane', 'undecane', 'dodecane'
        ];
        return names[n] || `C${n}-alkane`;
    }

    private static countBondsInChain(mol: Molecule, chain: Atom[], type: string): number {
        let count = 0;
        for (let i = 0; i < chain.length - 1; i++) {
            const a = chain[i];
            const b = chain[i + 1];
            const bond = mol.bonds.get(mol.adjacency.get(a.id)?.find(bid => {
                const bond = mol.bonds.get(bid);
                return bond && (bond.atomA === b.id || bond.atomB === b.id);
            }) || '');

            if (bond) {
                if (type === 'DOUBLE' && bond.order === 2) count++;
                if (type === 'TRIPLE' && bond.order === 3) count++;
            }
        }
        return count;
    }
}
