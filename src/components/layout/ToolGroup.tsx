import React, { useState, useRef, useEffect } from 'react';

interface ToolGroupProps {
    id: string;
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    activeSubToolId?: string;
    subTools?: Array<{
        id: string;
        icon: React.ElementType;
        label: string;
        shortcut?: string;
    }>;
    popupId?: string; // For rich HTML popups
    onSelect: (id: string, subToolId?: string) => void;
    onSubToolSelect?: (subToolId: string) => void;
    onPopupOpen?: (popupId: string, rect: DOMRect) => void;
}

export const ToolGroup: React.FC<ToolGroupProps> = ({
    id,
    icon: MainIcon,
    label,
    isActive,
    activeSubToolId,
    subTools,
    popupId,
    onSelect,
    onPopupOpen
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Determine which icon to show on the main button
    const activeSubTool = subTools?.find(st => st.id === activeSubToolId);
    const DisplayIcon = (isActive && activeSubTool) ? activeSubTool.icon : MainIcon;

    // Handle tooltip delay
    useEffect(() => {
        if (isHovered) {
            timeoutRef.current = setTimeout(() => { }, 500);
        } else {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isHovered]);

    // Handle outside click to close menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleMainClick = () => {
        onSelect(id);
    };

    const handleCornerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (popupId && onPopupOpen && menuRef.current) {
            onPopupOpen(popupId, menuRef.current.getBoundingClientRect());
        } else {
            setIsMenuOpen(!isMenuOpen);
        }
    };

    const handleSubToolClick = (subId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(id, subId);
        setIsMenuOpen(false);
    };

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={menuRef}
            style={{ display: 'flex', justifyContent: 'center', overflow: 'visible' }}
        >
            {/* Main Button — Square with blue circle hover animation */}
            <button
                onClick={handleMainClick}
                style={{
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    border: isActive ? '1px solid #7c8cc8' : '1px solid transparent',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    padding: 0,
                    background: isActive ? '#dce3f9' : 'transparent',
                    color: isActive ? '#3b4fc4' : '#444',
                    overflow: 'hidden',
                    transition: 'border-color 150ms, background 150ms',
                }}
            >
                {/* Blue circle hover animation */}
                <span
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0) 70%)',
                        transform: isHovered && !isActive ? 'scale(1)' : 'scale(0)',
                        opacity: isHovered && !isActive ? 1 : 0,
                        transition: 'transform 250ms cubic-bezier(0.4,0,0.2,1), opacity 200ms',
                        pointerEvents: 'none',
                    }}
                />
                <DisplayIcon size={20} strokeWidth={isActive ? 2 : 1.5} style={{ position: 'relative', zIndex: 1 }} />

                {/* Corner Triangle for Sub-menu or Popups */}
                {((subTools && subTools.length > 0) || popupId) && (
                    <div
                        onClick={handleCornerClick}
                        style={{
                            position: 'absolute',
                            bottom: '2px',
                            right: '2px',
                            cursor: 'pointer',
                            color: isActive ? '#6675b8' : '#aaa',
                            lineHeight: 0,
                            zIndex: 2,
                        }}
                    >
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                            <path d="M6 6L0 6L6 0Z" />
                        </svg>
                    </div>
                )}
            </button>

            {/* Sub-tool Floating Grid */}
            {isMenuOpen && subTools && (
                <div
                    style={{
                        position: 'absolute',
                        left: '100%',
                        top: 0,
                        marginLeft: '4px',
                        background: '#fff',
                        border: '1px solid #ccc',
                        boxShadow: '2px 2px 10px rgba(0,0,0,0.15)',
                        borderRadius: '4px',
                        padding: '4px',
                        zIndex: 9999,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '2px',
                        minWidth: '120px',
                    }}
                >
                    {subTools.map((st) => (
                        <button
                            key={st.id}
                            onClick={(e) => handleSubToolClick(st.id, e)}
                            style={{
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer',
                                padding: 0,
                                background: activeSubToolId === st.id ? '#dce3f9' : 'transparent',
                                color: activeSubToolId === st.id ? '#3b4fc4' : '#555',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <st.icon size={16} strokeWidth={1.5} />
                        </button>
                    ))}
                </div>
            )}

            {/* Tooltip — high z-index so it's always on top */}
            <div
                style={{
                    position: 'absolute',
                    left: '100%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    marginLeft: '10px',
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
                    opacity: isHovered && !isMenuOpen ? 1 : 0,
                    transition: 'opacity 150ms',
                }}
            >
                {label}
                {/* Tooltip arrow */}
                <div
                    style={{
                        position: 'absolute',
                        left: '-4px',
                        top: '50%',
                        transform: 'translateY(-50%) rotate(45deg)',
                        width: '8px',
                        height: '8px',
                        background: '#1e293b',
                    }}
                />
            </div>
        </div>
    );
};
