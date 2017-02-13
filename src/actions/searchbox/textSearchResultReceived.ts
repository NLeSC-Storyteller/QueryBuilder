import { TEXT_SEARCH_RESULT_RECEIVED }    from '../authorized-actions';

export const textSearchResultReceived = (collection: string, dbIDs: number[]) => {
    return {
        collection,
        type: TEXT_SEARCH_RESULT_RECEIVED,
        payload: { dbIDs }
    };
};
