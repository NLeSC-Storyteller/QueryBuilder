import { STORE_QUERY_WAS_CLICKED }    from '../authorized-actions';

export const storeQueryWasClicked = (username: string, query: string, mention_limit: number) => {
    return {
        type: STORE_QUERY_WAS_CLICKED,
        payload: { username, query, mention_limit }
    };
};
