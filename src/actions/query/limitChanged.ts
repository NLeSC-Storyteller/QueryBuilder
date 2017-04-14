import { LIMIT_CHANGED }    from '../authorized-actions';

export const limitChanged = (mention_limit: number) => {
    return {
        type: LIMIT_CHANGED,
        payload: { mention_limit }
    };
};
