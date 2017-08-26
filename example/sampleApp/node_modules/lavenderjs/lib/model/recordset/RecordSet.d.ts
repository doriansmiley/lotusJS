/**
 * Created by dsmiley on 5/12/17.
 */
import { Subject } from '../observable/Subject';
import { CollectionEvent } from '../../events/CollectionEvent';
import { IEvent } from '../../events/IEvent';
import { IList } from '../list/IList';
import { IEventDispatcher } from '../../control/IEventDispatcher';
export declare class RecordSet extends Subject implements IEventDispatcher {
    static USER_UPLOAD: string;
    static FOTOLIA: string;
    static FACEBOOK: string;
    private _id;
    private _totalRecords;
    private _totalPages;
    private _selectedPage;
    private _recordsPerPage;
    private _results;
    private _pageList;
    private _createdOn;
    private _timeToLive;
    private _source;
    private _routeController;
    private _intervalId;
    resultsByPage: Object;
    handlersByEventName: Object;
    addEventListener: (event: string, instance: Object, handler: string) => void;
    canListen: (eventType: string, instance: Object, handler: string) => boolean;
    removeEventListener: (event: string, instance: Object, handler: string) => void;
    removeAllEventListeners: (instance: Object) => void;
    dispatch: (event: IEvent) => void;
    id: string;
    totalRecords: number;
    totalPages: number;
    selectedPage: number;
    recordsPerPage: number;
    results: IList;
    createdOn: number;
    pageList: IList;
    timeToLive: number;
    source: string;
    routeController: Object;
    constructor(timeToLive?: number, listFunction?: any);
    private clearInterval();
    private clear();
    private pageLoaded(pageNumber);
    private calculatePageList();
    private renewState();
    resultCollectionChanged(event: CollectionEvent): void;
    destroy(): void;
}
