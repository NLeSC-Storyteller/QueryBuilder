import { Dispatch }                from 'redux';

import { childrenReceived }        from '../';
import { childrenRequested }       from '../';
import { expandFolderWasClicked }  from '../';
import { baseurl }                 from '../../config';
import { GenericCollectionAction } from '../../types';
import { DatabaseRecord }          from '../../types';
import { Selected }                from '../../types';

export const childrenRequestedThunk = (collection: string, dbid: number) => {
    return (dispatch: Dispatch<GenericCollectionAction>) => {
        const handleTheStatus = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error when trying to retrieve the data. ' +
                    'status text: \"' + response.statusText + '".');
            }
        };

        const handleTheData = (dbrecords: any) => {
            const convert = (dbrecord: DatabaseRecord) => {
                return {
                    children:     undefined,
                    dbid:         dbrecord.id,
                    expanded:     false,
                    isfile:       dbrecord.isinstance === 1 ? true : false,
                    mentioncount: dbrecord.mentioncount,
                    highlighted:  false,
                    name:         dbrecord.name,
                    parent:       dbrecord.childof,
                    selected:     Selected.None
                };
            };

            const nodes = dbrecords.map(convert);
            dispatch(childrenReceived(collection, nodes));
            dispatch(expandFolderWasClicked(collection, dbid));
        };

        const handleAnyErrors = (err: Error) => {
            console.error('Errors occured. ' + err.message + err.stack);

            const fauxRoot = {
                    children:     undefined,
                    dbid:         0,
                    expanded:     false,
                    isfile:       true,
                    mentioncount: 0,
                    highlighted:  false,
                    name:         'empty',
                    parent:       -1,
                    selected:     Selected.None
                };
            dispatch(childrenReceived(collection, [fauxRoot]));
        };

        dispatch(childrenRequested(collection, dbid));

        const url: string = baseurl + collection + '/' + dbid.toString() + '/children';

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
