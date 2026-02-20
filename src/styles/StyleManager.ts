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
    'N': '#0000CC', // Blue
    'O': '#CC0000', // Red
    'S': '#CC8800', // Gold/Brown
    'P': '#FF6600', // Orange
    'F': '#00AA00', // Green
    'Cl': '#00AA00', // Green
    'Br': '#882200', // Dark Red
    'I': '#660088',  // Purple
};

export const STYLES: Record<string, CanvasStyle> = {
    'ACS Document 1996': {
        name: 'ACS Document 1996',
        bondLength: 40,      // roughly 14.4mm converted to px for screen @100%
        bondWidth: 0.8,      // 0.6pt = 0.8px
        marginWidth: 2.13,   // 1.6pt = ~2.13px
        doubleBondSpacing: 0.18, // 18% of bond length
        atomFont: 'Arial',
        atomFontSize: 13.33,  // 10pt = ~13.33px
        subscriptFontSize: 10, // 75% of main
        color: '#000000',
        backgroundColor: '#FFFFFF',
        highlightColor: '#2E86C1',
        colorByElement: false
    },
    'RSC Standard': {
        name: 'RSC Standard',
        bondLength: 33,      // roughly 12mm
        bondWidth: 0.95,     // 0.7pt
        marginWidth: 2.0,
        doubleBondSpacing: 0.20,
        atomFont: '"Times New Roman"',
        atomFontSize: 10.66, // 8pt
        subscriptFontSize: 8,
        color: '#000000',
        backgroundColor: '#FFFFFF',
        highlightColor: '#2E86C1',
        colorByElement: false
    },
    'Wiley Publication': {
        name: 'Wiley Publication',
        bondLength: 42,      // roughly 15mm
        bondWidth: 1.1,      // 0.8pt
        marginWidth: 2.0,
        doubleBondSpacing: 0.16,
        atomFont: 'Arial',
        atomFontSize: 12,    // 9pt
        subscriptFontSize: 9,
        color: '#1a1a1a',
        backgroundColor: '#FFFFFF',
        highlightColor: '#2E86C1',
        colorByElement: false
    },
    'Chemora Modern': {
        name: 'Chemora Modern',
        bondLength: 40,
        bondWidth: 1.5,
        marginWidth: 3.5,
        doubleBondSpacing: 0.20,
        atomFont: '"Helvetica Neue", Arial',
        atomFontSize: 16,    // 12pt
        subscriptFontSize: 12,
        color: '#0D1B2A',
        backgroundColor: '#FFFFFF',
        highlightColor: '#2E86C1',
        colorByElement: true // Uses heteroatom CPK mapping
    }
};

export const DEFAULT_STYLE = STYLES['Chemora Modern'];
