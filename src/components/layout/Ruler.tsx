import React, { useEffect, useRef, useState } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';

interface RulerProps {
    orientation: 'horizontal' | 'vertical';
}

export const Ruler: React.FC<RulerProps> = ({ orientation }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const zoom = useCanvasStore((state) => state.zoom);
    const offset = useCanvasStore((state) => state.offset);

    // We need to track mouse position for the guide
    const [mousePos, setMousePos] = useState<number>(0);

    const isHorizontal = orientation === 'horizontal';
    const size = 20; // px

    // Draw Ruler
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#f9fafb'; // bg-gray-50
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#374151'; // text-gray-700
        ctx.strokeStyle = '#d1d5db'; // border-gray-300
        ctx.lineWidth = 1;
        ctx.font = '10px sans-serif';

        // Ticks
        const length = isHorizontal ? width : height;
        const worldStep = 50;

        const offsetVal = isHorizontal ? offset.x : offset.y;

        const startWorld = -offsetVal / zoom;
        const startTick = Math.floor(startWorld / worldStep) * worldStep;

        for (let w = startTick; ; w += worldStep) {
            const s = w * zoom + offsetVal;
            if (s > length) break;

            // Draw Tick
            const tickSize = 10;
            if (isHorizontal) {
                ctx.beginPath();
                ctx.moveTo(s, size);
                ctx.lineTo(s, size - tickSize);
                ctx.stroke();
                ctx.fillText(w.toString(), s + 4, 10);
            } else {
                ctx.beginPath();
                ctx.moveTo(size, s);
                ctx.lineTo(size - tickSize, s);
                ctx.stroke();

                // Rotate text for vertical? Or just draw
                ctx.save();
                ctx.translate(10, s + 4);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(w.toString(), 0, 0);
                ctx.restore();
            }
        }

        // Draw Mouse Guide
        ctx.strokeStyle = '#3b82f6'; // blue-500
        ctx.beginPath();
        if (isHorizontal) {
            ctx.moveTo(mousePos, 0);
            ctx.lineTo(mousePos, size);
        } else {
            ctx.moveTo(0, mousePos);
            ctx.lineTo(size, mousePos);
        }
        ctx.stroke();

    }, [zoom, offset, isHorizontal, mousePos]);

    // Listen to global mouse move? 
    // Or just listen on this component? 
    // Ideally the main layout passes mouse position or we subscribe to store.

    // For now, let's attach a listener to window for demo purposes
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // This is heavy. Optimally, MainLayout updates store.
            // But let's try local rect calc.
            const rect = canvasRef.current?.getBoundingClientRect();
            if (rect) {
                if (isHorizontal) {
                    setMousePos(e.clientX - rect.left);
                } else {
                    setMousePos(e.clientY - rect.top);
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isHorizontal]);

    return (
        <canvas
            ref={canvasRef}
            className={`block bg-gray-50 border-gray-200 ${isHorizontal ? 'w-full h-[20px] border-b' : 'h-full w-[20px] border-r'}`}
        />
    );
};
