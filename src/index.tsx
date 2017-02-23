import * as React           from 'react';
import * as ReactDOM        from 'react-dom';
import { Provider }         from 'react-redux';

import { MenuBar }          from './components';
import { store }            from './store';

ReactDOM.render(
    <Provider store={store} >
        <MenuBar />
    </Provider>,
    document.getElementById('root')
);
