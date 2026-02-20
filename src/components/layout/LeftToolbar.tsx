import React, { useEffect } from 'react';
import {
    MousePointer2,
    Eraser,
    Type,
    Hexagon,
    ArrowRight,
    CirclePlus,
    Brackets,
    Shapes,
    Table,
    PenTool,
    Library,
    FlaskConical,
    Hand,
    Lasso,
    ScanLine,
    Orbit,
    Beaker,
    TestTube,
    FlaskRound,
    Link2
} from 'lucide-react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { ToolGroup } from './ToolGroup';
import {
    BenzeneIcon,
    SingleBondIcon,
    DoubleBondIcon,
    TripleBondIcon,
    WedgeBondIcon,
    HashBondIcon,
    OrbitalSIcon,
    OrbitalPIcon,
    ReactionArrowIcon,
    EquilibriumArrowIcon
} from '../../icons/ChemistryIcons';

// --- Tool Definitions ---

const TOOLS = [
    // 1. Selection (V)
    {
        id: 'select', icon: MousePointer2, label: 'Selection (V)', shortcut: 'V',
        subTools: [
            { id: 'select-lasso', icon: Lasso, label: 'Lasso Select' },
            { id: 'select-marquee', icon: ScanLine, label: 'Marquee Select' },
        ]
    },
    // 2. Eraser (X)
    { id: 'erase', icon: Eraser, label: 'Eraser (X)', shortcut: 'X' },
    // 3. Text (T)
    { id: 'text', icon: Type, label: 'Text (T)', shortcut: 'T' },
    // 4. Bond (B)
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
    // 5. Chain (C)
    { id: 'chain', icon: Link2, label: 'Chain (C)', shortcut: 'C' },
    // 6. Ring (R)
    {
        id: 'ring', icon: BenzeneIcon, label: 'Rings (R)', shortcut: 'R',
        subTools: [
            { id: 'BENZENE', icon: BenzeneIcon, label: 'Benzene' },
            { id: 'RING_3', icon: Hexagon, label: 'Cyclopropane' },
            { id: 'RING_4', icon: Hexagon, label: 'Cyclobutane' },
            { id: 'RING_5', icon: Hexagon, label: 'Cyclopentane' },
            { id: 'RING_6', icon: Hexagon, label: 'Cyclohexane' }, // Keep only one
            { id: 'RING_7', icon: Hexagon, label: 'Cycloheptane' },
            { id: 'RING_8', icon: Hexagon, label: 'Cyclooctane' },
            { id: 'RING_NAPHTHALENE', icon: BenzeneIcon, label: 'Naphthalene' },
            { id: 'RING_ANTHRACENE', icon: BenzeneIcon, label: 'Anthracene' },
        ]
    },
    // 7. Functional Groups
    {
        id: 'groups', icon: FlaskRound, label: 'Functional Groups',
        subTools: [
            { id: 'group-me', icon: Type, label: '-Me (Methyl)' },
            { id: 'group-et', icon: Type, label: '-Et (Ethyl)' },
            { id: 'group-ipr', icon: Type, label: '-iPr (Isopropyl)' },
            { id: 'group-tbu', icon: Type, label: '-tBu (tert-Butyl)' },
            { id: 'group-ph', icon: Type, label: '-Ph (Phenyl)' },
            { id: 'group-bn', icon: Type, label: '-Bn (Benzyl)' },
            { id: 'group-ac', icon: Type, label: '-Ac (Acetyl)' },
            { id: 'group-boc', icon: Type, label: '-Boc (t-Butoxycarbonyl)' },
            { id: 'group-ts', icon: Type, label: '-Ts (Tosyl)' },
            { id: 'group-ms', icon: Type, label: '-Ms (Mesyl)' },
            { id: 'group-tf', icon: Type, label: '-Tf (Triflyl)' },
        ]
    },
    // 8. Reaction (W)
    {
        id: 'reaction', icon: ReactionArrowIcon, label: 'Arrows (W)', shortcut: 'W',
        subTools: [
            { id: 'arrow-synthesis', icon: ReactionArrowIcon, label: 'Synthesis Arrow' },
            { id: 'arrow-equilibrium', icon: EquilibriumArrowIcon, label: 'Equilibrium Arrow' },
            { id: 'arrow-mechanism', icon: ArrowRight, label: 'Mechanism Arrow' },
        ]
    },
    // --- separator ---
    // 9. Attributes (A)
    { id: 'attributes', icon: CirclePlus, label: 'Attributes (A)', shortcut: 'A' },
    // 10. Brackets
    { id: 'brackets', icon: Brackets, label: 'Brackets' },
    // 11. Shapes (S)
    { id: 'shapes', icon: Shapes, label: 'Shapes (S)', shortcut: 'S' },
    // 12. Table
    { id: 'table', icon: Table, label: 'Table' },
    // --- separator ---
    // 13. Orbitals
    {
        id: 'orbitals', icon: OrbitalPIcon, label: 'Orbitals',
        subTools: [
            { id: 'orbital-s', icon: OrbitalSIcon, label: 's-Orbital' },
            { id: 'orbital-p', icon: OrbitalPIcon, label: 'p-Orbital' },
            { id: 'orbital-d', icon: Orbit, label: 'd-Orbital' },
            { id: 'orbital-hybrid', icon: Orbit, label: 'Hybrid Orbital' },
        ]
    },
    // 14. Pen
    { id: 'pen', icon: PenTool, label: 'Pen Tool' },
    // 15. Template
    { id: 'template', icon: Library, label: 'Templates' },
    // 16. Lab Art
    {
        id: 'labart', icon: FlaskConical, label: 'Lab Art',
        subTools: [
            { id: 'art-beaker', icon: Beaker, label: 'Beaker' },
            { id: 'art-flask', icon: FlaskConical, label: 'Erlenmeyer Flask' },
            { id: 'art-testtube', icon: TestTube, label: 'Test Tube' },
        ]
    },
    // 17. Pan (Hand)
    { id: 'pan', icon: Hand, label: 'Pan Canvas' },
];

// Separator indices: after index 3 (Text), 8 (Arrows), 12 (Table)
const SEPARATOR_BEFORE = new Set([3, 8, 12]);

export const LeftToolbar: React.FC = () => {
    const activeTool = useCanvasStore((state) => state.activeTool);
    const activeSubTool = useCanvasStore((state) => state.activeSubTool);
    const setActiveTool = useCanvasStore((state) => state.setActiveTool);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            const key = e.key.toUpperCase();
            const tool = TOOLS.find(t => t.shortcut === key);
            if (tool) {
                setActiveTool(tool.id);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setActiveTool]);

    const handleSelect = (toolId: string, subToolId?: string) => {
        setActiveTool(toolId, subToolId);
    };

    return (
        <div
            className="h-full flex flex-col border-r border-gray-300 select-none"
            style={{ width: '76px', minWidth: '76px', backgroundColor: '#f0f0f0', zIndex: 50 }}
        >
            {/* Scrollable Tool Area - Overflow Visible for Popups */}
            <div
                className="flex-1"
                style={{ scrollbarWidth: 'none', overflow: 'visible' }}
            >
                <div
                    className="grid grid-cols-2"
                    style={{ gap: '4px', padding: '4px 3px' }}
                >
                    {TOOLS.map((tool, index) => (
                        <React.Fragment key={tool.id}>
                            {/* Separator line between groups */}
                            {SEPARATOR_BEFORE.has(index) && (
                                <div
                                    className="col-span-2"
                                    style={{ height: '1px', background: '#d0d0d0', margin: '3px 6px' }}
                                />
                            )}
                            <ToolGroup
                                id={tool.id}
                                icon={tool.icon}
                                label={tool.label}
                                isActive={activeTool === tool.id}
                                activeSubToolId={activeSubTool}
                                subTools={tool.subTools}
                                onSelect={handleSelect}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};
