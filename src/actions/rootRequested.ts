import { ROOT_REQUESTED } from './authorized-actions';

export const rootRequested = () => {
    return {
        type: ROOT_REQUESTED,
        payload: {}
    };
};
