
import React, { useEffect, useRef } from 'react';
import { RenderEngine } from '../engine/RenderEngine';

const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<RenderEngine | null>(null);

    useEffect(() => {
        if (canvasRef.current && !engineRef.current) {
            engineRef.current = new RenderEngine(canvasRef.current);
            engineRef.current.init();
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            className="fixed top-0 left-0 w-full h-full z-0 block bg-[#f0f0f5]"
        />
    );
};

export default Canvas;
