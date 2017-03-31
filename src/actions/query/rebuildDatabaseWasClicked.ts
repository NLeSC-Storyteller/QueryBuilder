import { REBUILD_DATABASE_WAS_CLICKED } from '../authorized-actions';

export const rebuildDatabaseWasClicked = () => {
    return {
        type: REBUILD_DATABASE_WAS_CLICKED,
        payload: { }
    };
};
