import { CLOSE_REBUILD_DATABASE_DIALOG }    from '../authorized-actions';

export const closeRebuildDatabaseDialog = () => {
    return {
        type: CLOSE_REBUILD_DATABASE_DIALOG,
        payload: {}
    };
};
