import { Nodes }                from '../../types';
import { CHILDREN_RECEIVED }    from '../authorized-actions';

export const childrenReceived = (collection: string, nodes: Nodes) => {
    return {
        collection,
        type: CHILDREN_RECEIVED,
        payload: { nodes }
    };
};
