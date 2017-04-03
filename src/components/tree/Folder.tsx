import * as React          from 'react';
import { Cell, Grid }      from 'react-mdl';

import TristateCheckbox    from '../tristateCheckbox/TristateCheckbox';

import { FolderContents }  from '../';
import { Selected }        from '../../types';
import { nodeHasChildren } from '../../utils';

import './Tree.css';

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

        const { name, expanded, selected, highlighted, mentioncount } = this.props.nodes[this.props.dbid];
        const checked = selected === Selected.All;
        const indeterminate = selected === Selected.Partial;
        const className = 'mdl-cell mdl-cell--12-col nomargin category';
        const highlightedClass = className + ' highlighted';
        return (
            <Grid className={highlighted ? highlightedClass : className}>
                <Cell col={12} className="categoryTitleBar nomargin">
                    <TristateCheckbox onChange={this.onClickCheckbox} checked={checked} indeterminate={indeterminate}/>
                    <span className="categoryText" onClick={this.onClickFolder} >
                        {name}
                    </span>
                    <span>
                        { mentioncount }
                    </span>
                </Cell>
                {this.renderFolderContents(expanded)}
            </Grid>
        );
    }
}
