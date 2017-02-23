import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { closeBuildQueryDialog }    from '../../actions';
import { GenericAction }            from '../../types';

// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Textfield } from 'react-mdl';

import '../shared.css';
import './QueryDialogs.css';

interface IQueryMenuDispatchProps {
    closeDialog: () => void;
}

export interface IQueryMenu {
    query: any;
    dialogOpen: boolean;
    daemonStatus: number;
}

export class UnconnectedQueryMenu extends React.Component<IQueryMenu & IQueryMenuDispatchProps, {}> {
    constructor() {
        super();

        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    static mapStateToProps(state: any) { //state: IStore) {
        return {
            query: state.query,
            dialogOpen: state.query.isQueryMenuOpen,
            daemonStatus: state.query.daemonStatus
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            closeDialog: () => {
                dispatch(closeBuildQueryDialog());
            }
        };
    }

    public handleCloseDialog() {
        this.props.closeDialog();
    }

    render() {
        return (
            <div />
        );
    }
}

// Export just the connected component
export const QueryMenu = connect(UnconnectedQueryMenu.mapStateToProps,
                                 UnconnectedQueryMenu.mapDispatchToProps)(UnconnectedQueryMenu);
