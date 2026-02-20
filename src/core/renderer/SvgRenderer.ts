import { Atom } from '../../molecular/Atom';
import { Bond } from '../../molecular/Bond';

/**
 * SvgRenderer: Generates a standalone SVG string from the molecule.
 * This is distinct from the Canvas renderer, purely for export.
 */
export class SvgRenderer {

    static render(molecule: any, width: number = 800, height: number = 600): string {
        if (!molecule) return '';

        // 1. Calculate Bounding Box to center/scale
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        molecule.atoms.forEach((atom: Atom) => {
            if (atom.pos.x < minX) minX = atom.pos.x;
            if (atom.pos.y < minY) minY = atom.pos.y;
            if (atom.pos.x > maxX) maxX = atom.pos.x;
            if (atom.pos.y > maxY) maxY = atom.pos.y;
        });

        // Add padding
        const padding = 40; // World units
        minX -= padding; minY -= padding;
        maxX += padding; maxY += padding;

        const contentW = maxX - minX;
        const contentH = maxY - minY;

        // Preserve aspect ratio
        // We want to fit contentW/H into width/height
        // ViewBox will match content coordinates exactly
        // But we might want specific output size.
        // Let's just set ViewBox to the content bounds.

        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${contentW} ${contentH}" width="${width}" height="${height}" style="background-color: white;">\n`;

        // Styles
        svg += `  <style>
    .bond { stroke: #000; stroke-width: 2; stroke-linecap: round; }
    .atom-label { font-family: Arial, sans-serif; font-size: 14px; fill: #000; text-anchor: middle; dominant-baseline: middle; }
    .atom-bg { fill: white; }
  </style>\n`;

        // Bonds
        molecule.bonds.forEach((bond: Bond) => {
            const a = molecule.atoms.get(bond.atomA);
            const b = molecule.atoms.get(bond.atomB);
            if (a && b) {
                // Check order for multiline
                if (bond.order === 2) {
                    // Offset logic or simple double line
                    const normal = b.pos.sub(a.pos).rotate(Math.PI / 2).normalize().scale(3);
                    svg += `  <line x1="${a.pos.x + normal.x}" y1="${a.pos.y + normal.y}" x2="${b.pos.x + normal.x}" y2="${b.pos.y + normal.y}" class="bond" />\n`;
                    svg += `  <line x1="${a.pos.x - normal.x}" y1="${a.pos.y - normal.y}" x2="${b.pos.x - normal.x}" y2="${b.pos.y - normal.y}" class="bond" />\n`;
                } else if (bond.order === 3) {
                    svg += `  <line x1="${a.pos.x}" y1="${a.pos.y}" x2="${b.pos.x}" y2="${b.pos.y}" class="bond" />\n`;
                    const normal = b.pos.sub(a.pos).rotate(Math.PI / 2).normalize().scale(3.5);
                    svg += `  <line x1="${a.pos.x + normal.x}" y1="${a.pos.y + normal.y}" x2="${b.pos.x + normal.x}" y2="${b.pos.y + normal.y}" class="bond" />\n`;
                    svg += `  <line x1="${a.pos.x - normal.x}" y1="${a.pos.y - normal.y}" x2="${b.pos.x - normal.x}" y2="${b.pos.y - normal.y}" class="bond" />\n`;
                } else if (bond.type === 'WEDGE_SOLID') {
                    // Polygon
                    const perp = b.pos.sub(a.pos).rotate(Math.PI / 2).normalize().scale(3);
                    svg += `  <polygon points="${a.pos.x},${a.pos.y} ${b.pos.x + perp.x},${b.pos.y + perp.y} ${b.pos.x - perp.x},${b.pos.y - perp.y}" fill="black" />\n`;
                } else {
                    // Single
                    svg += `  <line x1="${a.pos.x}" y1="${a.pos.y}" x2="${b.pos.x}" y2="${b.pos.y}" class="bond" />\n`;
                }
            }
        });

        // Atoms
        molecule.atoms.forEach((atom: Atom) => {
            if (atom.element !== 'C') {
                // Draw white circle background to mask bonds
                svg += `  <circle cx="${atom.pos.x}" cy="${atom.pos.y}" r="8" class="atom-bg" />\n`;
                // Draw text
                svg += `  <text x="${atom.pos.x}" y="${atom.pos.y + 1}" class="atom-label">${atom.element}</text>\n`;
            }
        });

        svg += `</svg>`;
        return svg;
    }
}
