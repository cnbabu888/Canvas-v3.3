// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { CanvasEngine } from '../core/CanvasEngine';
import { useCanvasStore } from '../store/useCanvasStore';
import { Vec2D } from '../math/Vec2D';
import { Matrix2D } from '../math/Matrix2D';
import { MoveElementsCommand } from '../commands/MoveElementsCommand';
import { CommandDock } from './layout/CommandDock';
import { TemplatesPanel } from './layout/TemplatesPanel';
import { Bond, BondType } from '../molecular/Bond';
import { Atom } from '../molecular/Atom';
import { AddBondCommand } from '../commands/AddBondCommand';
import { AddAtomCommand } from '../commands/AddAtomCommand';
import { AddArrowCommand } from '../commands/AddArrowCommand';
import type { Arrow } from '../chem/Arrow';
import { ArrowType } from '../chem/Arrow';

const BOND_TOOL_MAP: Record<string, BondType> = {
    'BOND_SINGLE': BondType.SINGLE,
    'BOND_DOUBLE': BondType.DOUBLE,
    'BOND_TRIPLE': BondType.TRIPLE,
    'BOND_WEDGE_SOLID': BondType.WEDGE_SOLID,
    'BOND_WEDGE_HASH': BondType.WEDGE_HASH,
    'BOND_DATIVE': BondType.DATIVE,
    'BOND_WAVY': BondType.WAVY,
    'BOND_AROMATIC': BondType.RESONANCE
};

const LAYERS = [
    'layer-0-background',
    'layer-1-content',
    'layer-2-selection',
    'layer-3-interaction',
    'layer-4-overlay',
];

export const CanvasContainer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<CanvasEngine | null>(null);

    // Store Sync
    const setZoom = useCanvasStore((state) => state.setZoom);
    // setOffset is not used with native scrolling
    const molecule = useCanvasStore((state) => state.molecule);
    const style = useCanvasStore((state) => state.style);
    const labware = useCanvasStore((state) => state.labware);
    const activeTool = useCanvasStore((state) => state.activeTool);
    const activeSubTool = useCanvasStore((state) => state.activeSubTool);
    const activeTemplate = useCanvasStore((state) => state.activeTemplate);
    const setSelected = useCanvasStore((state) => state.setSelected);
    // pageOrientation is used by store to update pageSize, but not needed here directly
    const pageSize = useCanvasStore((state) => state.pageSize);
    const zoom = useCanvasStore((state) => state.zoom);

    // Initialize Engine
    useEffect(() => {
        if (!engineRef.current) {
            engineRef.current = new CanvasEngine();
        }

        const engine = engineRef.current;

        // Register layers
        LAYERS.forEach(layerId => {
            const canvas = document.getElementById(layerId) as HTMLCanvasElement;
            if (canvas) {
                engine.registerLayer(layerId, canvas);
            }
        });

        engine.start();

        return () => {
            engine.stop();
        };
    }, []);

    // Handle Resize & Zoom (Coordinate System)
    useEffect(() => {
        const engine = engineRef.current;
        if (!engine) return;

        // We resize the internal canvas resolution to match the ZOOMED size
        // This ensures crisp rendering at high zoom levels.
        const width = pageSize.width * zoom;
        const height = pageSize.height * zoom;

        engine.resize(width, height);

        // We set the engine's transform to scale by 'zoom'
        // This coordinates with screenToWorld dividing by zoom.
        // We set offset to (0,0) because scrolling is handled by the DIV container.
        const matrix = new Matrix2D(zoom, 0, 0, zoom, 0, 0);
        engine.setTransform(matrix);

        // Also update store offset to 0,0 since we rely on native scroll
        // But maybe we don't need to sync offset to store if we don't use it for rendering?
        // We keep it strict.
        // setOffset(new Vec2D(0, 0)); 
    }, [pageSize, zoom]);

    // Update Engine Data
    useEffect(() => {
        if (engineRef.current) {
            engineRef.current.renderMolecule(molecule);
            engineRef.current.setStyle(style);
            engineRef.current.setLabWare(labware);
        }
    }, [molecule, style, labware]);

    useEffect(() => {
        if (engineRef.current) {
            engineRef.current.setActiveTool(activeSubTool || activeTool);
            engineRef.current.setActiveTemplate(activeTemplate);

            engineRef.current.onSelect = (atoms, bonds) => {
                setSelected(atoms, bonds);
            };

            engineRef.current.onAction = (cmd) => {
                const { executeCommand } = useCanvasStore.getState();
                executeCommand(cmd);
            };
        }
    }, [activeTool, activeTemplate, setSelected]);


    // --- Interaction Handlers ---

    // Drag State
    const isDragging = useRef(false);
    const dragStartWorldPos = useRef<Vec2D | null>(null);
    const dragItem = useRef<{ type: 'atom' | 'selection' | 'bond-create', ids: string[] } | null>(null);
    const dragStartPos = useRef<{ x: number, y: number } | null>(null);

    // Pan State
    const isPanning = useRef(false);
    const panStartMouse = useRef<{ x: number, y: number } | null>(null);
    const panStartScroll = useRef<{ left: number, top: number } | null>(null);

    const handleWheel = (e: React.WheelEvent) => {
        // Zoom (Ctrl/Cmd + Wheel or Alt + Wheel)
        if (e.ctrlKey || e.metaKey || e.altKey) {
            e.preventDefault();
            const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
            setZoom(zoom * scaleFactor);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!engineRef.current || !containerRef.current) return;

        // Middle Mouse or Shift+Left -> PAN
        if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
            e.preventDefault();
            isPanning.current = true;
            panStartMouse.current = { x: e.clientX, y: e.clientY };
            panStartScroll.current = {
                left: containerRef.current.scrollLeft,
                top: containerRef.current.scrollTop
            };
            document.body.style.cursor = 'grabbing';
            window.addEventListener('mousemove', handleGlobalPanMove);
            window.addEventListener('mouseup', handleGlobalPanUp);
            return;
        }

        // Left Click -> Atom Drag OR Engine Interaction
        if (e.button === 0) {
            // Calculate coords relative to Page
            const pageRect = (e.target as HTMLElement).closest('.document-page')?.getBoundingClientRect();
            if (!pageRect) return;

            const x = e.clientX - pageRect.left;
            const y = e.clientY - pageRect.top;
            const screenPos = new Vec2D(x, y);
            const worldPos = engineRef.current.screenToWorld(screenPos);

            // Check if hitting an atom (for dragging)
            if (activeTool === 'select') {
                let hitAtomId: string | null = null;
                if (molecule && molecule.atoms) {
                    for (const atom of molecule.atoms.values()) {
                        if (atom.pos.distance(worldPos) < 10) {
                            hitAtomId = atom.id;
                            break;
                        }
                    }
                }

                if (hitAtomId) {
                    isDragging.current = true;
                    dragStartWorldPos.current = worldPos;
                    dragItem.current = { type: 'atom', ids: [hitAtomId] };
                    dragStartPos.current = { x: e.clientX, y: e.clientY };

                    window.addEventListener('mousemove', handleGlobalDragMove);
                    window.addEventListener('mouseup', handleGlobalDragUp);
                    return;
                }
            }

            // Check Bond Tool for Creation Drag
            const currentTool = activeSubTool || activeTool;
            if (currentTool && BOND_TOOL_MAP[currentTool]) {
                let hitAtomId: string | null = null;
                if (molecule && molecule.atoms) {
                    for (const atom of molecule.atoms.values()) {
                        if (atom.pos.distance(worldPos) < 10) {
                            hitAtomId = atom.id;
                            break;
                        }
                    }
                }

                if (hitAtomId) {
                    isDragging.current = true;
                    dragItem.current = { type: 'bond-create', ids: [hitAtomId] };
                    dragStartPos.current = { x: e.clientX, y: e.clientY };
                    window.addEventListener('mousemove', handleGlobalDragMove);
                    window.addEventListener('mouseup', handleGlobalDragUp);
                    return;
                }
            }

            // Check Arrow Tool for Creation Drag
            if (currentTool && currentTool.startsWith('arrow-')) {
                // Start Arrow Creation
                // Can start from Atom/Bond or Empty Space
                // We record start position
                let startObjectId = null;
                let startObjectType = null;

                // Check snap (Atom priority)
                if (molecule && molecule.atoms) {
                    for (const atom of molecule.atoms.values()) {
                        if (atom.pos.distance(worldPos) < 10) {
                            startObjectId = atom.id;
                            startObjectType = 'atom'; // Type string, not enum?
                            break;
                        }
                    }
                }
                // If not atom, check bonds? (For mechanism arrows)

                isDragging.current = true;
                // Store tool ID in dragItem
                dragItem.current = { type: 'arrow-create' as any, ids: startObjectId ? [startObjectId] : [], toolId: currentTool, startPos: worldPos };
                // Note: dragItem type definition might need update, casting as any for quick fix or I should update the type def if I can find it.
                // The definition is at line 129: { type: 'atom' | 'selection' | 'bond-create', ids: string[] }.
                // I cannot easily update the Type Definition since it's inline in `useRef`.
                // So I will cast `as any` or strictly adhere.
                // Storing extra data in `dragItem` is risky if typed.
                // Let's rely on a separate ref `tempArrowData`?
                // Or just `any` cast the ref assignment.

                dragStartPos.current = { x: e.clientX, y: e.clientY };
                window.addEventListener('mousemove', handleGlobalDragMove);
                window.addEventListener('mouseup', handleGlobalDragUp);
                return;
            }

            // If not dragging atom, just record start pos for Click detection
            dragStartPos.current = { x: e.clientX, y: e.clientY };
        }
    };

    // Global Pan Handlers
    const handleGlobalPanMove = (e: MouseEvent) => {
        if (isPanning.current && containerRef.current && panStartMouse.current && panStartScroll.current) {
            const dx = e.clientX - panStartMouse.current.x;
            const dy = e.clientY - panStartMouse.current.y;
            containerRef.current.scrollLeft = panStartScroll.current.left - dx;
            containerRef.current.scrollTop = panStartScroll.current.top - dy;
        }
    };

    const handleGlobalPanUp = () => {
        isPanning.current = false;
        document.body.style.cursor = '';
        window.removeEventListener('mousemove', handleGlobalPanMove);
        window.removeEventListener('mouseup', handleGlobalPanUp);
    };

    // Global Drag Handlers
    const handleGlobalDragMove = (e: MouseEvent) => {
        if (!engineRef.current) return;

        // Update Mouse Pos for Engine (to show drag effect if engine supported it, or hover)
        // We need to calc relative to page again
        const page = document.querySelector('.document-page');
        if (page) {
            const rect = page.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            engineRef.current.updateMousePosition(new Vec2D(x, y));
        }

        if (isDragging.current && dragItem.current && dragStartWorldPos.current) {
            const t = engineRef.current.getTransform();
            // Current delta in world units
            // We use movementX/Y for simplicity? No, let's use exact delta from start??
            // Actually, sticking to movementX is safer for persistent dragging
            const worldDelta = new Vec2D(e.movementX / t.a, e.movementY / t.d);

            if (dragItem.current.type === 'atom') {
                dragItem.current.ids.forEach(id => {
                    const atom = molecule.atoms.get(id);
                    if (atom) {
                        atom.pos = atom.pos.add(worldDelta);
                    }
                });
                engineRef.current.renderMolecule(molecule);
            } else if ((dragItem.current as any).type === 'arrow-create') {
                // Temp Arrow
                const data = dragItem.current as any;
                const startPos = data.startPos as Vec2D; // World Pos stored?

                const page = document.querySelector('.document-page');
                if (page) {
                    const rect = page.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const currentWorldPos = engineRef.current.screenToWorld(new Vec2D(x, y));

                    let type = ArrowType.SYNTHESIS;
                    if (data.toolId === 'arrow-equilibrium') type = ArrowType.EQUILIBRIUM;
                    if (data.toolId === 'arrow-mechanism') type = ArrowType.MECHANISM;
                    if (data.toolId === 'arrow-retro') type = ArrowType.RETROSYNTHESIS;

                    const arrow: Arrow = {
                        id: 'temp',
                        type: type,
                        start: startPos,
                        end: currentWorldPos
                    };

                    // Calculate Curve for Mechanism
                    if (type === ArrowType.MECHANISM) {
                        const mid = startPos.add(currentWorldPos).scale(0.5);
                        const vec = currentWorldPos.minus(startPos);
                        const perp = new Vec2D(-vec.y, vec.x).normalize();
                        // Offset proportional to length?
                        const offset = vec.length() * 0.3;
                        const cp = mid.add(perp.scale(offset));
                        arrow.controlPoints = [cp];
                    }

                    engineRef.current.setTempArrow(arrow);
                }
            } else if (dragItem.current.type === 'bond-create') {
                // Draw Temp Bond
                const startAtom = molecule.atoms.get(dragItem.current.ids[0]);
                if (startAtom) {
                    const currentTool = activeSubTool || activeTool;
                    const type = BOND_TOOL_MAP[currentTool] || BondType.SINGLE;

                    // Calculate mouse world pos again
                    const page = document.querySelector('.document-page');
                    if (page) {
                        const rect = page.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const worldPos = engineRef.current.screenToWorld(new Vec2D(x, y));
                        engineRef.current.setTempBond(startAtom.pos, worldPos, type);
                    }
                }
            }
        }
    };

    const handleGlobalDragUp = (e: MouseEvent) => {
        if (isDragging.current && dragItem.current && dragStartWorldPos.current && engineRef.current) {

            if (dragItem.current.type === 'atom') {
                const page = document.querySelector('.document-page');
                if (page) {
                    const rect = page.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const currentWorldPos = engineRef.current.screenToWorld(new Vec2D(x, y));
                    const totalDelta = currentWorldPos.sub(dragStartWorldPos.current);

                    if (totalDelta.length() > 0.1) {
                        dragItem.current.ids.forEach(id => {
                            const atom = molecule.atoms.get(id);
                            if (atom) {
                                atom.pos = atom.pos.sub(totalDelta);
                            }
                        });

                        const cmd = new MoveElementsCommand(molecule, dragItem.current.ids, totalDelta);
                        useCanvasStore.getState().executeCommand(cmd);
                        // Allow React to update state
                        useCanvasStore.getState().setMolecule(molecule);
                    }
                }
            } else if (dragItem.current.type === 'bond-create') {
                engineRef.current.clearTempBond();
                const startAtomId = dragItem.current.ids[0];
                const startAtom = molecule.atoms.get(startAtomId);

                const page = document.querySelector('.document-page');
                if (page && startAtom) {
                    const rect = page.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const worldPos = engineRef.current.screenToWorld(new Vec2D(x, y));

                    let endAtomId: string | null = null;
                    for (const atom of molecule.atoms.values()) {
                        if (atom.id !== startAtomId && atom.pos.distance(worldPos) < 10) {
                            endAtomId = atom.id;
                            break;
                        }
                    }

                    const currentTool = activeSubTool || activeTool;
                    const type = BOND_TOOL_MAP[currentTool] || BondType.SINGLE;
                    let order = 1;
                    if (type === BondType.DOUBLE) order = 2;
                    if (type === BondType.TRIPLE) order = 3;

                    if (endAtomId) {
                        const newBond = new Bond('bond-' + Date.now(), startAtomId, endAtomId, order, type);
                        const cmd = new AddBondCommand(molecule, newBond);
                        useCanvasStore.getState().executeCommand(cmd);
                    } else {
                        const newAtom = new Atom('atom-' + Date.now(), 'C', worldPos);
                        const newBond = new Bond('bond-' + Date.now(), startAtomId, newAtom.id, order, type);
                        const store = useCanvasStore.getState();
                        store.executeCommand(new AddAtomCommand(molecule, newAtom));
                        store.executeCommand(new AddBondCommand(molecule, newBond));
                    }
                    useCanvasStore.getState().setMolecule(molecule);
                }
            } else if ((dragItem.current as any).type === 'arrow-create') {
                engineRef.current.clearTempArrow();
                const data = dragItem.current as any;
                const startPos = data.startPos as Vec2D;

                const page = document.querySelector('.document-page');
                if (page) {
                    const rect = page.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const endPos = engineRef.current.screenToWorld(new Vec2D(x, y));

                    if (startPos.distance(endPos) > 5) {
                        let type = ArrowType.SYNTHESIS;
                        if (data.toolId === 'arrow-equilibrium') type = ArrowType.EQUILIBRIUM;
                        if (data.toolId === 'arrow-mechanism') type = ArrowType.MECHANISM;
                        if (data.toolId === 'arrow-retro') type = ArrowType.RETROSYNTHESIS;

                        const arrow: Arrow = {
                            id: 'arrow-' + Date.now(),
                            type: type,
                            start: startPos,
                            end: endPos
                        };

                        if (type === ArrowType.MECHANISM) {
                            const mid = startPos.add(endPos).scale(0.5);
                            const vec = endPos.sub(startPos);
                            const perp = new Vec2D(-vec.y, vec.x).normalize();
                            const offset = vec.length() * 0.3;
                            const cp = mid.add(perp.scale(offset));
                            arrow.controlPoints = [cp];
                        }

                        const cmd = new AddArrowCommand(molecule, arrow);
                        useCanvasStore.getState().executeCommand(cmd);
                        useCanvasStore.getState().setMolecule(molecule);
                    }
                }
            }
        }

        isDragging.current = false;
        dragItem.current = null;
        dragStartWorldPos.current = null;
        window.removeEventListener('mousemove', handleGlobalDragMove);
        window.removeEventListener('mouseup', handleGlobalDragUp);
    };

    // Component Level Mouse Up/Move/Down (Non-Global)
    const handleMouseUp = (e: React.MouseEvent) => {
        // If we were not dragging, check for Click
        if (dragStartPos.current && !isDragging.current && e.button === 0) {
            const dist = Math.hypot(e.clientX - dragStartPos.current.x, e.clientY - dragStartPos.current.y);
            if (dist < 5) {
                // It's a Click
                if (engineRef.current) {
                    const pageRect = (e.target as HTMLElement).closest('.document-page')?.getBoundingClientRect();
                    if (pageRect) {
                        const x = e.clientX - pageRect.left;
                        const y = e.clientY - pageRect.top;
                        engineRef.current.handleClick(new Vec2D(x, y));
                    }
                }
            }
        }
        dragStartPos.current = null;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!engineRef.current) return;
        const pageRect = (e.target as HTMLElement).closest('.document-page')?.getBoundingClientRect();
        if (pageRect) {
            const x = e.clientX - pageRect.left;
            const y = e.clientY - pageRect.top;
            engineRef.current.updateMousePosition(new Vec2D(x, y));
        }
    };

    // Hotkeys
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
            if (engineRef.current) {
                engineRef.current.handleKeyDown(e);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full select-none"
            style={{
                background: '#b0b0b0',
                overflow: 'auto', // Native scrolling
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {/* Centering Wrapper */}
            <div style={{
                minWidth: '100%',
                minHeight: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
            }}>
                {/* Document Page */}
                <div
                    className="document-page"
                    style={{
                        width: `${pageSize.width * zoom}px`,
                        height: `${pageSize.height * zoom}px`,
                        background: '#ffffff',
                        position: 'relative',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                        flexShrink: 0,
                    }}
                >
                    {LAYERS.map((layerId, index) => (
                        <canvas
                            key={layerId}
                            id={layerId}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'auto',
                                zIndex: index,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Command Dock Overlay */}
            <CommandDock />
            <TemplatesPanel />
        </div>
    );
};
