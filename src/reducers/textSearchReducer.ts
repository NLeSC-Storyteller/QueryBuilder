import { TEXT_SEARCH_INPUT_CHANGED }    from '../actions';
import { TEXT_SEARCH_RESULT_RECEIVED }  from '../actions';
import { GenericCollectionAction }      from '../types';

const initstate: any = {
    textSearchString: '',
    textSearchResults: {}
};

export const textSearchReducer = (state: any = initstate, action: GenericCollectionAction) => {
    if (action.type === TEXT_SEARCH_INPUT_CHANGED) {

      const { input } = action.payload;
      return Object.assign({}, state, {textSearchString: input});
    } else if (action.type === TEXT_SEARCH_RESULT_RECEIVED) {

      const { dbIDs } = action.payload;
      return Object.assign({}, state, {
        textSearchResults: Object.assign({}, state.textSearchResults, {[action.collection]: dbIDs})
      });
    } else {
        return state;
    }
};
