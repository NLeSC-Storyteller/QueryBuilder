import * as React                   from 'react';

import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { storeQueryThunk }          from '../../actions';
import { closeBuildQueryDialog }    from '../../actions';
import { queryTextChanged }         from '../../actions';
import { GenericAction }            from '../../types';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Textfield } from 'react-mdl';

import '../shared.css';
import './QueryDialogs.css';

interface IQueryManagementDialogDispatchProps {
    storeQuery: (username: string, query: string) => void;
    closeDialog: () => void;
    changeQueryText: (newtext : string) => void;
}

export interface IQueryManagementDialog {
    query: any;
    dialogOpen: boolean;
    daemonStatus: number;
}

export class UnconnectedQueryManagementDialog extends React.Component<IQueryManagementDialog & IQueryManagementDialogDispatchProps, {}> {
    constructor() {
        super();

        this.clickStoreQuery = this.clickStoreQuery.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    static mapStateToProps(state: any) { //state: IStore) {
        return {
            query: state.query,
            dialogOpen: state.query.isQueryManagementDialogOpen,
            daemonStatus: state.query.daemonStatus
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            storeQuery: (username: string, query: string) => {
                dispatch(storeQueryThunk(username, query));
            },
            closeDialog: () => {
                dispatch(closeBuildQueryDialog());
            },
            changeQueryText: (newtext : string) => {
                dispatch(queryTextChanged(newtext));
            }
        };
    }

    public clickStoreQuery() {
        const username = 'defaultuser';
        const query = this.props.query.queryString;
        this.props.storeQuery(username, query);
        this.props.closeDialog();
    }

    public handleCloseDialog() {
        this.props.closeDialog();
    }

    public handleTextChange(event : any) {
        this.props.changeQueryText(event.target.value);
    }

    render() {
        const count = this.props.query.selectedMentionCount;
        let mentionClass = '';
        if (this.props.query.selectedMentionCount < -10000 || this.props.query.selectedMentionCount > 10000) {
            mentionClass = 'impossible_query';
        } else if (this.props.query.selectedMentionCount < -5000 || this.props.query.selectedMentionCount > 5000) {
            mentionClass = 'heavy_query';
        } else {
            mentionClass = 'safe_query';
        }

        return (
            <Dialog key="buildDialog" open={this.props.dialogOpen} onCancel={this.handleCloseDialog}>
                <DialogTitle component="h4">Do you want to send the following query to the KnowledgeStore?</DialogTitle>
                <DialogContent>
                    <div>
                        Number of mentions selected:
                        <span className={mentionClass}>
                          {count < 0 ? ' < ' + -count : ' ' + count}
                        </span>
                    </div>
                    <br />
                    <div>
                        <b>Resulting Query String:</b>
                    </div>
                    <Textfield
                        className="querytextbox dialog-textfield"
                        key="QueryBuildTextfield"
                        onChange={this.handleTextChange}
                        label="Query Text..."
                        rows={3}
                        expandable
                        value={this.props.query.queryString}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.clickStoreQuery}>Perform Query</Button>
                    <Button onClick={this.handleCloseDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

// Export just the connected component
export const QueryManagementDialog = connect(UnconnectedQueryManagementDialog.mapStateToProps,
                                             UnconnectedQueryManagementDialog.mapDispatchToProps)(UnconnectedQueryManagementDialog);
