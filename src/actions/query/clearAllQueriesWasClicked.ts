import { CLEAR_ALL_QUERIES_WAS_CLICKED } from '../authorized-actions';

export const clearAllQueriesWasClicked = () => {
    return {
        type: CLEAR_ALL_QUERIES_WAS_CLICKED,
        payload: { }
    };
};
