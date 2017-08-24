/**
 * Created by dsmiley on 7/31/17.
 */
import { IEvent } from 'lavenderjs/lib';
import { AbstractEvent } from 'lavenderjs/lib';
export declare class ItemViewEvent extends AbstractEvent {
    constructor(type: string, payload?: Object);
    static ITEM_SELECTED: string;
    static ITEM_DESELECTED: string;
    static REMOVE_ITEM: string;
    clone(type: string, payload: Object): IEvent;
}
