import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { passwordTextChanged }          from '../../actions';
import { clearAllQueriesThunk }         from '../../actions';
import { closeClearAllQueriesDialog }   from '../../actions';
import { GenericAction }                from '../../types';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Textfield } from 'react-mdl';

import './QueryDialogs.css';

interface IClearAllQueriesDialogDispatchProps {
    clearAllQueries: (password: string) => void;
    closeDialog: () => void;
    changePassword: (password: string) => void;
}

export interface IClearAllQueriesDialog {
    dialogOpen: boolean;
    password: string;
}

export class UnconnectedClearAllQueriesDialog extends React.Component<IClearAllQueriesDialog & IClearAllQueriesDialogDispatchProps, {}> {
    constructor() {
        super();

        this.clickClearAllQueries = this.clickClearAllQueries.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handlePasswordTextChange = this.handlePasswordTextChange.bind(this);
    }

    static mapStateToProps(state: any) {
        return {
            dialogOpen: state.query.isClearAllQueriesDialogOpen,
            password: state.query.password
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            clearAllQueries: (password: string) => {
                dispatch(clearAllQueriesThunk(password));
            },
            closeDialog: () => {
                dispatch(closeClearAllQueriesDialog());
            },
            changePassword: (password: string) => {
                dispatch(passwordTextChanged(password));
            }
        };
    }

    public clickClearAllQueries() {
        this.props.clearAllQueries(this.props.password);
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
                <DialogTitle component="h4">You are about to clear the queries of ALL USERS. Are you sure?</DialogTitle>
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
