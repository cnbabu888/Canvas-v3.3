export interface CanvasStyle {
    name: string;
    bondLength: number;         // px at 100% zoom
    bondWidth: number;          // px stroke width
    marginWidth: number;        // px halo around atom labels
    doubleBondSpacing: number;  // fraction of bondLength (e.g 0.18 = 18%)
    hashSpacing: number;        // px between hash bond lines
    wedgeBaseWidth: number;     // px width of wedge at fat end
    atomFont: string;
    atomFontSize: number;       // px
    subscriptFontSize: number;  // px
    atomFontWeight: string;     // 'bold' | 'normal' | '600' etc
    color: string;
    backgroundColor: string;
    highlightColor: string;
    colorByElement?: boolean;
}

export const CPK_COLORS: Record<string, string> = {
    'H': '#000000',
    'C': '#000000',
    'N': '#0000CC',   // Blue (exact spec)
    'O': '#CC0000',   // Red
    'S': '#CC8800',   // Gold/Brown
    'P': '#FF6600',   // Orange
    'F': '#00AA00',   // Green
    'Cl': '#00AA00',   // Green
    'Br': '#882200',   // Dark Red
    'I': '#660088',   // Purple
    'Se': '#FF8C00',
    'Si': '#A0A0A0',
    'B': '#FF69B4',
};

export const STYLES: Record<string, CanvasStyle> = {

    // ═══════════════════════════════════════════
    //  STYLE 1 — ACS Document 1996 (default)
    //  The gold-standard for journal publications.
    //  Clean, minimal, pure black on white.
    // ═══════════════════════════════════════════
    'ACS Document 1996': {
        name: 'ACS Document 1996',
        bondLength: 40,       // 14.4mm ≈ 40px at 96dpi
        bondWidth: 0.8,      // 0.6pt = 0.8px
        marginWidth: 2.13,     // 1.6pt = 2.13px
        doubleBondSpacing: 0.18,     // 18% of bond length → 7.2px
        hashSpacing: 3.33,     // 2.5pt = 3.33px
        wedgeBaseWidth: 4.0,      // Clean narrow wedge
        atomFont: 'Arial, Helvetica, sans-serif',
        atomFontSize: 13.33,    // 10pt = 13.33px
        subscriptFontSize: 10,       // 75% of main
        atomFontWeight: 'bold',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        highlightColor: '#2E86C1',
        colorByElement: false,
    },

    // ═══════════════════════════════════════════
    //  STYLE 2 — RSC Standard
    //  Slightly more compact, uses Times New Roman
    //  for that classic British journal aesthetic.
    // ═══════════════════════════════════════════
    'RSC Standard': {
        name: 'RSC Standard',
        bondLength: 33,       // 12mm ≈ 33px
        bondWidth: 0.95,     // 0.7pt
        marginWidth: 2.0,
        doubleBondSpacing: 0.20,     // 20%
        hashSpacing: 3.0,
        wedgeBaseWidth: 3.5,
        atomFont: '"Times New Roman", Times, serif',
        atomFontSize: 10.66,    // 8pt
        subscriptFontSize: 8,
        atomFontWeight: 'normal',
        color: '#000000',
        backgroundColor: '#FFFFFF',
        highlightColor: '#2E86C1',
        colorByElement: false,
    },

    // ═══════════════════════════════════════════
    //  STYLE 3 — Wiley Publication
    //  Slightly bolder lines, Arial, off-black.
    // ═══════════════════════════════════════════
    'Wiley Publication': {
        name: 'Wiley Publication',
        bondLength: 42,       // 15mm ≈ 42px
        bondWidth: 1.1,      // 0.8pt
        marginWidth: 2.0,
        doubleBondSpacing: 0.16,     // 16%
        hashSpacing: 3.5,
        wedgeBaseWidth: 4.5,
        atomFont: 'Arial, Helvetica, sans-serif',
        atomFontSize: 12,       // 9pt
        subscriptFontSize: 9,
        atomFontWeight: 'normal',
        color: '#1a1a1a',
        backgroundColor: '#FFFFFF',
        highlightColor: '#2E86C1',
        colorByElement: false,
    },

    // ═══════════════════════════════════════════
    //  STYLE 4 — Chemora Modern
    //  Our premium style. Bold, colorful heteroatoms,
    //  Helvetica Neue, slightly thicker bonds.
    // ═══════════════════════════════════════════
    'Chemora Modern': {
        name: 'Chemora Modern',
        bondLength: 40,
        bondWidth: 1.5,
        marginWidth: 3.5,
        doubleBondSpacing: 0.20,     // 20%
        hashSpacing: 3.0,
        wedgeBaseWidth: 5.0,
        atomFont: '"Helvetica Neue", Arial, sans-serif',
        atomFontSize: 16,       // 12pt
        subscriptFontSize: 12,
        atomFontWeight: 'bold',
        color: '#0D1B2A',
        backgroundColor: '#FFFFFF',
        highlightColor: '#2E86C1',
        colorByElement: true,     // N=blue, O=red, S=gold, P=orange
    },
};

export const DEFAULT_STYLE = STYLES['ACS Document 1996'];
