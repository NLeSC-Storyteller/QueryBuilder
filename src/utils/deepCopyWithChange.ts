import { Nodes } from '../types';

export const deepCopyWithChange = (nodes: Nodes, dbid: number, change: any): Nodes => {
        const oldNode = nodes[dbid];
        const newNode = Object.assign({}, oldNode, change);
        // deep copy of nonprimitive property 'children'
        if (oldNode.hasOwnProperty('children') && oldNode.children !== undefined) {
            newNode.children = [...oldNode.children];
        }
        return Object.assign({}, nodes, {[dbid]: newNode});
};
