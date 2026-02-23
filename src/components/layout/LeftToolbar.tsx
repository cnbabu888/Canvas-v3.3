import React, { useEffect, useState } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { ToolGroup } from './ToolGroup';
import { RichToolPopups } from './RichToolPopups';
import {
    BoxSelectIcon,
    LassoSelectIcon,
    EraserIcon,
    ScissorIcon,
    TextIcon,
    SingleBondIcon,
    DoubleBondIcon,
    TripleBondIcon,
    WedgeBondIcon,
    HashBondIcon,
    MechanismArrowIcon,
    BenzeneIcon,
    TemplatesIcon,
    ReactionArrowIcon,
    EquilibriumArrowIcon,
    ChargeIcon,
    BracketsIcon,
    OrbitalsIcon,
    OrbitalSIcon,
    OrbitalPIcon,
    TableIcon,
    AtomLabelIcon,
    ColorIcon,
    SymmetryIcon,
    SafetyIcon,
    PanIcon,
    AIActionsIcon,
} from '../../icons/ChemistryIcons';
import {
    ArrowRight,
    Link2,
    CirclePlus,
    Hexagon,
    Type,
    Orbit,
} from 'lucide-react';

// --- Tool Definitions (2-column × 10 row layout) ---

const TOOLS = [
    // Row 1: Selection tools
    {
        id: 'select', icon: BoxSelectIcon, label: 'Box Select (V)', shortcut: 'V',
        subTools: [
            { id: 'select-lasso', icon: LassoSelectIcon, label: 'Lasso Select (L)', shortcut: 'L' },
        ]
    },
    { id: 'lasso', icon: LassoSelectIcon, label: 'Lasso Select (L)', shortcut: 'L' },

    // Row 2: Erase tools
    { id: 'erase', icon: EraserIcon, label: 'Eraser (E)', shortcut: 'E' },
    { id: 'scissor', icon: ScissorIcon, label: 'Scissor (X)', shortcut: 'X' },

    // Row 3: Text & Bond
    { id: 'text', icon: TextIcon, label: 'Text (T)', shortcut: 'T', popupId: 'atoms-popup' },
    {
        id: 'bond', icon: SingleBondIcon, label: 'Bonds (B)', shortcut: 'B',
        popupId: 'bonds-popup',
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

    // Row 4: Mechanism Arrow & Ring
    { id: 'mechanism', icon: MechanismArrowIcon, label: 'Mechanism Arrow', shortcut: 'M' },
    {
        id: 'ring', icon: BenzeneIcon, label: 'Rings (R)', shortcut: 'R',
        popupId: 'rings-popup',
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

    // Row 5: Templates & Reaction Arrow
    {
        id: 'groups', icon: TemplatesIcon, label: 'Functional Groups',
        popupId: 'fg-popup',
        subTools: [
            { id: 'group-me', icon: Type, label: '-Me (Methyl)' },
            { id: 'group-et', icon: Type, label: '-Et (Ethyl)' },
            { id: 'group-ipr', icon: Type, label: '-iPr (Isopropyl)' },
            { id: 'group-tbu', icon: Type, label: '-tBu (tert-Butyl)' },
            { id: 'group-ph', icon: Type, label: '-Ph (Phenyl)' },
            { id: 'group-bn', icon: Type, label: '-Bn (Benzyl)' },
        ]
    },
    {
        id: 'reaction', icon: ReactionArrowIcon, label: 'Arrows (W)', shortcut: 'W',
        popupId: 'arrows-popup',
        subTools: [
            { id: 'arrow-synthesis', icon: ReactionArrowIcon, label: 'Synthesis Arrow' },
            { id: 'arrow-equilibrium', icon: EquilibriumArrowIcon, label: 'Equilibrium Arrow' },
            { id: 'arrow-mechanism', icon: ArrowRight, label: 'Mechanism Arrow' },
        ]
    },

    // Row 6: Charge & Brackets
    { id: 'attributes', icon: ChargeIcon, label: 'Charge (A)', shortcut: 'A' },
    { id: 'brackets', icon: BracketsIcon, label: 'Brackets' },

    // Row 7: Orbitals & Table
    {
        id: 'orbitals', icon: OrbitalsIcon, label: 'Orbitals',
        subTools: [
            { id: 'orbital-s', icon: OrbitalSIcon, label: 's-Orbital' },
            { id: 'orbital-p', icon: OrbitalPIcon, label: 'p-Orbital' },
            { id: 'orbital-d', icon: Orbit, label: 'd-Orbital' },
            { id: 'orbital-hybrid', icon: Orbit, label: 'Hybrid Orbital' },
        ]
    },
    { id: 'table', icon: TableIcon, label: 'Table' },

    // Row 8: Atom Label & Color
    { id: 'atomlabel', icon: AtomLabelIcon, label: 'Atom Label', popupId: 'atoms-popup' },
    { id: 'color', icon: ColorIcon, label: 'Color/Highlight' },

    // Row 9: Symmetry & Safety/GHS
    { id: 'symmetry', icon: SymmetryIcon, label: 'Symmetry' },
    { id: 'safety', icon: SafetyIcon, label: 'Safety/GHS' },

    // Row 10: Pan & AI Actions
    { id: 'pan', icon: PanIcon, label: 'Pan Canvas' },
    { id: 'ai', icon: AIActionsIcon, label: 'AI Actions' },
];

// Separator indices: after rows 2, 5, 7
const SEPARATOR_BEFORE = new Set([4, 10, 14]);

export const LeftToolbar: React.FC = () => {
    const activeTool = useCanvasStore((state) => state.activeTool);
    const activeSubTool = useCanvasStore((state) => state.activeSubTool);
    const setActiveTool = useCanvasStore((state) => state.setActiveTool);

    const [activePopup, setActivePopup] = useState<string | null>(null);
    const [popupPos, setPopupPos] = useState<{ top: number, left: number } | null>(null);

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
        setActivePopup(null);
    };

    const handlePopupOpen = (popupId: string, rect: DOMRect) => {
        setPopupPos({
            top: Math.min(rect.top, window.innerHeight - 300),
            left: rect.right + 8
        });
        setActivePopup(popupId);
    };

    return (
        <div
            className="h-full flex flex-col border-r border-gray-300 select-none"
            style={{ width: '76px', minWidth: '76px', backgroundColor: '#f0f0f0', zIndex: 50 }}
        >
            {/* Scrollable Tool Area */}
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
                                popupId={tool.popupId}
                                onSelect={handleSelect}
                                onPopupOpen={handlePopupOpen}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <RichToolPopups
                activePopup={activePopup}
                activeSubToolId={activeSubTool}
                onClose={() => setActivePopup(null)}
                onSelectTool={handleSelect}
                style={popupPos ? { top: popupPos.top, left: popupPos.left } : undefined}
            />
        </div>
    );
};
