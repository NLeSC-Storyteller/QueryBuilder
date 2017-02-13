import { Nodes } from '../types';

export const nodeHasChildren = (nodes: Nodes, dbid: number): boolean => {
    const exists = nodes.hasOwnProperty(dbid);
    if (!exists) {
        console.warn('That \'dbid\' (' + dbid.toString() + ') does not exist in \'nodes\'.');
    }
    const hasChildrenProperty = nodes[dbid].hasOwnProperty('children');
    if (!hasChildrenProperty) {
        console.warn('\'nodes[' + dbid.toString() + ']\' has no property \'children\'.');
    }
    const childrenIsUndefined = nodes[dbid].children === undefined;
    if (childrenIsUndefined) {
        console.warn('Property \'children\' on \'nodes[' + dbid.toString() + ']\' is \'undefined\'.');
    }
    return exists && hasChildrenProperty && !childrenIsUndefined;
};
