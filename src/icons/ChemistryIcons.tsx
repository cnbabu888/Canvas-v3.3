// @ts-nocheck
import React from 'react';

// Common props for icons
interface IconProps {
    size?: number;
    className?: string;
    strokeWidth?: number;
    fill?: string;
    style?: React.CSSProperties;
}

// ─── 1. Box Select (Arrow pointer with corner dots) ───
export const BoxSelectIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M3 3l7 16 2.5-7.4 7.4-2.5L3 3z" />
    </svg>
);

// ─── 2. Lasso Select (Freeform loop with magnetic feel) ───
export const LassoSelectIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M18 4c-4 0-7 3-10 6s-5 7-5 10c0 2 3 3 5 1s4-6 8-6 6 2 8 0-2-11-6-11z" />
    </svg>
);

// ─── 3. Eraser (Diamond with dissolve effect) ───
export const EraserIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M20 20H7l-5-5 10-10 8 8-3 3" />
        <path d="M18 13l-8-8" />
        <line x1="7" y1="20" x2="20" y2="20" />
    </svg>
);

// ─── 4. Scissor / Retro (Bond-break symbol) ───
export const ScissorIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
);

// ─── 5. Text (Modern "Aa" with subscript hint) ───
export const TextIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M4 20l5.5-16h5L20 20" />
        <path d="M7 13h10" />
    </svg>
);

// ─── 6. Bond (Single line with node endpoints) ───
export const SingleBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="4" y1="20" x2="20" y2="4" />
        <circle cx="4" cy="20" r="1.5" fill="currentColor" />
        <circle cx="20" cy="4" r="1.5" fill="currentColor" />
    </svg>
);

// ─── 7. Mechanism Arrow (Curved electron-push) ───
export const MechanismArrowIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M4 18Q12 2 20 18" />
        <path d="M17 14l3 4-5 0" fill="currentColor" stroke="none" />
    </svg>
);

// ─── 8. Ring (Hexagon with inner glow / aromatic circle) ───
export const BenzeneIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" />
        <circle cx="12" cy="12" r="5" />
    </svg>
);

// ─── 9. Templates (Flask minimal) ───
export const TemplatesIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M9 3h6v5l4 8a2 2 0 01-2 3H7a2 2 0 01-2-3l4-8V3z" />
        <line x1="9" y1="3" x2="15" y2="3" />
        <path d="M8 14h8" opacity="0.4" />
    </svg>
);

// ─── 10. Reaction Arrow (Forward with catalyst dot) ───
export const ReactionArrowIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M5 12H19" />
        <path d="M15 8L19 12L15 16" />
        <circle cx="12" cy="8" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
);

// ─── 11. Charge (Plus in circle with electron dot) ───
export const ChargeIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <circle cx="18" cy="6" r="1.5" fill="currentColor" />
    </svg>
);

// ─── 12. Brackets (Modern square brackets) ───
export const BracketsIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M8 4H5v16h3" />
        <path d="M16 4h3v16h-3" />
    </svg>
);

// ─── 13. Orbitals (Concentric orbital rings) ───
export const OrbitalsIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <circle cx="12" cy="12" r="3" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="4" ry="10" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
);

// ─── 14. Table (2×2 grid minimal) ───
export const TableIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
);

// ─── 15. Atom Label (Hexagon with "C") ───
export const AtomLabelIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M12 3L19.8 7.5V16.5L12 21L4.2 16.5V7.5L12 3Z" />
        <text x="12" y="14" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor" stroke="none" fontFamily="monospace">C</text>
    </svg>
);

// ─── 16. Color / Highlight (Half-filled circle) ───
export const ColorIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 010 18" fill="currentColor" opacity="0.3" />
    </svg>
);

// ─── 17. Symmetry (Parallel mirror lines) ───
export const SymmetryIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="3,2" />
        <path d="M8 6l-4 6 4 6" />
        <path d="M16 6l4 6-4 6" />
    </svg>
);

// ─── 18. Safety / GHS (Warning triangle) ───
export const SafetyIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
);

// ─── 19. Pan (Open hand) ───
export const PanIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M18 11V6a2 2 0 00-4 0v1" />
        <path d="M14 10V4a2 2 0 00-4 0v6" />
        <path d="M10 10.5V5a2 2 0 00-4 0v9" />
        <path d="M18 11a2 2 0 014 0v3a8 8 0 01-8 8h-2c-2.2 0-3.2-1-4.8-2.8L4.3 16a2 2 0 013.4-2l1.3 1.5" />
    </svg>
);

// ─── 20. AI Actions (Lightning bolt) ───
export const AIActionsIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

// ─── Keep existing bond sub-tool icons ───

export const DoubleBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="6" y1="20" x2="20" y2="6" />
        <line x1="2" y1="16" x2="16" y2="2" />
    </svg>
);

export const TripleBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="6" y1="20" x2="20" y2="6" />
        <line x1="2" y1="16" x2="16" y2="2" />
        <line x1="10" y1="24" x2="24" y2="10" />
    </svg>
);

export const WedgeBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} style={style}>
        <path d="M4 20L20 4L22 6L4 22L4 20Z" fill="currentColor" />
    </svg>
);

export const HashBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="4" y1="20" x2="5" y2="19" />
        <line x1="7" y1="17" x2="9" y2="15" />
        <line x1="11" y1="13" x2="13" y2="11" />
        <line x1="15" y1="9" x2="17" y2="7" />
        <line x1="19" y1="5" x2="20" y2="4" />
    </svg>
);

export const OrbitalSIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2" />
    </svg>
);

export const OrbitalPIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M12 12C12 12 16 8 16 6C16 4 14 2 12 2C10 2 8 4 8 6C8 8 12 12 12 12Z" />
        <path d="M12 12C12 12 8 16 8 18C8 20 10 22 12 22C14 22 16 20 16 18C16 16 12 12 12 12Z" fill="currentColor" opacity="0.2" />
    </svg>
);

export const EquilibriumArrowIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M4 10H16" />
        <path d="M14 7L17 10" />
        <path d="M20 14H8" />
        <path d="M10 17L7 14" />
    </svg>
);
