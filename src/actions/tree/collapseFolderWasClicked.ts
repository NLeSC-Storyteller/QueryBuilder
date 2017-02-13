import { COLLAPSE_FOLDER_WAS_CLICKED } from '../authorized-actions';

export const collapseFolderWasClicked = (collection: string, dbid: number) => {
    return {
        collection,
        type: COLLAPSE_FOLDER_WAS_CLICKED,
        payload: { dbid }
    };
};
