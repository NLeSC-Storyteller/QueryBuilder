import * as React               from 'react';

// import url from 'file!/images/NLESClogo.png';

import './LogoBox.css';

export class LogoBox extends React.Component<any , { }> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={'logo-box'}>
                {/*<img className={'logo-nlesc'} src={require('/images/NLESClogo.png')} alt={ 'Netherlands eScience Center Logo'} />*/}
                {/*<img className={'logo-vu'}    src={require('/images/VUlogo.png')}    alt={ 'VU University Amsterdam Logo'} />*/}
            </div>
        );
    }
}
