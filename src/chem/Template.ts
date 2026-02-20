export interface TemplateAtom {
    element: string; // 'C', 'N', 'COOH' (Superatom)
    x: number;
    y: number;
    charge?: number;
}

export interface TemplateBond {
    from: number; // index in atoms array
    to: number;
    type: string; // SINGLE, DOUBLE, etc
}

export interface Template {
    id: string;
    name: string;
    category: 'group' | 'amino' | 'ring' | 'reagent' | 'custom';
    atoms: TemplateAtom[];
    bonds: TemplateBond[];
    // Attachment point? Default to atom 0 for sprouting
}

export const FUNCTIONAL_GROUPS: Template[] = [
    {
        id: 'fg_oh', name: '-OH', category: 'group',
        atoms: [{ element: 'O', x: 0, y: 0 }, { element: 'H', x: 20, y: 10 }], // Visual offset
        bonds: [{ from: 0, to: 1, type: 'SINGLE' }]
    },
    {
        id: 'fg_cooh', name: '-COOH', category: 'group',
        // Schematic representation for sprouting
        atoms: [
            { element: 'C', x: 0, y: 0 },
            { element: 'O', x: 25, y: -15 }, // Double bond O
            { element: 'O', x: 25, y: 15 },  // Single bond OH
            { element: 'H', x: 45, y: 15 }
        ],
        bonds: [
            { from: 0, to: 1, type: 'DOUBLE' },
            { from: 0, to: 2, type: 'SINGLE' },
            { from: 2, to: 3, type: 'SINGLE' }
        ]
    },
    {
        id: 'fg_nh2', name: '-NH2', category: 'group',
        atoms: [{ element: 'N', x: 0, y: 0 }, { element: 'H', x: 15, y: -10 }, { element: 'H', x: 15, y: 10 }],
        bonds: [{ from: 0, to: 1, type: 'SINGLE' }, { from: 0, to: 2, type: 'SINGLE' }]
    },
    {
        id: 'fg_no2', name: '-NO2', category: 'group',
        atoms: [
            { element: 'N', x: 0, y: 0, charge: 1 },
            { element: 'O', x: 20, y: -15, charge: -1 },
            { element: 'O', x: 20, y: 15 } // Double bond
        ],
        bonds: [
            { from: 0, to: 1, type: 'SINGLE' },
            { from: 0, to: 2, type: 'DOUBLE' }
        ]
    }
];

export const AMINO_ACIDS: Template[] = [
    {
        id: 'aa_gly', name: 'Glycine (Gly)', category: 'amino',
        atoms: [
            { element: 'N', x: -30, y: 0 },
            { element: 'C', x: 0, y: 0 }, // Alpha
            { element: 'C', x: 30, y: -15 }, // Carbonyl
            { element: 'O', x: 30, y: -45 },
            { element: 'O', x: 55, y: 0 }
        ],
        bonds: [
            { from: 0, to: 1, type: 'SINGLE' },
            { from: 1, to: 2, type: 'SINGLE' },
            { from: 2, to: 3, type: 'DOUBLE' },
            { from: 2, to: 4, type: 'SINGLE' }
        ]
    },
    // Add more as needed (Ala, etc.)
    {
        id: 'aa_ala', name: 'Alanine (Ala)', category: 'amino',
        atoms: [
            { element: 'N', x: -30, y: 0 },
            { element: 'C', x: 0, y: 0 }, // Alpha
            { element: 'C', x: 0, y: 30 }, // Methyl group (Side chain)
            { element: 'C', x: 30, y: -15 }, // Carbonyl
            { element: 'O', x: 30, y: -45 },
            { element: 'O', x: 55, y: 0 }
        ],
        bonds: [
            { from: 0, to: 1, type: 'SINGLE' },
            { from: 1, to: 2, type: 'SINGLE' },
            { from: 1, to: 3, type: 'SINGLE' },
            { from: 3, to: 4, type: 'DOUBLE' },
            { from: 3, to: 5, type: 'SINGLE' }
        ]
    }
];

export const RINGS: Template[] = [
    {
        id: 'ring_naphthalene', name: 'Naphthalene', category: 'ring',
        atoms: [
            // Ring 1
            { element: 'C', x: -30, y: -25 }, { element: 'C', x: 0, y: -25 },
            { element: 'C', x: 15, y: 0 }, { element: 'C', x: 0, y: 25 },
            { element: 'C', x: -30, y: 25 }, { element: 'C', x: -45, y: 0 },
            // Ring 2 Fused
            { element: 'C', x: 45, y: 0 }, { element: 'C', x: 30, y: 25 },
            { element: 'C', x: 30, y: -25 }
        ],
        bonds: [
            // Simplified bonds logic 
            // Ring 1
            { from: 0, to: 1, type: 'DOUBLE' }, { from: 1, to: 2, type: 'SINGLE' },
            { from: 2, to: 3, type: 'DOUBLE' }, { from: 3, to: 4, type: 'SINGLE' },
            { from: 4, to: 5, type: 'DOUBLE' }, { from: 5, to: 0, type: 'SINGLE' },
            // Ring 2 Fusion (2-3 shared)
            { from: 2, to: 6, type: 'SINGLE' }, { from: 6, to: 7, type: 'DOUBLE' },
            { from: 7, to: 8, type: 'SINGLE' }, { from: 8, to: 3, type: 'SINGLE' }
            // Note: Bond types might overlap or be aromatic. Simplified for visual.
        ]
    }
];

export const TEMPLATE_LIBRARY = [...FUNCTIONAL_GROUPS, ...AMINO_ACIDS, ...RINGS];
