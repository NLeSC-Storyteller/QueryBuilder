import { CLOSE_BUILD_QUERY_DIALOG }    from '../authorized-actions';

export const closeBuildQueryDialog = () => {
    return {
        type: CLOSE_BUILD_QUERY_DIALOG,
        payload: {}
    };
};
