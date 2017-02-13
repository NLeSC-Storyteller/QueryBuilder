import { queryReducer }                         from './';
import { treeReducer }                          from './';
import { collectionBasedTreeReducerGenerator }  from './';
import { textSearchReducer }                    from './';

import { collections }                          from '../config';
import { GenericCollectionAction }              from '../types';

const overallInitstate: any = {};

/* Function needed to give only _part_ of the state to the individual trees, 
    but the _whole_ state to the queryReducer     
*/
export const combinedReducer = (state: any = overallInitstate, action: GenericCollectionAction) => {

    console.log(new Date().toISOString().slice(11, 19), action.type);

    const collectionReducers: any = {};
    collections.forEach((collection: string) => {
        collectionReducers[collection] = collectionBasedTreeReducerGenerator(collection, treeReducer);
    });

    const result : any = {};

    //Make a slice of the state accessible to each treeReducer
    Object.keys(collectionReducers).forEach((collectionElementKey : any) => {
        result[collectionElementKey] = collectionReducers[collectionElementKey](state[collectionElementKey],
                                                                                action,
                                                                                state.textSearch);
    });

    //These reducers need the whole state
    result.query = queryReducer(state, action);
    result.textSearch = textSearchReducer(state.textSearch, action);

    return result;
};
