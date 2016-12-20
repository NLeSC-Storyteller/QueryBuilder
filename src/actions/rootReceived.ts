import { INewNode } from '../components/NewNode';
import { ROOT_RECEIVED }  from './authorized-actions';

export const rootReceived = (root: INewNode) => {
    return {
        type: ROOT_RECEIVED,
        payload: { root }
    };
};
