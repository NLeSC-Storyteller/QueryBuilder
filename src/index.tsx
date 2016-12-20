import '../node_modules/react-mdl/extra/material.css';
import '../node_modules/react-mdl/extra/material.js';
import './index.css';

import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import { Provider }    from 'react-redux';

import { Node }        from './components';
import { store }       from './store';

ReactDOM.render(
    <Provider store={store}>
        <Node key={1} nodeID={1} />
    </Provider>,
    document.getElementById('root')
);
