import 'whatwg-fetch';

import { ROOT_RECEIVED }                from '../actions';
import { ROOT_REQUESTED }               from '../actions';
import { CHILDREN_RECEIVED }            from '../actions';
import { CHILDREN_REQUESTED }           from '../actions';
import { EXPAND_BUTTON_WAS_CLICKED }    from '../actions';
import { SELECTION_WAS_CLICKED }        from '../actions';
import { IGenericAction }               from '../actions';

import { SelectionState }               from '../interfaces';

import { INode }                        from '../components/Node';

const initstate: any = {};

export const nodesReducer = (nodes: any = initstate, action: IGenericAction) => {
    /*
        Updates the selection state of nodes based on the new selection state, 
        and does so for all children, grandchildren etc. recursively down the tree.
    */
    function recursiveUpdateSelectionStateDown(selectionID: number, newState: SelectionState ) {
        const selectedNode = nodes[selectionID];

        const childrenIDs: number[] = selectedNode.children;
        if (selectedNode.children && childrenIDs.length > 0) {
            childrenIDs.forEach((childID: number) => {
                nodes[childID] = Object.assign({}, nodes[childID], {selectionState: newState});
                recursiveUpdateSelectionStateDown(childID, newState);
            });
        }
    }

    /*
        Updates the selection state of nodes based on the new selection state, 
        and does so for all parents, grandparents etc. recursively up the tree.
    */
    function recursiveUpdateSelectionStateUp(selectionID : number) {
        const selectedNode = nodes[selectionID];

        const parentID = selectedNode.parent;
        if (parentID !== -1) {
            const parentNode = nodes[parentID];

            //The children of our parent are our siblings
            const siblingIDs = parentNode.children;

            /* Determine the new state of our parent. Either
                - Selected, if all siblings are selected
                - Partial, if some siblings are selected
                - Unselected, if no siblings are selected
            */
            let allSelected = true;
            let someSelected = false;

            siblingIDs.forEach((siblingID: number) => {
                const sibling = nodes[siblingID];
                if (sibling.selectionState === SelectionState.Unselected) {
                    allSelected = false;
                } else if (sibling.selectionState === SelectionState.Partial) {
                    allSelected = false;
                    someSelected = true;
                } else if (sibling.selectionState === SelectionState.Selected) {
                    someSelected = true;
                }
            });

            let newParentState = SelectionState.Unselected;
            if (allSelected) {
                newParentState = SelectionState.Selected;
            } else if (someSelected) {
                newParentState = SelectionState.Partial;
            }

            nodes[parentID] = Object.assign({}, nodes[parentID], {selectionState: newParentState});

            recursiveUpdateSelectionStateUp(parentID);
        }
    }

    switch (action.type) {
        case ROOT_RECEIVED:
            //RootRequestedThunk return point
            const root = action.payload.root;
            return { [root.id]: root };
        case ROOT_REQUESTED:
            console.error('Make a spinner or something');
            return nodes;
        case CHILDREN_RECEIVED:
            //ChildrenRequestedThunk return point
            const payloadNodes = action.payload.nodes;

            //Copy the parent node
            let oldParent = nodes[payloadNodes[0].parent];
            let newParent = Object.assign({}, oldParent);
            //With a deep copy of its children array.
            newParent.children = [];
            if (oldParent.children !== undefined) {
                oldParent.children.forEach((child: number) => {
                    newParent.children.push(child);
                });
            }

            //Add new nodes coming in to the state space.
            payloadNodes.forEach((node : INode) => {
                // Set the selection state for the new nodes based on the 
                // selection state of the parent (default is Unselected)
                if (newParent.selectionState === SelectionState.Selected) {
                    node.selectionState = SelectionState.Selected;
                }

                nodes[node.id] = node;
            });

            //Add new children coming in to the parent node.
            payloadNodes.forEach((node : INode) => {
                if (newParent.children === undefined) {
                    newParent.children = [];
                }
                newParent.children.push(node.id);
            });
            //And overwrite the old parent node
            nodes[payloadNodes[0].parent] = newParent;

            return nodes;
        case CHILDREN_REQUESTED:
            console.error('Make a spinner or something');
            return nodes;
        case EXPAND_BUTTON_WAS_CLICKED:
            const expandID = action.payload.id;

            nodes[expandID] = Object.assign({}, nodes[expandID], {isexpanded: !nodes[expandID].isexpanded});

            return nodes;
        case SELECTION_WAS_CLICKED:
            const selectionID = action.payload.id;
            const selectedNode = nodes[selectionID];

            //First, determine our own new state and set it
            let newTargetState = SelectionState.Unselected;
            if (selectedNode.selectionState === SelectionState.Unselected) {
                newTargetState = SelectionState.Selected;
            }
            nodes[selectionID] = Object.assign({}, nodes[selectionID], {selectionState: newTargetState});

            //Update parent recursively
            recursiveUpdateSelectionStateUp(selectionID);

            //Update children recursively
            recursiveUpdateSelectionStateDown(selectionID, newTargetState);

            return nodes;
        default: {
            return nodes;
        }
    }
};
