import React, { useState } from 'react';
import { Book, ChevronRight, Search, X } from 'lucide-react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { TEMPLATE_LIBRARY } from '../../chem/Template';
import type { Template } from '../../chem/Template';

export const TemplatesPanel: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState<'all' | 'group' | 'amino' | 'ring'>('all');

    const setActiveTemplate = useCanvasStore((state) => state.setActiveTemplate);
    const setActiveTool = useCanvasStore((state) => state.setActiveTool);
    const activeTemplate = useCanvasStore((state) => state.activeTemplate);

    // Toggle via store or local state? 
    // For now, let's just use local state and a floating trigger button if closed.
    // Actually, let's keep it closed by default.

    const filteredTemplates = TEMPLATE_LIBRARY.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'all' || t.category === category;
        return matchesSearch && matchesCategory;
    });

    const handleSelect = (template: Template) => {
        setActiveTemplate(template);
        setActiveTool('template'); // Switch to template placement tool
        setIsOpen(false); // Auto-close on selection? Or keep open? Let's auto-close for mobile-ish feel or keep open for multiple. Let's keep open.
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="absolute top-4 left-20 z-30 bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg p-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-white transition-all"
                title="Open Template Library"
            >
                <Book size={24} />
            </button>
        );
    }

    return (
        <div className="absolute top-4 left-20 z-30 w-72 bg-white/90 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl flex flex-col max-h-[80vh] animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <Book size={18} className="text-indigo-500" />
                    Library
                </h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Search & Filter */}
            <div className="p-3 space-y-3 bg-gray-50/50">
                <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-1.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {['all', 'group', 'amino', 'ring'].map(c => (
                        <button
                            key={c}
                            onClick={() => setCategory(c as any)}
                            className={`
                                px-3 py-1 text-xs font-medium rounded-full capitalize whitespace-nowrap transition-colors
                                ${category === c
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}
                            `}
                        >
                            {c === 'group' ? 'Func. Groups' : c}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredTemplates.map(template => (
                    <button
                        key={template.id}
                        onClick={() => handleSelect(template)}
                        className={`
                            w-full flex items-center justify-between p-3 rounded-xl transition-all group
                            ${activeTemplate?.id === template.id
                                ? 'bg-indigo-50 border border-indigo-200 shadow-sm'
                                : 'hover:bg-white hover:shadow-md border border-transparent'}
                        `}
                    >
                        <div className="flex flex-col items-start">
                            <span className={`text-sm font-medium ${activeTemplate?.id === template.id ? 'text-indigo-700' : 'text-gray-700'}`}>
                                {template.name}
                            </span>
                            <span className="text-xs text-gray-400 capitalize">{template.category}</span>
                        </div>
                        <ChevronRight size={16} className={`text-gray-300 ${activeTemplate?.id === template.id ? 'text-indigo-500' : 'group-hover:text-gray-400'}`} />
                    </button>
                ))}

                {filteredTemplates.length === 0 && (
                    <div className="p-8 text-center text-gray-400 text-sm">
                        No templates found.
                    </div>
                )}
            </div>
        </div>
    );
};
