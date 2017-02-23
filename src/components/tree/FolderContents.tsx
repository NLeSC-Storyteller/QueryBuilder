import * as React          from 'react';

import { Folder }          from '../';
import { File }            from '../';
import { nodeHasChildren } from '../../utils';

import './Tree.css';

export class FolderContents extends React.Component<any, any> {
    constructor() {
        super();
    }

    render(): JSX.Element {

        const { nodes, dbid, onClickFolder, onClickFile, onClickCheckbox } = this.props;
        const hasChildren = nodeHasChildren(nodes, dbid);

        let children: JSX.Element[] = [];

        if (hasChildren) {
            children = nodes[dbid].children.map((childId: number) => {
                if (nodes.hasOwnProperty(childId)) {
                    if (nodes[childId].isfile !== true) {
                        return (<Folder
                            key={childId}
                            dbid={childId}
                            nodes={nodes}
                            onClickFolder={onClickFolder}
                            onClickFile={onClickFile}
                            onClickCheckbox={onClickCheckbox}
                        />);
                    } else {
                        return (<File
                            key={childId}
                            dbid={childId}
                            nodes={nodes}
                            onClickFile={onClickFile}
                        />);
                    }
                } else {
                    return;
                }
            });
        }

        return (
            <div className={'mdl-grid nomargin mdl-cell mdl-cell--12-col'}>
                {children}
            </div>
        );
    }
}
