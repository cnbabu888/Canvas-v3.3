export interface ElementData {
    symbol: string;
    atomicNumber: number;
    valence: number[];
    color: string;
    name: string;
    mass: number;
    electronegativity?: number;
}

// Comprehensive periodic table subset for chemistry structure editors
export const ELEMENTS: Map<string, ElementData> = new Map([
    // Period 1
    ['H', { symbol: 'H', atomicNumber: 1, valence: [1], color: '#000000', name: 'Hydrogen', mass: 1.008, electronegativity: 2.20 }],
    ['He', { symbol: 'He', atomicNumber: 2, valence: [0], color: '#D9FFFF', name: 'Helium', mass: 4.003, electronegativity: undefined }],

    // Period 2
    ['Li', { symbol: 'Li', atomicNumber: 3, valence: [1], color: '#CC80FF', name: 'Lithium', mass: 6.941, electronegativity: 0.98 }],
    ['Be', { symbol: 'Be', atomicNumber: 4, valence: [2], color: '#C2FF00', name: 'Beryllium', mass: 9.012, electronegativity: 1.57 }],
    ['B', { symbol: 'B', atomicNumber: 5, valence: [3], color: '#FFB5B5', name: 'Boron', mass: 10.81, electronegativity: 2.04 }],
    ['C', { symbol: 'C', atomicNumber: 6, valence: [4], color: '#000000', name: 'Carbon', mass: 12.011, electronegativity: 2.55 }],
    ['N', { symbol: 'N', atomicNumber: 7, valence: [3, 5], color: '#304FF7', name: 'Nitrogen', mass: 14.007, electronegativity: 3.04 }],
    ['O', { symbol: 'O', atomicNumber: 8, valence: [2], color: '#FF0D0D', name: 'Oxygen', mass: 15.999, electronegativity: 3.44 }],
    ['F', { symbol: 'F', atomicNumber: 9, valence: [1], color: '#90E050', name: 'Fluorine', mass: 18.998, electronegativity: 3.98 }],
    ['Ne', { symbol: 'Ne', atomicNumber: 10, valence: [0], color: '#B3E3F5', name: 'Neon', mass: 20.180, electronegativity: undefined }],

    // Period 3
    ['Na', { symbol: 'Na', atomicNumber: 11, valence: [1], color: '#AB5CF2', name: 'Sodium', mass: 22.990, electronegativity: 0.93 }],
    ['Mg', { symbol: 'Mg', atomicNumber: 12, valence: [2], color: '#8AFF00', name: 'Magnesium', mass: 24.305, electronegativity: 1.31 }],
    ['Al', { symbol: 'Al', atomicNumber: 13, valence: [3], color: '#BFA6A6', name: 'Aluminium', mass: 26.982, electronegativity: 1.61 }],
    ['Si', { symbol: 'Si', atomicNumber: 14, valence: [4], color: '#F0C8A0', name: 'Silicon', mass: 28.086, electronegativity: 1.90 }],
    ['P', { symbol: 'P', atomicNumber: 15, valence: [3, 5], color: '#FF8000', name: 'Phosphorus', mass: 30.974, electronegativity: 2.19 }],
    ['S', { symbol: 'S', atomicNumber: 16, valence: [2, 4, 6], color: '#FFFF30', name: 'Sulfur', mass: 32.065, electronegativity: 2.58 }],
    ['Cl', { symbol: 'Cl', atomicNumber: 17, valence: [1, 3, 5, 7], color: '#1FF01F', name: 'Chlorine', mass: 35.453, electronegativity: 3.16 }],
    ['Ar', { symbol: 'Ar', atomicNumber: 18, valence: [0], color: '#80D1E3', name: 'Argon', mass: 39.948, electronegativity: undefined }],

    // Period 4 (common)
    ['K', { symbol: 'K', atomicNumber: 19, valence: [1], color: '#8F40D4', name: 'Potassium', mass: 39.098, electronegativity: 0.82 }],
    ['Ca', { symbol: 'Ca', atomicNumber: 20, valence: [2], color: '#3DFF00', name: 'Calcium', mass: 40.078, electronegativity: 1.00 }],
    ['Ti', { symbol: 'Ti', atomicNumber: 22, valence: [4], color: '#BFC2C7', name: 'Titanium', mass: 47.867, electronegativity: 1.54 }],
    ['Cr', { symbol: 'Cr', atomicNumber: 24, valence: [2, 3, 6], color: '#8A99C7', name: 'Chromium', mass: 51.996, electronegativity: 1.66 }],
    ['Mn', { symbol: 'Mn', atomicNumber: 25, valence: [2, 4, 7], color: '#9C7AC7', name: 'Manganese', mass: 54.938, electronegativity: 1.55 }],
    ['Fe', { symbol: 'Fe', atomicNumber: 26, valence: [2, 3], color: '#E06633', name: 'Iron', mass: 55.845, electronegativity: 1.83 }],
    ['Co', { symbol: 'Co', atomicNumber: 27, valence: [2, 3], color: '#F090A0', name: 'Cobalt', mass: 58.933, electronegativity: 1.88 }],
    ['Ni', { symbol: 'Ni', atomicNumber: 28, valence: [2], color: '#50D050', name: 'Nickel', mass: 58.693, electronegativity: 1.91 }],
    ['Cu', { symbol: 'Cu', atomicNumber: 29, valence: [1, 2], color: '#C88033', name: 'Copper', mass: 63.546, electronegativity: 1.90 }],
    ['Zn', { symbol: 'Zn', atomicNumber: 30, valence: [2], color: '#7D80B0', name: 'Zinc', mass: 65.380, electronegativity: 1.65 }],
    ['Ga', { symbol: 'Ga', atomicNumber: 31, valence: [3], color: '#C28F8F', name: 'Gallium', mass: 69.723, electronegativity: 1.81 }],
    ['Ge', { symbol: 'Ge', atomicNumber: 32, valence: [4], color: '#668F8F', name: 'Germanium', mass: 72.640, electronegativity: 2.01 }],
    ['As', { symbol: 'As', atomicNumber: 33, valence: [3, 5], color: '#BD80E3', name: 'Arsenic', mass: 74.922, electronegativity: 2.18 }],
    ['Se', { symbol: 'Se', atomicNumber: 34, valence: [2, 4, 6], color: '#FFA100', name: 'Selenium', mass: 78.960, electronegativity: 2.55 }],
    ['Br', { symbol: 'Br', atomicNumber: 35, valence: [1], color: '#A62929', name: 'Bromine', mass: 79.904, electronegativity: 2.96 }],

    // Period 5 (common)
    ['Ru', { symbol: 'Ru', atomicNumber: 44, valence: [2, 3, 4], color: '#248F8F', name: 'Ruthenium', mass: 101.07, electronegativity: 2.20 }],
    ['Rh', { symbol: 'Rh', atomicNumber: 45, valence: [3], color: '#0A7D8C', name: 'Rhodium', mass: 102.91, electronegativity: 2.28 }],
    ['Pd', { symbol: 'Pd', atomicNumber: 46, valence: [2, 4], color: '#006985', name: 'Palladium', mass: 106.42, electronegativity: 2.20 }],
    ['Ag', { symbol: 'Ag', atomicNumber: 47, valence: [1], color: '#C0C0C0', name: 'Silver', mass: 107.87, electronegativity: 1.93 }],
    ['Sn', { symbol: 'Sn', atomicNumber: 50, valence: [2, 4], color: '#668080', name: 'Tin', mass: 118.71, electronegativity: 1.96 }],
    ['I', { symbol: 'I', atomicNumber: 53, valence: [1, 3, 5, 7], color: '#940094', name: 'Iodine', mass: 126.90, electronegativity: 2.66 }],

    // Period 6 (common)
    ['Pt', { symbol: 'Pt', atomicNumber: 78, valence: [2, 4], color: '#D0D0E0', name: 'Platinum', mass: 195.08, electronegativity: 2.28 }],
    ['Au', { symbol: 'Au', atomicNumber: 79, valence: [1, 3], color: '#FFD123', name: 'Gold', mass: 196.97, electronegativity: 2.54 }],
    ['Hg', { symbol: 'Hg', atomicNumber: 80, valence: [1, 2], color: '#B8B8D0', name: 'Mercury', mass: 200.59, electronegativity: 2.00 }],
    ['Pb', { symbol: 'Pb', atomicNumber: 82, valence: [2, 4], color: '#575961', name: 'Lead', mass: 207.20, electronegativity: 2.33 }],
    ['Bi', { symbol: 'Bi', atomicNumber: 83, valence: [3, 5], color: '#9E4FB5', name: 'Bismuth', mass: 208.98, electronegativity: 2.02 }],
]);

export function getElement(symbol: string): ElementData | undefined {
    return ELEMENTS.get(symbol);
}

// Get the maximum normal valence for an element
export function getMaxValence(symbol: string): number {
    const el = ELEMENTS.get(symbol);
    if (!el) return 4; // Default to carbon-like
    return Math.max(...el.valence);
}

// Get all common valences for an element
export function getCommonValences(symbol: string): number[] {
    const el = ELEMENTS.get(symbol);
    return el ? el.valence : [4];
}

// Check if a given bond order sum is valid for this element
export function isValidValence(symbol: string, bondOrderSum: number, charge: number = 0): boolean {
    const el = ELEMENTS.get(symbol);
    if (!el) return true; // Unknown element, allow anything
    // Adjust for charge: cations allow fewer bonds, anions allow more
    const adjusted = bondOrderSum + charge;
    return el.valence.some(v => adjusted <= v);
}
