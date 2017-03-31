import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { rebuildDatabaseThunk } from '../../actions';
import { closeRebuildDatabaseDialog }    from '../../actions';
import { GenericAction }            from '../../types';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from 'react-mdl';

import './QueryDialogs.css';

interface IRebuildDatabaseDialogDispatchProps {
    rebuildDatabase: () => void;
    closeDialog: () => void;
}

export interface IRebuildDatabaseDialog {
    dialogOpen: boolean;
}

export class UnconnectedRebuildDatabaseDialog extends React.Component<IRebuildDatabaseDialog & IRebuildDatabaseDialogDispatchProps, {}> {
    constructor() {
        super();

        this.clickRebuildDatabase = this.clickRebuildDatabase.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    static mapStateToProps(state: any) {
        return {
            dialogOpen: state.query.isRebuildDatabaseDialogOpen
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            rebuildDatabase: () => {
                dispatch(rebuildDatabaseThunk());
            },
            closeDialog: () => {
                dispatch(closeRebuildDatabaseDialog());
            }
        };
    }

    public clickRebuildDatabase() {
      this.props.rebuildDatabase();
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
                    <Button onClick={this.clickRebuildDatabase}>Clear ALL Queries</Button>
                    <Button onClick={this.handleCloseDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

// Export just the connected component
export const RebuildDatabaseDialog = connect(UnconnectedRebuildDatabaseDialog.mapStateToProps,
                                             UnconnectedRebuildDatabaseDialog.mapDispatchToProps)(UnconnectedRebuildDatabaseDialog);
