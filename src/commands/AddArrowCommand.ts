
import type { Arrow } from '../chem/Arrow';

export class AddArrowCommand {
    private molecule: any;
    private arrow: Arrow;

    constructor(molecule: any, arrow: Arrow) {
        this.molecule = molecule;
        this.arrow = arrow;
    }

    execute() {
        if (!this.molecule.arrows) {
            this.molecule.arrows = [];
        }
        this.molecule.arrows.push(this.arrow);
    }

    undo() {
        if (this.molecule.arrows) {
            const index = this.molecule.arrows.findIndex((a: Arrow) => a.id === this.arrow.id);
            if (index !== -1) {
                this.molecule.arrows.splice(index, 1);
            }
        }
    }
}
