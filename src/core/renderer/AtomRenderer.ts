import { Atom } from '../../molecular/Atom';
import { Bond } from '../../molecular/Bond';
import { ChemUtils } from '../../chem/ChemUtils';

import { CPK_COLORS } from '../../styles/StyleManager';
import type { CanvasStyle } from '../../styles/StyleManager';

export class AtomRenderer {
    static drawAtom(ctx: CanvasRenderingContext2D, atom: Atom, connectedBonds: Bond[], style: CanvasStyle) {
        const { x, y } = atom.pos;
        let bondOrderSum = 0;
        connectedBonds.forEach(b => bondOrderSum += b.order);

        const hCount = ChemUtils.getImplicitHydrogens(atom.element, bondOrderSum, atom.charge);

        // 1. Determine if we should draw the label at all
        let shouldDraw = true;

        // Hide standard backbone Carbons
        if (atom.element === 'C' && connectedBonds.length > 0 && atom.charge === 0) {
            shouldDraw = false;
        }

        if (!shouldDraw) return;

        // 2. Construct the single string label (e.g., "OH", "NH2")
        let mainLabel = atom.element;
        let subLabel = '';

        if (hCount > 0) {
            mainLabel += 'H';
            if (hCount > 1) {
                subLabel = hCount.toString();
            }
        }

        // 3. Draw the combined Text with Halos
        ctx.font = `bold ${style.atomFontSize}px ${style.atomFont}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Custom Coloring check
        let atomColor = style.color;
        if (style.colorByElement && atom.element !== 'C' && atom.element !== 'H') {
            atomColor = CPK_COLORS[atom.element] || style.color;
        }

        ctx.fillStyle = atomColor;
        ctx.strokeStyle = style.backgroundColor;
        ctx.lineWidth = style.marginWidth || 3; // Clear precise halo

        // Draw Main Label (element + H if any)
        ctx.strokeText(mainLabel, x, y);
        ctx.fillText(mainLabel, x, y);

        // Draw Subscripts (e.g., the '2' in NH2)
        if (subLabel) {
            const metrics = ctx.measureText(mainLabel);
            const offset = (metrics.width / 2) + 1;

            ctx.font = `bold ${style.subscriptFontSize}px ${style.atomFont}`;
            ctx.strokeText(subLabel, x + offset + 3, y + 4);
            ctx.fillText(subLabel, x + offset + 3, y + 4);
        }

        // Draw Charge
        if (atom.charge !== 0) {
            const chargeLabel = atom.charge > 0 ? '+' : '-';

            // Calculate offset based on whether we drew a subscript or just main text
            ctx.font = `bold ${style.atomFontSize}px ${style.atomFont}`;
            let offset = ctx.measureText(mainLabel).width / 2;
            if (subLabel) {
                ctx.font = `bold ${style.subscriptFontSize}px ${style.atomFont}`;
                offset += ctx.measureText(subLabel).width + 2;
            }

            ctx.font = `bold ${style.subscriptFontSize}px ${style.atomFont}`;
            ctx.strokeText(chargeLabel, x + offset + 4, y - 6);
            ctx.fillText(chargeLabel, x + offset + 4, y - 6);
        }
    }
}
