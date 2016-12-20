import { Dispatch }                             from 'redux';

import { IDatabaseRecord, SelectionState }      from '../interfaces';

import { INode }                                from '../components/Node';

import { IGenericAction }                       from '../actions';
import { rootReceived }                         from './rootReceived';
import { rootRequested }                        from './rootRequested';

export const rootRequestedThunk = () => {

    return (dispatch: Dispatch<IGenericAction>) => {
        const handleTheStatus = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error when trying to retrieve the data. ' +
                    'status text: \"' + response.statusText + '".');
            }
        };

        const handleTheData = (dbrecords: any) => {
            const convert = (dbrecord: IDatabaseRecord) => {
                return {
                    parent:         -1,
                    id:             dbrecord.id,
                    isentity:       dbrecord.isentity === 1 ? true : false,
                    isleaf:         dbrecord.isleaf === 1 ? true : false,
                    isinstance:     dbrecord.isinstance === 1 ? true : false,
                    level:          dbrecord.level,
                    mentioncount:   dbrecord.mentioncount,
                    name:           dbrecord.name,
                    url:            dbrecord.url,
                    isexpanded:     false,
                    selectionState: SelectionState.Unselected,
                    children:       []
                } as INode;
            };
            //Since this is the root, we expect only 1 element, and therefore 
            // only take the first element from the array
            const root: INode = dbrecords.map(convert)[0];
            dispatch(rootReceived(root));
        };

        const handleAnyErrors = (err: Error) => {
            throw new Error('Errors occured. ' + err.message + err.stack);
        };

        dispatch(rootRequested());

        const url: string = 'http://localhost:5000/node/' + '0' + '/children';

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
