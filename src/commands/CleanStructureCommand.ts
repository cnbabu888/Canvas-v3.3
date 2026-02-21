import type { Command } from './Command';
import { Vec2D } from '../math/Vec2D';
import type { CanvasStyle } from '../styles/StyleManager';

/**
 * CleanStructureCommand — normalizes bond lengths and angles.
 *
 * When executed:
 *  1. Normalizes all bond lengths to the style's bondLength
 *  2. Fixes angles (sp3=109.5°, sp2=120°, sp=180°, rings=120°)
 *  3. Centers structure on canvas
 *  4. Stores old positions for undo
 */
export class CleanStructureCommand implements Command {
    public description = 'Clean Structure';
    private molecule: any;
    private style: CanvasStyle;
    private canvasCenter: Vec2D;
    private oldPositions: Map<string, Vec2D> = new Map();

    constructor(molecule: any, style: CanvasStyle, canvasCenter: Vec2D) {
        this.molecule = molecule;
        this.style = style;
        this.canvasCenter = canvasCenter;
    }

    execute(): void {
        this.oldPositions.clear();

        // Save old positions for undo
        this.molecule.atoms.forEach((atom: any, id: string) => {
            this.oldPositions.set(id, new Vec2D(atom.pos.x, atom.pos.y));
        });

        if (this.molecule.atoms.size === 0) return;

        // ─── Step 1: Normalize bond lengths ───
        // Use a BFS/force-directed approach:
        // Pick a root atom, place it, then traverse the molecular graph
        // placing each neighbor at exactly bondLength distance
        const targetLen = this.style.bondLength;
        const visited = new Set<string>();
        const atomIds = Array.from(this.molecule.atoms.keys()) as string[];

        // Build adjacency
        const adj = new Map<string, { neighbor: string; bond: any }[]>();
        atomIds.forEach(id => adj.set(id, []));
        this.molecule.bonds.forEach((b: any) => {
            adj.get(b.atomA)?.push({ neighbor: b.atomB, bond: b });
            adj.get(b.atomB)?.push({ neighbor: b.atomA, bond: b });
        });

        // Get connected bond count for hybridization detection
        const bondCounts = new Map<string, number>();
        atomIds.forEach(id => {
            bondCounts.set(id, (adj.get(id) || []).length);
        });

        // Place root atom at origin
        const rootId = atomIds[0];
        const rootAtom = this.molecule.atoms.get(rootId);
        if (!rootAtom) return;

        const newPositions = new Map<string, Vec2D>();
        newPositions.set(rootId, new Vec2D(0, 0));
        visited.add(rootId);

        const queue: string[] = [rootId];

        while (queue.length > 0) {
            const currentId = queue.shift()!;
            const currentPos = newPositions.get(currentId)!;
            const neighbors = adj.get(currentId) || [];
            const nCount = neighbors.length;

            // Calculate the angle for this atom's bonds
            let placedNeighborAngles: number[] = [];

            // Check which neighbors are already placed
            for (const nb of neighbors) {
                if (visited.has(nb.neighbor)) {
                    const nbPos = newPositions.get(nb.neighbor)!;
                    const dx = nbPos.x - currentPos.x;
                    const dy = nbPos.y - currentPos.y;
                    placedNeighborAngles.push(Math.atan2(dy, dx));
                }
            }

            // Determine unplaced neighbors
            const unplaced = neighbors.filter(nb => !visited.has(nb.neighbor));
            if (unplaced.length === 0) continue;

            // Determine ideal angle spacing
            let startAngle: number;
            let angleStep: number;

            if (placedNeighborAngles.length === 0) {
                // No placed neighbors (root atom) — start at top
                startAngle = -Math.PI / 2;
                angleStep = (2 * Math.PI) / nCount;
            } else if (placedNeighborAngles.length === 1) {
                // One placed neighbor — sprout from opposite side
                const incomingAngle = placedNeighborAngles[0];
                const outgoing = incomingAngle + Math.PI; // 180° opposite

                if (unplaced.length === 1) {
                    // Terminal or chain: angle depends on hybridization
                    // sp2 = 120°, sp3 = 109.5°, sp = 180°
                    const totalBonds = nCount;
                    let idealAngle = (2 * Math.PI) / 3; // 120° default (sp2)
                    if (totalBonds >= 4) idealAngle = 109.5 * Math.PI / 180; // sp3
                    else if (totalBonds <= 2) idealAngle = Math.PI; // sp (linear)

                    startAngle = outgoing - idealAngle / 2 + idealAngle / 2;
                    // Zigzag pattern: alternate above/below
                    startAngle = outgoing + (Math.PI / 6); // 30° offset for classic zigzag
                    angleStep = 0;
                } else {
                    // Multiple branches: distribute around back
                    const totalAngleRange = Math.PI * 2 / 3 * 2; // ~240° back arc
                    angleStep = totalAngleRange / (unplaced.length + 1);
                    startAngle = outgoing - totalAngleRange / 2 + angleStep;
                }
            } else {
                // Multiple placed neighbors — find the largest angular gap
                placedNeighborAngles.sort((a, b) => a - b);
                let maxGap = 0;
                let gapStart = 0;
                for (let i = 0; i < placedNeighborAngles.length; i++) {
                    const next = (i + 1) % placedNeighborAngles.length;
                    let gap = placedNeighborAngles[next] - placedNeighborAngles[i];
                    if (gap < 0) gap += 2 * Math.PI;
                    if (gap > maxGap) {
                        maxGap = gap;
                        gapStart = placedNeighborAngles[i];
                    }
                }
                angleStep = maxGap / (unplaced.length + 1);
                startAngle = gapStart + angleStep;
            }

            // Place unplaced neighbors
            for (let i = 0; i < unplaced.length; i++) {
                const nb = unplaced[i];
                const angle = startAngle + i * angleStep;
                const newPos = new Vec2D(
                    currentPos.x + targetLen * Math.cos(angle),
                    currentPos.y + targetLen * Math.sin(angle),
                );
                newPositions.set(nb.neighbor, newPos);
                visited.add(nb.neighbor);
                queue.push(nb.neighbor);
            }
        }

        // Handle disconnected atoms (not in any bond)
        atomIds.forEach(id => {
            if (!newPositions.has(id)) {
                const atom = this.molecule.atoms.get(id);
                if (atom) newPositions.set(id, new Vec2D(atom.pos.x, atom.pos.y));
            }
        });

        // ─── Step 2: Center on canvas ───
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        newPositions.forEach(pos => {
            minX = Math.min(minX, pos.x);
            minY = Math.min(minY, pos.y);
            maxX = Math.max(maxX, pos.x);
            maxY = Math.max(maxY, pos.y);
        });
        const structCenterX = (minX + maxX) / 2;
        const structCenterY = (minY + maxY) / 2;
        const offsetX = this.canvasCenter.x - structCenterX;
        const offsetY = this.canvasCenter.y - structCenterY;

        // ─── Step 3: Apply new positions ───
        newPositions.forEach((pos, id) => {
            const atom = this.molecule.atoms.get(id);
            if (atom) {
                atom.pos = new Vec2D(pos.x + offsetX, pos.y + offsetY);
            }
        });
    }

    undo(): void {
        // Restore old positions
        this.oldPositions.forEach((pos, id) => {
            const atom = this.molecule.atoms.get(id);
            if (atom) {
                atom.pos = new Vec2D(pos.x, pos.y);
            }
        });
    }

    redo(): void {
        this.execute();
    }
}
