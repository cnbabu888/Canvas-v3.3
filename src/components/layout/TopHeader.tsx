import React from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { STYLES } from '../../styles/StyleManager';
import { FileIO } from '../../utils/FileIO';
import { ChemExports } from '../../chem/ChemExports';
import { SvgRenderer } from '../../core/renderer/SvgRenderer';
import { Molecule } from '../../molecular/Molecule';
import { Atom } from '../../molecular/Atom';
import { Bond } from '../../molecular/Bond';
import { Vec2D } from '../../math/Vec2D';
import { CommandManager } from '../../commands/CommandManager';
import { LayoutCommand } from '../../commands/LayoutCommand';
import { StructureOptimizer } from '../../chem/StructureOptimizer';
import {
    FilePlus2, FolderOpen,
    Bold, Italic, Eraser, FlaskConical,
    ZoomIn, ZoomOut, RotateCcw, Save,
    FileJson, Wand2, FileText,
    Copy, FileImage
} from 'lucide-react';

export const TopHeader: React.FC = () => {
    const {
        molecule, zoom, offset, style,
        setMolecule, setZoom, setOffset, setCommandManager, executeCommand, setStyle
    } = useCanvasStore();

    // -- File Handlers --

    const handleNew = () => {
        if (confirm('Create new file? Unsaved changes will be lost.')) {
            setMolecule(new Molecule());
            setCommandManager(new CommandManager());
            setZoom(1);
            setOffset(new Vec2D(0, 0));
        }
    };

    const handleOpen = async () => {
        try {
            const { content } = await FileIO.openFile('.chemora,.json');
            const data = JSON.parse(content);

            const mol = new Molecule();

            data.molecule.atoms.forEach(([_id, atomData]: any) => {
                const pos = new Vec2D(atomData.pos.x, atomData.pos.y);
                const atom = new Atom(atomData.id, atomData.element, pos);
                atom.charge = atomData.charge || 0;
                atom.hydrogenCount = atomData.hydrogenCount || 0;
                atom.valence = atomData.valence || 4;
                mol.addAtom(atom);
            });

            data.molecule.bonds.forEach(([_id, bondData]: any) => {
                const bond = new Bond(bondData.id, bondData.atomA, bondData.atomB, bondData.order, bondData.type);
                mol.addBond(bond);
            });

            setMolecule(mol);
            setCommandManager(new CommandManager());

            if (data.view) {
                setZoom(data.view.zoom || 1);
                if (data.view.offset) {
                    setOffset(new Vec2D(data.view.offset.x, data.view.offset.y));
                }
            }

        } catch (err) {
            console.error('Failed to open file:', err);
            alert('Error opening file: ' + err);
        }
    };

    const handleSave = () => {
        const json = FileIO.saveToChemora(molecule, { zoom, offset });
        FileIO.saveFile(json, 'molecule.chemora', 'application/json');
    };

    // -- Export Handlers --

    const handleExportSMILES = () => {
        const smiles = ChemExports.toSMILES(molecule);
        FileIO.copyToClipboard(smiles);
        alert(`SMILES copied to clipboard:\n${smiles}`);
    };

    const handleExportMOL = () => {
        const mol = ChemExports.toMOL(molecule);
        FileIO.saveFile(mol, 'molecule.mol', 'chemical/x-mdl-molfile');
    };

    const handleExportSVG = () => {
        const svg = SvgRenderer.render(molecule);
        FileIO.saveFile(svg, 'molecule.svg', 'image/svg+xml');
    };

    const handleClean = () => {
        if (!molecule || !molecule.atoms) return;

        const command = new LayoutCommand(molecule);
        StructureOptimizer.cleanLayout(molecule, 100);

        const newMap = new Map<string, Vec2D>();
        molecule.atoms.forEach(a => newMap.set(a.id, new Vec2D(a.pos.x, a.pos.y)));
        command.setNewPositions(newMap);

        executeCommand(command);

        const newMol = new Molecule();
        newMol.atoms = molecule.atoms;
        newMol.bonds = molecule.bonds;
        newMol.adjacency = molecule.adjacency;
        setMolecule(newMol);
    };

    const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStyle = STYLES[e.target.value];
        if (newStyle) setStyle(newStyle);
    };

    // Icon button helper — with custom tooltip and blue hover animation
    const IconBtn = ({ icon: Icon, title, onClick, accent, size = 20 }: {
        icon: React.ElementType; title: string; onClick?: () => void; accent?: boolean; size?: number;
    }) => {
        const [hovered, setHovered] = React.useState(false);
        return (
            <div style={{ position: 'relative', display: 'inline-flex' }}>
                <button
                    style={{
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid transparent',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        padding: 0,
                        background: 'transparent',
                        color: accent ? '#4f46e5' : '#555',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'border-color 150ms',
                    }}
                    onClick={onClick}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {/* Blue circle hover animation */}
                    <span
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background: accent
                                ? 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(79,70,229,0) 70%)'
                                : 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0) 70%)',
                            transform: hovered ? 'scale(1)' : 'scale(0)',
                            opacity: hovered ? 1 : 0,
                            transition: 'transform 250ms cubic-bezier(0.4,0,0.2,1), opacity 200ms',
                            pointerEvents: 'none',
                        }}
                    />
                    <Icon size={size} strokeWidth={1.5} style={{ position: 'relative', zIndex: 1 }} />
                </button>
                {/* Custom Tooltip */}
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: '6px',
                        padding: '4px 10px',
                        background: '#1e293b',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 500,
                        borderRadius: '4px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                        whiteSpace: 'nowrap' as const,
                        zIndex: 99999,
                        pointerEvents: 'none' as const,
                        opacity: hovered ? 1 : 0,
                        transition: 'opacity 150ms',
                    }}
                >
                    {title}
                    {/* Tooltip arrow */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-4px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(45deg)',
                            width: '8px',
                            height: '8px',
                            background: '#1e293b',
                        }}
                    />
                </div>
            </div>
        );
    };

    // Separator — thin vertical divider
    const Sep = () => <div style={{ width: '1px', height: '24px', background: '#ccc', margin: '0 5px' }} />;

    return (
        <div className="flex flex-col select-none" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", position: 'relative', zIndex: 50 }}>
            {/* Menu Bar — compact, native feel */}
            <div style={{ height: '24px', display: 'flex', alignItems: 'center', padding: '0 8px', background: '#fff', borderBottom: '1px solid #d0d0d0', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
                    <button style={{ display: 'inline-flex', padding: '1px 8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#555', fontWeight: 500, fontSize: '12px', borderRadius: '2px' }} onClick={handleNew} onMouseEnter={e => e.currentTarget.style.background = '#e8e8e8'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>File</button>
                    <button style={{ display: 'inline-flex', padding: '1px 8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#555', fontWeight: 500, fontSize: '12px', borderRadius: '2px' }} onMouseEnter={e => e.currentTarget.style.background = '#e8e8e8'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Edit</button>
                    <button style={{ display: 'inline-flex', padding: '1px 8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#555', fontWeight: 500, fontSize: '12px', borderRadius: '2px' }} onMouseEnter={e => e.currentTarget.style.background = '#e8e8e8'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>View</button>
                    <Sep />
                    <button style={{ display: 'inline-flex', padding: '1px 8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#4f46e5', fontWeight: 600, fontSize: '12px', borderRadius: '2px' }} onClick={handleExportSMILES} onMouseEnter={e => e.currentTarget.style.background = '#eef2ff'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Copy SMILES</button>
                    <button style={{ display: 'inline-flex', padding: '1px 8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#666', fontWeight: 500, fontSize: '12px', borderRadius: '2px' }} onClick={handleExportMOL} onMouseEnter={e => e.currentTarget.style.background = '#e8e8e8'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Export MOL</button>
                    <button style={{ display: 'inline-flex', padding: '1px 8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#666', fontWeight: 500, fontSize: '12px', borderRadius: '2px' }} onClick={handleExportSVG} onMouseEnter={e => e.currentTarget.style.background = '#e8e8e8'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Export SVG</button>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '10px', color: '#aaa', fontWeight: 500, letterSpacing: '0.5px' }}>
                    Chemora Canvas v3.2
                </div>
            </div>

            {/* Icon Toolbar Row — flat grouped like ChemDraw */}
            <div style={{ height: '40px', display: 'flex', alignItems: 'center', padding: '0 8px', gap: '2px', background: '#f0f0f0', borderBottom: '1px solid #d0d0d0' }}>
                {/* File Group */}
                <IconBtn icon={FilePlus2} title="New File" onClick={handleNew} />
                <IconBtn icon={FolderOpen} title="Open File" onClick={handleOpen} />
                <IconBtn icon={Save} title="Save" onClick={handleSave} />

                <Sep />

                {/* Zoom Group */}
                <IconBtn icon={ZoomIn} title="Zoom In" onClick={() => setZoom(zoom * 1.1)} />
                <IconBtn icon={ZoomOut} title="Zoom Out" onClick={() => setZoom(zoom * 0.9)} />
                <IconBtn icon={RotateCcw} title="Reset View" onClick={() => { setZoom(1); setOffset(new Vec2D(0, 0)); }} />

                <Sep />

                {/* Export Group */}
                <IconBtn icon={FileJson} title="Export JSON" onClick={handleSave} accent />
                <IconBtn icon={FileImage} title="Export SVG" onClick={handleExportSVG} accent />
                <IconBtn icon={Copy} title="Copy SMILES" onClick={handleExportSMILES} accent />

                <Sep />

                {/* Clean Tool */}
                <IconBtn icon={Wand2} title="Clean Structure" onClick={handleClean} accent />

                <Sep />

                {/* Style Selector — compact */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0 6px', height: '26px' }}>
                    <FileText size={12} style={{ color: '#999' }} />
                    <span style={{ fontSize: '11px', color: '#777', fontWeight: 500 }}>Style:</span>
                    <select
                        style={{ fontSize: '11px', background: 'transparent', outline: 'none', cursor: 'pointer', color: '#555', fontWeight: 500, border: 'none', paddingRight: '12px' }}
                        value={style?.name || 'Chemora Modern'}
                        onChange={handleStyleChange}
                    >
                        {Object.keys(STYLES).map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>

                <Sep />

                {/* Text Formatting */}
                <IconBtn icon={Bold} title="Bold" />
                <IconBtn icon={Italic} title="Italic" />
                <IconBtn icon={Eraser} title="Clear Formatting" />

                <Sep />

                <IconBtn icon={FlaskConical} title="Add Lab Equipment" accent onClick={() => {
                    const { addLabWare, zoom, offset } = useCanvasStore.getState();
                    addLabWare({
                        id: Math.random().toString(36),
                        type: 'beaker',
                        x: -offset.x + 400 / zoom,
                        y: -offset.y + 300 / zoom,
                        width: 50,
                        height: 70,
                        color: 'blue'
                    });
                }} />
            </div>
        </div>
    );
};
