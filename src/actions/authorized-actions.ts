import { INewNode } from '../components/NewNode';

export const ROOT_RECEIVED = 'ROOT_RECEIVED';
export interface IRootReceivedAction {
    type: 'ROOT_RECEIVED';
    payload: {
        root: INewNode
    };
}

export const ROOT_REQUESTED = 'ROOT_REQUESTED';
export interface IRootRequestedAction {
    type: 'ROOT_REQUESTED';
    payload: {};
}

export const CHILDREN_RECEIVED = 'CHILDREN_RECEIVED';
export interface IChildrenReceivedAction {
    type: 'CHILDREN_RECEIVED';
    payload: {
        id: number,
        nodes: any
    };
}

export const CHILDREN_REQUESTED = 'CHILDREN_REQUESTED';
export interface IChildrenRequestedAction {
    type: 'CHILDREN_REQUESTED';
    payload: {
        id: number
    };
}

export const EXPAND_BUTTON_WAS_CLICKED = 'EXPAND_BUTTON_WAS_CLICKED';
export interface IExpandButtonWasClickedAction {
    type: 'EXPAND_BUTTON_WAS_CLICKED';
    payload: {
        id: number
    };
}

export const CHECKBOX_WAS_CLICKED = 'CHECKBOX_WAS_CLICKED';
export interface ICheckboxWasClickedAction {
    type: 'CHECKBOX_WAS_CLICKED';
    payload: {
        id: number
    };
}

export const SELECTION_WAS_CLICKED = 'SELECTION_WAS_CLICKED';
export interface ISelectionWasClickedAction {
    type: 'SELECTION_WAS_CLICKED';
    payload: {
        id: number
    };
}
