
import { Molecule } from '../molecular/Molecule';
import { Atom } from '../molecular/Atom';
import { Bond, BondType } from '../molecular/Bond';
import { Vec2D } from '../math/Vec2D';
import { StereoEngine } from './StereoEngine';

export function runStereoTest(): string {
    const log: string[] = [];
    const assert = (condition: boolean, msg: string) => {
        if (condition) log.push(`PASS: ${msg}`);
        else log.push(`FAIL: ${msg}`);
    };

    try {
        const mol = new Molecule();

        // Center C at 0,0
        const center = new Atom('C_center', 'C', new Vec2D(0, 0));
        mol.addAtom(center);

        // CONFIGURATION: 
        // We want 1 -> 2 -> 3 to be Clockwise (Up -> Right -> Left).
        // Priority 1: O (8) -> Place Up
        // Priority 2: N (7) -> Place Right
        // Priority 3: C (6) -> Place Left
        // Priority 4: H (1) -> Test Variable

        // 1. O (Priority 1) at (0, -10) -> Up
        const o = new Atom('O_1', 'O', new Vec2D(0, -10));
        mol.addAtom(o);
        mol.addBond(new Bond('b1', center.id, o.id, 1, BondType.SINGLE));

        // 2. N (Priority 2) at (10, 0) -> Right
        const n = new Atom('N_2', 'N', new Vec2D(10, 0));
        mol.addAtom(n);
        mol.addBond(new Bond('b2', center.id, n.id, 1, BondType.SINGLE));

        // 3. C (Priority 3) at (-10, 0) -> Left
        const c = new Atom('C_3', 'C', new Vec2D(-10, 0));
        mol.addAtom(c);
        mol.addBond(new Bond('b3', center.id, c.id, 1, BondType.SINGLE));

        // 4. H (Priority 4) - Case A: Wedged (Toward)
        const h = new Atom('H_4', 'H', new Vec2D(0, 10));
        mol.addAtom(h);
        const b4 = new Bond('b4', center.id, h.id, 1, BondType.WEDGE_SOLID);
        mol.addBond(b4);

        // Case A Analysis
        // 1(Up) -> 2(Right) -> 3(Left) is CW (R).
        // Group 4 (H) is Wedged (Toward) -> Flip -> S.
        const labelsA = StereoEngine.analyzeStereochemistry(mol);
        const resultA = labelsA.get(center.id);

        // Log detailed info if failure
        if (resultA !== 'S') {
            console.warn('Case A Failed. Details:', { resultA });
        }
        assert(resultA === 'S', `Case A (Wedged H): Expected S, Got ${resultA}`);

        // Case B: H Dashed (Away)
        b4.type = BondType.WEDGE_HASH;

        // Base is R. Group 4 (H) is Dashed (Back) -> Keep -> R.
        const labelsB = StereoEngine.analyzeStereochemistry(mol);
        const resultB = labelsB.get(center.id);
        assert(resultB === 'R', `Case B (Dashed H): Expected R, Got ${resultB}`);

    } catch (e: any) {
        log.push(`ERROR: ${e.message}`);
        console.error(e);
    }

    return log.join('\n');
}
