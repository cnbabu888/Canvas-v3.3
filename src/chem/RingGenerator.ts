import { Vec2D } from '../math/Vec2D';

export class RingGenerator {
    /**
     * Generates a regular polygon ring.
     * @param center - Center of the ring
     * @param radius - Radius (distance from center to atom)
     * @param sides - Number of atoms (3-8)
     * @param startAngle - Rotation offset in radians
     */
    static generateRing(center: Vec2D, radius: number, sides: number, startAngle: number = -Math.PI / 2): Vec2D[] {
        const points: Vec2D[] = [];
        const angleStep = (Math.PI * 2) / sides;

        for (let i = 0; i < sides; i++) {
            const angle = startAngle + i * angleStep;
            const x = center.x + radius * Math.cos(angle);
            const y = center.y + radius * Math.sin(angle);
            points.push(new Vec2D(x, y));
        }

        return points;
    }

    /**
     * Calculates the position for a ring spouted from a single atom.
     * The ring is placed such that the new bond bisects the exterior angle? 
     * Or simply extends outwards. Standard bond length ~40-50 units?
     * Let's assume a standard bond length.
     */
    static getSproutedRing(atomPos: Vec2D, angle: number, sides: number, bondLength: number = 50): Vec2D[] {
        // We want the ring to share "atomPos" as one vertex.
        // And the center of the ring should be along 'angle'.

        // Distance from vertex to center for a regular polygon with side length 's':
        // R = s / (2 * sin(PI/n))
        const radius = bondLength / (2 * Math.sin(Math.PI / sides));

        // The center is at a distance R from atomPos, along 'angle'.
        const center = new Vec2D(
            atomPos.x + radius * Math.cos(angle),
            atomPos.y + radius * Math.sin(angle)
        );

        // We need to orient the ring so one vertex is at atomPos.
        // The angle from center to atomPos is 'angle + PI'.
        // So startAngle for generation should align a vertex to (angle + PI).
        // Vertex k is at: center + R * cos(start + k*step).
        // We want one vertex to match atomPos.

        // Let's just create points relative to center with standard orientation, 
        // then rotate them so vertex 0 aligns with atomPos?
        // Actually, generateRing takes startAngle.
        // If we want vertex 0 to be at atomPos:
        // center + R * cos(start) = atomPos
        // angle_center_to_atom = atan2(atom.y-cy, atom.x-cx)
        // start = angle_center_to_atom

        const angleToAtom = Math.atan2(atomPos.y - center.y, atomPos.x - center.x);
        return this.generateRing(center, radius, sides, angleToAtom);
    }

    /**
     * Calculates points for a ring fused to an existing bond.
     * The ring shares atomA and atomB.
     */
    static getFusedRing(posA: Vec2D, posB: Vec2D, sides: number, bondLength: number = 50): Vec2D[] {
        // Bond is chord of the circle.
        // Midpoint of bond.
        const mid = new Vec2D((posA.x + posB.x) / 2, (posA.y + posB.y) / 2);

        // Distance from center to midpoint (apothem)
        // a = s / (2 * tan(PI/n))
        const apothem = bondLength / (2 * Math.tan(Math.PI / sides));

        // Direction perpendicular to bond.
        const dx = posB.x - posA.x;
        const dy = posB.y - posA.y;
        const angle = Math.atan2(dy, dx);

        // Two possible centers (one on each side).
        // Usually we want to sprout "outwards" away from existing molecule structure?
        // For MVP, let's just pick one side (e.g., -90 deg relative to bond vector).
        // Or toggle?
        const perpAngle = angle - Math.PI / 2;

        const center = new Vec2D(
            mid.x + apothem * Math.cos(perpAngle),
            mid.y + apothem * Math.sin(perpAngle)
        );

        // Radius
        const radius = bondLength / (2 * Math.sin(Math.PI / sides));

        // We need to align vertices such that two adjacent vertices match posA and posB.
        // Angle from center to posA.
        const angleToA = Math.atan2(posA.y - center.y, posA.x - center.x);

        // The angle step is 2PI/n. 
        // Generates points. One will match posA. The next (or prev) should match posB.
        return this.generateRing(center, radius, sides, angleToA);
    }
    static generateNaphthalene(center: Vec2D, radius: number): Vec2D[] {
        const dist = radius * Math.sqrt(3);
        // Left Ring
        const c1 = new Vec2D(center.x - dist / 2, center.y);
        // Right Ring
        const c2 = new Vec2D(center.x + dist / 2, center.y);

        // Angle PI/6 gives vertical side edges (standard chemical orientation)
        const r1 = this.generateRing(c1, radius, 6, Math.PI / 6);
        const r2 = this.generateRing(c2, radius, 6, Math.PI / 6);

        return [...r1, ...r2];
    }

    static generateAnthracene(center: Vec2D, radius: number): Vec2D[] {
        const dist = radius * Math.sqrt(3);
        // Left
        const c1 = new Vec2D(center.x - dist, center.y);
        // Center
        const c2 = new Vec2D(center.x, center.y);
        // Right
        const c3 = new Vec2D(center.x + dist, center.y);

        const r1 = this.generateRing(c1, radius, 6, Math.PI / 6);
        const r2 = this.generateRing(c2, radius, 6, Math.PI / 6);
        const r3 = this.generateRing(c3, radius, 6, Math.PI / 6);

        return [...r1, ...r2, ...r3];
    }
}
