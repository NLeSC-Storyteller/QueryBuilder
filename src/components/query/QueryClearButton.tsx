import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { openClearQueryDialog }     from '../../actions';
import { collections }              from '../../config';
import { GenericAction }            from '../../types';

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
        let anySelection = false;
        collections.forEach((collection: string) => {
            if (state.query[collection] && state.query[collection].length > 0) {
                anySelection = true;
            }
        });
        return anySelection;
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
                <Button
                    raised
                    className={ 'clear-query-button' }
                    disabled={ !this.props.buttonActive }
                    onClick={ this.onClick }
                >
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
