import { applyMiddleware } from 'redux';
import { createStore }     from 'redux';
import thunk               from 'redux-thunk';

import { allreducers }     from './reducers';

import { rootRequestedThunk } from './actions';

export const store = createStore(allreducers, applyMiddleware(thunk));

// whenever the store has changed, print the new state
store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(rootRequestedThunk());
