import { INITIATE_BUILD_QUERY }    from '../authorized-actions';

export const buildQueryIsNeeded = () => {
    return {
        type: INITIATE_BUILD_QUERY,
        payload: {}
    };
};
