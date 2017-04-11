import { Dispatch }                             from 'redux';

import { storeQueryWasClicked }                 from '../';
import { baseurl }                              from '../../config';
import { GenericAction }                        from '../../types';

export interface IDatabaseNumberRecord {
    myID: number;
}

export const storeQueryThunk = (username: string, query: string, limit: number) => {
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

        dispatch(storeQueryWasClicked(username, query, limit));

        const url: string = baseurl + 'addquery/';

        const querydata = JSON.stringify({
            username,
            query,
            limit
        });

        fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: querydata
        }).then(handleTheStatus)
            .catch(handleAnyErrors);
    };
};
