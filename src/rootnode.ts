import { TNode } from '../src/types';

export const rootnode: TNode[] = [{
    bullet: '#',
    dbrecord: {
        child_of: 0,
        id: 1,
        is_entity: true,
        is_expandable: true,
        is_instance: false,
        level: 0,
        mention_count: 84027,
        name: 'www.w3.org/2002/07/owl#Thing',
        url: 'http://dbpedia.org/ontology/www.w3.org/2002/07/owl#Thing'
    },
    id: 1,
    indent: {paddingLeft: '0px'},
    isexpanded: false,
    key: 1,
    name: 'thename',
    nodeclass: 'entity',
    onclick: () => {console.log('blah entity'); }
}];
