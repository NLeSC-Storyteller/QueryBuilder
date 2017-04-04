import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { passwordTextChanged }          from '../../actions';
import { rebuildDatabaseThunk } from '../../actions';
import { closeRebuildDatabaseDialog }    from '../../actions';
import { GenericAction }            from '../../types';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Textfield } from 'react-mdl';

import './QueryDialogs.css';

interface IRebuildDatabaseDialogDispatchProps {
    rebuildDatabase: (password: string) => void;
    closeDialog: () => void;
    changePassword: (password: string) => void;
}

export interface IRebuildDatabaseDialog {
    dialogOpen: boolean;
    password: string;
}

export class UnconnectedRebuildDatabaseDialog extends React.Component<IRebuildDatabaseDialog & IRebuildDatabaseDialogDispatchProps, {}> {
    constructor() {
        super();

        this.clickRebuildDatabase = this.clickRebuildDatabase.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handlePasswordTextChange = this.handlePasswordTextChange.bind(this);
    }

    static mapStateToProps(state: any) {
        return {
            dialogOpen: state.query.isRebuildDatabaseDialogOpen,
            password: state.query.password
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            rebuildDatabase: (password: string) => {
                dispatch(rebuildDatabaseThunk(password));
            },
            closeDialog: () => {
                dispatch(closeRebuildDatabaseDialog());
            },
            changePassword: (password: string) => {
                dispatch(passwordTextChanged(password));
            }
        };
    }

    public clickRebuildDatabase() {
      this.props.rebuildDatabase(this.props.password);
      this.props.closeDialog();
    }

    public handleCloseDialog() {
        this.props.closeDialog();
    }

    public handlePasswordTextChange(event : any) {
        this.props.changePassword(event.target.value);
    }

    render() {
        return (
            <Dialog key="clearDialog" open={this.props.dialogOpen} onCancel={this.handleCloseDialog}>
                <DialogTitle component="h4">You are about to rebuild the overview database. Are you sure?</DialogTitle>
                <DialogContent>
                    <p> please enter the admin password to proceed </p>
                    <Textfield
                        className="passwordtextbox"
                        key="PasswordField"
                        onChange={this.handlePasswordTextChange}
                        label="Password..."
                        required={true}
                        type={'password'}
                        value={this.props.password}
                    />
                    You will not be able to undo this action.
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.clickRebuildDatabase}>Rebuild the database</Button>
                    <Button onClick={this.handleCloseDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

// Export just the connected component
export const RebuildDatabaseDialog = connect(UnconnectedRebuildDatabaseDialog.mapStateToProps,
                                             UnconnectedRebuildDatabaseDialog.mapDispatchToProps)(UnconnectedRebuildDatabaseDialog);
