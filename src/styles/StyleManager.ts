export interface CanvasStyle {
    name: string;
    bondLength: number; // Render target length (scaled)
    bondWidth: number; // px
    doubleBondSpacing: number; // relative fraction of bond length (e.g. 0.18)
    atomFont: string;
    atomFontSize: number; // px
    subscriptFontSize: number; // px
    color: string;
    backgroundColor: string;
    highlightColor: string;
}

export const STYLES: Record<string, CanvasStyle> = {
    'ACS Document 1996': {
        name: 'ACS Document 1996',
        bondLength: 14.4, // pt -> scaled to px (approx 20px)
        bondWidth: 1.5, // 0.6pt -> ~1.5px
        doubleBondSpacing: 0.18,
        atomFont: 'Arial',
        atomFontSize: 14, // 10pt -> 14px approx
        subscriptFontSize: 10,
        color: '#000000',
        backgroundColor: '#FFFFFF',
        highlightColor: '#b45309'
    },
    'RSC Standard': {
        name: 'RSC Standard',
        bondLength: 17,
        bondWidth: 2,
        doubleBondSpacing: 0.20,
        atomFont: 'Helvetica', // or Arial
        atomFontSize: 16,
        subscriptFontSize: 11,
        color: '#000000',
        backgroundColor: '#FFFFFF',
        highlightColor: '#1d4ed8'
    },
    'Wiley Publication': {
        name: 'Wiley Publication',
        bondLength: 12,
        bondWidth: 1,
        doubleBondSpacing: 0.15,
        atomFont: 'Times New Roman',
        atomFontSize: 12,
        subscriptFontSize: 9,
        color: '#000000',
        backgroundColor: '#FFFFFF',
        highlightColor: '#9333ea'
    },
    'Chemora Modern': {
        name: 'Chemora Modern',
        bondLength: 30, // Large for screen
        bondWidth: 2.5,
        doubleBondSpacing: 0.18,
        atomFont: 'Inter, sans-serif',
        atomFontSize: 16,
        subscriptFontSize: 11,
        color: '#1f2937', // Gray-800
        backgroundColor: '#F9FAFB', // Gray-50
        highlightColor: '#4f46e5' // Indigo-600
    }
};

export const DEFAULT_STYLE = STYLES['Chemora Modern'];
