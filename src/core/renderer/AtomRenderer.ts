import { Atom } from '../../molecular/Atom';
import { Bond } from '../../molecular/Bond';
import { ChemUtils } from '../../chem/ChemUtils';

import type { CanvasStyle } from '../../styles/StyleManager';

export class AtomRenderer {
    static drawAtom(ctx: CanvasRenderingContext2D, atom: Atom, connectedBonds: Bond[], style: CanvasStyle) {
        const { x, y } = atom.pos;
        let bondOrderSum = 0;
        connectedBonds.forEach(b => bondOrderSum += b.order);

        const hCount = ChemUtils.getImplicitHydrogens(atom.element, bondOrderSum, atom.charge);

        ctx.fillStyle = style.color;
        ctx.strokeStyle = style.backgroundColor; // Halo matches bg
        ctx.lineWidth = style.bondWidth * 1.5; // Halo slightly thicker than bond? or fixed?

        // Font
        ctx.font = `bold ${style.atomFontSize}px ${style.atomFont}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Label Logic
        let label = atom.element;
        if (atom.element === 'C' && connectedBonds.length > 0 && hCount === 0 && atom.charge === 0) {
            // Carbon usually doesn't show label unless terminal or charged or specific
            // For MVP, let's show all non-carbon, or terminal carbons?
            // "Terminal atoms on the left... render labels in reverse"
            // Let's just draw everything for now, filtering C later if needed.
            // Requirement says "Render atom symbols". It doesn't say "don't render Carbon".
            // But typical drawing hides C.
            // Let's Hide C if it has bonds.
            return;
        }

        // Complex label construction
        // "Terminal atoms on the left... render labels in reverse (H3C)"
        // Simple heuristic: if x < average x of neighbors, it's on left?
        // Let's just default to standard center for now, or simple H placement.

        // Draw Text Halo (to clear bonds behind)
        ctx.strokeText(label, x, y);
        ctx.fillText(label, x, y);

        // Draw Hydrogens
        if (hCount > 0) {
            const hLabel = `H${hCount > 1 ? hCount : ''}`;
            const metrics = ctx.measureText(label);
            const offset = metrics.width / 2 + 2;

            // Subscript
            ctx.font = `${style.subscriptFontSize}px ${style.atomFont}`;
            ctx.fillText(hLabel, x + offset + 4, y + 4);
        }

        // Draw Charge
        if (atom.charge !== 0) {
            const chargeLabel = atom.charge > 0 ? '+' : '-'; // Simplified
            const metrics = ctx.measureText(label);
            const offset = metrics.width / 2 + 2;

            // Superscript
            ctx.font = `${style.subscriptFontSize}px ${style.atomFont}`;
            ctx.fillText(chargeLabel, x + offset + 4, y - 6);
        }
    }
}
