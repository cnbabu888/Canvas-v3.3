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
                        <span className="popup-title">Reaction Arrows</span>
                        <button className="popup-close" onClick={onClose}>×</button>
                    </div>
                    <div className="popup-body">
                        <div className="popup-section">
                            <div className="popup-section-title">Reaction Arrows</div>
                            <div className="arrow-grid">
                                <div className={`arrow-item ${activeSubToolId === 'arrow-synthesis' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-synthesis')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="2" /><polygon points="50,12 42,8 42,16" fill="currentColor" /></svg>
                                    <span>Forward</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-equilibrium' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-equilibrium')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="9" x2="50" y2="9" stroke="currentColor" strokeWidth="2" /><polygon points="50,9 42,5 42,13" fill="currentColor" /><line x1="10" y1="15" x2="55" y2="15" stroke="currentColor" strokeWidth="2" /><polygon points="10,15 18,11 18,19" fill="currentColor" /></svg>
                                    <span>Equilibrium</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-mechanism' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-mechanism')}>
                                    <svg viewBox="0 0 60 24"><path d="M 10 18 Q 30 2 50 18" fill="none" stroke="currentColor" strokeWidth="2" /><polygon points="50,18 44,12 48,20" fill="currentColor" /></svg>
                                    <span>Curved</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-retro' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-retro')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="9" x2="50" y2="9" stroke="currentColor" strokeWidth="2.5" /><line x1="5" y1="15" x2="50" y2="15" stroke="currentColor" strokeWidth="2.5" /><polygon points="5,12 15,6 15,18" fill="currentColor" /></svg>
                                    <span>Retro</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-resonance' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-resonance')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="12" x2="55" y2="12" stroke="currentColor" strokeWidth="2" /><polygon points="55,12 47,8 47,16" fill="currentColor" /><polygon points="5,12 13,8 13,16" fill="currentColor" /></svg>
                                    <span>Resonance</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-noreaction' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-noreaction')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="2" /><polygon points="50,12 42,8 42,16" fill="currentColor" /><line x1="38" y1="4" x2="28" y2="20" stroke="currentColor" strokeWidth="2.5" /></svg>
                                    <span>No Reaction</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-radical' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-radical')}>
                                    <svg viewBox="0 0 60 24"><path d="M 10 18 Q 30 2 50 18" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="48" y1="16" x2="54" y2="20" stroke="currentColor" strokeWidth="2" /></svg>
                                    <span>Radical (fishhook)</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-photo' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-photo')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="2" /><polygon points="50,12 42,8 42,16" fill="currentColor" /><text x="20" y="9" fontSize="7" fill="currentColor">hν</text></svg>
                                    <span>Photochemical</span>
                                </div>
                                <div className={`arrow-item ${activeSubToolId === 'arrow-catalytic' ? 'active' : ''}`} onClick={() => handleSelect('reaction', 'arrow-catalytic')}>
                                    <svg viewBox="0 0 60 24"><line x1="5" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="2" /><polygon points="50,12 42,8 42,16" fill="currentColor" /><text x="18" y="9" fontSize="7" fill="currentColor">cat.</text></svg>
                                    <span>Catalytic</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
