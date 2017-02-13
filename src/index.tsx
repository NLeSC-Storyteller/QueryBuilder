import * as React           from 'react';
import * as ReactDOM        from 'react-dom';
import { Cell, Grid }       from 'react-mdl';
import { Provider }         from 'react-redux';

import { MentionCounter }   from './components';
import { QueryBuildButton } from './components';
import { QueryClearButton } from './components';
import { Searchbox }        from './components';
import { Tree }             from './components';
import { collections }      from './config';
import { store }            from './store';

const colwidth = Math.ceil(12 / collections.length);

const trees = collections.map((collection: string, indexOf: number) => {
    return (
        <Cell key={indexOf} col={colwidth} className="categoryTitleBar mdl-grid">
            <Cell col={12} >
                <h1>{collection}</h1>
                <Tree collection={collection}/>
            </Cell>
        </Cell>
        );
});

ReactDOM.render(
    <Provider store={store} >
        <div>
            <Grid>
                <Cell col={ 3 }>
                    <QueryClearButton />
                </Cell>
                <Cell col={ 3 }>
                    <Searchbox />
                </Cell>
                <Cell col={ 3 }>
                    <MentionCounter />
                </Cell>
                <Cell col={ 3 }>
                    <QueryBuildButton />
                </Cell>
            </Grid>
            <Grid>
                {trees}
            </Grid>
        </div>
    </Provider>,
    document.getElementById('root')
);
