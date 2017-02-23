import { CLEAR_QUERY_WAS_CLICKED }      from '../actions';
import { INITIATE_BUILD_QUERY }         from '../actions';
import { STORE_QUERY_WAS_CLICKED }      from '../actions';
import { OPEN_BUILD_QUERY_DIALOG }      from '../actions';
import { OPEN_CLEAR_QUERY_DIALOG }      from '../actions';
import { CLOSE_BUILD_QUERY_DIALOG }     from '../actions';
import { CLOSE_CLEAR_QUERY_DIALOG }     from '../actions';
import { QUERY_TEXT_CHANGED }           from '../actions';

import { collections }    from '../config';
import { GenericAction }  from '../types';
import { Node }           from '../types';
import { Selected }       from '../types';

const initstate: any = {
    isQueryDialogOpen: false,
    selectedMentionCount: 0,
    queryString: ''
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

function createQueryString(state: any) : string {
    let result : string = '';

    if (state.lightentities && state.lightentities.length > 0) {
        result += ' --entityPhrase ';
        state.lightentities.forEach((entity: any) => {
            result += entity.name + ';';
        });
    }

    if (state.darkentities && state.darkentities.length > 0) {
        result += ' --entityPhrase ';
        state.darkentities.forEach((entity: any) => {
            result += entity.name + ';';
        });
    }

    if (state.concepts && state.concepts.length > 0) {
        result += ' --entityPhrase ';
        state.concepts.forEach((entity: any) => {
            result += entity.name + ';';
        });
    }

    if (state.events && state.events.length > 0) {
        result += ' --eventPhrase ';
        state.events.forEach((event: any) => {
            result += event.name + ';';
        });
    }

    if (state.authors && state.authors.length > 0) {
        result += ' --authorPhrase ';
        state.authors.forEach((author: any) => {
            result += author.name + ';';
        });
    }

    if (state.cited && state.cited.length > 0) {
        result += ' --authorPhrase ';
        state.cited.forEach((cited: any) => {
            result += cited.name + ';';
        });
    }

    if (state.topics && state.topics.length > 0) {
        result += ' --topic ';
        state.topics.forEach((topic: any) => {
            result += topic.name + ';';
        });
    }
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
    } else if (action.type === CLOSE_BUILD_QUERY_DIALOG) {
        return Object.assign({}, state.query, {isQueryBuildDialogOpen: false});
    } else if (action.type === CLOSE_CLEAR_QUERY_DIALOG) {
        return Object.assign({}, state.query, {isQueryClearDialogOpen: false});
    } else if (action.type === QUERY_TEXT_CHANGED) {
        const { newtext } = action.payload;
        return Object.assign({}, state.query, {queryString: newtext});
    } else if (action.type === STORE_QUERY_WAS_CLICKED) {
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
