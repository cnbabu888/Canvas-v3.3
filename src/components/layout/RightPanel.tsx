import React, { useMemo } from 'react';
import { Settings, Info, Beaker, ShieldAlert } from 'lucide-react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { ChemUtils } from '../../chem/ChemUtils';
import { ChangePropertyCommand } from '../../commands/ChangePropertyCommand';
import { IupacNamer } from '../../chem/IupacNamer';
import { ValidationEngine } from '../../chem/ValidationEngine';

export const RightPanel: React.FC = () => {
    const selectedAtomIds = useCanvasStore((state) => state.selectedAtomIds);
    const selectedBondIds = useCanvasStore((state) => state.selectedBondIds);
    const molecule = useCanvasStore((state) => state.molecule);
    const version = useCanvasStore((state) => state.version);
    const executeCommand = useCanvasStore((state) => state.executeCommand);

    // Derived Selection State
    const selection = useMemo(() => {
        if (selectedAtomIds.length === 1) {
            return { type: 'atom', item: molecule.atoms.get(selectedAtomIds[0]) };
        }
        if (selectedBondIds.length === 1) {
            return { type: 'bond', item: molecule.bonds.get(selectedBondIds[0]) };
        }
        if (selectedAtomIds.length > 1 || selectedBondIds.length > 1) {
            return { type: 'multi' };
        }
        return null;
    }, [selectedAtomIds, selectedBondIds, molecule, version]);

    // Stats
    const stats = useMemo(() => {
        return ChemUtils.calculateStats(molecule);
    }, [molecule, version]);

    // Safety Warnings
    const safetyWarnings = useMemo(() => {
        return ChemUtils.analyzeSafety(molecule);
    }, [molecule, version]);

    // IUPAC Name
    const iupacName = useMemo(() => {
        return IupacNamer.generateName(molecule);
    }, [molecule, version]);

    // Validation Errors
    const validationErrors = useMemo(() => {
        return ValidationEngine.validate(molecule);
    }, [molecule, version]);

    // Handlers
    const handleAtomChange = (prop: string, val: any, item: any) => {
        const cmd = new ChangePropertyCommand(molecule, [{
            type: 'atom',
            id: item.id,
            property: prop,
            value: val,
            oldValue: item[prop]
        }]);
        executeCommand(cmd);
    };

    const handleBondChange = (prop: string, val: any, item: any) => {
        const cmd = new ChangePropertyCommand(molecule, [{
            type: 'bond',
            id: item.id,
            property: prop,
            value: val,
            oldValue: item[prop]
        }]);
        executeCommand(cmd);
    };

    return (
        <div className="flex flex-col h-full select-none bg-white/70 backdrop-blur-xl border-l border-white/20 shadow-xl rounded-l-2xl overflow-hidden m-2 ml-0">
            {/* Header */}
            <div className="h-10 flex items-center px-4 bg-white/50 border-b border-gray-100/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Properties
            </div>

            {/* Content */}
            <div className="flex-1 p-5 overflow-y-auto space-y-6">

                {/* IUPAC Name */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                    <div className="text-xs font-bold text-indigo-500 uppercase tracking-wide mb-1">IUPAC Name</div>
                    <div className="text-sm text-indigo-900 font-medium break-words font-mono">
                        {iupacName || 'Structure incomplete'}
                    </div>
                </div>

                {/* Safety & Validation Alerts */}
                {(safetyWarnings.length > 0 || validationErrors.length > 0) && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-3 animate-fadeIn">
                        <div className="flex items-center gap-2 text-red-700 font-medium text-sm mb-2">
                            <ShieldAlert size={16} />
                            <span>Safety & Quality Alerts</span>
                        </div>
                        <div className="space-y-1">
                            {safetyWarnings.map((warning, idx) => (
                                <div key={`safe-${idx}`} className="text-xs text-red-600 bg-red-100/50 px-2 py-1 rounded">
                                    [SAFETY] {warning}
                                </div>
                            ))}
                            {validationErrors.map((err, idx) => (
                                <div key={`val-${idx}`} className="text-xs text-amber-700 bg-amber-100/50 px-2 py-1 rounded border border-amber-200">
                                    [{err.type.toUpperCase()}] {err.message}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!selection ? (
                    // Empty Selection - Document Properties
                    <div className="space-y-4 animate-fadeIn">
                        <div className="flex items-center space-x-2 text-gray-700 mb-1">
                            <Settings size={18} className="text-gray-400" />
                            <span className="font-semibold text-sm">Document Settings</span>
                        </div>
                        <div className="text-sm space-y-3 pl-1">
                            {/* Toggles styled as modern switches could go here */}
                            <div className="flex justify-between items-center group">
                                <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Grid</span>
                                <input type="checkbox" defaultChecked className="rounded text-indigo-500 focus:ring-indigo-500" />
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Snap to Grid</span>
                                <input type="checkbox" defaultChecked className="rounded text-indigo-500 focus:ring-indigo-500" />
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Show Rulers</span>
                                <input type="checkbox" defaultChecked className="rounded text-indigo-500 focus:ring-indigo-500" />
                            </div>
                        </div>
                    </div>
                ) : selection.type === 'atom' && selection.item ? (
                    // Atom Properties
                    <div className="space-y-4 animate-fadeIn">
                        <div className="flex items-center space-x-2 text-gray-700 mb-1">
                            <Beaker size={18} className="text-gray-400" />
                            <span className="font-semibold text-sm">Atom Properties</span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Element</label>
                                <input
                                    type="text"
                                    value={(selection.item as any).element}
                                    onChange={(e) => handleAtomChange('element', e.target.value, selection.item)}
                                    className="w-full bg-white/50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Charge</label>
                                <input
                                    type="number"
                                    value={(selection.item as any).charge}
                                    onChange={(e) => handleAtomChange('charge', parseInt(e.target.value) || 0, selection.item)}
                                    className="w-full bg-white/50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Coordinates</label>
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 font-mono">
                                    <div className="bg-gray-50 px-2 py-1 rounded border border-gray-100">X: {(selection.item as any).pos.x.toFixed(1)}</div>
                                    <div className="bg-gray-50 px-2 py-1 rounded border border-gray-100">Y: {(selection.item as any).pos.y.toFixed(1)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : selection.type === 'bond' && selection.item ? (
                    // Bond Properties
                    <div className="space-y-4 animate-fadeIn">
                        <div className="flex items-center space-x-2 text-gray-700 mb-1">
                            <Settings size={18} className="text-gray-400" />
                            <span className="font-semibold text-sm">Bond Properties</span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Type</label>
                                <select
                                    value={(selection.item as any).type}
                                    onChange={(e) => handleBondChange('type', e.target.value, selection.item)}
                                    className="w-full bg-white/50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                >
                                    <option value="SINGLE">Single</option>
                                    <option value="DOUBLE">Double</option>
                                    <option value="TRIPLE">Triple</option>
                                    <option value="WEDGE_SOLID">Wedge (Solid)</option>
                                    <option value="WEDGE_HASH">Wedge (Hash)</option>
                                    <option value="DATIVE">Dative</option>
                                    <option value="WAVY">Wavy</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Multi
                    <div className="text-sm text-gray-500 flex flex-col items-center justify-center h-40 opacity-70">
                        <Info size={32} className="mb-3 text-gray-300" />
                        <p>Multiple items selected</p>
                    </div>
                )}
            </div>

            {/* Structural Analysis Footer */}
            <div className="bg-white/40 backdrop-blur-md border-t border-white/20 p-5">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Structural Analysis
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                    <div className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full font-mono border border-indigo-100 transition-colors shadow-sm">
                        {stats.formula || 'Empty'}
                    </div>
                    <div className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full font-mono border border-emerald-100 transition-colors shadow-sm">
                        MW: {stats.weight}
                    </div>
                    <div className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200 transition-colors shadow-sm">
                        Atoms: {stats.atoms}
                    </div>
                    <div className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200 transition-colors shadow-sm">
                        Bonds: {stats.bonds}
                    </div>
                </div>
            </div>
        </div>
    );
};
