
import { Molecule } from '../molecular/Molecule';
import { Vec2D } from '../math/Vec2D';

export class StructureOptimizer {

    static cleanLayout(molecule: Molecule, iterations: number = 50) {
        if (molecule.atoms.size < 2) return;

        // Simple Force-Directed Graph 
        // 1. Repulsion between all atoms
        // 2. Attraction (Springs) between bonded atoms

        const atoms = Array.from(molecule.atoms.values());
        const k_repulse = 10000;
        const k_spring = 0.5;
        const targetLen = 40; // Ideal bond length

        const dt = 0.5;

        // Temp storage for forces
        const forces = new Map<string, Vec2D>();

        for (let iter = 0; iter < iterations; iter++) {
            // Reset forces
            atoms.forEach(a => forces.set(a.id, new Vec2D(0, 0)));

            // 1. Repulsion ( Coulomb-like )
            for (let i = 0; i < atoms.length; i++) {
                for (let j = i + 1; j < atoms.length; j++) {
                    const a = atoms[i];
                    const b = atoms[j];
                    const diff = a.pos.sub(b.pos);
                    let dist = diff.mag();
                    if (dist < 1) dist = 1; // Avoid singularity

                    const f = diff.normalize().scale(k_repulse / (dist * dist));

                    forces.set(a.id, forces.get(a.id)!.add(f));
                    forces.set(b.id, forces.get(b.id)!.sub(f));
                }
            }

            // 2. Spring Forces ( Hooke's Law )
            molecule.bonds.forEach(bond => {
                const a = molecule.atoms.get(bond.atomA);
                const b = molecule.atoms.get(bond.atomB);
                if (a && b) {
                    const diff = b.pos.sub(a.pos);
                    const dist = diff.mag();
                    const displacement = dist - targetLen;

                    const f = diff.normalize().scale(k_spring * displacement);

                    forces.set(a.id, forces.get(a.id)!.add(f));
                    forces.set(b.id, forces.get(b.id)!.sub(f));
                }
            });

            // 3. Angular Constraints (Optional/Advanced - skipping for simple cleanup)
            // Just Repulsion + Spring usually gives decent minimal energy layout (spread out).

            // 4. Apply Forces
            atoms.forEach(a => {
                const f = forces.get(a.id)!;
                // Limit force
                if (f.mag() > 50) f.scale(50 / f.mag());

                a.pos = a.pos.add(f.scale(dt));
            });
        }

        // Re-center logic?
        // Optional: keep centroid stable or just let it float.
    }
}
