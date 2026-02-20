import { Bond } from '../molecular/Bond';
import { Atom } from '../molecular/Atom';

/**
 * ChemExports: Utilities for converting the internal Molecular Graph
 * into standard chemical file formats (SMILES, MOL/SDF, InChI).
 */
export class ChemExports {

    // --- SMILES Generation ---

    /**
     * Generates a canonical SMILES string for the given molecule.
     * Note: This is a simplified implementation. Full canonicalization 
     * (Morgan algorithm, etc.) is complex. This version provides a 
     * valid, non-canonical SMILES by traversing the graph.
     */
    static toSMILES(molecule: any): string {
        if (!molecule || molecule.atoms.size === 0) return '';

        // 1. Identify Fragments (Graph Components)
        const fragments: string[] = [];
        const visited = new Set<string>();

        molecule.atoms.forEach((atom: Atom) => {
            if (!visited.has(atom.id)) {
                fragments.push(this.generateFragmentSMILES(atom, molecule, visited));
            }
        });

        return fragments.join('.');
    }

    private static generateFragmentSMILES(startAtom: Atom, molecule: any, visited: Set<string>): string {
        // DFS Traversal
        // DFS Traversal
        let smiles = '';
        const ringTags = new Map<string, number>(); // bondId -> ringNumber
        let nextRingNum = 1;

        // Helper to get connected bonds
        const getBonds = (atomId: string) => {
            const bonds: Bond[] = [];
            molecule.bonds.forEach((b: Bond) => {
                if (b.atomA === atomId || b.atomB === atomId) bonds.push(b);
            });
            return bonds;
        };

        // Recursive DFS helper
        const traverse = (atom: Atom, parentBond: Bond | null) => {
            visited.add(atom.id);
            let atomStr = atom.element;

            // Handle aromaticity (simplified: just use lowercase if needed, but for now stick to Kekule form)
            if (atom.element.length > 1 && atom.element !== 'Cl' && atom.element !== 'Br') {
                // Bracket for unusual elements or charges
                atomStr = `[${atom.element}]`;
            }
            // TODO: Add Charge/H count support to brackets if non-standard

            smiles += atomStr;

            // Find neighbors
            const connections = getBonds(atom.id);
            // Sort by atomic number or just consistency to mimic canonicalization?

            // For now, arbitrary order.

            connections.forEach(bond => {
                if (parentBond && bond.id === parentBond.id) return; // Don't go back

                const neighborId = bond.atomA === atom.id ? bond.atomB : bond.atomA;
                const neighbor = molecule.atoms.get(neighborId);

                if (!neighbor) return;

                // Bond Symbol
                let bondSym = '';
                if (bond.order === 2) bondSym = '=';
                if (bond.order === 3) bondSym = '#';
                if (bond.type === 'WEDGE_SOLID' || bond.type === 'WEDGE_HASH') {
                    // Directional bonds? Complex in DFS. Ignore stereo for basic SMILES.
                }

                if (visited.has(neighborId)) {
                    // Ring Closure
                    // Assign a number
                    // We need a unique ID for this specific closure pair (the bond)
                    if (!ringTags.has(bond.id)) {
                        ringTags.set(bond.id, nextRingNum++);
                    }
                    const num = ringTags.get(bond.id);
                    smiles += `${bondSym}%${num}`; // Or just num if < 10
                    // Standard SMILES uses single digits 1-9 then %10...
                    // Let's use %num format for simplicity or standard digit.
                    if (num && num < 10) smiles += `${bondSym}${num}`;
                    else smiles += `${bondSym}%${num}`;
                } else {
                    // Branch traversal
                    // We need to handle branches with parentheses
                    // The LAST neighbor continues the main chain. Others are branches.
                    // But we don't know which is "last" until we process?
                    // Actually, DFS structure:
                    // atom -> (branch1) -> (branch2) -> processing
                    // We can just capture the output of recursion?

                    // Wait, this recursion structure is tricky with string concatenation.
                    // Let's use a return value approach? No, strict DFS state.

                    // Actually, standard approach:
                    // Visit neighbor. If it's a new branch, wrap in ().
                    // If it's the last neighbor to visit, don't wrap.

                    // We need to filter neighbors first to see which are unvisited.
                }
            });

            // Re-eval neighbors to handle branching logic correctly
            const unvisitedNeighbors: { bond: Bond, atom: Atom }[] = [];
            connections.forEach(bond => {
                if (parentBond && bond.id === parentBond.id) return;
                const neighborId = bond.atomA === atom.id ? bond.atomB : bond.atomA;
                if (visited.has(neighborId)) return; // Already handled as ring above?
                // Wait, ring closure happens when we SEE a visited node.
                // My logic above appended the closure immediately.
                // The issue is: if we see a visited node, it IS a closure.
                // If we see an UNVISITED node, it's a child.

                const neighbor = molecule.atoms.get(neighborId);
                if (neighbor) unvisitedNeighbors.push({ bond, atom: neighbor });
            });

            unvisitedNeighbors.forEach((nb, index) => {
                const isLast = index === unvisitedNeighbors.length - 1;

                // Bond Symbol
                let bondSym = '';
                if (nb.bond.order === 2) bondSym = '=';
                if (nb.bond.order === 3) bondSym = '#';

                if (!isLast) {
                    smiles += `(${bondSym}`;
                    traverse(nb.atom, nb.bond);
                    smiles += `)`;
                } else {
                    smiles += bondSym;
                    traverse(nb.atom, nb.bond);
                }
            });
        };

        // Start DFS
        traverse(startAtom, null);

        return smiles;
    }


    // --- MOL (V2000) Generation ---

    static toMOL(molecule: any): string {
        if (!molecule) return '';

        const atoms = Array.from(molecule.atoms.values()) as Atom[];
        const bonds = Array.from(molecule.bonds.values()) as Bond[];

        let mol = '';

        // Header Block
        mol += 'Chemora Canvas v3.2 Created Molecule\n';
        mol += '  Chemora   ' + this.getTimestamp() + '\n';
        mol += '\n'; // Comment line

        // Counts Line
        // aaabbblllfffcccsssxxxrrrpppiiimmmvvvvvv
        // aaa = number of atoms (3 chars)
        // bbb = number of bonds (3 chars)
        const numAtoms = atoms.length.toString().padStart(3, ' ');
        const numBonds = bonds.length.toString().padStart(3, ' ');
        mol += `${numAtoms}${numBonds}  0  0  0  0  0  0  0  0999 V2000\n`;

        // Atom Block
        const atomMap = new Map<string, number>(); // ID -> Index (1-based)

        atoms.forEach((atom, index) => {
            atomMap.set(atom.id, index + 1);

            // Coordinates (x, y, z)
            // Need to scale? Canvas coords are screen pixels. MDF expects Angstroms roughly.
            // Usually 10-50 px per Angstrom. Let's scale down by 40.
            // And invert Y because Canvas Y is down, Chemistry Y is up.
            const x = (atom.pos.x / 40).toFixed(4).padStart(10, ' ');
            const y = (-atom.pos.y / 40).toFixed(4).padStart(10, ' ');
            const z = '    0.0000';

            const symbol = atom.element.padEnd(3, ' ');
            const massDiff = ' 0';
            const chargeCode = '  0'; // Need to map charge 0->0, +1->3, +2->2, -1->5, -2->6 etc in V2000
            // Simplified for now: 0

            mol += `${x}${y}${z} ${symbol}${massDiff}${chargeCode}  0  0  0  0  0  0  0  0  0  0\n`;
        });

        // Bond Block
        bonds.forEach(bond => {
            const idx1 = atomMap.get(bond.atomA)?.toString().padStart(3, ' ');
            const idx2 = atomMap.get(bond.atomB)?.toString().padStart(3, ' ');

            // Order: 1=Single, 2=Double, 3=Triple
            let order = bond.order.toString().padStart(3, ' ');
            // bond.type === 'AROMATIC' check removed as it's not in BondType
            if (bond.type === 'RESONANCE') order = '  4'; // Map RESONANCE to aromatic-like in MOL? 
            // Actually V2000 uses 4 for aromatic, but let's stick to BondType enum.

            // Stereo: 0=None, 1=Up, 6=Down, 4=Either
            let stereo = '  0';
            if (bond.type === 'WEDGE_SOLID') stereo = '  1';
            if (bond.type === 'WEDGE_HASH') stereo = '  6';

            mol += `${idx1}${idx2}${order}${stereo}  0  0  0\n`;
        });

        // Footer
        mol += 'M  END\n';

        return mol;
    }

    // --- InChI Generation ---

    static toInChI(_molecule: any): string {
        // Placeholder: Real InChI generation requires a heavy library (compiled C)
        // or complex canonicalization.
        return "InChI=1S/NotImplemented";
    }

    private static getTimestamp(): string {
        const d = new Date();
        const pad = (n: number) => n.toString().padStart(2, '0');
        // MMDDYYHHmm
        return `${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getFullYear() % 100)}${pad(d.getHours())}${pad(d.getMinutes())}`;
    }
}
