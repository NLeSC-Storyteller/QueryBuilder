import * as React   from 'react';
import { connect }  from 'react-redux';
import { Dispatch } from 'react-redux';

import { childrenRequestedThunk }   from '../actions';
import { collapseFolderWasClicked } from '../actions';
import { expandFolderWasClicked }   from '../actions';
import { Folder }                   from '../components';
import { IGenericAction }           from '../interfaces';

export class UnconnectedTree extends React.Component<any, any> {

    constructor() {
        super();
    }

    render(): JSX.Element {
        const dbidRoot = 1;
        const { entities, onClickFolder, onClickFile, onClickCheckbox } = this.props;
        return (
            <Folder
                key={dbidRoot}
                dbid={dbidRoot}
                entities={entities}
                onClickFolder={onClickFolder}
                onClickFile={onClickFile}
                onClickCheckbox={onClickCheckbox}
            />
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        entities: state
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IGenericAction>) => {

    const onClickFolder = (dbid: number, expanded: boolean, hasChildren: boolean) => {
        if (expanded) {
            dispatch(collapseFolderWasClicked(dbid));
        } else {
            if (hasChildren) {
                dispatch(expandFolderWasClicked(dbid));
            } else {
                dispatch(childrenRequestedThunk(dbid));
            }
        }
    };

    const onClickFile = (dbid: number) => {
        console.log('clicked file with dbid=' + dbid.toString());
    };

    const onClickCheckbox = (dbid: number) => {
        console.log('clicked checkbox with dbid=' + dbid.toString());
    };

    return {
        onClickFolder,
        onClickFile,
        onClickCheckbox
    };
};

export const Tree = connect(mapStateToProps, mapDispatchToProps)(UnconnectedTree);