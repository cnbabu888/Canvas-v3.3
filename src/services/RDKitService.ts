// @ts-nocheck

export async function loadRDKit() {
    const initRDKitModule = (await import('@rdkit/rdkit')).default;
    const rdkit = await initRDKitModule();

    class RDKitService {
        private static instance: RDKitService;
        private rdkit: any = null;
        public loaded = false;

        constructor(rdkit: any) {
            this.rdkit = rdkit;
            this.loaded = true;
            console.log("RDKit WASM Loaded Lazily - Logic ENABLED");
        }

        static getInstance(rdkit?: any): RDKitService {
            if (!RDKitService.instance && rdkit) {
                RDKitService.instance = new RDKitService(rdkit);
            }
            return RDKitService.instance;
        }

        validateBondType(type: string): boolean {
            const advancedTypes = ['BOND_DATIVE', 'BOND_WAVY', 'BOND_QUADRUPLE'];
            if (advancedTypes.includes(type)) {
                console.log(`[RDKitService] Validating advanced bond: ${type}`);
                return true;
            }
            return true;
        }

        getMolecule(smiles: string) {
            if (!this.loaded) return null;
            try {
                const mol = this.rdkit.get_mol(smiles);
                return mol;
            } catch (e) {
                return null;
            }
        }

        calculateProps(smiles: string) {
            const mol = this.getMolecule(smiles);
            if (!mol) return null;

            const props = {
                mw: mol.get_mw(),
                formula: mol.get_mol_formula(),
            };
            mol.delete();
            return props;
        }
    }

    return RDKitService.getInstance(rdkit);
}
