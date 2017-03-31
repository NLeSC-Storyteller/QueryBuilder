import { OPEN_REBUILD_DATABASE_DIALOG }    from '../authorized-actions';

export const openRebuildDatabaseDialog = () => {
    return {
        type: OPEN_REBUILD_DATABASE_DIALOG,
        payload: {}
    };
};
