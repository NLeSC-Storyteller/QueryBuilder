import { Nodes }             from '../types';
import { Selected }          from '../types';
import { deepCopyWithChange} from '../utils';

export const applySelectionStateDownward = (nodes: Nodes, dbid: number, selected: Selected): Nodes => {

    const childIds = nodes[dbid].children;
    if (childIds !== undefined) {
        childIds.forEach((childId: number) => {
            nodes = deepCopyWithChange(nodes, childId, {selected});
            nodes = applySelectionStateDownward(nodes, childId, selected);
        });
    }
    return nodes;
};
