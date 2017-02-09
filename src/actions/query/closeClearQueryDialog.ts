import { CLOSE_CLEAR_QUERY_DIALOG }    from '../authorized-actions';

export const closeClearQueryDialog = () => {
    return {
        type: CLOSE_CLEAR_QUERY_DIALOG,
        payload: {}
    };
};
