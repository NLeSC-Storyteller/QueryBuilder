import { Dispatch }                             from 'redux';

import { rebuildDatabaseWasClicked }            from '../';
import { daemonurl }                            from '../../config';
import { GenericAction }                        from '../../types';

export interface IDatabaseNumberRecord {
    myID: number;
}

export const rebuildDatabaseThunk = () => {
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

        dispatch(rebuildDatabaseWasClicked());

        const url: string = daemonurl + 'rebuild';

        const querydata = JSON.stringify({
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
