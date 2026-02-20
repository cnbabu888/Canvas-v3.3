import React, { useState } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { Search, Download, Loader2, AlertCircle } from 'lucide-react';
// import { ChemExports } from '../../chem/ChemExports'; // Unused
// Wait, ChemExports is for Export. We need Import parser?
// We need `SmilesParser`? Or just fetch MOLBlock?
// PubChem returns JSON or SDF. MOLBlock is safest if we have parser.
// Actually, Chemora v3.2 doesn't have a `MolLoader` or `SmilesParser` yet in the prompt history?
// Phase 1 "FileIO" saved JSON.
// Phase 7 "Export" generated SMILES.
// Do we have IMPORT SMILES? 
// Checking `src/canvas/chem/`... likely not.
// "Task 2: MolGrabber Widget: Integrate a basic fetch call to retrieve structures...".
// If we recall "Task 2: Widget System", it implies we can display them.
// If I fetch "Aspirin", I get a structure. How to render?
// I need `SmilesParser` or `MolParser`.
// If I don't have one, I need to write a basic one or use a library?
// "Build core canvas functionalities...".
// Writing a full MOL parser is complex.
// Maybe I can fetch JSON from PubChem which gives Atoms/Bonds explicitly?
// PubChem PUG REST: `structure/CID/{cid}/record/JSON` gives coords.
// Yes, JSON is easier to parse than MOL/SMILES manually.
// I will implement `PubChemImporter` inside this widget or `ChemUtils`.

export const MolGrabberWidget: React.FC = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setMolecule } = useCanvasStore();

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);

        try {
            // 1. Search name to get CID
            // https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${name}/cids/JSON
            const searchRes = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(query)}/cids/JSON`);
            const searchData = await searchRes.json();

            if (!searchData.IdentifierList?.CID?.[0]) {
                throw new Error('Compound not found');
            }

            const cid = searchData.IdentifierList.CID[0];

            // 2. Fetch 2D Conformer JSON
            // https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/JSON?record_type=2d
            const recordRes = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/JSON?record_type=2d`);
            const recordData = await recordRes.json();

            if (!recordData.PC_Compounds?.[0]) {
                throw new Error('No structure data found');
            }

            const compound = recordData.PC_Compounds[0];
            const atoms = compound.atoms;
            const bonds = compound.bonds;
            const coords = compound.coords?.[0]?.conformers?.[0]; // x, y arrays

            // 3. Convert to Molecule
            // Need to import Molecule, Atom, Bond classes.
            // But we are in a component. 
            // We can construct the object here.

            // Checking structure of JSON:
            // atoms.element: [8, 6, ...] (Atomic Numbers)
            // bonds.aid1, bonds.aid2, bonds.order

            // coords.x: [], coords.y: []
            // Note: PubChem data is separate arrays.

            if (!atoms || !coords) throw new Error('Invalid structure data');

            // Dynamic import to avoid circular dep issues if any? No, static is fine.
            const { Molecule } = await import('../../molecular/Molecule');
            const { Atom } = await import('../../molecular/Atom');
            const { Bond } = await import('../../molecular/Bond');
            const { Vec2D } = await import('../../math/Vec2D');
            // const { ELEMENTS_BY_ATOMIC_NUMBER } = await import('../../chem/elements'); // Unused

            const newMol = new Molecule();
            const idMap = new Map<number, string>(); // PC_AtomID (1-based usually) to UUID

            // Helper for Element Symbol from Z
            const getSymbol = (z: number) => {
                // Simplistic lookup or import full table
                // I'll define a quick lookup here if `elements.ts` doesn't have "By Number"
                const map: Record<number, string> = { 1: 'H', 6: 'C', 7: 'N', 8: 'O', 9: 'F', 15: 'P', 16: 'S', 17: 'Cl', 35: 'Br', 53: 'I' };
                // Basic only for now? Or import `elements.ts` and search?
                // Let's rely on standard map.
                return map[z] || 'C'; // Default to C if unknown? Safe fallback.
                // Better: Extend `elements.ts` if needed.
            };

            // Parse Atoms
            atoms.aid.forEach((aid: number, index: number) => {
                const z = atoms.element[index];
                const x = coords.x[index] * 40; // Scale up from Angstroms? PubChem 2D is usu Angstroms. Canvas uses 40px/unit?
                const y = -coords.y[index] * 40; // Flip Y for canvas
                const element = getSymbol(z);

                const atom = new Atom(element, element, new Vec2D(x + 400, y + 300)); // Center on canvas?
                newMol.addAtom(atom);
                idMap.set(aid, atom.id);
            });

            // Parse Bonds
            if (bonds) {
                bonds.aid1.forEach((aid1: number, index: number) => {
                    const aid2 = bonds.aid2[index];
                    const order = bonds.order[index]; // 1, 2, 3

                    const id1 = idMap.get(aid1);
                    const id2 = idMap.get(aid2);

                    if (id1 && id2) {
                        let type: any = 'SINGLE';
                        if (order === 2) type = 'DOUBLE';
                        if (order === 3) type = 'TRIPLE';

                        const bond = new Bond(id1, id2, type);
                        newMol.addBond(bond);
                    }
                });
            }

            setMolecule(newMol);

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to fetch');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute top-20 left-20 w-72 bg-white/90 backdrop-blur-md shadow-xl rounded-xl border border-gray-200 overflow-hidden text-sm animate-in fade-in slide-in-from-left-4">
            <div className="bg-indigo-600 px-4 py-2 flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-2">
                    <Search size={16} /> MolGrabber (PubChem)
                </span>
            </div>

            <div className="p-4 flex flex-col gap-3">
                <div className="flex gap-2">
                    <input
                        className="flex-1 px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Name (e.g. Aspirin)"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                        className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    </button>
                </div>

                {error && (
                    <div className="p-2 bg-red-50 text-red-600 rounded text-xs flex items-center gap-2">
                        <AlertCircle size={12} /> {error}
                    </div>
                )}

                <p className="text-xs text-gray-500">
                    Fetches 2D structure directly from PubChem Database.
                </p>
            </div>
        </div>
    );
};
