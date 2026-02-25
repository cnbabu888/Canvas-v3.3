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

// ─── 1. Box Select (Modern pointer with selection box) ───
export const BoxSelectIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M3 3l7.5 18 2.1-6.3L19 12.6 3 3z" fill="currentColor" fillOpacity="0.08" />
        <path d="M3 3l7.5 18 2.1-6.3L19 12.6 3 3z" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" strokeDasharray="2.5 1.5" opacity="0.5" />
    </svg>
);

// ─── 2. Lasso Select (Smooth loop with magnetic dot) ───
export const LassoSelectIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <ellipse cx="12" cy="10" rx="8" ry="6" strokeDasharray="3 2" />
        <path d="M16 14c1 2 2 4 1 6s-3 2-4 0" />
        <circle cx="13" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </svg>
);

// ─── 3. Eraser (Clean rounded eraser) ───
export const EraserIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M7 21h10" />
        <path d="M5.5 13.5L13 6l5 5-7.5 7.5a2.12 2.12 0 01-3 0L5.5 16.5a2.12 2.12 0 010-3z" />
        <path d="M5.5 13.5L13 6l5 5-7.5 7.5" fill="currentColor" fillOpacity="0.06" />
        <line x1="10" y1="9" x2="15" y2="14" opacity="0.4" />
    </svg>
);

// ─── 4. Scissor (Clean retrosynthesis scissors) ───
export const ScissorIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
);

// ─── 5. Text (Bold "A" with cursor line) ───
export const TextIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M6 18l4.5-12h3L18 18" />
        <line x1="8.5" y1="13" x2="15.5" y2="13" />
        <line x1="20" y1="5" x2="20" y2="19" strokeWidth="1.5" opacity="0.4" strokeDasharray="2 2" />
    </svg>
);

// ─── 6. Single Bond (Clean diagonal with filled atoms) ───
export const SingleBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={className} style={style}>
        <line x1="5" y1="19" x2="19" y2="5" />
        <circle cx="5" cy="19" r="2" fill="currentColor" stroke="none" opacity="0.25" />
        <circle cx="19" cy="5" r="2" fill="currentColor" stroke="none" opacity="0.25" />
    </svg>
);

// ─── 7. Mechanism Arrow (Smooth curved e⁻ push) ───
export const MechanismArrowIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M4 18C6 8 18 8 20 18" fill="none" />
        <path d="M17.5 15l2.5 3-4.5 0.5" fill="currentColor" stroke="none" opacity="0.85" />
        <circle cx="4" cy="18" r="1.8" fill="currentColor" stroke="none" opacity="0.3" />
    </svg>
);

// ─── 8. Ring / Benzene (Clean hex with aromatic circle) ───
export const BenzeneIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M12 2.5L20.2 7.25V16.75L12 21.5L3.8 16.75V7.25L12 2.5Z" fill="currentColor" fillOpacity="0.04" />
        <path d="M12 2.5L20.2 7.25V16.75L12 21.5L3.8 16.75V7.25L12 2.5Z" />
        <circle cx="12" cy="12" r="4.5" strokeWidth="1.2" opacity="0.5" />
    </svg>
);

// ─── 9. Templates / Functional Groups (Modern flask) ───
export const TemplatesIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M9 3h6v5.5l3.5 7.5a2 2 0 01-1.8 2.8H7.3a2 2 0 01-1.8-2.8L9 8.5V3z" fill="currentColor" fillOpacity="0.05" />
        <path d="M9 3h6v5.5l3.5 7.5a2 2 0 01-1.8 2.8H7.3a2 2 0 01-1.8-2.8L9 8.5V3z" />
        <line x1="9" y1="3" x2="15" y2="3" strokeWidth="2.5" />
        <path d="M8 14.5h8" opacity="0.3" strokeWidth="1.2" />
        <circle cx="11" cy="16.5" r="1" fill="currentColor" opacity="0.2" stroke="none" />
    </svg>
);

// ─── 10. Reaction Arrow (Clean forward arrow with condition dot) ───
export const ReactionArrowIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="4" y1="12" x2="18" y2="12" />
        <path d="M14 8l4 4-4 4" />
        <circle cx="11" cy="8" r="1.5" fill="currentColor" stroke="none" opacity="0.35" />
    </svg>
);

// ─── 11. Charge (+/- with depth) ───
export const ChargeIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.04" />
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="16" strokeWidth="2" />
        <line x1="8" y1="12" x2="16" y2="12" strokeWidth="2" />
        <circle cx="19" cy="5" r="1.8" fill="currentColor" stroke="none" opacity="0.3" />
    </svg>
);

// ─── 12. Brackets (Modern square brackets with depth) ───
export const BracketsIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2.2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M8 4H5v16h3" />
        <path d="M16 4h3v16h-3" />
        <text x="12" y="14" textAnchor="middle" fontSize="6" fontWeight="600" fill="currentColor" stroke="none" opacity="0.35" fontFamily="system-ui">n</text>
    </svg>
);

// ─── 13. Orbitals (3D orbital with nucleus) ───
export const OrbitalsIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.4, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="4" ry="10" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
);

// ─── 14. Table (Clean 2×2 grid with depth) ───
export const TableIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" fillOpacity="0.04" />
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
);

// ─── 15. Atom Label (Hexagonal badge with C) ───
export const AtomLabelIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M12 3.5L19.2 7.75V16.25L12 20.5L4.8 16.25V7.75L12 3.5Z" fill="currentColor" fillOpacity="0.06" />
        <path d="M12 3.5L19.2 7.75V16.25L12 20.5L4.8 16.25V7.75L12 3.5Z" />
        <text x="12" y="14.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor" stroke="none" fontFamily="system-ui">C</text>
    </svg>
);

// ─── 16. Color / Highlight (Gradient circle with brush) ───
export const ColorIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 010 18" fill="currentColor" opacity="0.12" stroke="none" />
        <circle cx="9" cy="9" r="1.5" fill="#ef4444" stroke="none" />
        <circle cx="14" cy="8" r="1.5" fill="#3b82f6" stroke="none" />
        <circle cx="9" cy="14" r="1.5" fill="#22c55e" stroke="none" />
        <circle cx="15" cy="14" r="1.5" fill="#eab308" stroke="none" />
    </svg>
);

// ─── 17. Symmetry (Mirror plane with σ) ───
export const SymmetryIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="3 2" strokeWidth="1.5" />
        <path d="M8 7L4 12l4 5" fill="currentColor" fillOpacity="0.06" />
        <path d="M8 7L4 12l4 5" />
        <path d="M16 7l4 5-4 5" fill="currentColor" fillOpacity="0.06" />
        <path d="M16 7l4 5-4 5" />
    </svg>
);

// ─── 18. Safety / GHS (Warning diamond) ───
export const SafetyIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M10.6 4.5L2.2 17.5a1.7 1.7 0 001.47 2.5h16.66a1.7 1.7 0 001.47-2.5L13.4 4.5a1.7 1.7 0 00-2.8 0z" fill="currentColor" fillOpacity="0.05" />
        <path d="M10.6 4.5L2.2 17.5a1.7 1.7 0 001.47 2.5h16.66a1.7 1.7 0 001.47-2.5L13.4 4.5a1.7 1.7 0 00-2.8 0z" />
        <line x1="12" y1="9" x2="12" y2="14" strokeWidth="2" />
        <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
);

// ─── 19. Pan (Clean open hand) ───
export const PanIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M18 11V6.5a1.5 1.5 0 00-3 0v1" />
        <path d="M15 10V4.5a1.5 1.5 0 00-3 0V10" />
        <path d="M12 10.5V5.5a1.5 1.5 0 00-3 0V14" />
        <path d="M18 11a1.5 1.5 0 013 0v3.5a7.5 7.5 0 01-7.5 7.5h-2c-2 0-3-1-4.5-2.6L4.5 16.2a1.5 1.5 0 012.6-1.5L8.5 16" />
    </svg>
);

// ─── 20. AI Actions (Lightning bolt with glow) ───
export const AIActionsIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fillOpacity="0.08" />
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

// ─── Bond Sub-Tool Icons ───

export const DoubleBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={className} style={style}>
        <line x1="5" y1="18" x2="19" y2="5" />
        <line x1="3" y1="15" x2="17" y2="2" opacity="0.5" />
    </svg>
);

export const TripleBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={className} style={style}>
        <line x1="5" y1="18" x2="19" y2="5" />
        <line x1="3" y1="15" x2="17" y2="2" opacity="0.5" />
        <line x1="7" y1="21" x2="21" y2="8" opacity="0.5" />
    </svg>
);

export const WedgeBondIcon: React.FC<IconProps> = ({ size = 24, className = '', style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
        <path d="M5 19L19 5L21 7L5 21Z" fill="currentColor" opacity="0.85" />
    </svg>
);

export const HashBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={className} style={style}>
        <line x1="5" y1="19" x2="6.5" y2="17.5" />
        <line x1="8" y1="16" x2="10" y2="14" />
        <line x1="11.5" y1="12.5" x2="13.5" y2="10.5" />
        <line x1="15" y1="9" x2="17" y2="7" />
        <line x1="18.5" y1="5.5" x2="19.5" y2="4.5" />
    </svg>
);

export const OrbitalSIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={className} style={style}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.5" fill="currentColor" opacity="0.12" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
);

export const OrbitalPIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={className} style={style}>
        <path d="M12 12C12 12 16 8 16 6C16 4 14 2 12 2C10 2 8 4 8 6C8 8 12 12 12 12Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M12 12C12 12 16 8 16 6C16 4 14 2 12 2C10 2 8 4 8 6C8 8 12 12 12 12Z" />
        <path d="M12 12C12 12 8 16 8 18C8 20 10 22 12 22C14 22 16 20 16 18C16 16 12 12 12 12Z" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
);

export const EquilibriumArrowIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.8, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="4" y1="10" x2="17" y2="10" />
        <path d="M14 7l3 3" />
        <line x1="20" y1="14" x2="7" y2="14" />
        <path d="M10 17l-3-3" />
    </svg>
);
