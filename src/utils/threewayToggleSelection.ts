import { Nodes }    from '../types';
import { Selected } from '../types';

export const threewayToggleSelection = (nodes: Nodes, dbid: number) => {
    const selected = nodes[dbid].selected;
    if (selected === Selected.None) {
        return {selected: Selected.All};
    } else if (selected === Selected.Partial) {
        return {selected: Selected.None};
    } else if (selected === Selected.All) {
        return {selected: Selected.None};
    } else {
        throw new Error('selection has unknown state.');
    }
};
