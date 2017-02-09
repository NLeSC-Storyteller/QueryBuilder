import { OPEN_BUILD_QUERY_DIALOG }    from '../authorized-actions';

export const openBuildQueryDialog = () => {
    return {
        type: OPEN_BUILD_QUERY_DIALOG,
        payload: {}
    };
};
