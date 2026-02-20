import React from 'react';
import { TopHeader } from './TopHeader';
import { PropertiesWidget } from '../widgets/PropertiesWidget';
import { MolGrabberWidget } from '../widgets/MolGrabberWidget';
import { useCanvasStore } from '../../store/useCanvasStore';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, RotateCw } from 'lucide-react';
import { useState } from 'react';

interface MainLayoutProps {
    leftPanel?: React.ReactNode;
    rightPanel?: React.ReactNode;
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    leftPanel,
    rightPanel,
    children
}) => {
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
    const [rightPanelWidth, setRightPanelWidth] = useState(280);
    const [isResizing, setIsResizing] = useState(false);
    const zoom = useCanvasStore((state) => state.zoom);
    const setZoom = useCanvasStore((state) => state.setZoom);
    const pageOrientation = useCanvasStore((state) => state.pageOrientation);
    const setPageOrientation = useCanvasStore((state) => state.setPageOrientation);

    // Drag-to-resize handler for right panel
    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
        const startX = e.clientX;
        const startWidth = rightPanelWidth;

        const onMouseMove = (ev: MouseEvent) => {
            const delta = startX - ev.clientX; // dragging left = wider
            const newWidth = Math.min(420, Math.max(180, startWidth + delta));
            setRightPanelWidth(newWidth);
        };

        const onMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-100">
            {/* Top Header */}
            <div className="flex-none shadow-sm" style={{ position: 'relative', zIndex: 40 }}>
                <TopHeader />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden relative flex-row">

                {/* Left Toolbar */}
                <div className="flex-none" style={{ position: 'relative', zIndex: 30 }}>
                    {leftPanel}
                </div>

                {/* Canvas Area */}
                <div className="flex-1 overflow-hidden" style={{ position: 'relative', zIndex: 1 }}>
                    {children}

                    <PropertiesWidget />
                    <MolGrabberWidget />

                    <button
                        onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-white border border-gray-200 p-1 rounded-l-lg shadow-md text-gray-500 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
                        title={isRightPanelOpen ? "Hide Properties" : "Show Properties"}
                    >
                        {isRightPanelOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* Right Properties Panel — Resizable */}
                {isRightPanelOpen && (
                    <div
                        style={{
                            position: 'relative',
                            display: 'flex',
                            flexShrink: 0,
                            width: `${rightPanelWidth}px`,
                            zIndex: 55,
                        }}
                    >
                        {/* Drag Handle */}
                        <div
                            onMouseDown={handleResizeStart}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: '5px',
                                cursor: 'col-resize',
                                zIndex: 60,
                                background: isResizing ? 'rgba(79,70,229,0.25)' : 'transparent',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,70,229,0.15)'; }}
                            onMouseLeave={e => { if (!isResizing) e.currentTarget.style.background = 'transparent'; }}
                        />
                        <div className="w-full h-full overflow-y-auto bg-white border-l border-gray-200 shadow-sm">
                            {rightPanel}
                        </div>
                    </div>
                )}
                {!isRightPanelOpen && null}
            </div>

            {/* Bottom Status Bar */}
            <div
                style={{
                    height: '28px',
                    background: '#f0f0f0',
                    borderTop: '1px solid #d0d0d0',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                    fontSize: '12px',
                    color: '#555',
                    fontWeight: 500,
                    zIndex: 30,
                    gap: '6px',
                    fontFamily: "'Inter', system-ui, sans-serif",
                }}
            >
                <span style={{ color: '#4caf50', fontWeight: 600, marginRight: '8px' }}>● Ready</span>

                {/* Zoom Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginRight: '4px' }}>
                    <button
                        onClick={() => setZoom(zoom * 0.9)}
                        style={{ width: '22px', height: '22px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', color: '#555' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#ddd'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        title="Zoom Out"
                    >
                        <ZoomOut size={14} />
                    </button>
                    <span style={{
                        minWidth: '48px',
                        textAlign: 'center',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#333',
                        background: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '3px',
                        padding: '1px 6px',
                    }}>
                        {Math.round(zoom * 100)}%
                    </span>
                    <button
                        onClick={() => setZoom(zoom * 1.1)}
                        style={{ width: '22px', height: '22px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', color: '#555' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#ddd'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        title="Zoom In"
                    >
                        <ZoomIn size={14} />
                    </button>
                    <button
                        onClick={() => setZoom(1)}
                        style={{ width: '22px', height: '22px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', color: '#555', marginLeft: '2px' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#ddd'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        title="Reset to 100%"
                    >
                        <Maximize2 size={13} />
                    </button>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '16px', background: '#ccc' }} />

                {/* Orientation Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button
                        onClick={() => setPageOrientation(pageOrientation === 'portrait' ? 'landscape' : 'portrait')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            border: '1px solid #ccc',
                            background: '#fff',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            padding: '2px 8px',
                            fontSize: '11px',
                            fontWeight: 500,
                            color: '#555',
                            height: '22px',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#eee'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                        title="Toggle Orientation"
                    >
                        <RotateCw size={12} />
                        {pageOrientation === 'portrait' ? 'Portrait' : 'Landscape'}
                    </button>
                    <div style={{
                        width: pageOrientation === 'portrait' ? '12px' : '16px',
                        height: pageOrientation === 'portrait' ? '16px' : '12px',
                        border: '1.5px solid #888',
                        borderRadius: '1px',
                        background: '#fff',
                        transition: 'all 200ms',
                    }} />
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '16px', background: '#ccc' }} />

                {/* Coordinates */}
                <span style={{ fontSize: '11px', color: '#888' }}>x: 0, y: 0</span>
            </div>
        </div>
    );
};
