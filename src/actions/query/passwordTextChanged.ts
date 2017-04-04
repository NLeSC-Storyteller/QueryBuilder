import { PASSWORD_TEXT_CHANGED }    from '../authorized-actions';

export const passwordTextChanged = (password: string) => {
    return {
        type: PASSWORD_TEXT_CHANGED,
        payload: { password }
    };
};
