import { Dispatch }                             from 'redux';

import { clearAllQueriesWasClicked }            from '../';
import { daemonurl }                            from '../../config';
import { GenericAction }                        from '../../types';

export interface IDatabaseNumberRecord {
    myID: number;
}

export const clearAllQueriesThunk = (password: string) => {
    return (dispatch: Dispatch<GenericAction>) => {
        const handleTheStatus = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error when trying to send the data. ' +
                    'status text: \"' + response.statusText + '".');
            }
        };

        const handleAnyErrors = (err : Error) => {
            throw new Error('Errors occured. ' + err.message + err.stack);
        };

        dispatch(clearAllQueriesWasClicked());

        const url: string = daemonurl + 'clearall';

        const querydata = JSON.stringify({
            password
        });

        fetch(url, {
            headers: {
                Accept: 'text/html'
            },
            method: 'POST',
            body: querydata
        }).then(handleTheStatus)
            .catch(handleAnyErrors);
    };
};
