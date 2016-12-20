export enum SelectionState {
    Unselected,
    Partial,
    Selected,
}

export interface IDatabaseRecord {
    childof:        number;
    id:             number;
    isentity:       number;
    isinstance:     number;
    isleaf:         number;
    level:          number;
    mentioncount:   number;
    name:           string;
    url:            string;
}

// export interface INode {
//     childof: number;
//     id: number;
//     isentity: boolean;
//     isleaf: boolean;
//     isinstance: boolean;
//     level: number;
//     mentioncount: number;
//     name: string;
//     url: string;
//     isexpanded: boolean;
//     selectionState: SelectionState;
//     children: INode[];
// }

export interface IStore {
    nodes: any;
}
