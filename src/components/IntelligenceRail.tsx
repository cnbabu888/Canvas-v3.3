
import React from 'react';
import { Activity, ShieldCheck, AlertTriangle, Zap } from 'lucide-react';

const IntelligenceRail: React.FC = () => {
    // Dummy Data for Live Feed (to be connected to RDKitService)
    const stats = {
        mw: '180.16 g/mol',
        formula: 'C9H8O4',
        logP: '1.2',
        tpsa: '37.3',
        hazard: false // Toggle for Safety Glow
    };

    return (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-4 w-64">
            {/* Main HUD */}
            <div className={`p-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl transition-all duration-500 ${stats.hazard ? 'shadow-[0_0_50px_rgba(239,68,68,0.5)] border-red-500/50' : ''}`}>
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                    <span className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center gap-2">
                        <Activity size={14} /> Live Feed
                    </span>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/50 uppercase">Mass</span>
                        <span className="text-lg font-mono text-white font-bold">{stats.mw}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/50 uppercase">Formula</span>
                        <span className="text-sm font-mono text-white/90">{stats.formula}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/50 uppercase">LogP</span>
                        <span className="text-lg font-mono text-cyan-400 font-bold">{stats.logP}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/50 uppercase">TPSA</span>
                        <span className="text-lg font-mono text-purple-400 font-bold">{stats.tpsa}</span>
                    </div>
                </div>
            </div>

            {/* Safety Module */}
            <div className={`p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center gap-3 transition-colors ${stats.hazard ? 'bg-red-500/20 border-red-500/50' : ''}`}>
                {stats.hazard ? <AlertTriangle className="text-red-400" size={24} /> : <ShieldCheck className="text-green-400" size={24} />}
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-white/80 uppercase">{stats.hazard ? 'Hazard Detected' : 'Systems Nominal'}</span>
                    <span className="text-[10px] text-white/50">{stats.hazard ? 'High Reactivity Group' : 'No Flags Found'}</span>
                </div>
            </div>

            {/* AI Insight */}
            <div className="p-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-yellow-400" />
                    <span className="text-xs font-bold text-white/90">AI Insight</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed italic">
                    "Aspirin derivative detected. Consider checking solubility profiles for oral bioavailability."
                </p>
            </div>
        </div>
    );
};

export default IntelligenceRail;
