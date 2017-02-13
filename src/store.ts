import { applyMiddleware }         from 'redux';
import { createStore }             from 'redux';
import thunk                       from 'redux-thunk';

import { childrenRequestedThunk }  from './actions';
import { collections }             from './config';
import { combinedReducer }         from './reducers';

export const store = createStore(combinedReducer, applyMiddleware(thunk));

// whenever the store has changed, print the new state
store.subscribe(() => {
    console.log(store.getState());
});

const dbidRoot = -1;

collections.map((collection: string) => {
    store.dispatch(childrenRequestedThunk(collection, dbidRoot));
});
