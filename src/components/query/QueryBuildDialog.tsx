import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { storeQueryThunk } from '../../actions';
import { closeBuildQueryDialog } from '../../actions';
import { queryTextChanged } from '../../actions';
import { usernameTextChanged } from '../../actions';
import { limitChanged } from '../../actions';
import { GenericAction } from '../../types';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Textfield } from 'react-mdl';

import '../shared.css';
import './QueryDialogs.css';

interface IQueryBuildDialogDispatchProps {
    storeQuery: (username: string, query: string, mention_limit: number) => void;
    closeDialog: () => void;
    changeUsername: (username: string) => void;
    changeQueryText: (newtext: string) => void;
    changeLimit: (newlimit: number) => void;
}

export interface IQueryBuildDialog {
    query: any;
    dialogOpen: boolean;
    daemonStatus: number;
    username: string;
    mention_limit: number;
}

export class UnconnectedQueryBuildDialog extends React.Component<IQueryBuildDialog & IQueryBuildDialogDispatchProps, {}> {
    constructor() {
        super();

        this.clickStoreQuery = this.clickStoreQuery.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleUsernameTextChange = this.handleUsernameTextChange.bind(this);
        this.handleLimitChange = this.handleLimitChange.bind(this);
    }

    static mapStateToProps(state: any) {
        return {
            query: state.query,
            dialogOpen: state.query.isQueryBuildDialogOpen,
            daemonStatus: state.query.daemonStatus,
            username: state.query.username,
            mention_limit: state.query.mention_limit
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            storeQuery: (username: string, query: string, mention_limit: number) => {
                dispatch(storeQueryThunk(username, query, mention_limit));
            },
            closeDialog: () => {
                dispatch(closeBuildQueryDialog());
            },
            changeQueryText: (newtext: string) => {
                dispatch(queryTextChanged(newtext));
            },
            changeUsername: (username: string) => {
                dispatch(usernameTextChanged(username));
            },
            changeLimit: (mention_limit: number) => {
                dispatch(limitChanged(mention_limit));
            }
        };
    }

    public clickStoreQuery() {
        const username = this.props.username;
        const query = this.props.query.queryString;
        const mention_limit = this.props.query.mention_limit;
        this.props.storeQuery(username, query, mention_limit);
        this.props.closeDialog();
    }

    public handleCloseDialog() {
        this.props.closeDialog();
    }

    public handleTextChange(event: any) {
        this.props.changeQueryText(event.target.value);
    }

    public handleUsernameTextChange(event: any) {
        this.props.changeUsername(event.target.value);
    }

    public handleLimitChange(event: any) {
        this.props.changeLimit(event.target.value);
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
                    <div>
                        <b>Limit results to:</b>
                    </div>
                    <Textfield
                        className="limittextbox"
                        key="LimitField"
                        pattern="-?[0-9]*(\.[0-9]+)?"
                        error="Input is not a number!"
                        onChange={this.handleLimitChange}
                        label="Limit..."
                        required={true}
                        value={this.props.mention_limit}
                    />
                    <div>
                        <b>Username:</b>
                    </div>
                    <Textfield
                        className="usernametextbox"
                        key="UsernameField"
                        onChange={this.handleUsernameTextChange}
                        label="Username..."
                        required={true}
                        value={this.props.username}
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
export const QueryBuildDialog = connect(UnconnectedQueryBuildDialog.mapStateToProps,
                                        UnconnectedQueryBuildDialog.mapDispatchToProps)(UnconnectedQueryBuildDialog);
