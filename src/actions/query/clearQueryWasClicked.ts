import { CLEAR_QUERY_WAS_CLICKED }    from '../authorized-actions';

export const clearQueryWasClicked = () => {
    return {
        type: CLEAR_QUERY_WAS_CLICKED,
        payload: {}
    };
};
