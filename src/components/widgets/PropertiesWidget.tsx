import React, { useMemo } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { ChemUtils } from '../../chem/ChemUtils';
import { Activity, Droplets, Scale, Weight } from 'lucide-react';

export const PropertiesWidget: React.FC = () => {
    const molecule = useCanvasStore((state) => state.molecule);
    const version = useCanvasStore((state) => state.version); // Reactivity

    const stats = useMemo(() => ChemUtils.calculateStats(molecule), [molecule, version]);
    const props = useMemo(() => ChemUtils.calculateProperties(molecule), [molecule, version]);

    if (!molecule || !molecule.atoms || molecule.atoms.size === 0) return null;

    return (
        <div className="absolute top-20 right-4 w-64 bg-white/90 backdrop-blur-md shadow-xl rounded-xl border border-gray-200 overflow-hidden text-sm animate-in fade-in slide-in-from-right-4">
            <div className="bg-indigo-600 px-4 py-2 flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-2">
                    <Activity size={16} /> Chemical Properties
                </span>
            </div>

            <div className="p-4 grid grid-cols-2 gap-4">
                {/* Molecular Weight */}
                <div className="flex flex-col">
                    <span className="text-gray-500 text-xs flex items-center gap-1"><Weight size={12} /> MW</span>
                    <span className="font-bold text-gray-800 text-lg">{stats.weight}</span>
                </div>

                {/* LogP */}
                <div className="flex flex-col">
                    <span className="text-gray-500 text-xs flex items-center gap-1"><Droplets size={12} /> LogP</span>
                    <span className={`font-bold text-lg ${props.logP > 5 ? 'text-red-500' : 'text-gray-800'}`}>
                        {props.logP}
                    </span>
                </div>

                {/* TPSA */}
                <div className="flex flex-col">
                    <span className="text-gray-500 text-xs flex items-center gap-1"><Scale size={12} /> TPSA</span>
                    <span className="font-bold text-gray-800 text-lg">{props.tpsa}</span>
                </div>

                {/* Lipinski Rules */}
                <div className="flex flex-col col-span-2 mt-2 border-t pt-2">
                    <span className="text-gray-500 text-xs mb-1">Lipinski Compliance</span>
                    <div className="flex gap-2 text-xs">
                        <span className={`px-2 py-0.5 rounded-full border ${props.hbd <= 5 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                            HBD: {props.hbd}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full border ${props.hba <= 10 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                            HBA: {props.hba}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
