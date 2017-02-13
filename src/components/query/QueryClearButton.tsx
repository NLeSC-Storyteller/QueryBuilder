import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { openClearQueryDialog }     from '../../actions';
import { GenericAction }           from '../../types';

import { QueryClearDialog }         from './QueryClearDialog';

import { Button }                   from 'react-mdl';

import './QueryClearButton.css';
import './QueryDialogs.css';

interface IQueryClearButtonDispatchProps {
    openDialog: () => void;
}

export interface IQueryClearButton {
    buttonActive: boolean;
}

export class UnconnectedQueryClearButton extends React.Component<IQueryClearButton & IQueryClearButtonDispatchProps, { }> {
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
            buttonActive: UnconnectedQueryClearButton.shouldButtonBeActive(state)
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            openDialog: () => {
                dispatch(openClearQueryDialog());
            }
        };
    }

    public onClick() {
        this.props.openDialog();
    }

    render() {
        return (
            <div>
                <Button raised disabled={ !this.props.buttonActive } accent onClick={ this.onClick }>
                    Clear Query
                </Button>
                <QueryClearDialog />
            </div>
        );
    }
}

// Export just the connected component
export const QueryClearButton = connect(UnconnectedQueryClearButton.mapStateToProps,
                                        UnconnectedQueryClearButton.mapDispatchToProps)(UnconnectedQueryClearButton);
