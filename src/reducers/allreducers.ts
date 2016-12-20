import { IGenericAction } from '../actions';
import { IStore }         from '../interfaces';
import { nodesReducer }   from '../reducers';

const initstate: IStore = {
    nodes: {}
};

export const allreducers = (state: IStore = initstate, action: IGenericAction) => {
    return {
        nodes: nodesReducer(state.nodes, action)
    };
};
