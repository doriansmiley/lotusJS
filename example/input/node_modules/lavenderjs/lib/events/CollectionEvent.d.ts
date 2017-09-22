/**
 * Created by dsmiley on 5/11/17.
 */
import { IEvent } from './IEvent';
import { AbstractEvent } from './AbstractEvent';
export declare class CollectionEvent extends AbstractEvent {
    constructor(type: string, payload?: Object);
    static COLLECTION_CHANGE: string;
    static COLLECTION_CHANGE_ORDER: string;
    clone(type: string, payload: Object): IEvent;
}
