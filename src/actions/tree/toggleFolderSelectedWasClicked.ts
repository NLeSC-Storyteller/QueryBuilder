import { TOGGLE_FOLDER_SELECTED_WAS_CLICKED } from '../authorized-actions';

export const toggleFolderSelectedWasClicked = (collection: string, dbid: number) => {
    return {
        collection,
        type: TOGGLE_FOLDER_SELECTED_WAS_CLICKED,
        payload: { dbid }
    };
};
