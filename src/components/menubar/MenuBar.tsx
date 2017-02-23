import * as React               from 'react';

import { Cell, Content, Drawer, Grid, Header, Layout, Navigation } from 'react-mdl';

import { MentionCounter }       from '../';
import { LogoBox }              from '../';
import { QueryClearButton }     from '../';
import { QueryBuildButton }     from '../';
import { Searchbox }            from '../';

import { Tree }             from '../';
import { collections }      from '../../config';

import './MenuBar.css';

export class MenuBar extends React.Component<any , { }> {
    constructor() {
        super();
    }

    render() {
        const colwidth = Math.floor(12 / collections.length);
        const trees = collections.map((collection: string, indexOf: number) => {
            return (
                <Cell key={indexOf} col={colwidth}>
                    <p>{collection}</p>
                    <Tree collection={collection}/>
                </Cell>
                );
        });

        return (
            <div className={'main-menu-bar'}>
                <Layout fixedHeader>
                    <Header title={<span><strong>Storyteller Query-Builder</strong></span>}>
                        <Navigation>
                            <LogoBox />
                            <Searchbox />
                            <MentionCounter />
                            <QueryClearButton />
                            <QueryBuildButton />
                        </Navigation>
                    </Header>

                    <Drawer title="DANGER Zone">
                        <Navigation>
                            <a href="">Rebuild Database</a>
                            <a href="">Clear all queries</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                        </Navigation>
                    </Drawer>

                    <Content>
                        <Grid>
                            {trees}
                        </Grid>
                    </Content>
                </Layout>
            </div>
        );
    }
}
