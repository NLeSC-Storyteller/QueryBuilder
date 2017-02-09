import { QUERY_TEXT_CHANGED }    from '../authorized-actions';

export const queryTextChanged = (newtext: string) => {
    return {
        type: QUERY_TEXT_CHANGED,
        payload: { newtext }
    };
};
