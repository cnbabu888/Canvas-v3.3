// @ts-nocheck
import { create } from 'zustand';
import { Vec2D } from '../math/Vec2D';
import { Molecule } from '../molecular/Molecule';
import { CommandManager } from '../commands/CommandManager';
import type { Command } from '../commands/Command';
import type { Template } from '../chem/Template';
import { DEFAULT_STYLE, type CanvasStyle } from '../styles/StyleManager';
import type { LabWare } from '../chem/LabWare';

interface CanvasState {
    zoom: number;
    offset: Vec2D;
    activeLayer: string;
    activeTool: string;
    activeSubTool: string; // [NEW] Track sub-tool state (e.g., 'RING_5' vs 'ring')

    activeTemplate: Template | null; // Selected template to place

    // Selection
    selectedAtomIds: string[];
    selectedBondIds: string[];

    // Data
    molecule: Molecule;
    labware: LabWare[];
    commandManager: CommandManager;
    version: number; // Increment on every change to force re-renders for deep objects
    style: CanvasStyle;
    pageOrientation: 'portrait' | 'landscape';
    pageSize: { width: number; height: number }; // in px at 100% zoom

    // Actions
    setZoom: (zoom: number) => void;
    setOffset: (offset: Vec2D) => void;
    setActiveLayer: (layer: string) => void;
    setActiveTool: (tool: string, subTool?: string) => void; // [NEW] Optional subTool
    setActiveTemplate: (template: Template | null) => void;

    setSelected: (atoms: string[], bonds: string[]) => void;
    clearSelection: () => void;

    executeCommand: (command: Command) => void;
    undo: () => void;
    redo: () => void;

    setMolecule: (mol: Molecule) => void;
    setLabWare: (items: LabWare[]) => void;
    addLabWare: (item: LabWare) => void;
    setCommandManager: (manager: CommandManager) => void;
    setVersion: (ver: number) => void;
    setStyle: (style: CanvasStyle) => void;
    setPageOrientation: (orientation: 'portrait' | 'landscape') => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
    zoom: 1,
    offset: new Vec2D(0, 0),
    activeLayer: 'layer-1-content',
    activeTool: 'select',
    activeSubTool: 'select', // Default

    activeTemplate: null,

    selectedAtomIds: [],
    selectedBondIds: [],

    molecule: new Molecule(),
    labware: [],
    commandManager: new CommandManager(),
    version: 0,
    style: DEFAULT_STYLE,
    pageOrientation: 'portrait' as const,
    pageSize: { width: 816, height: 1056 }, // Letter size: 8.5x11 inches at 96dpi

    setZoom: (zoom) => set({ zoom: Math.max(0.01, Math.min(zoom, 9.99)) }),
    setOffset: (offset) => set({ offset }),
    setActiveLayer: (activeLayer) => set({ activeLayer }),
    setActiveTool: (activeTool, subTool) => {
        set((state) => ({
            activeTool,
            activeSubTool: subTool || activeTool, // Fallback to main tool id if no subtool
            selectedAtomIds: [],
            selectedBondIds: []
        }));
    },
    setActiveTemplate: (t) => set({ activeTemplate: t }),

    setSelected: (atoms, bonds) => set({ selectedAtomIds: atoms, selectedBondIds: bonds }),
    clearSelection: () => set({ selectedAtomIds: [], selectedBondIds: [] }),

    executeCommand: (command: Command) => {
        const { commandManager, molecule, version } = get();
        commandManager.execute(command);
        set({ molecule: molecule, version: version + 1 });
    },

    undo: () => {
        const { commandManager, molecule, version } = get();
        if (commandManager.canUndo()) {
            commandManager.undo();
            set({ molecule: molecule, version: version + 1 });
        }
    },

    redo: () => {
        const { commandManager, molecule, version } = get();
        if (commandManager.canRedo()) {
            commandManager.redo();
            set({ molecule: molecule, version: version + 1 });
        }
    },

    setMolecule: (molecule) => set((state) => ({ molecule, version: state.version + 1 })),
    setLabWare: (labware) => set({ labware }),
    addLabWare: (item) => set((state) => ({ labware: [...state.labware, item] })),
    setCommandManager: (commandManager) => set({ commandManager }),
    setVersion: (ver) => set({ version: ver }),
    setStyle: (style) => set({ style }),
    setPageOrientation: (orientation) => set({
        pageOrientation: orientation,
        pageSize: orientation === 'portrait'
            ? { width: 816, height: 1056 }
            : { width: 1056, height: 816 },
    }),
}));
