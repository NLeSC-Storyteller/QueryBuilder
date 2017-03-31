import { OPEN_CLEAR_ALL_QUERIES_DIALOG }    from '../authorized-actions';

export const openClearAllQueriesDialog = () => {
    return {
        type: OPEN_CLEAR_ALL_QUERIES_DIALOG,
        payload: {}
    };
};
