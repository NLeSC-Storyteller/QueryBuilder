import { Dispatch }                             from 'redux';

import { storeQueryWasClicked }                 from '../';
import { daemonurl }                            from '../../config';
import { GenericAction }                        from '../../types';

export interface IDatabaseNumberRecord {
    myID: number;
}

export const storeQueryThunk = (username: string, query: string, mention_limit: number) => {
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

        dispatch(storeQueryWasClicked(username, query, mention_limit));

        const url: string = daemonurl + 'jobs/';

        const querydata = JSON.stringify({
            name: username,
            workflow: 'doKSQuery.cwl',
            input: {
                ksQuery: query,
                ksQuerylimit: mention_limit,
                logging: true,

                classpath: {
                  class: 'File',
                  path: 'StoryTeller-v1.0-jar-with-dependencies.jar'
                },

                tokenIndex: {
                  class: 'File',
                  path: 'token.index.gz'
                },

                eurovoc: {
                  class: 'File',
                  path: 'mapping_eurovoc_skos.label.concept.gz'
                }
            }
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
