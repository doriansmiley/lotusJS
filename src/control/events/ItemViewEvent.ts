/**
 * Created by dsmiley on 7/31/17.
 */
import {IEvent} from '../../../node_modules/lavenderjs/lib';
import {AbstractEvent} from '../../../node_modules/lavenderjs/lib';

export class ItemViewEvent extends AbstractEvent{
    constructor(type:string, payload?:Object){
        super(type, payload);

        if( type == ItemViewEvent.ITEM_SELECTED && ( !payload.hasOwnProperty('item') || payload['item'] === null || payload['item'] === undefined ) ){
            throw  new Error('Lotus.ItemViewEvent payload.item is required');
        }
    }

    public static ITEM_SELECTED = 'itemViewItemSelected';
    public static ITEM_DESELECTED = 'itemViewItemDeselected';
    public static REMOVE_ITEM = 'itemViewRemoveItem';

    clone(type:string, payload:Object):IEvent{
        return new ItemViewEvent(this.type, this.payload)
    }
}