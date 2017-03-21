import { CLEAR_QUERY_WAS_CLICKED } from '../actions';
import { Nodes }                   from '../types';
import { GenericCollectionAction } from '../types';
import { Selected }                from '../types';

export const collectionBasedTreeReducerGenerator = (collection = '', collectionBasedTreeReducer: any) => {
    const initstate: Nodes = {
        [-1]: {
            children:    undefined,
            dbid:        -1,
            expanded:    false,
            highlighted: false,
            mentioncount: 0,
            isfile:      false,
            name:        'root',
            parent:      undefined,
            selected:    Selected.None,
            query:      '',
            queryType:  ''
        }
    };
    return (state: Nodes = initstate, action: GenericCollectionAction, textSearchState: any) => {
        if (action.collection !== collection && action.type !== CLEAR_QUERY_WAS_CLICKED) {
            return state;
        }
        return collectionBasedTreeReducer(state, action, textSearchState);
    };
};
