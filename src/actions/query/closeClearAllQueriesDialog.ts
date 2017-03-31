import { CLOSE_CLEAR_ALL_QUERIES_DIALOG }    from '../authorized-actions';

export const closeClearAllQueriesDialog = () => {
    return {
        type: CLOSE_CLEAR_ALL_QUERIES_DIALOG,
        payload: {}
    };
};
