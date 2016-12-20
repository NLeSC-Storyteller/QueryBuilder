import { CHILDREN_REQUESTED } from './authorized-actions';

export const childrenRequested = () => {
    return {
        type: CHILDREN_REQUESTED,
        payload: {  }
    };
};
