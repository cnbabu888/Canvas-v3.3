// @ts-nocheck

import React from 'react';
import {
    MousePointer2, Eraser, Type, Hexagon, ArrowRight, CirclePlus,
    Brackets, Shapes, Table, PenTool, Library, FlaskConical, Hand,
    Lasso, ScanLine, Orbit, Beaker, TestTube, FlaskRound, Link2
} from 'lucide-react';
import { useCanvasStore } from '../store/useCanvasStore';
import {
    BenzeneIcon, SingleBondIcon, DoubleBondIcon, TripleBondIcon,
    WedgeBondIcon, HashBondIcon, OrbitalSIcon, OrbitalPIcon,
    ReactionArrowIcon, EquilibriumArrowIcon
} from '../icons/ChemistryIcons';

// --- Tool Definitions (Ported from Chemora LeftToolbar) ---
const TOOLS = [
    {
        id: 'select', icon: MousePointer2, label: 'Selection (V)', shortcut: 'V',
        subTools: [
            { id: 'select-lasso', icon: Lasso, label: 'Lasso Select' },
            { id: 'select-marquee', icon: ScanLine, label: 'Marquee Select' },
        ]
    },
    { id: 'erase', icon: Eraser, label: 'Eraser (X)', shortcut: 'X' },
    { id: 'text', icon: Type, label: 'Text (T)', shortcut: 'T' },
    {
        id: 'bond', icon: SingleBondIcon, label: 'Bonds (B)', shortcut: 'B',
        subTools: [
            { id: 'BOND_SINGLE', icon: SingleBondIcon, label: 'Single Bond' },
            { id: 'BOND_DOUBLE', icon: DoubleBondIcon, label: 'Double Bond' },
            { id: 'BOND_TRIPLE', icon: TripleBondIcon, label: 'Triple Bond' },
            { id: 'BOND_WEDGE_SOLID', icon: WedgeBondIcon, label: 'Wedge (Solid)' },
            { id: 'BOND_WEDGE_HASH', icon: HashBondIcon, label: 'Wedge (Hash)' },
            { id: 'BOND_DATIVE', icon: ArrowRight, label: 'Dative Bond' },
            { id: 'BOND_WAVY', icon: Link2, label: 'Wavy Bond' },
            { id: 'BOND_AROMATIC', icon: CirclePlus, label: 'Aromatic Bond' },
            { id: 'BOND_QUADRUPLE', icon: TripleBondIcon, label: 'Quadruple Bond' },
            { id: 'BOND_HOLLOW_WEDGE', icon: WedgeBondIcon, label: 'Hollow Wedge' },
            { id: 'BOND_HYDROGEN', icon: SingleBondIcon, label: 'Hydrogen Bond' },
            { id: 'BOND_IONIC', icon: Link2, label: 'Ionic Bond' },
        ]
    },
    { id: 'chain', icon: Link2, label: 'Chain (C)', shortcut: 'C' },
    {
        id: 'ring', icon: BenzeneIcon, label: 'Rings (R)', shortcut: 'R',
        subTools: [
            { id: 'BENZENE', icon: BenzeneIcon, label: 'Benzene' },
            { id: 'RING_3', icon: Hexagon, label: 'Cyclopropane' },
            { id: 'RING_4', icon: Hexagon, label: 'Cyclobutane' },
            { id: 'RING_5', icon: Hexagon, label: 'Cyclopentane' },
            { id: 'RING_6', icon: Hexagon, label: 'Cyclohexane' },
            { id: 'RING_7', icon: Hexagon, label: 'Cycloheptane' },
            { id: 'RING_8', icon: Hexagon, label: 'Cyclooctane' },
            { id: 'RING_NAPHTHALENE', icon: BenzeneIcon, label: 'Naphthalene' },
            { id: 'RING_ANTHRACENE', icon: BenzeneIcon, label: 'Anthracene' },
        ]
    },
    {
        id: 'groups', icon: FlaskRound, label: 'Functional Groups',
        subTools: [
            { id: 'group-me', icon: Type, label: '-Me' },
            { id: 'group-et', icon: Type, label: '-Et' },
            { id: 'group-ipr', icon: Type, label: '-iPr' },
            { id: 'group-tbu', icon: Type, label: '-tBu' },
            { id: 'group-ph', icon: Type, label: '-Ph' },
            { id: 'group-bn', icon: Type, label: '-Bn' },
            { id: 'group-ac', icon: Type, label: '-Ac' },
            { id: 'group-boc', icon: Type, label: '-Boc' },
            { id: 'group-ts', icon: Type, label: '-Ts' },
            { id: 'group-ms', icon: Type, label: '-Ms' },
            { id: 'group-tf', icon: Type, label: '-Tf' },
        ]
    },
    {
        id: 'reaction', icon: ReactionArrowIcon, label: 'Arrows (W)', shortcut: 'W',
        subTools: [
            { id: 'arrow-synthesis', icon: ReactionArrowIcon, label: 'Synthesis Arrow' },
            { id: 'arrow-equilibrium', icon: EquilibriumArrowIcon, label: 'Equilibrium Arrow' },
            { id: 'arrow-mechanism', icon: ArrowRight, label: 'Mechanism Arrow' },
        ]
    }
];

const CreationRail: React.FC = () => {
    const { activeTool, activeSubTool, setActiveTool } = useCanvasStore();

    // Find current active category based on activeTool
    const activeCategory = TOOLS.find(t => t.id === activeTool) || TOOLS.find(t => t.subTools?.some(st => st.id === activeSubTool));

    // If activeTool is a subtool (e.g. BOND_SINGLE), we want to show the 'bond' category expanded.
    // Logic: If activeTool is in TOOLS (main tool), sidebar is selected. 
    // If activeTool is a subtool ID, we find its parent.
    // For specific requirement "Clicking a card must open a high-density sub-menu":
    // We will track 'expandedCategory' locally for the hover/click effect, or use the Store.
    // Let's use local state for "Expanded Submenu" to allow browsing without switching tool?
    // Or just use activeTool. 
    // Simplified: Clicking main icon sets it as active. If it has subtools, show them.

    // We'll use the Store's activeTool to highlight the main rail.
    // And show sub-rail if the active tool has subtools.

    const currentMainTool = TOOLS.find(t => t.id === activeTool || t.subTools?.some(st => st.id === activeSubTool));

    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-[9999] flex flex-row items-center gap-4 font-sans">
            {/* Main Rail */}
            <div className="flex flex-col gap-2 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl ring-1 ring-black/5">
                {TOOLS.map((tool) => {
                    const isActive = currentMainTool?.id === tool.id;
                    const Icon = tool.icon;
                    return (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id)}
                            title={tool.label}
                            className={`
                                relative p-3 rounded-xl transition-all duration-200 group
                                ${isActive
                                    ? 'bg-blue-500/90 text-white shadow-lg shadow-blue-500/30 scale-105'
                                    : 'bg-white/5 hover:bg-white/20 text-slate-600 hover:text-slate-900 hover:scale-105'}
                            `}
                        >
                            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />

                            {/* Tooltip */}
                            <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                {tool.label}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Sub-Menus (High Density) */}
            {currentMainTool?.subTools && (
                <div className="p-4 bg-white/80 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl grid grid-cols-4 gap-2 w-72 animate-in fade-in slide-in-from-left-4 max-h-[80vh] overflow-y-auto">
                    <div className="col-span-4 text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider flex justify-between">
                        <span>{currentMainTool.label}</span>
                        <span className="text-gray-300 text-[10px]">v7.0</span>
                    </div>

                    {currentMainTool.subTools.map((subItem) => {
                        const isSubActive = activeSubTool === subItem.id;
                        const SubIcon = subItem.icon;

                        // Render logic for different types (Grid for bonds/rings, List for groups?)
                        // We use a responsive grid. 
                        const isList = currentMainTool.id === 'groups';

                        return (
                            <button
                                key={subItem.id}
                                onClick={() => setActiveTool(currentMainTool.id, subItem.id)}
                                className={`
                                    ${isList ? 'col-span-2 flex-row justify-start px-3' : 'col-span-1 flex-col justify-center'}
                                    flex items-center gap-2 p-2 rounded-lg transition-all border
                                    ${isSubActive
                                        ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm ring-1 ring-blue-300'
                                        : 'bg-white/40 border-transparent hover:bg-white/80 hover:border-white/60 hover:shadow-sm text-slate-600'}
                                `}
                                title={subItem.label}
                            >
                                <SubIcon size={isList ? 16 : 24} />
                                {isList && <span className="text-xs font-mono">{subItem.label.split('(')[0]}</span>}
                                {!isList && currentMainTool.id === 'ring' && <span className="text-[10px] font-bold mt-1">{subItem.label.substring(0, 3)}</span>}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CreationRail;
