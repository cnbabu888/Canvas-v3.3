import { Molecule } from '../molecular/Molecule';
import { Vec2D } from '../math/Vec2D';

export class StructureOptimizer {
    /**
     * Attempts to normalize the 2D layout of a molecule by snapping bond lengths
     * to the targetLength and quantizing angles to standard chemical increments (30°, 60°, 90°, 120°).
     * Maintains relative topology by performing a BFS from a central atom.
     */
    static cleanLayout(molecule: Molecule, targetLength: number) {
        if (molecule.atoms.size === 0) return;

        // 1. Find the starting atom (most connected, or just first)
        let rootNodeId = Array.from(molecule.atoms.keys())[0];
        let maxBonds = 0;

        const adjacency = new Map<string, string[]>();
        molecule.atoms.forEach((_, id) => adjacency.set(id, []));

        molecule.bonds.forEach((bond) => {
            adjacency.get(bond.atomA)?.push(bond.atomB);
            adjacency.get(bond.atomB)?.push(bond.atomA);
        });

        adjacency.forEach((neighbors, id) => {
            if (neighbors.length > maxBonds) {
                maxBonds = neighbors.length;
                rootNodeId = id;
            }
        });

        // 2. BFS Traversal & Placement
        const newPositions = new Map<string, Vec2D>();
        const visited = new Set<string>();
        const queue: string[] = [];

        // Center on screen root initially
        const rootAtom = molecule.atoms.get(rootNodeId)!;
        newPositions.set(rootNodeId, rootAtom.pos.clone());
        visited.add(rootNodeId);
        queue.push(rootNodeId);

        while (queue.length > 0) {
            const currId = queue.shift()!;
            const currPos = newPositions.get(currId)!;
            const neighbors = adjacency.get(currId) || [];

            let unvisitedNeighbors = neighbors.filter(id => !visited.has(id));
            if (unvisitedNeighbors.length === 0) continue;

            const baseAtom = molecule.atoms.get(currId)!;

            unvisitedNeighbors.forEach((neighborId) => {
                const neighborAtom = molecule.atoms.get(neighborId)!;

                // Calculate current angle
                const dx = neighborAtom.pos.x - baseAtom.pos.x;
                const dy = neighborAtom.pos.y - baseAtom.pos.y;
                let currentAngle = Math.atan2(dy, dx);

                // Snap angle to nearest 30 degrees (Math.PI / 6)
                const snapIncrement = Math.PI / 6;
                let snappedAngle = Math.round(currentAngle / snapIncrement) * snapIncrement;

                // Position at exact target length
                const nx = currPos.x + Math.cos(snappedAngle) * targetLength;
                const ny = currPos.y + Math.sin(snappedAngle) * targetLength;

                newPositions.set(neighborId, new Vec2D(nx, ny));
                visited.add(neighborId);
                queue.push(neighborId);
            });
        }

        // 3. Center whole structure
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        newPositions.forEach(pos => {
            if (pos.x < minX) minX = pos.x;
            if (pos.x > maxX) maxX = pos.x;
            if (pos.y < minY) minY = pos.y;
            if (pos.y > maxY) maxY = pos.y;
        });

        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;

        const centeredPositions = new Map<string, Vec2D>();
        newPositions.forEach((pos, id) => {
            centeredPositions.set(id, new Vec2D(pos.x - cx, pos.y - cy));
        });

        return centeredPositions;
    }
}
