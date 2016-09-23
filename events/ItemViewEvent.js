/**
 * Created by dsmiley on 5/20/15.
 */
Lotus.ItemViewEvent = function( eventType, payload ){
    /*
     payload can contain
     item
     */
    if( eventType == Lotus.ItemViewEvent.ITEM_SELECTED && ( payload.item === null || payload.item === undefined ) ){
        throw  new Error('Lotus.ItemViewEvent payload.item is required');
    }
    Lavender.AbstractEvent.prototype.constructor.call(this, eventType, payload);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend( Lavender.AbstractEvent, Lotus.ItemViewEvent );

Lotus.ItemViewEvent.prototype.clone = function(){
    return new Lotus.ItemViewEvent( this.type, this.payload)
}

Lotus.ItemViewEvent.ITEM_SELECTED = 'itemViewItemSelected';
Lotus.ItemViewEvent.ITEM_DESELECTED = 'itemViewItemDeselected';
Lotus.ItemViewEvent.REMOVE_ITEM = 'itemViewRemoveItem';