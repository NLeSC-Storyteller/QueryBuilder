import { EXPAND_FOLDER_WAS_CLICKED } from '../authorized-actions';

export const expandFolderWasClicked = (collection: string, dbid: number) => {
    return {
        collection,
        type: EXPAND_FOLDER_WAS_CLICKED,
        payload: { dbid }
    };
};
