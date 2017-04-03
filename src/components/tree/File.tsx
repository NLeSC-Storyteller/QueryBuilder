import * as React from 'react';
import { Button } from 'react-mdl';

import { Selected }        from '../../types';

import '../../../node_modules/react-mdl/extra/material.css';
import '../../../node_modules/react-mdl/extra/material.js';

import './Tree.css';

export class File extends React.Component<any, any> {
    constructor() {
        super();
        this.onClickFile = this.onClickFile.bind(this);
    }

    onClickFile() {
        this.props.onClickFile(this.props.dbid);
    }

    render(): JSX.Element {
        const { name, highlighted, selected, mentioncount } = this.props.nodes[this.props.dbid];
        const accent = selected === Selected.All;

        return (
            <Button
                className={'mdl-button file-button nomargin fileStyle'}
                onClick={this.onClickFile}
                raised
                colored={highlighted}
                accent={accent}
            >
                <span className={'fileText'}>
                    {name}
                </span>
                <span className={'fileNumber'}>
                    { mentioncount }
                </span>
            </Button>
        );
    }
}
