import { SELECTION_WAS_CLICKED } from './authorized-actions';

export const selectionWasClicked = (id: number) => {
    return {
        type: SELECTION_WAS_CLICKED,
        payload: { id }
    };
};
