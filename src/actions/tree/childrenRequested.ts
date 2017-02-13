import { CHILDREN_REQUESTED } from '../authorized-actions';

export const childrenRequested = (collection: string, dbid: number) => {
    return {
        collection,
        type: CHILDREN_REQUESTED,
        payload: { dbid }
    };
};
