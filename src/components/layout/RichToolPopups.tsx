import React from 'react';
import '../../styles/RichPopup.css';

interface RichToolPopupsProps {
    activePopup: string | null;
    onClose: () => void;
    onSelectTool: (mainId: string, subId?: string) => void;
    activeSubToolId?: string;
    style?: React.CSSProperties;
}

export const RichToolPopups: React.FC<RichToolPopupsProps> = ({ activePopup, onClose, onSelectTool, activeSubToolId, style }) => {
    if (!activePopup) return null;

    const handleSelect = (mainId: string, subId: string) => {
        onSelectTool(mainId, subId);
    };

    return (
        <>
            {/* Overlay for closing popups */}
            <div className="popup-overlay show" onClick={onClose}></div>

            {/* ===== BONDS POPUP ===== */}
            {activePopup === 'bonds-popup' && (
                <div className="tool-popup show" style={style}>
                    <div className="popup-header">
                        <span className="popup-title">Bond Types</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        {/* Basic Bonds */}
                        <div className="popup-section">
                            <div className="popup-section-title">Basic Bonds</div>
                            <div className="bond-grid">
                                <div className={`bond-item ${activeSubToolId === 'BOND_SINGLE' ? 'active' : ''}`} onClick={() => handleSelect('bond', 'BOND_SINGLE')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Single</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'BOND_DOUBLE' ? 'active' : ''}`} onClick={() => handleSelect('bond', 'BOND_DOUBLE')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="9" x2="36" y2="9" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="15" x2="36" y2="15" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Double</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'BOND_TRIPLE' ? 'active' : ''}`} onClick={() => handleSelect('bond', 'BOND_TRIPLE')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="6" x2="36" y2="6" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="18" x2="36" y2="18" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Triple</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'BOND_QUADRUPLE' ? 'active' : ''}`} onClick={() => handleSelect('bond', 'BOND_QUADRUPLE')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="9" x2="36" y2="9" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="15" x2="36" y2="15" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="21" x2="36" y2="21" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="3" x2="36" y2="3" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Quadruple</span>
                                </div>
                            </div>
                        </div>

                        {/* Stereochemistry */}
                        <div className="popup-section">
                            <div className="popup-section-title">Stereochemistry</div>
                            <div className="bond-grid">
                                <div className={`bond-item ${activeSubToolId === 'BOND_WEDGE_SOLID' ? 'active' : ''}`} onClick={() => handleSelect('bond', 'BOND_WEDGE_SOLID')}>
                                    <svg viewBox="0 0 40 24"><polygon points="4,12 36,6 36,18" fill="currentColor" /></svg>
                                    <span>Wedge</span>
                                </div>
                                <div className="bond-item" onClick={() => handleSelect('bond', 'BOND_WEDGE_SOLID_REV')}>
                                    <svg viewBox="0 0 40 24"><polygon points="36,12 4,6 4,18" fill="currentColor" /></svg>
                                    <span>Wedge (Rev)</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'BOND_WEDGE_HASH' ? 'active' : ''}`} onClick={() => handleSelect('bond', 'BOND_WEDGE_HASH')}>
                                    <svg viewBox="0 0 40 24">
                                        <line x1="4" y1="12" x2="8" y2="8" stroke="currentColor" strokeWidth="2" />
                                        <line x1="8" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" />
                                        <line x1="12" y1="16" x2="16" y2="8" stroke="currentColor" strokeWidth="2" />
                                        <line x1="16" y1="8" x2="20" y2="16" stroke="currentColor" strokeWidth="2" />
                                        <line x1="20" y1="16" x2="24" y2="8" stroke="currentColor" strokeWidth="2" />
                                        <line x1="24" y1="8" x2="28" y2="16" stroke="currentColor" strokeWidth="2" />
                                        <line x1="28" y1="16" x2="32" y2="8" stroke="currentColor" strokeWidth="2" />
                                        <line x1="32" y1="8" x2="36" y2="12" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    <span>Dashed</span>
                                </div>
                                <div className="bond-item" onClick={() => handleSelect('bond', 'BOND_WEDGE_HASH_REV')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="4,3" /></svg>
                                    <span>Dashed (Rev)</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'BOND_WAVY' ? 'active' : ''}`} onClick={() => handleSelect('bond', 'BOND_WAVY')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" /><line x1="20" y1="12" x2="36" y2="6" stroke="currentColor" strokeWidth="2" /><line x1="20" y1="12" x2="36" y2="18" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Wavy</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'BOND_HOLLOW_WEDGE' ? 'active' : ''}`} onClick={() => handleSelect('bond', 'BOND_HOLLOW_WEDGE')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" /><polygon points="20,12 36,6 36,18" fill="currentColor" fillOpacity="0.5" /></svg>
                                    <span>Bold Wedge</span>
                                </div>
                                <div className="bond-item" onClick={() => handleSelect('bond', 'BOND_BOLD')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="4" /></svg>
                                    <span>Bold</span>
                                </div>
                                <div className="bond-item" onClick={() => handleSelect('bond', 'BOND_EITHER')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="9" x2="36" y2="9" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="15" x2="36" y2="15" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" /></svg>
                                    <span>Either</span>
                                </div>
                            </div>
                        </div>

                        {/* Special Bonds */}
                        <div className="popup-section">
                            <div className="popup-section-title">Special Bonds</div>
                            <div className="bond-grid">
                                <div className={`bond-item ${activeSubToolId === 'BOND_HYDROGEN' ? 'active' : ''}`} onClick={() => handleSelect('bond', 'BOND_HYDROGEN')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="6,3" /></svg>
                                    <span>Hydrogen</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'BOND_IONIC' ? 'active' : ''}`} onClick={() => handleSelect('bond', 'BOND_IONIC')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="1,3" /></svg>
                                    <span>Ionic</span>
                                </div>
                                <div className="bond-item" onClick={() => handleSelect('bond', 'BOND_COORDINATION')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2" /><line x1="22" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2" /><line x1="18" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="1.5" /><line x1="18" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5" /></svg>
                                    <span>Coordination</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'BOND_AROMATIC' ? 'active' : ''}`} onClick={() => handleSelect('bond', 'BOND_AROMATIC')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="9" x2="36" y2="9" stroke="currentColor" strokeWidth="2" /><line x1="10" y1="15" x2="30" y2="15" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Aromatic</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'BOND_DATIVE' ? 'active' : ''}`} onClick={() => handleSelect('bond', 'BOND_DATIVE')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="2" /><line x1="26" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2" /><circle cx="20" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                                    <span>Dative</span>
                                </div>
                                <div className="bond-item" onClick={() => handleSelect('bond', 'BOND_DELOCALIZED')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="2" fill="currentColor" /><circle cx="28" cy="12" r="2" fill="currentColor" /></svg>
                                    <span>Delocalized</span>
                                </div>
                                <div className="bond-item" onClick={() => handleSelect('bond', 'BOND_PI')}>
                                    <svg viewBox="0 0 40 24"><ellipse cx="20" cy="12" rx="14" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,2" /></svg>
                                    <span>π Bond</span>
                                </div>
                                <div className="bond-item" onClick={() => handleSelect('bond', 'BOND_3C2E')}>
                                    <svg viewBox="0 0 40 24"><line x1="4" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="1" /><line x1="4" y1="9" x2="36" y2="9" stroke="currentColor" strokeWidth="1" /><line x1="4" y1="15" x2="36" y2="15" stroke="currentColor" strokeWidth="1" /></svg>
                                    <span>3c-2e</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== RINGS POPUP ===== */}
            {activePopup === 'rings-popup' && (
                <div className="tool-popup show" style={style}>
                    <div className="popup-header">
                        <span className="popup-title">Ring Systems</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        {/* Saturated Rings */}
                        <div className="popup-section">
                            <div className="popup-section-title">Saturated Carbocycles</div>
                            <div className="ring-grid">
                                <div className={`ring-item ${activeSubToolId === 'RING_3' ? 'active' : ''}`} onClick={() => handleSelect('ring', 'RING_3')}>
                                    <svg viewBox="0 0 40 40"><polygon points="20,8 32,20 20,32 8,20" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Cyclo-propane</span>
                                </div>
                                <div className={`ring-item ${activeSubToolId === 'RING_4' ? 'active' : ''}`} onClick={() => handleSelect('ring', 'RING_4')}>
                                    <svg viewBox="0 0 40 40"><polygon points="10,10 30,10 30,30 10,30" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Cyclo-butane</span>
                                </div>
                                <div className={`ring-item ${activeSubToolId === 'RING_5' ? 'active' : ''}`} onClick={() => handleSelect('ring', 'RING_5')}>
                                    <svg viewBox="0 0 40 40"><polygon points="20,5 35,15 30,33 10,33 5,15" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Cyclo-pentane</span>
                                </div>
                                <div className={`ring-item ${activeSubToolId === 'RING_6' ? 'active' : ''}`} onClick={() => handleSelect('ring', 'RING_6')}>
                                    <svg viewBox="0 0 40 40"><polygon points="20,4 34,12 34,28 20,36 6,28 6,12" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Cyclo-hexane</span>
                                </div>
                                <div className={`ring-item ${activeSubToolId === 'RING_7' ? 'active' : ''}`} onClick={() => handleSelect('ring', 'RING_7')}>
                                    <svg viewBox="0 0 40 40"><polygon points="20,4 32,8 38,20 32,32 20,36 8,32 2,20 8,8" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Cyclo-heptane</span>
                                </div>
                                <div className={`ring-item ${activeSubToolId === 'RING_8' ? 'active' : ''}`} onClick={() => handleSelect('ring', 'RING_8')}>
                                    <svg viewBox="0 0 40 40"><polygon points="20,4 30,6 36,14 36,26 30,34 20,36 10,34 4,26 4,14 10,6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Cyclo-octane</span>
                                </div>
                            </div>
                        </div>

                        {/* Aromatic Rings */}
                        <div className="popup-section">
                            <div className="popup-section-title">Aromatic Rings</div>
                            <div className="ring-grid">
                                <div className={`ring-item ${activeSubToolId === 'BENZENE' ? 'active' : ''}`} onClick={() => handleSelect('ring', 'BENZENE')}>
                                    <svg viewBox="0 0 40 40"><polygon points="20,4 34,12 34,28 20,36 6,28 6,12" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                                    <span>Benzene</span>
                                </div>
                                <div className="ring-item" onClick={() => handleSelect('ring', 'R_CP')}>
                                    <svg viewBox="0 0 40 40"><polygon points="20,5 35,15 30,33 10,33 5,15" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                                    <span>Cyclo-pentadienyl</span>
                                </div>
                                <div className="ring-item" onClick={() => handleSelect('ring', 'R_TROP')}>
                                    <svg viewBox="0 0 40 40"><polygon points="20,4 32,8 38,20 32,32 20,36 8,32 2,20 8,8" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="20" cy="20" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                                    <span>Tropylium</span>
                                </div>
                            </div>
                        </div>

                        {/* Fused Rings */}
                        <div className="popup-section">
                            <div className="popup-section-title">Fused Ring Systems</div>
                            <div className="ring-grid">
                                <div className={`ring-item ${activeSubToolId === 'RING_NAPHTHALENE' ? 'active' : ''}`} onClick={() => handleSelect('ring', 'RING_NAPHTHALENE')}>
                                    <svg viewBox="0 0 48 40"><polygon points="12,4 24,10 24,22 12,28 0,22 0,10" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="24,10 36,4 48,10 48,22 36,28 24,22" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="36" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
                                    <span>Naphthalene</span>
                                </div>
                                <div className={`ring-item ${activeSubToolId === 'RING_ANTHRACENE' ? 'active' : ''}`} onClick={() => handleSelect('ring', 'RING_ANTHRACENE')}>
                                    <svg viewBox="0 0 48 48"><polygon points="24,4 36,10 36,22 24,28 12,22 12,10" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="36,22 48,28 48,40 36,46 24,40 24,28" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="24,28 12,22 0,28 0,40 12,46 24,40" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="24" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="36" cy="34" r="4" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="12" cy="34" r="4" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
                                    <span>Anthracene</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== ATOMS POPUP ===== */}
            {activePopup === 'atoms-popup' && (
                <div className="tool-popup show" style={style}>
                    <div className="popup-header">
                        <span className="popup-title">Atom Labels</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        <div className="popup-section">
                            <div className="popup-section-title">Common Atoms</div>
                            <div className="atom-grid">
                                <div className="atom-item c" onClick={() => handleSelect('atom', 'C')}>C</div>
                                <div className="atom-item h" onClick={() => handleSelect('atom', 'H')}>H</div>
                                <div className="atom-item n" onClick={() => handleSelect('atom', 'N')}>N</div>
                                <div className="atom-item o" onClick={() => handleSelect('atom', 'O')}>O</div>
                                <div className="atom-item s" onClick={() => handleSelect('atom', 'S')}>S</div>
                                <div className="atom-item p" onClick={() => handleSelect('atom', 'P')}>P</div>
                            </div>
                        </div>
                        <div className="popup-section">
                            <div className="popup-section-title">Halogens</div>
                            <div className="atom-grid">
                                <div className="atom-item f" onClick={() => handleSelect('atom', 'F')}>F</div>
                                <div className="atom-item cl" onClick={() => handleSelect('atom', 'Cl')}>Cl</div>
                                <div className="atom-item br" onClick={() => handleSelect('atom', 'Br')}>Br</div>
                                <div className="atom-item i" onClick={() => handleSelect('atom', 'I')}>I</div>
                                <div className="atom-item" style={{ color: '#9ca3af' }} onClick={() => handleSelect('atom', 'At')}>At</div>
                            </div>
                        </div>
                        <div className="popup-section">
                            <div className="popup-section-title">Metals</div>
                            <div className="atom-grid">
                                <div className="atom-item" style={{ color: '#64748b' }} onClick={() => handleSelect('atom', 'Li')}>Li</div>
                                <div className="atom-item" style={{ color: '#64748b' }} onClick={() => handleSelect('atom', 'Na')}>Na</div>
                                <div className="atom-item" style={{ color: '#64748b' }} onClick={() => handleSelect('atom', 'K')}>K</div>
                                <div className="atom-item" style={{ color: '#64748b' }} onClick={() => handleSelect('atom', 'Mg')}>Mg</div>
                                <div className="atom-item" style={{ color: '#64748b' }} onClick={() => handleSelect('atom', 'Ca')}>Ca</div>
                                <div className="atom-item" style={{ color: '#64748b' }} onClick={() => handleSelect('atom', 'Fe')}>Fe</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== FUNCTIONAL GROUPS POPUP ===== */}
            {activePopup === 'fg-popup' && (
                <div className="tool-popup show" style={style}>
                    <div className="popup-header">
                        <span className="popup-title">Functional Groups</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        <div className="popup-section">
                            <div className="popup-section-title">Alkyl Groups</div>
                            <div className="fg-grid">
                                <div className={`fg-item ${activeSubToolId === 'group-me' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-me')}>
                                    <svg viewBox="0 0 50 30"><text x="10" y="20" fontSize="10" fill="currentColor">-Me</text></svg>
                                    <span>Methyl</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-et' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-et')}>
                                    <svg viewBox="0 0 50 30"><text x="10" y="20" fontSize="10" fill="currentColor">-Et</text></svg>
                                    <span>Ethyl</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-ipr' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-ipr')}>
                                    <svg viewBox="0 0 50 30"><text x="5" y="20" fontSize="10" fill="currentColor">-iPr</text></svg>
                                    <span>Isopropyl</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-tbu' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-tbu')}>
                                    <svg viewBox="0 0 50 30"><text x="5" y="20" fontSize="10" fill="currentColor">-tBu</text></svg>
                                    <span>tert-Butyl</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-ph' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-ph')}>
                                    <svg viewBox="0 0 50 30"><text x="10" y="20" fontSize="10" fill="currentColor">-Ph</text></svg>
                                    <span>Phenyl</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-bn' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-bn')}>
                                    <svg viewBox="0 0 50 30"><text x="10" y="20" fontSize="10" fill="currentColor">-Bn</text></svg>
                                    <span>Benzyl</span>
                                </div>
                            </div>
                        </div>
                        <div className="popup-section">
                            <div className="popup-section-title">Heteroatom Groups</div>
                            <div className="fg-grid">
                                <div className={`fg-item ${activeSubToolId === 'group-oh' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-oh')}>
                                    <svg viewBox="0 0 50 30"><text x="10" y="20" fontSize="10" fill="#ef4444">-OH</text></svg>
                                    <span>Hydroxyl</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-nh2' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-nh2')}>
                                    <svg viewBox="0 0 50 30"><text x="5" y="20" fontSize="10" fill="#3b82f6">-NH₂</text></svg>
                                    <span>Amino</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-cooh' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-cooh')}>
                                    <svg viewBox="0 0 50 30"><text x="2" y="20" fontSize="9" fill="currentColor">-COOH</text></svg>
                                    <span>Carboxyl</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-cho' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-cho')}>
                                    <svg viewBox="0 0 50 30"><text x="5" y="20" fontSize="10" fill="currentColor">-CHO</text></svg>
                                    <span>Aldehyde</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-no2' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-no2')}>
                                    <svg viewBox="0 0 50 30"><text x="5" y="20" fontSize="10" fill="#3b82f6">-NO₂</text></svg>
                                    <span>Nitro</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-cn' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-cn')}>
                                    <svg viewBox="0 0 50 30"><text x="10" y="20" fontSize="10" fill="#3b82f6">-CN</text></svg>
                                    <span>Cyano</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-ome' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-ome')}>
                                    <svg viewBox="0 0 50 30"><text x="3" y="20" fontSize="10" fill="#ef4444">-OMe</text></svg>
                                    <span>Methoxy</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-nme2' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-nme2')}>
                                    <svg viewBox="0 0 50 30"><text x="1" y="20" fontSize="9" fill="#3b82f6">-NMe₂</text></svg>
                                    <span>Dimethylamino</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-so3h' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-so3h')}>
                                    <svg viewBox="0 0 50 30"><text x="1" y="20" fontSize="9" fill="#eab308">-SO₃H</text></svg>
                                    <span>Sulfonic</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-cf3' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-cf3')}>
                                    <svg viewBox="0 0 50 30"><text x="8" y="20" fontSize="10" fill="#22c55e">-CF₃</text></svg>
                                    <span>Trifluoromethyl</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-coor' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-coor')}>
                                    <svg viewBox="0 0 50 30"><text x="1" y="20" fontSize="9" fill="currentColor">-COOR</text></svg>
                                    <span>Ester</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-cocl' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-cocl')}>
                                    <svg viewBox="0 0 50 30"><text x="2" y="20" fontSize="9" fill="currentColor">-COCl</text></svg>
                                    <span>Acyl Chloride</span>
                                </div>
                            </div>
                        </div>
                        <div className="popup-section">
                            <div className="popup-section-title">Protecting Groups</div>
                            <div className="fg-grid">
                                <div className={`fg-item ${activeSubToolId === 'group-ac' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-ac')}>
                                    <svg viewBox="0 0 50 30"><text x="10" y="20" fontSize="10" fill="currentColor">-Ac</text></svg>
                                    <span>Acetyl</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-boc' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-boc')}>
                                    <svg viewBox="0 0 50 30"><text x="8" y="20" fontSize="10" fill="currentColor">-Boc</text></svg>
                                    <span>Boc</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-ts' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-ts')}>
                                    <svg viewBox="0 0 50 30"><text x="10" y="20" fontSize="10" fill="currentColor">-Ts</text></svg>
                                    <span>Tosyl</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-ms' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-ms')}>
                                    <svg viewBox="0 0 50 30"><text x="10" y="20" fontSize="10" fill="currentColor">-Ms</text></svg>
                                    <span>Mesyl</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-tf' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-tf')}>
                                    <svg viewBox="0 0 50 30"><text x="12" y="20" fontSize="10" fill="currentColor">-Tf</text></svg>
                                    <span>Triflyl</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'group-tbdms' ? 'active' : ''}`} onClick={() => handleSelect('groups', 'group-tbdms')}>
                                    <svg viewBox="0 0 50 30"><text x="1" y="20" fontSize="8" fill="currentColor">-TBDMS</text></svg>
                                    <span>TBDMS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== ARROWS POPUP ===== */}
            {activePopup === 'arrows-popup' && (
                <div className="tool-popup show" style={style}>
                    <div className="popup-header">
                        <span className="popup-title">Chemistry Arrows</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        {/* Reaction Arrows */}
                        <div className="popup-section">
                            <div className="popup-section-title">Reaction Arrows</div>
                            <div className="arrow-grid">
                                <div className={`arrow-item ${activeSubToolId === 'arrow-synthesis' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-synthesis')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="2" /><polygon points="50,12 42,8 42,16" fill="currentColor" /></svg>
                                    <span>Forward →</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-reverse' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-reverse')}>
                                    <svg viewBox="0 0 60 24"><line x1="10" y1="12" x2="55" y2="12" stroke="currentColor" strokeWidth="2" /><polygon points="10,12 18,8 18,16" fill="currentColor" /></svg>
                                    <span>Reverse ←</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-bidirectional' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-bidirectional')}>
                                    <svg viewBox="0 0 60 24"><line x1="10" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="2" /><polygon points="50,12 42,8 42,16" fill="currentColor" /><polygon points="10,12 18,8 18,16" fill="currentColor" /></svg>
                                    <span>Bidirectional ↔</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-noreaction' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-noreaction')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="2" /><polygon points="50,12 42,8 42,16" fill="currentColor" /><line x1="38" y1="4" x2="28" y2="20" stroke="currentColor" strokeWidth="2.5" /></svg>
                                    <span>No Reaction ↛</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-multistep' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-multistep')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="8,4" /><polygon points="50,12 42,8 42,16" fill="currentColor" /></svg>
                                    <span>Multi-step</span>
                                </div>
                            </div>
                        </div>

                        {/* Equilibrium Arrows */}
                        <div className="popup-section">
                            <div className="popup-section-title">Equilibrium Arrows</div>
                            <div className="arrow-grid">
                                <div className={`arrow-item ${activeSubToolId === 'arrow-equilibrium' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-equilibrium')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="9" x2="50" y2="9" stroke="currentColor" strokeWidth="2" /><polygon points="50,9 42,5 42,13" fill="currentColor" /><line x1="10" y1="15" x2="55" y2="15" stroke="currentColor" strokeWidth="2" /><polygon points="10,15 18,11 18,19" fill="currentColor" /></svg>
                                    <span>Full Equilibrium ⇌</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-partial-eq-fwd' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-partial-eq-fwd')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="9" x2="50" y2="9" stroke="currentColor" strokeWidth="2.5" /><polygon points="50,9 42,5 42,13" fill="currentColor" /><line x1="10" y1="15" x2="45" y2="15" stroke="currentColor" strokeWidth="1" /><polygon points="10,15 18,12 18,18" fill="currentColor" /></svg>
                                    <span>Favors Forward</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-partial-eq-rev' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-partial-eq-rev')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="9" x2="50" y2="9" stroke="currentColor" strokeWidth="1" /><polygon points="50,9 42,6 42,12" fill="currentColor" /><line x1="10" y1="15" x2="55" y2="15" stroke="currentColor" strokeWidth="2.5" /><polygon points="10,15 18,11 18,19" fill="currentColor" /></svg>
                                    <span>Favors Reverse</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-mesomeric' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-mesomeric')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="12" x2="55" y2="12" stroke="currentColor" strokeWidth="2" /><polygon points="55,12 47,8 47,16" fill="currentColor" /><polygon points="5,12 13,8 13,16" fill="currentColor" /></svg>
                                    <span>Resonance ↔</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-tautomeric' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-tautomeric')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="9" x2="50" y2="9" stroke="currentColor" strokeWidth="2" /><polygon points="50,9 44,5 44,13" fill="currentColor" /><line x1="10" y1="15" x2="55" y2="15" stroke="currentColor" strokeWidth="2" /><polygon points="10,15 16,11 16,19" fill="currentColor" /><text x="24" y="22" fontSize="5" fill="currentColor">keto-enol</text></svg>
                                    <span>Tautomeric</span>
                                </div>
                            </div>
                        </div>

                        {/* Mechanism Arrows */}
                        <div className="popup-section">
                            <div className="popup-section-title">Mechanism Arrows</div>
                            <div className="arrow-grid">
                                <div className={`arrow-item ${activeSubToolId === 'arrow-mechanism' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-mechanism')}>
                                    <svg viewBox="0 0 60 24"><path d="M 10 18 Q 30 2 50 18" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="50,18 44,12 48,20" fill="currentColor" /></svg>
                                    <span>Curved (2e⁻)</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-radical' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-radical')}>
                                    <svg viewBox="0 0 60 24"><path d="M 10 18 Q 30 2 50 18" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="48" y1="16" x2="54" y2="20" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Fishhook (1e⁻)</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-double-headed' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-double-headed')}>
                                    <svg viewBox="0 0 60 24"><path d="M 10 18 Q 30 2 50 18" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="50,18 44,12 48,20" fill="currentColor" /><polygon points="10,18 16,12 12,20" fill="currentColor" /></svg>
                                    <span>Double-headed</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-electron-push' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-electron-push')}>
                                    <svg viewBox="0 0 60 24"><path d="M 8 20 Q 20 4 35 12" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="35,12 28,8 29,14" fill="currentColor" /><circle cx="8" cy="20" r="2" fill="currentColor" /></svg>
                                    <span>Electron Push</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-nucleophilic' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-nucleophilic')}>
                                    <svg viewBox="0 0 60 24"><path d="M 8 18 Q 25 4 48 12" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="48,12 40,8 41,14" fill="currentColor" /><text x="4" y="10" fontSize="6" fill="currentColor">Nu:</text></svg>
                                    <span>Nucleophilic</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-electrophilic' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-electrophilic')}>
                                    <svg viewBox="0 0 60 24"><path d="M 48 18 Q 30 4 10 12" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="10,12 18,8 17,14" fill="currentColor" /><text x="44" y="10" fontSize="6" fill="currentColor">E⁺</text></svg>
                                    <span>Electrophilic</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-elimination' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-elimination')}>
                                    <svg viewBox="0 0 60 24"><path d="M 15 20 Q 30 6 45 20" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="45,20 39,14 43,22" fill="currentColor" /><line x1="30" y1="6" x2="30" y2="2" stroke="currentColor" strokeWidth="1.5" /><polygon points="30,2 28,6 32,6" fill="currentColor" /></svg>
                                    <span>Elimination</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-proton-transfer' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-proton-transfer')}>
                                    <svg viewBox="0 0 60 24"><path d="M 8 18 Q 30 2 52 18" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="52,18 46,12 50,20" fill="currentColor" /><text x="26" y="8" fontSize="6" fill="currentColor">H⁺</text></svg>
                                    <span>Proton Transfer</span>
                                </div>
                            </div>
                        </div>

                        {/* Retrosynthetic Arrows */}
                        <div className="popup-section">
                            <div className="popup-section-title">Retrosynthetic Arrows</div>
                            <div className="arrow-grid">
                                <div className={`arrow-item ${activeSubToolId === 'arrow-retro' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-retro')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="9" x2="50" y2="9" stroke="currentColor" strokeWidth="2.5" /><line x1="5" y1="15" x2="50" y2="15" stroke="currentColor" strokeWidth="2.5" /><polygon points="5,12 15,6 15,18" fill="currentColor" /></svg>
                                    <span>Retro ⇐</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-double-retro' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-double-retro')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="8" x2="50" y2="8" stroke="currentColor" strokeWidth="2" /><line x1="5" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="2" /><line x1="5" y1="16" x2="50" y2="16" stroke="currentColor" strokeWidth="2" /><polygon points="5,12 15,5 15,19" fill="currentColor" /></svg>
                                    <span>Double Retro</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-disconnection' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-disconnection')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" /><line x1="38" y1="12" x2="55" y2="12" stroke="currentColor" strokeWidth="2" /><line x1="26" y1="6" x2="34" y2="18" stroke="currentColor" strokeWidth="2" /><line x1="34" y1="6" x2="26" y2="18" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Disconnection</span>
                                </div>
                            </div>
                        </div>

                        {/* Special / Condition Arrows */}
                        <div className="popup-section">
                            <div className="popup-section-title">Special Arrows</div>
                            <div className="arrow-grid">
                                <div className={`arrow-item ${activeSubToolId === 'arrow-photo' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-photo')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="14" x2="50" y2="14" stroke="currentColor" strokeWidth="2" /><polygon points="50,14 42,10 42,18" fill="currentColor" /><text x="20" y="10" fontSize="7" fill="currentColor">hν</text></svg>
                                    <span>Photochemical (hν)</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-thermal' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-thermal')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="14" x2="50" y2="14" stroke="currentColor" strokeWidth="2" /><polygon points="50,14 42,10 42,18" fill="currentColor" /><text x="22" y="10" fontSize="7" fill="currentColor">Δ</text></svg>
                                    <span>Thermal (Δ)</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-catalytic' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-catalytic')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="14" x2="50" y2="14" stroke="currentColor" strokeWidth="2" /><polygon points="50,14 42,10 42,18" fill="currentColor" /><text x="18" y="10" fontSize="6" fill="currentColor">cat.</text></svg>
                                    <span>Catalytic</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-enzymatic' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-enzymatic')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="14" x2="50" y2="14" stroke="currentColor" strokeWidth="2" /><polygon points="50,14 42,10 42,18" fill="currentColor" /><text x="16" y="10" fontSize="6" fill="currentColor">enzyme</text></svg>
                                    <span>Enzymatic</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-oxidation' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-oxidation')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="14" x2="50" y2="14" stroke="currentColor" strokeWidth="2" /><polygon points="50,14 42,10 42,18" fill="currentColor" /><text x="20" y="10" fontSize="6" fill="currentColor">[O]</text></svg>
                                    <span>Oxidation [O]</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-reduction' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-reduction')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="14" x2="50" y2="14" stroke="currentColor" strokeWidth="2" /><polygon points="50,14 42,10 42,18" fill="currentColor" /><text x="20" y="10" fontSize="6" fill="currentColor">[H]</text></svg>
                                    <span>Reduction [H]</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-sigmatropic' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-sigmatropic')}>
                                    <svg viewBox="0 0 60 24"><path d="M 8 18 C 15 4, 45 4, 52 18" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,2" /><polygon points="52,18 46,12 50,20" fill="currentColor" /></svg>
                                    <span>Sigmatropic</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-concerted' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-concerted')}>
                                    <svg viewBox="0 0 60 24"><ellipse cx="30" cy="12" rx="20" ry="8" fill="none" stroke="currentColor" strokeWidth="1.5" /><polygon points="50,12 44,8 44,16" fill="currentColor" /><polygon points="10,12 16,8 16,16" fill="currentColor" /></svg>
                                    <span>Concerted (cyclic)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== MECHANISM ARROWS POPUP ===== */}
            {activePopup === 'mechanism-popup' && (
                <div className="tool-popup show" style={style}>
                    <div className="popup-header">
                        <span className="popup-title">Mechanism Arrows</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        <div className="popup-section">
                            <div className="popup-section-title">Electron Movement</div>
                            <div className="arrow-grid">
                                <div className={`arrow-item ${activeSubToolId === 'mech-full' ? 'active' : ''}`} onClick={() => handleSelect('mechanism', 'mech-full')}>
                                    <svg viewBox="0 0 60 24"><path d="M 10 18 Q 30 2 50 18" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="50,18 44,12 48,20" fill="currentColor" /></svg>
                                    <span>Full Arrow (2e⁻)</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'mech-fishhook' ? 'active' : ''}`} onClick={() => handleSelect('mechanism', 'mech-fishhook')}>
                                    <svg viewBox="0 0 60 24"><path d="M 10 18 Q 30 2 50 18" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="48" y1="16" x2="54" y2="20" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Fishhook (1e⁻)</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'mech-double' ? 'active' : ''}`} onClick={() => handleSelect('mechanism', 'mech-double')}>
                                    <svg viewBox="0 0 60 24"><path d="M 10 18 Q 30 2 50 18" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="50,18 44,12 48,20" fill="currentColor" /><polygon points="10,18 16,12 12,20" fill="currentColor" /></svg>
                                    <span>Double-Headed</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'mech-retro' ? 'active' : ''}`} onClick={() => handleSelect('mechanism', 'mech-retro')}>
                                    <svg viewBox="0 0 60 24"><path d="M 50 18 Q 30 2 10 18" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="10,18 16,12 12,20" fill="currentColor" /></svg>
                                    <span>Retro Push</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'mech-lp-push' ? 'active' : ''}`} onClick={() => handleSelect('mechanism', 'mech-lp-push')}>
                                    <svg viewBox="0 0 60 24"><path d="M 8 20 Q 20 4 35 12" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="35,12 28,8 29,14" fill="currentColor" /><circle cx="6" cy="18" r="1.5" fill="currentColor" /><circle cx="10" cy="20" r="1.5" fill="currentColor" /></svg>
                                    <span>Lone Pair Push</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'mech-bond-break' ? 'active' : ''}`} onClick={() => handleSelect('mechanism', 'mech-bond-break')}>
                                    <svg viewBox="0 0 60 24"><line x1="10" y1="12" x2="30" y2="12" stroke="currentColor" strokeWidth="2" /><path d="M 25 12 Q 35 2 50 8" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="50,8 44,4 46,10" fill="currentColor" /><path d="M 25 12 Q 35 22 50 16" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="50,16 44,14 46,20" fill="currentColor" /></svg>
                                    <span>Bond Breaking</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== CHARGES POPUP ===== */}
            {activePopup === 'charges-popup' && (
                <div className="tool-popup show" style={style}>
                    <div className="popup-header">
                        <span className="popup-title">Charges & Radicals</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        <div className="popup-section">
                            <div className="popup-section-title">Formal Charges</div>
                            <div className="charge-grid">
                                <div className={`charge-item ${activeSubToolId === 'charge-plus' ? 'active' : ''}`} onClick={() => handleSelect('attributes', 'charge-plus')}>⊕</div>
                                <div className={`charge-item ${activeSubToolId === 'charge-minus' ? 'active' : ''}`} onClick={() => handleSelect('attributes', 'charge-minus')}>⊖</div>
                                <div className={`charge-item ${activeSubToolId === 'charge-2plus' ? 'active' : ''}`} onClick={() => handleSelect('attributes', 'charge-2plus')}>2+</div>
                                <div className={`charge-item ${activeSubToolId === 'charge-2minus' ? 'active' : ''}`} onClick={() => handleSelect('attributes', 'charge-2minus')}>2−</div>
                            </div>
                        </div>
                        <div className="popup-section">
                            <div className="popup-section-title">Partial Charges</div>
                            <div className="charge-grid">
                                <div className={`charge-item ${activeSubToolId === 'charge-delta-plus' ? 'active' : ''}`} onClick={() => handleSelect('attributes', 'charge-delta-plus')}>δ+</div>
                                <div className={`charge-item ${activeSubToolId === 'charge-delta-minus' ? 'active' : ''}`} onClick={() => handleSelect('attributes', 'charge-delta-minus')}>δ−</div>
                            </div>
                        </div>
                        <div className="popup-section">
                            <div className="popup-section-title">Radicals & Electrons</div>
                            <div className="charge-grid">
                                <div className={`charge-item ${activeSubToolId === 'charge-radical' ? 'active' : ''}`} onClick={() => handleSelect('attributes', 'charge-radical')}>•</div>
                                <div className={`charge-item ${activeSubToolId === 'charge-lone-pair' ? 'active' : ''}`} onClick={() => handleSelect('attributes', 'charge-lone-pair')}>:</div>
                                <div className={`charge-item ${activeSubToolId === 'charge-diradical' ? 'active' : ''}`} onClick={() => handleSelect('attributes', 'charge-diradical')}>••</div>
                                <div className={`charge-item ${activeSubToolId === 'charge-cation-radical' ? 'active' : ''}`} onClick={() => handleSelect('attributes', 'charge-cation-radical')}>⁺•</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== BRACKETS POPUP ===== */}
            {activePopup === 'brackets-popup' && (
                <div className="tool-popup show" style={style}>
                    <div className="popup-header">
                        <span className="popup-title">Brackets & Enclosures</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        <div className="popup-section">
                            <div className="popup-section-title">Bracket Types</div>
                            <div className="charge-grid">
                                <div className={`charge-item ${activeSubToolId === 'bracket-square' ? 'active' : ''}`} onClick={() => handleSelect('brackets', 'bracket-square')}>[ ]</div>
                                <div className={`charge-item ${activeSubToolId === 'bracket-round' ? 'active' : ''}`} onClick={() => handleSelect('brackets', 'bracket-round')}>( )</div>
                                <div className={`charge-item ${activeSubToolId === 'bracket-curly' ? 'active' : ''}`} onClick={() => handleSelect('brackets', 'bracket-curly')}>{"{ }"}</div>
                                <div className={`charge-item ${activeSubToolId === 'bracket-angle' ? 'active' : ''}`} onClick={() => handleSelect('brackets', 'bracket-angle')}>⟨ ⟩</div>
                            </div>
                        </div>
                        <div className="popup-section">
                            <div className="popup-section-title">Polymer & Repeating</div>
                            <div className="charge-grid">
                                <div className={`charge-item ${activeSubToolId === 'bracket-repeat-n' ? 'active' : ''}`} onClick={() => handleSelect('brackets', 'bracket-repeat-n')}>[  ]ₙ</div>
                                <div className={`charge-item ${activeSubToolId === 'bracket-sru' ? 'active' : ''}`} onClick={() => handleSelect('brackets', 'bracket-sru')}>SRU</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== ORBITALS POPUP ===== */}
            {activePopup === 'orbitals-popup' && (
                <div className="tool-popup show" style={style}>
                    <div className="popup-header">
                        <span className="popup-title">Atomic Orbitals</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        <div className="popup-section">
                            <div className="popup-section-title">Atomic Orbitals</div>
                            <div className="bond-grid">
                                <div className={`bond-item ${activeSubToolId === 'orbital-s' ? 'active' : ''}`} onClick={() => handleSelect('orbitals', 'orbital-s')}>
                                    <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.3" /></svg>
                                    <span>s</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'orbital-p' ? 'active' : ''}`} onClick={() => handleSelect('orbitals', 'orbital-p')}>
                                    <svg viewBox="0 0 40 40"><path d="M20 20C20 20 28 14 28 10C28 6 24 2 20 2C16 2 12 6 12 10C12 14 20 20 20 20Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" /><path d="M20 20C20 20 12 26 12 30C12 34 16 38 20 38C24 38 28 34 28 30C28 26 20 20 20 20Z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                                    <span>p</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'orbital-d' ? 'active' : ''}`} onClick={() => handleSelect('orbitals', 'orbital-d')}>
                                    <svg viewBox="0 0 40 40"><ellipse cx="20" cy="20" rx="16" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5" /><ellipse cx="20" cy="20" rx="6" ry="16" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="20" cy="20" r="2" fill="currentColor" /></svg>
                                    <span>d</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'orbital-f' ? 'active' : ''}`} onClick={() => handleSelect('orbitals', 'orbital-f')}>
                                    <svg viewBox="0 0 40 40"><ellipse cx="20" cy="20" rx="16" ry="4" fill="none" stroke="currentColor" strokeWidth="1" /><ellipse cx="20" cy="20" rx="4" ry="16" fill="none" stroke="currentColor" strokeWidth="1" /><ellipse cx="20" cy="20" rx="12" ry="12" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 20 20)" /><circle cx="20" cy="20" r="2" fill="currentColor" /></svg>
                                    <span>f</span>
                                </div>
                            </div>
                        </div>
                        <div className="popup-section">
                            <div className="popup-section-title">Hybrid Orbitals</div>
                            <div className="bond-grid">
                                <div className={`bond-item ${activeSubToolId === 'orbital-sp' ? 'active' : ''}`} onClick={() => handleSelect('orbitals', 'orbital-sp')}>
                                    <svg viewBox="0 0 40 40"><path d="M20 20C20 20 34 14 34 8C34 4 28 2 20 2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" /><path d="M20 20C20 20 6 26 6 32C6 36 12 38 20 38" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                                    <span>sp</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'orbital-sp2' ? 'active' : ''}`} onClick={() => handleSelect('orbitals', 'orbital-sp2')}>
                                    <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="2" fill="currentColor" /><line x1="20" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="1.5" /><line x1="20" y1="20" x2="6" y2="32" stroke="currentColor" strokeWidth="1.5" /><line x1="20" y1="20" x2="34" y2="32" stroke="currentColor" strokeWidth="1.5" /><text x="20" y="42" fontSize="6" fill="currentColor" textAnchor="middle">120°</text></svg>
                                    <span>sp²</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'orbital-sp3' ? 'active' : ''}`} onClick={() => handleSelect('orbitals', 'orbital-sp3')}>
                                    <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="2" fill="currentColor" /><line x1="20" y1="20" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" /><line x1="20" y1="20" x2="28" y2="6" stroke="currentColor" strokeWidth="1.5" /><line x1="20" y1="20" x2="8" y2="34" stroke="currentColor" strokeWidth="1.5" /><line x1="20" y1="20" x2="32" y2="34" stroke="currentColor" strokeWidth="1.5" /><text x="20" y="42" fontSize="6" fill="currentColor" textAnchor="middle">109.5°</text></svg>
                                    <span>sp³</span>
                                </div>
                                <div className={`bond-item ${activeSubToolId === 'orbital-hybrid' ? 'active' : ''}`} onClick={() => handleSelect('orbitals', 'orbital-hybrid')}>
                                    <svg viewBox="0 0 40 40"><path d="M20 20C20 20 30 12 30 6C30 2 26 0 20 4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" /><path d="M20 20C20 20 10 28 10 34C10 38 14 40 20 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" /></svg>
                                    <span>Custom</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== COLOR POPUP ===== */}
            {activePopup === 'color-popup' && (
                <div className="tool-popup show" style={style}>
                    <div className="popup-header">
                        <span className="popup-title">Color / Highlight</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        <div className="popup-section">
                            <div className="popup-section-title">Element Colors (CPK)</div>
                            <div className="atom-grid">
                                <div className="charge-item" style={{ background: '#404040', color: '#fff', borderRadius: '50%', width: 28, height: 28, fontSize: '0.7rem' }} onClick={() => handleSelect('color', 'color-black')}>C</div>
                                <div className="charge-item" style={{ background: '#3b82f6', color: '#fff', borderRadius: '50%', width: 28, height: 28, fontSize: '0.7rem' }} onClick={() => handleSelect('color', 'color-blue')}>N</div>
                                <div className="charge-item" style={{ background: '#ef4444', color: '#fff', borderRadius: '50%', width: 28, height: 28, fontSize: '0.7rem' }} onClick={() => handleSelect('color', 'color-red')}>O</div>
                                <div className="charge-item" style={{ background: '#eab308', color: '#fff', borderRadius: '50%', width: 28, height: 28, fontSize: '0.7rem' }} onClick={() => handleSelect('color', 'color-yellow')}>S</div>
                                <div className="charge-item" style={{ background: '#22c55e', color: '#fff', borderRadius: '50%', width: 28, height: 28, fontSize: '0.7rem' }} onClick={() => handleSelect('color', 'color-green')}>F</div>
                                <div className="charge-item" style={{ background: '#a855f7', color: '#fff', borderRadius: '50%', width: 28, height: 28, fontSize: '0.7rem' }} onClick={() => handleSelect('color', 'color-purple')}>Br</div>
                            </div>
                        </div>
                        <div className="popup-section">
                            <div className="popup-section-title">Custom Colors</div>
                            <div className="atom-grid">
                                <div className="charge-item" style={{ background: '#ef4444', borderRadius: '50%', width: 28, height: 28 }} onClick={() => handleSelect('color', 'color-red')}></div>
                                <div className="charge-item" style={{ background: '#f97316', borderRadius: '50%', width: 28, height: 28 }} onClick={() => handleSelect('color', 'color-orange')}></div>
                                <div className="charge-item" style={{ background: '#eab308', borderRadius: '50%', width: 28, height: 28 }} onClick={() => handleSelect('color', 'color-yellow')}></div>
                                <div className="charge-item" style={{ background: '#22c55e', borderRadius: '50%', width: 28, height: 28 }} onClick={() => handleSelect('color', 'color-green')}></div>
                                <div className="charge-item" style={{ background: '#3b82f6', borderRadius: '50%', width: 28, height: 28 }} onClick={() => handleSelect('color', 'color-blue')}></div>
                                <div className="charge-item" style={{ background: '#a855f7', borderRadius: '50%', width: 28, height: 28 }} onClick={() => handleSelect('color', 'color-purple')}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== SYMMETRY POPUP ===== */}
            {activePopup === 'symmetry-popup' && (
                <div className="tool-popup show" style={style}>
                    <div className="popup-header">
                        <span className="popup-title">Symmetry Operations</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        <div className="popup-section">
                            <div className="popup-section-title">Symmetry Elements</div>
                            <div className="fg-grid">
                                <div className={`fg-item ${activeSubToolId === 'sym-mirror' ? 'active' : ''}`} onClick={() => handleSelect('symmetry', 'sym-mirror')}>
                                    <svg viewBox="0 0 50 30"><line x1="25" y1="2" x2="25" y2="28" stroke="currentColor" strokeWidth="2" strokeDasharray="3,2" /><text x="10" y="18" fontSize="8" fill="currentColor">σ</text></svg>
                                    <span>Mirror Plane (σ)</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'sym-rotation' ? 'active' : ''}`} onClick={() => handleSelect('symmetry', 'sym-rotation')}>
                                    <svg viewBox="0 0 50 30"><circle cx="25" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M 35 15 L 38 12 L 38 18 Z" fill="currentColor" /><text x="22" y="18" fontSize="7" fill="currentColor">Cₙ</text></svg>
                                    <span>Rotation (Cₙ)</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'sym-inversion' ? 'active' : ''}`} onClick={() => handleSelect('symmetry', 'sym-inversion')}>
                                    <svg viewBox="0 0 50 30"><circle cx="25" cy="15" r="3" fill="currentColor" /><circle cx="25" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" /><text x="20" y="28" fontSize="7" fill="currentColor">i</text></svg>
                                    <span>Inversion (i)</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'sym-improper' ? 'active' : ''}`} onClick={() => handleSelect('symmetry', 'sym-improper')}>
                                    <svg viewBox="0 0 50 30"><circle cx="25" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" /><line x1="25" y1="2" x2="25" y2="28" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" /><text x="20" y="18" fontSize="7" fill="currentColor">Sₙ</text></svg>
                                    <span>Improper Rot. (Sₙ)</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'sym-chiral-center' ? 'active' : ''}`} onClick={() => handleSelect('symmetry', 'sym-chiral-center')}>
                                    <svg viewBox="0 0 50 30"><text x="15" y="20" fontSize="12" fontWeight="bold" fill="currentColor">R/S</text></svg>
                                    <span>Chiral Center</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'sym-ez' ? 'active' : ''}`} onClick={() => handleSelect('symmetry', 'sym-ez')}>
                                    <svg viewBox="0 0 50 30"><text x="15" y="20" fontSize="12" fontWeight="bold" fill="currentColor">E/Z</text></svg>
                                    <span>E/Z Isomerism</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== SAFETY/GHS POPUP ===== */}
            {activePopup === 'safety-popup' && (
                <div className="tool-popup show" style={style}>
                    <div className="popup-header">
                        <span className="popup-title">GHS Hazard Symbols</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        <div className="popup-section">
                            <div className="popup-section-title">GHS Pictograms</div>
                            <div className="fg-grid">
                                <div className={`fg-item ${activeSubToolId === 'ghs-flame' ? 'active' : ''}`} onClick={() => handleSelect('safety', 'ghs-flame')}>
                                    <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="2" fill="none" stroke="#ef4444" strokeWidth="2" transform="rotate(45 25 25)" /><text x="15" y="32" fontSize="18">🔥</text></svg>
                                    <span>Flammable</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'ghs-skull' ? 'active' : ''}`} onClick={() => handleSelect('safety', 'ghs-skull')}>
                                    <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="2" fill="none" stroke="#ef4444" strokeWidth="2" transform="rotate(45 25 25)" /><text x="15" y="32" fontSize="18">☠️</text></svg>
                                    <span>Toxic</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'ghs-corrosion' ? 'active' : ''}`} onClick={() => handleSelect('safety', 'ghs-corrosion')}>
                                    <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="2" fill="none" stroke="#ef4444" strokeWidth="2" transform="rotate(45 25 25)" /><text x="12" y="32" fontSize="14">⚗️</text></svg>
                                    <span>Corrosive</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'ghs-exclamation' ? 'active' : ''}`} onClick={() => handleSelect('safety', 'ghs-exclamation')}>
                                    <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="2" fill="none" stroke="#ef4444" strokeWidth="2" transform="rotate(45 25 25)" /><text x="18" y="32" fontSize="18">⚠️</text></svg>
                                    <span>Irritant</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'ghs-oxidizer' ? 'active' : ''}`} onClick={() => handleSelect('safety', 'ghs-oxidizer')}>
                                    <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="2" fill="none" stroke="#ef4444" strokeWidth="2" transform="rotate(45 25 25)" /><text x="15" y="32" fontSize="14">⭕</text></svg>
                                    <span>Oxidizer</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'ghs-gas' ? 'active' : ''}`} onClick={() => handleSelect('safety', 'ghs-gas')}>
                                    <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="2" fill="none" stroke="#ef4444" strokeWidth="2" transform="rotate(45 25 25)" /><text x="12" y="32" fontSize="14">🧪</text></svg>
                                    <span>Gas Cylinder</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'ghs-health' ? 'active' : ''}`} onClick={() => handleSelect('safety', 'ghs-health')}>
                                    <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="2" fill="none" stroke="#ef4444" strokeWidth="2" transform="rotate(45 25 25)" /><text x="16" y="28" fontSize="10" fontWeight="bold" fill="#ef4444">CMR</text></svg>
                                    <span>Health Hazard</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'ghs-environment' ? 'active' : ''}`} onClick={() => handleSelect('safety', 'ghs-environment')}>
                                    <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="2" fill="none" stroke="#ef4444" strokeWidth="2" transform="rotate(45 25 25)" /><text x="13" y="32" fontSize="14">🌿</text></svg>
                                    <span>Environmental</span>
                                </div>
                                <div className={`fg-item ${activeSubToolId === 'ghs-explosive' ? 'active' : ''}`} onClick={() => handleSelect('safety', 'ghs-explosive')}>
                                    <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="2" fill="none" stroke="#ef4444" strokeWidth="2" transform="rotate(45 25 25)" /><text x="14" y="32" fontSize="14">💥</text></svg>
                                    <span>Explosive</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
