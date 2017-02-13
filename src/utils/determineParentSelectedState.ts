import { Nodes }    from '../types';
import { Selected } from '../types';

// the code snippet below is a function which will be used to traverse the tree
// and determine the state of the parent based on the selection state of a node 
// and its siblings
export const determineParentSelectedState = (nodes: Nodes, dbid: number) => {

    const dbidParent = nodes[dbid].parent;
    if (dbidParent !== undefined) {
        if (nodes[dbidParent].hasOwnProperty('children')) {
            const childIds = nodes[dbidParent].children;
            if (childIds !== undefined) {
                const selectedArray = childIds.map((childId: number) => {
                    return nodes[childId].selected;
                });
                const allSelected = selectedArray.every((selected: Selected) => {
                    return selected === Selected.All;
                });
                const allUnselected = selectedArray.every((selected: Selected) => {
                    return selected === Selected.None;
                });

                if (allSelected) {
                    return Selected.All;
                } else if (allUnselected) {
                    return Selected.None;
                } else {
                    return Selected.Partial;
                }
            } else {
                return Selected.None;
            }
        } else {
            return Selected.None;
        }
    } else {
        return Selected.None;
    }
};
