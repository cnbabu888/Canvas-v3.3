export interface ElementData {
    symbol: string;
    atomicNumber: number;
    valence: number[];
    color: string;
    name: string;
}

// Minimal subset for MVP, can be expanded
export const ELEMENTS: Map<string, ElementData> = new Map([
    ['C', { symbol: 'C', atomicNumber: 6, valence: [4], color: '#000000', name: 'Carbon' }],
    ['H', { symbol: 'H', atomicNumber: 1, valence: [1], color: '#000000', name: 'Hydrogen' }],
    ['O', { symbol: 'O', atomicNumber: 8, valence: [2], color: '#FF0000', name: 'Oxygen' }],
    ['N', { symbol: 'N', atomicNumber: 7, valence: [3, 5], color: '#0000FF', name: 'Nitrogen' }],
    ['S', { symbol: 'S', atomicNumber: 16, valence: [2, 4, 6], color: '#CCCC00', name: 'Sulfur' }],
    ['P', { symbol: 'P', atomicNumber: 15, valence: [3, 5], color: '#FF7F00', name: 'Phosphorus' }],
    ['F', { symbol: 'F', atomicNumber: 9, valence: [1], color: '#76CC33', name: 'Fluorine' }],
    ['Cl', { symbol: 'Cl', atomicNumber: 17, valence: [1], color: '#1FF01F', name: 'Chlorine' }],
    ['Br', { symbol: 'Br', atomicNumber: 35, valence: [1], color: '#A62929', name: 'Bromine' }],
    ['I', { symbol: 'I', atomicNumber: 53, valence: [1], color: '#940094', name: 'Iodine' }],
]);

export function getElement(symbol: string): ElementData | undefined {
    return ELEMENTS.get(symbol);
}
