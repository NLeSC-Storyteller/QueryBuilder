import { CLEAR_QUERY_WAS_CLICKED }          from '../actions';
import { INITIATE_BUILD_QUERY }             from '../actions';
import { STORE_QUERY_WAS_CLICKED }          from '../actions';
import { OPEN_BUILD_QUERY_DIALOG }          from '../actions';
import { OPEN_CLEAR_QUERY_DIALOG }          from '../actions';
import { CLOSE_BUILD_QUERY_DIALOG }         from '../actions';
import { CLOSE_CLEAR_QUERY_DIALOG }         from '../actions';
import { QUERY_TEXT_CHANGED }               from '../actions';
import { CLEAR_ALL_QUERIES_WAS_CLICKED }    from '../actions';
import { REBUILD_DATABASE_WAS_CLICKED }     from '../actions';
import { OPEN_CLEAR_ALL_QUERIES_DIALOG }    from '../actions';
import { CLOSE_CLEAR_ALL_QUERIES_DIALOG }   from '../actions';
import { OPEN_REBUILD_DATABASE_DIALOG }     from '../actions';
import { CLOSE_REBUILD_DATABASE_DIALOG }    from '../actions';
import { PASSWORD_TEXT_CHANGED }            from '../actions';
import { USERNAME_TEXT_CHANGED }            from '../actions';
import { LIMIT_CHANGED }                    from '../actions';

import { collections }    from '../config';
import { GenericAction }  from '../types';
import { Node }           from '../types';
import { Selected }       from '../types';

const initstate: any = {
    isQueryBuildDialogOpen: false,
    isQueryClearDialogOpen: false,
    isClearAllQueriesDialogOpen: false,
    isRebuildDatabaseDialogOpen: false,
    selectedMentionCount: 0,
    username: 'defaultuser',
    queryString: '',
    mention_limit: 100
};

function aggregateSelected(nodes : any, node: Node) : Node[] {
    if (node.selected === Selected.All) {
        return [node];
    } else if (node.selected === Selected.None) {
        return [];
    } else { // selectionState must be partial
        const childIDs = node.children;

        let result : Node[] = [];
        if (! childIDs) {
          result = [];
        } else {
          childIDs.forEach((childID: number) => {
              const childNode = nodes[childID];
              result = result.concat(aggregateSelected(nodes, childNode));
          });
        }

        return result;
    }
}

function countMentions(state: any) : number {
    const counts: number[] = [0];

    collections.forEach((collection: string) => {
        if (state[collection].length > 0) {
            let temp = 0;
            state[collection].forEach((thing: any) => {
                temp += thing.mentioncount;
            });
            counts.push(temp);
        }
    });

    const min = counts.filter((x: any) => { return x !== 0; })
        .reduce((a: any, b: any) => { return Math.min(a, b); }, Infinity);

    const max = counts.reduce((a: any, b: any) => { return Math.max(a, b); }, -Infinity);

    if (min < max) {
        return -min;
    } else {
        return max;
    }
}

function getTypesFromSlice(stateSlice: any) : string[] {
    const types : string[] = [];
    stateSlice.forEach((entity: any) => {
        if (types.indexOf(entity.queryType) < 0) {
            types.push(entity.queryType);
        }
    });

    return types;
}

function concatQueriesOfType(stateSlice: any, type: string) : string {
    let result : string = '';

    stateSlice.forEach((entity: any) => {
        if (entity.queryType === type) {
            result += ' ' + entity.query + ';';
        }
    });

    return result;
}

function createSingleTypeQueryString(stateSlice: any) : string {
    let result : string = '';

    if (stateSlice && stateSlice.length > 0) {
        const types : string[] = getTypesFromSlice(stateSlice);

        types.forEach((type: string) => {
            result += ' --' + type;
            result += concatQueriesOfType(stateSlice, type);
        });
    }

    return result;
}

function createQueryString(state: any) : string {
    let result : string = '';
    result += createSingleTypeQueryString(state.light);
    result += createSingleTypeQueryString(state.dark);
    result += createSingleTypeQueryString(state.concepts);
    result += createSingleTypeQueryString(state.events);
    result += createSingleTypeQueryString(state.authors);
    result += createSingleTypeQueryString(state.cited);
    result += createSingleTypeQueryString(state.topics);
    result += createSingleTypeQueryString(state.perspectives);

    return result;
}

export const queryReducer = (state: any = initstate, action: GenericAction) => {
    if (action.type === CLEAR_QUERY_WAS_CLICKED) {
        return Object.assign({}, initstate);
    } else if (action.type === INITIATE_BUILD_QUERY) {
        const newquery = Object.assign({}, state.query);

        collections.forEach((collection: string) => {
            newquery[collection] = aggregateSelected(state[collection], state[collection][-1]);
        });

        newquery.selectedMentionCount = countMentions(newquery);
        newquery.queryString = createQueryString(newquery);

        return newquery;
    } else if (action.type === OPEN_BUILD_QUERY_DIALOG) {
        return Object.assign({}, state.query, {isQueryBuildDialogOpen: true});
    } else if (action.type === OPEN_CLEAR_QUERY_DIALOG) {
        return Object.assign({}, state.query, {isQueryClearDialogOpen: true});
    } else if (action.type === OPEN_CLEAR_ALL_QUERIES_DIALOG) {
        return Object.assign({}, state.query, {isClearAllQueriesDialogOpen: true});
    } else if (action.type === OPEN_REBUILD_DATABASE_DIALOG) {
        return Object.assign({}, state.query, {isRebuildDatabaseDialogOpen: true});
    } else if (action.type === CLOSE_BUILD_QUERY_DIALOG) {
        return Object.assign({}, state.query, {isQueryBuildDialogOpen: false});
    } else if (action.type === CLOSE_CLEAR_QUERY_DIALOG) {
        return Object.assign({}, state.query, {isQueryClearDialogOpen: false});
    } else if (action.type === CLOSE_CLEAR_ALL_QUERIES_DIALOG) {
        return Object.assign({}, state.query, {isClearAllQueriesDialogOpen: false});
    } else if (action.type === CLOSE_REBUILD_DATABASE_DIALOG) {
        return Object.assign({}, state.query, {isRebuildDatabaseDialogOpen: false});
    } else if (action.type === QUERY_TEXT_CHANGED) {
        const { newtext } = action.payload;
        return Object.assign({}, state.query, {queryString: newtext});
    } else if (action.type === PASSWORD_TEXT_CHANGED) {
        const { password } = action.payload;
        return Object.assign({}, state.query, {password});
    } else if (action.type === USERNAME_TEXT_CHANGED) {
        const { username } = action.payload;
        return Object.assign({}, state.query, {username});
    } else if (action.type === LIMIT_CHANGED) {
        const { mention_limit } = action.payload;
        return Object.assign({}, state.query, {mention_limit});
    } else if (action.type === STORE_QUERY_WAS_CLICKED) {
        //Needs something done, like a spinner or something.
        return state.query;
    } else if (action.type === CLEAR_ALL_QUERIES_WAS_CLICKED) {
        //Needs something done, like a spinner or something.
        return state.query;
    } else if (action.type === REBUILD_DATABASE_WAS_CLICKED) {
        //Needs something done, like a spinner or something.
        return state.query;
    } else {
        if (!state.query || !state.query.queryString) {
            return Object.assign({}, initstate);
        } else {
            return state.query;
        }
    }
};
