import React, { useState } from 'react';
import { Bot, ShieldAlert, Send } from 'lucide-react';

import { useCanvasStore } from '../../store/useCanvasStore';
import { IupacNamer } from '../../chem/IupacNamer';
import { ValidationEngine } from '../../chem/ValidationEngine';

export const CommandDock: React.FC = () => {
    const [input, setInput] = useState('');
    const molecule = useCanvasStore((state) => state.molecule);

    const handleSend = () => {
        if (!input.trim()) return;

        // Prepare Context
        const context = {
            iupac: IupacNamer.generateName(molecule),
            validation: ValidationEngine.validate(molecule),
            atomCount: molecule.atoms.size
        };

        console.log("Sending to AI Agent:", { query: input, context });
        // TODO: Call AI Agent Service here

        setInput('');
        alert(`AI Request Sent!\nContext: ${context.iupac}\nIssues: ${context.validation.length}`);
    };

    return (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 animate-slideUp">
            {/* Dock Container */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl ring-1 ring-black/5">

                {/* Agent Status Indicators */}
                <div className="flex items-center gap-3 pr-4 border-r border-gray-200/50">
                    <button className="flex items-center gap-2 px-2 py-1 hover:bg-black/5 rounded-lg transition-colors group">
                        <div className="relative">
                            <Bot size={18} className="text-indigo-600" />
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 group-hover:text-indigo-700">Strategy</span>
                    </button>

                    <button className="flex items-center gap-2 px-2 py-1 hover:bg-black/5 rounded-lg transition-colors group">
                        <div className="relative">
                            <ShieldAlert size={18} className="text-rose-600" />
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 group-hover:text-rose-700">Safety</span>
                    </button>
                </div>

                {/* AI Command Input */}
                <div className="flex items-center gap-2 pl-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask Chemora AI..."
                        className="w-64 bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400 font-medium"
                    />
                    <button
                        onClick={handleSend}
                        className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
