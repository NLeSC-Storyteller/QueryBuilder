import { EntityNode } from './EntityNode';

export const entityNodeReducer = (state: any = [], action: any) => {
    if (action.name === 'LOAD_CHILDREN') {
        return state.map((n: EntityNode) => {
            return new EntityNode(
                n.fetch_url,
                n.children_count,
                n.instance_count,
                n.mention_count,
                n.name,
                n.type,
                n.url,
                n.id);
        });
    } else {
        return state;
    }
};
