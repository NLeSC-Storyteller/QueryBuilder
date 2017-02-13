import { OPEN_CLEAR_QUERY_DIALOG }    from '../authorized-actions';

export const openClearQueryDialog = () => {
    return {
        type: OPEN_CLEAR_QUERY_DIALOG,
        payload: {}
    };
};
