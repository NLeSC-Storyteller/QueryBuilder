import { STORE_QUERY_WAS_CLICKED }    from '../authorized-actions';

export const storeQueryWasClicked = (username: string, query: string) => {
    return {
        type: STORE_QUERY_WAS_CLICKED,
        payload: { username, query }
    };
};
