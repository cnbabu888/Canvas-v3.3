export type BondType =
    | 'SINGLE'
    | 'DOUBLE'
    | 'TRIPLE'
    | 'WEDGE_SOLID'
    | 'WEDGE_HASH'
    | 'WAVY'
    | 'DATIVE'
    | 'RESONANCE'
    | 'ZERO_ORDER'
    | 'BOLD'
    | 'HOLLOW_WEDGE'
    | 'QUADRUPLE'
    | 'HYDROGEN'
    | 'IONIC';

export const BondType = {
    SINGLE: 'SINGLE' as BondType,
    DOUBLE: 'DOUBLE' as BondType,
    TRIPLE: 'TRIPLE' as BondType,
    WEDGE_SOLID: 'WEDGE_SOLID' as BondType,
    WEDGE_HASH: 'WEDGE_HASH' as BondType,
    WAVY: 'WAVY' as BondType,
    DATIVE: 'DATIVE' as BondType,
    RESONANCE: 'RESONANCE' as BondType,
    ZERO_ORDER: 'ZERO_ORDER' as BondType,
    BOLD: 'BOLD' as BondType,
    HOLLOW_WEDGE: 'HOLLOW_WEDGE' as BondType,
    QUADRUPLE: 'QUADRUPLE' as BondType,
    HYDROGEN: 'HYDROGEN' as BondType,
    IONIC: 'IONIC' as BondType
};

export class Bond {
    id: string;
    atomA: string; // ID of atom A
    atomB: string; // ID of atom B
    order: number;
    type: BondType;

    constructor(id: string, atomA: string, atomB: string, order: number = 1, type: BondType = BondType.SINGLE) {
        this.id = id;
        this.atomA = atomA;
        this.atomB = atomB;
        this.order = order;
        this.type = type;
    }
}
