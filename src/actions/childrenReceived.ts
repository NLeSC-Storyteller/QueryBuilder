import { INewNode } from '../components/NewNode';
import { CHILDREN_RECEIVED }  from './authorized-actions';

export const childrenReceived = (nodes: INewNode[]) => {
    return {
        type: CHILDREN_RECEIVED,
        payload: { nodes }
    };
};
