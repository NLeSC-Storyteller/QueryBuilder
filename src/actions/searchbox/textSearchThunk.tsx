import { Dispatch }                             from 'redux';

import { baseurl }                              from '../../config';
import { GenericAction }                        from '../../types';
import { textSearchInputChanged }               from './textSearchInputChanged';
import { textSearchResultReceived }             from './textSearchResultReceived';

export interface IDatabaseNumberRecord {
    myID: number;
}

export const textSearchThunk = (collection: string, input: string) => {
    return (dispatch: Dispatch<GenericAction>) => {
        const handleTheStatus = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error when trying to retrieve the data. ' +
                    'status text: \"' + response.statusText + '".');
            }
        };

        const handleTheData = (dbrecords: any) => {
            const convert = (dbrecord: IDatabaseNumberRecord) => {
                return dbrecord.myID as number;
            };

            const dbIDs: number[] = dbrecords.map(convert);
            dispatch(textSearchResultReceived(collection, dbIDs));
        };

        const handleAnyErrors = () => {
            dispatch(textSearchResultReceived(collection, []));
        };

        dispatch(textSearchInputChanged(input));

        const url: string = baseurl + 'search/' + collection + '/' + input;

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
