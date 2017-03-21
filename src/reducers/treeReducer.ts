import { CHILDREN_RECEIVED }                  from '../actions';
import { CHILDREN_REQUESTED }                 from '../actions';
import { CLEAR_QUERY_WAS_CLICKED }            from '../actions';
import { COLLAPSE_FOLDER_WAS_CLICKED }        from '../actions';
import { EXPAND_FOLDER_WAS_CLICKED }          from '../actions';
import { TOGGLE_FILE_SELECTED_WAS_CLICKED }   from '../actions';
import { TOGGLE_FOLDER_SELECTED_WAS_CLICKED } from '../actions';
import { TEXT_SEARCH_RESULT_RECEIVED }        from '../actions';

import { Node }                               from '../types';
import { Nodes }                              from '../types';
import { GenericCollectionAction }            from '../types';
import { Selected }                           from '../types';
import { deepCopyWithChange }                 from '../utils';
import { threewayToggleSelection }            from '../utils';
import { applySelectionStateDownward }        from '../utils';
import { propagateSelectionStateUpward }      from '../utils';

const initstate: Nodes = {
    [-1]: {
        children:    undefined,
        dbid:        -1,
        expanded:    false,
        highlighted: false,
        isfile:      false,
        mentioncount: 0,
        name:        'root',
        parent:      undefined,
        selected:    Selected.None,
        query:       '',
        queryType:   ''
    }
};

export const treeReducer = (nodes: Nodes = initstate, action: GenericCollectionAction, textSearchState: any) => {

    if (action.type === CHILDREN_RECEIVED) {
        const payloadChildren = action.payload.nodes;
        const dbidParent = payloadChildren[0].parent;

        //Copy the parent node
        const oldParent = nodes[dbidParent];
        const newParent = Object.assign({}, oldParent);

        //With a deep copy of its children array.
        newParent.children = [];
        if (oldParent.hasOwnProperty('children') && oldParent.children !== undefined) {
            newParent.children = [...oldParent.children];
        }

        // Add the dbid of each payloadChild to the parent's list of children
        payloadChildren.forEach((payloadChild: Node) => {
            if (newParent.children === undefined) {
                newParent.children = [];
            }
            newParent.children.push(payloadChild.dbid);
        });

        let newNodes = Object.assign({}, nodes, { [dbidParent]: newParent});

        // Finally, the payloadChildren need to be added to the list of
        // nodes, using the dbid of the payloadNode as the key.
        payloadChildren.forEach((payloadChild: Node) => {
            newNodes[payloadChild.dbid] = payloadChild;

            // By default not highlighted, so we only have to set the highlighted state if needed   
            const highlightedIDs = textSearchState.textSearchResults[action.collection];
            if ( highlightedIDs && highlightedIDs.indexOf(payloadChild.dbid) >= 0) {
                newNodes[payloadChild.dbid] = Object.assign({}, newNodes[payloadChild.dbid], {highlighted: true});
            }
        });

        const { selected } = nodes[dbidParent];
        newNodes = applySelectionStateDownward(newNodes, dbidParent, selected);

        return newNodes;

    } else if (action.type === CHILDREN_REQUESTED) {
        return nodes;

    } else if (action.type === EXPAND_FOLDER_WAS_CLICKED) {

        return deepCopyWithChange(nodes, action.payload.dbid, {expanded: true});

    } else if (action.type === COLLAPSE_FOLDER_WAS_CLICKED) {

        return deepCopyWithChange(nodes, action.payload.dbid, {expanded: false});

    } else if (action.type === TOGGLE_FILE_SELECTED_WAS_CLICKED) {

        const { dbid } = action.payload;
        const change = threewayToggleSelection(nodes, dbid);
        nodes = deepCopyWithChange(nodes, dbid, change);
        nodes = propagateSelectionStateUpward(nodes, dbid);
        return nodes;

    } else if (action.type === TOGGLE_FOLDER_SELECTED_WAS_CLICKED) {

        const { dbid } = action.payload;
        const change = threewayToggleSelection(nodes, dbid);
        nodes = deepCopyWithChange(nodes, action.payload.dbid, change);
        nodes = applySelectionStateDownward(nodes, dbid, change.selected);
        nodes = propagateSelectionStateUpward(nodes, dbid);
        return nodes;
    } else if (action.type === CLEAR_QUERY_WAS_CLICKED) {

        const change = { selected: Selected.None };
        nodes = deepCopyWithChange(nodes, -1, change);
        nodes = applySelectionStateDownward(nodes, -1, change.selected);
        return nodes;
    } else if (action.type === TEXT_SEARCH_RESULT_RECEIVED) {

        const { dbIDs } = action.payload;
        const newNodes = Object.assign({}, nodes);

        Object.keys(nodes).forEach((key: any) => {
            const node = nodes[key];
            newNodes[key] = Object.assign({}, node, {highlighted: false});
        });

        dbIDs.forEach((dbid: number) => {
            const node = nodes[dbid];
            if (node !== undefined) {
                newNodes[dbid] = Object.assign({}, node, {highlighted: true});
            }
        });

        return newNodes;

    } else {
        return nodes;
    }
};
