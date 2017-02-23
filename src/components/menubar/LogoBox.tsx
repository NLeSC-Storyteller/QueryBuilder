import * as React               from 'react';

import nlesclogo from './NLESClogo.png';
import vulogo from './VUlogo.png';

import './LogoBox.css';

export class LogoBox extends React.Component<any , { }> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={'logo-box'}>
                <img className={'logo-nlesc'} src={nlesclogo} alt={ 'Netherlands eScience Center Logo'} />
                <img className={'logo-vu'}    src={vulogo}    alt={ 'VU University Amsterdam Logo'} />
            </div>
        );
    }
}
