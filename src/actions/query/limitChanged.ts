import { LIMIT_CHANGED }    from '../authorized-actions';

export const limitChanged = (limit: number) => {
    return {
        type: LIMIT_CHANGED,
        payload: { limit }
    };
};
