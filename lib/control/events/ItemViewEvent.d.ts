/**
 * Created by dsmiley on 7/31/17.
 */
import * as Lavender from 'lavenderjs/lib';
export declare class ItemViewEvent extends Lavender.AbstractEvent {
    constructor(type: string, payload?: Object);
    static ITEM_SELECTED: string;
    static ITEM_DESELECTED: string;
    static REMOVE_ITEM: string;
    clone(type: string, payload: Object): Lavender.IEvent;
}
