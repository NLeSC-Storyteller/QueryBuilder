import { EntityNode } from './EntityNode';

export const EntityNodeReducer = (state: any = [], action: any) => {
  if (action.name == 'LOAD_CHILDREN') {    
    return state.map(n => {
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