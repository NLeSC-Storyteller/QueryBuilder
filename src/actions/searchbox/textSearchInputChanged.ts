import { TEXT_SEARCH_INPUT_CHANGED }    from '../authorized-actions';

export const textSearchInputChanged = (input: string) => {
    return {
        type: TEXT_SEARCH_INPUT_CHANGED,
        payload: { input }
    };
};
