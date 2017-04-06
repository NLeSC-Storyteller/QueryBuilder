import { USERNAME_TEXT_CHANGED }    from '../authorized-actions';

export const usernameTextChanged = (username: string) => {
    return {
        type: USERNAME_TEXT_CHANGED,
        payload: { username }
    };
};
