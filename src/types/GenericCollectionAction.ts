import { GenericAction } from '../types';

export type GenericCollectionAction = GenericAction & {
    collection: string;
}
