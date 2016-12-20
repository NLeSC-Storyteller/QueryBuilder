import { Dispatch }                             from 'redux';

import { IDatabaseRecord, SelectionState }      from '../interfaces';

import { IGenericAction }                       from '../actions';
import { childrenReceived }                     from './childrenReceived';
import { childrenRequested }                    from './childrenRequested';

import { INewNode }                             from '../components/NewNode';

export const childrenRequestedThunk = (id: number) => {
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
                    parent:         dbrecord.childof,
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
                } as INewNode;
            };

            const nodes: INewNode[] = dbrecords.map(convert);
            dispatch(childrenReceived(nodes));
        };

        const handleAnyErrors = (err: Error) => {
            throw new Error('Errors occured. ' + err.message + err.stack);
        };

        dispatch(childrenRequested());

        const url: string = 'http://localhost:5000/node/' + id.toString() + '/children';

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
