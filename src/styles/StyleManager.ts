export interface CanvasStyle {
    name: string;
    bondLength: number; // Render target length (scaled)
    bondWidth: number; // px
    marginWidth: number; // px (Halo around text)
    doubleBondSpacing: number; // relative fraction of bond length (e.g. 0.18)
    atomFont: string;
    atomFontSize: number; // px
    subscriptFontSize: number; // px
    color: string;
    backgroundColor: string;
    highlightColor: string;
    colorByElement?: boolean; // Default false for strict ACS
}

export const CPK_COLORS: Record<string, string> = {
    'H': '#000000',
    'C': '#000000',
    'N': '#0000FF', // Blue
    'O': '#FF0000', // Red
    'F': '#33CC33', // Green
    'Cl': '#00FF00', // Green
    'Br': '#992200', // Dark Red/Brown
    'I': '#6600BB', // Purple
    'S': '#CCCC00', // Yellow/Ochre
    'P': '#FF8800', // Orange
    'Se': '#FFA500', // Orange-ish
};

export const STYLES: Record<string, CanvasStyle> = {
    'ACS Document 1996': {
        name: 'ACS Document 1996',
        bondLength: 14.4,
        bondWidth: 1.2,
        marginWidth: 2.1,
        doubleBondSpacing: 0.18,
        atomFont: 'Arial',
        atomFontSize: 13,
        subscriptFontSize: 10,
        color: '#000000',
        backgroundColor: '#FFFFFF',
        highlightColor: '#b45309',
        colorByElement: false
    },
    'RSC Standard': {
        name: 'RSC Standard',
        bondLength: 17,
        bondWidth: 1.5,
        marginWidth: 2.5,
        doubleBondSpacing: 0.20,
        atomFont: 'Arial',
        atomFontSize: 14,
        subscriptFontSize: 11,
        color: '#000000',
        backgroundColor: '#FFFFFF',
        highlightColor: '#1d4ed8',
        colorByElement: false
    },
    'Wiley Publication': {
        name: 'Wiley Publication',
        bondLength: 12,
        bondWidth: 1,
        marginWidth: 2.0,
        doubleBondSpacing: 0.15,
        atomFont: 'Times New Roman',
        atomFontSize: 12,
        subscriptFontSize: 9,
        color: '#000000',
        backgroundColor: '#FFFFFF',
        highlightColor: '#9333ea',
        colorByElement: false
    },
    'Chemora Modern': {
        name: 'Chemora Modern',
        bondLength: 30, // Large for screen
        bondWidth: 2.5,
        marginWidth: 3.5,
        doubleBondSpacing: 0.18,
        atomFont: 'Inter, sans-serif',
        atomFontSize: 15,
        subscriptFontSize: 11,
        color: '#1f2937', // Gray-800
        backgroundColor: '#F9FAFB', // Gray-50
        highlightColor: '#4f46e5', // Indigo-600
        colorByElement: true
    }
};

export const DEFAULT_STYLE = STYLES['Chemora Modern'];
