// @ts-nocheck
import React from 'react';

// Common props for icons
interface IconProps {
    size?: number;
    className?: string;
    strokeWidth?: number;
    fill?: string;
}

export const BenzeneIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" />
        <circle cx="12" cy="12" r="5" />
    </svg>
);

export const SingleBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" y1="20" x2="20" y2="4" />
    </svg>
);

export const DoubleBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="6" y1="20" x2="20" y2="6" />
        <line x1="2" y1="16" x2="16" y2="2" />
    </svg>
);

export const TripleBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="6" y1="20" x2="20" y2="6" />
        <line x1="2" y1="16" x2="16" y2="2" />
        <line x1="10" y1="24" x2="24" y2="10" />
    </svg>
);

export const WedgeBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
        <path d="M4 20L20 4L22 6L4 22L4 20Z" fill="currentColor" />
    </svg>
);

export const HashBondIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" y1="20" x2="5" y2="19" />
        <line x1="7" y1="17" x2="9" y2="15" />
        <line x1="11" y1="13" x2="13" y2="11" />
        <line x1="15" y1="9" x2="17" y2="7" />
        <line x1="19" y1="5" x2="20" y2="4" />
    </svg>
);

export const OrbitalSIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2" />
    </svg>
);

export const OrbitalPIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 12C12 12 16 8 16 6C16 4 14 2 12 2C10 2 8 4 8 6C8 8 12 12 12 12Z" />
        <path d="M12 12C12 12 8 16 8 18C8 20 10 22 12 22C14 22 16 20 16 18C16 16 12 12 12 12Z" fill="currentColor" opacity="0.2" />
    </svg>
);

export const ReactionArrowIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12H19" />
        <path d="M15 8L19 12L15 16" />
    </svg>
);

export const EquilibriumArrowIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 10H16" />
        <path d="M14 7L17 10" />
        <path d="M20 14H8" />
        <path d="M10 17L7 14" />
    </svg>
);
