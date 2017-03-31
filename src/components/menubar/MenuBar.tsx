import * as React               from 'react';

import { connect }              from 'react-redux';
import { Dispatch }             from 'redux';

import { Cell, Content, Drawer, Grid, Header, Layout, Navigation } from 'react-mdl';

import { MentionCounter }       from '../';
import { LogoBox }              from '../';
import { QueryClearButton }     from '../';
import { QueryBuildButton }     from '../';
import { Searchbox }            from '../';

import { Tree }                         from '../';
import { openClearAllQueriesDialog }    from '../../actions';
import { openRebuildDatabaseDialog }    from '../../actions';
import { collections }                  from '../../config';
import { GenericAction }                from '../../types';

import './MenuBar.css';

interface IMenuBarDispatchProps {
    openClearAllDialog: () => void;
    openRebuildDialog: () => void;
}

export interface IMenuBar {
    buttonActive: boolean;
}

export class UnconnectedMenuBar extends React.Component<IMenuBar & IMenuBarDispatchProps, { }> {
    constructor() {
        super();

        this.onClickClearAll = this.onClickClearAll.bind(this);
        this.onClickRebuild = this.onClickRebuild.bind(this);
    }

    static mapStateToProps() {
        return {
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            openClearAllDialog: () => {
                dispatch(openClearAllQueriesDialog());
            },
            openRebuildDialog: () => {
                dispatch(openRebuildDatabaseDialog());
            }
        };
    }

    public onClickClearAll() {
        this.props.openClearAllDialog();
    }

    public onClickRebuild() {
        this.props.openRebuildDialog();
    }

    render() {
        const colwidth = 3; //Math.floor(12 / collections.length);
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
                            <a onClick={ this.onClickRebuild } href="">Rebuild Database</a>
                            <a onClick={ this.onClickClearAll } href="">Clear all queries</a>
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

// Export just the connected component
export const MenuBar = connect(UnconnectedMenuBar.mapStateToProps,
                               UnconnectedMenuBar.mapDispatchToProps)(UnconnectedMenuBar);
