import * as React               from 'react';

import { connect }              from 'react-redux';
import { Dispatch }             from 'redux';

import { Cell, Content, Drawer, Grid, Header, Layout, Navigation } from 'react-mdl';

import { MentionCounter }       from '../';
import { LogoBox }              from '../';
import { QueryClearButton }     from '../';
import { QueryBuildButton }     from '../';
import { Searchbox }            from '../';
import { ClearAllQueriesDialog }from '../';
import { RebuildDatabaseDialog }from '../';

import { Tree }                         from '../';
import { openClearAllQueriesDialog }    from '../../actions';
import { openRebuildDatabaseDialog }    from '../../actions';
import { GenericAction }                from '../../types';

//Only need this for the 'generic' solution, which we do not use now
// import { collections }                  from '../../config';

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
        //Generic Solution
        /*const colwidth = 3; //Math.floor(12 / collections.length);
        const trees = collections.map((collection: string, indexOf: number) => {
            return (
                <Cell key={indexOf} col={colwidth}>
                    <h4>{collection}</h4>
                    <Tree collection={collection}/>
                </Cell>
                );
        });*/

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
                            {/*<a onClick={ this.onClickRebuild }>Rebuild Database</a>*/}
                            <a onClick={ this.onClickClearAll }>Clear all queries</a>
                        </Navigation>
                    </Drawer>

                    <ClearAllQueriesDialog />
                    <RebuildDatabaseDialog />

                    <Content>
                        <Grid>
                            {/*generic solution*/}
                            {/*{trees}*/}

                            {/* custom solution */}
                            <Cell key={0} col={3}>
                                <h4>{'light entities'}</h4>
                                <Tree collection={'light'}/>
                                <h4>{'dark entities'}</h4>
                                <Tree collection={'dark'}/>
                                <h4>{'concepts'}</h4>
                                <Tree collection={'concepts'}/>
                            </Cell>
                            <Cell key={1} col={3}>
                                <h4>{'events'}</h4>
                                <Tree collection={'events'}/>
                            </Cell>
                            <Cell key={2} col={3}>
                                <h4>{'authors'}</h4>
                                <Tree collection={'authors'}/>
                                <h4>{'cited'}</h4>
                                <Tree collection={'cited'}/>
                                <h4>{'perspectives'}</h4>
                                <Tree collection={'perspectives'}/>
                            </Cell>
                            <Cell key={3} col={3}>
                                <h4>{'topics'}</h4>
                                <Tree collection={'topics'}/>
                            </Cell>
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
