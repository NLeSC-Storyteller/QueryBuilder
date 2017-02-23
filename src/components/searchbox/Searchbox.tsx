import * as React           from 'react';

import { connect }          from 'react-redux';
import { Dispatch }         from 'redux';

import { textSearchThunk }  from '../../actions';
import { collections }      from '../../config';
import { GenericAction }    from '../../types';

import { Textfield }        from 'react-mdl';

import './Searchbox.css';

interface ISearchboxDispatchProps {
    textSearch: (input: string) => void;
}

export interface ISearchbox {
    textFieldContents: string;
}

export class UnconnectedSearchbox extends React.Component<ISearchbox & ISearchboxDispatchProps, { }> {
    constructor() {
        super();
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    static mapStateToProps(state: any) {
        return {
            textFieldContents: state.textSearch.textSearchString
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
        return {
            textSearch: (input: string) => {
                collections.forEach((collection: string) => {
                    dispatch(textSearchThunk(collection, input));
                });
            }
        };
    }

    public handleTextChange(event : any) {
        this.props.textSearch(event.target.value);
    }

    render() {
        return (
            <Textfield
                className="searchbox"
                key="SearchboxTextfield"
                onChange={ this.handleTextChange }
                label="Search for..."
                value={ this.props.textFieldContents }
            />
        );
    }
}

// Export just the connected component
export const Searchbox = connect(UnconnectedSearchbox.mapStateToProps,
                                 UnconnectedSearchbox.mapDispatchToProps)(UnconnectedSearchbox);
