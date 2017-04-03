import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { clearAllQueriesThunk }         from '../../actions';
import { closeClearAllQueriesDialog }   from '../../actions';
import { GenericAction }                from '../../types';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from 'react-mdl';

import './QueryDialogs.css';

interface IClearAllQueriesDialogDispatchProps {
    clearAllQueries: () => void;
    closeDialog: () => void;
}

export interface IClearAllQueriesDialog {
    dialogOpen: boolean;
}

export class UnconnectedClearAllQueriesDialog extends React.Component<IClearAllQueriesDialog & IClearAllQueriesDialogDispatchProps, {}> {
    constructor() {
        super();

        this.clickClearAllQueries = this.clickClearAllQueries.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    static mapStateToProps(state: any) {
        return {
            dialogOpen: state.query.isClearAllQueriesDialogOpen
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            clearAllQueries: () => {
                dispatch(clearAllQueriesThunk());
            },
            closeDialog: () => {
                dispatch(closeClearAllQueriesDialog());
            }
        };
    }

    public clickClearAllQueries() {
      this.props.clearAllQueries();
      this.props.closeDialog();
    }

    public handleCloseDialog() {
        this.props.closeDialog();
    }

    render() {
        return (
            <Dialog key="clearDialog" open={this.props.dialogOpen} onCancel={this.handleCloseDialog}>
                <DialogTitle component="h4">You are about to clear the queries of ALL USERS. Are you sure?</DialogTitle>
                <DialogContent>
                    You will not be able to undo this action.
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.clickClearAllQueries}>Clear ALL Queries</Button>
                    <Button onClick={this.handleCloseDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

// Export just the connected component
export const ClearAllQueriesDialog = connect(UnconnectedClearAllQueriesDialog.mapStateToProps,
                                             UnconnectedClearAllQueriesDialog.mapDispatchToProps)(UnconnectedClearAllQueriesDialog);
