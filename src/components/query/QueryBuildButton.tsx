import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { buildQueryIsNeeded }       from '../../actions';
import { openBuildQueryDialog }     from '../../actions';
import { GenericAction }            from '../../types';

// import { getDaemonStatusThunk }     from '../../actions';

import { QueryBuildDialog }         from './QueryBuildDialog';

import { Button }                   from 'react-mdl';

import './QueryBuildButton.css';
import './QueryDialogs.css';

interface IQueryBuildButtonDispatchProps {
    // getDaemonStatus: () => void;
    // getDaemonStatus: (url: string, port: number) => void;

    buildQuery: () => void;
    openDialog: () => void;
}

export interface IQueryBuildButton {
    buttonActive: boolean;
}

export class UnconnectedQueryBuildButton extends React.Component<IQueryBuildButton & IQueryBuildButtonDispatchProps, { }> {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    static shouldButtonBeActive(state: any): boolean {
        if ((state.query.entities  && state.query.entities.length > 0) ||
            (state.query.events    && state.query.events.length > 0) ||
            (state.query.sources   && state.query.sources.length > 0) ||
            (state.query.topics    && state.query.topics.length > 0)) {
            return true;
        }
        return false;
    }

    static mapStateToProps(state: any) {
        return {
            buttonActive: UnconnectedQueryBuildButton.shouldButtonBeActive(state)
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            // getDaemonStatus: () => {
            //     dispatch(getDaemonStatusThunk());
            // },
            buildQuery: () => {
                dispatch(buildQueryIsNeeded());
            },
            openDialog: () => {
                dispatch(openBuildQueryDialog());
            }
        };
    }

    public onClick() {
        // this.props.getDaemonStatus();
        this.props.buildQuery();
        this.props.openDialog();
    }

    render() {
        return (
            <div>
                <Button raised disabled={ !this.props.buttonActive } colored onClick={ this.onClick }>
                    Build Query
                </Button>
                <QueryBuildDialog />
            </div>
        );
    }
}

// Export just the connected component
export const QueryBuildButton = connect(UnconnectedQueryBuildButton.mapStateToProps,
                                        UnconnectedQueryBuildButton.mapDispatchToProps)(UnconnectedQueryBuildButton);
