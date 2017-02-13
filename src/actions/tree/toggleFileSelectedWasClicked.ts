import { TOGGLE_FILE_SELECTED_WAS_CLICKED } from '../authorized-actions';

export const toggleFileSelectedWasClicked = (collection: string, dbid: number) => {
    return {
        collection,
        type: TOGGLE_FILE_SELECTED_WAS_CLICKED,
        payload: { dbid }
    };
};
