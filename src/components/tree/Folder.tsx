import * as React          from 'react';
import { Cell, Grid }      from 'react-mdl';

import TristateCheckbox    from '../tristateCheckbox/TristateCheckbox';

import { FolderContents }  from '../';
import { Selected }        from '../../types';
import { nodeHasChildren } from '../../utils';

import './Folder.css';

export class Folder extends React.Component<any, any> {
    constructor() {
        super();
        this.onClickCheckbox = this.onClickCheckbox.bind(this);
        this.onClickFolder = this.onClickFolder.bind(this);
    }

    onClickFolder() {
        const { dbid, nodes } = this.props;
        const { expanded } = nodes[dbid];
        const hasChildren = nodeHasChildren(nodes, dbid);
        this.props.onClickFolder(dbid, expanded, hasChildren);
    }

    onClickCheckbox() {
        this.props.onClickCheckbox(this.props.dbid);
    }

    public renderFolderContents(expanded: boolean): JSX.Element {

        const { dbid, nodes} = this.props;
        const { onClickFolder, onClickFile, onClickCheckbox } = this.props;

        if (expanded) {
            return (
                <FolderContents
                    dbid={dbid}
                    nodes={nodes}
                    onClickFolder={onClickFolder}
                    onClickFile={onClickFile}
                    onClickCheckbox={onClickCheckbox}
                />);
        } else {
            return (<div />);
        }
    }

    render(): JSX.Element {

        const { name, expanded, selected, highlighted } = this.props.nodes[this.props.dbid];
        const checked = selected === Selected.All;
        const indeterminate = selected === Selected.Partial;
        return (
            <Grid className={highlighted ? 'mdl-cell mdl-cell--12-col category highlighted' : 'mdl-cell mdl-cell--12-col category'}>
                <Cell col={12} className="categoryTitleBar">
                    <span className="categoryText" onClick={this.onClickFolder} >
                        {name}
                    </span>
                    <TristateCheckbox onChange={this.onClickCheckbox} checked={checked} indeterminate={indeterminate}/>
                </Cell>
                {this.renderFolderContents(expanded)}
            </Grid>
        );
    }
}
