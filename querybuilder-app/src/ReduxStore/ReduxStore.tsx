import * as React from 'react';

import { createStore } from 'redux'
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { EntityNodeReducer } from './EntityNodeReducer';

export class ReduxStore {
  // const createStore = (reducer) => {
  //   let state;
  //   let listeners = [];

  //   const getState = () => state;

  //   const dispatch = (action) => {
  //     state = reducer(state, action);
  //     listeners.array.forEach(listener => listener());
  //   };

  //   const subscribe = (listener) => {
  //     listeners.push(listener);
  //     return () => {
  //       listeners = listeners.filter(l => l !== listener);
  //     };
  //   };

  //   dispatch({});

  //   return { getState, dispatch, subscribe };
  // };

  const entityStore = createStore(EntityNodeReducer);

  private dataUrl = 'http://localhost:5000/';  // URL to web api

  private dispatcher = new Subject();
  private treeNodes = {};

  private nodes = {};

  constructor(private _http: Http) {
    this.dispatcher.subscribe((action) => this.handleAction(action));
  }

  private handleAction(action:any) {
    if (action.name === 'LOAD_CHILDREN') {
      if (this.nodes[action.node.url]) {
        this.treeNodes[action.node.url].next(this.nodes[action.node.url]);
      }
      else {
        this._http
          .get(this.dataUrl + action.node.fetch_url)
          .map(
            (res: Response) => res.json()
          )
          .subscribe(res => {
            this.nodes[action.node.url] = entityNodeReducer(res, action);
            this.treeNodes[action.node.url].next(this.nodes[action.node.url]);
          });
      }
    }
  }

  private handleError(error: any) : Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getTreeNodes(url:string) : Observable<any> {
    if (!this.treeNodes.hasOwnProperty(url)) {
      this.treeNodes[url] = new Subject ();
    }
    return this.treeNodes[url].asObservable();
  }

  dispatchAction(action:any) {
    this.dispatcher.next(action);
  }
}