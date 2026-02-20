
import { Vec2D } from '../math/Vec2D';

export const ArrowType = {
    SYNTHESIS: 'SYNTHESIS',
    EQUILIBRIUM: 'EQUILIBRIUM',
    MECHANISM: 'MECHANISM',
    RETROSYNTHESIS: 'RETROSYNTHESIS'
} as const;
export type ArrowType = typeof ArrowType[keyof typeof ArrowType];

export interface Arrow {
    id: string;
    type: ArrowType;
    start: Vec2D;
    end: Vec2D;
    controlPoints?: Vec2D[]; // For curved arrows
    startObject?: { type: 'atom' | 'bond', id: string };
    endObject?: { type: 'atom' | 'bond', id: string };
    selected?: boolean;
}
