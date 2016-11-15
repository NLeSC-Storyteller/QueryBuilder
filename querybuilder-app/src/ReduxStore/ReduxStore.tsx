import { createStore } from 'redux';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { EntityNodeReducer } from './EntityNodeReducer';

export class ReduxStore {

    const entityStore = createStore(EntityNodeReducer);

    private dataUrl = 'http://localhost:5000/';   // URL to web api
    private dispatcher = new Subject();
    private treeNodes = {};
    private nodes = {};
    private _http;

    constructor(http: Http) {
        this._http = http;
        this.dispatcher.subscribe((action) => this.handleAction(action));
    }

    private handleAction(action: any) {
        if (action.name === 'LOAD_CHILDREN') {
            if (this.nodes[action.node.url]) {
                    this.treeNodes[action.node.url].next(this.nodes[action.node.url]);
            } else {
                    this._http
                        .get(this.dataUrl + action.node.fetch_url)
                        .map(
                            (res: Response) => {res.json(); }
                        )
                        .subscribe(res => {
                            this.nodes[action.node.url] = entityNodeReducer(res, action);
                            this.treeNodes[action.node.url].next(this.nodes[action.node.url]);
                        });
            }
        }
    }

    public getTreeNodes(url: string) : Observable<any> {
            if (!this.treeNodes.hasOwnProperty(url)) {
                    this.treeNodes[url] = new Subject ();
            }
            return this.treeNodes[url].asObservable();
    }

    public dispatchAction(action: any) {
            this.dispatcher.next(action);
    }
}
