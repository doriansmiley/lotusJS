/**
 * Created by dsmiley on 9/22/16.
 */
SampleApp.ItemViewEvent = function( eventType, payload ){
    if( eventType == SampleApp.ItemViewEvent.ITEM_SELECTED && ( payload.item === null || payload.item === undefined ) ){
        throw  new Error('SampleApp.ItemViewEvent payload.item is required');
    }
    Lavender.AbstractEvent.prototype.constructor.call(this, eventType, payload);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend( Lavender.AbstractEvent, SampleApp.ItemViewEvent );

SampleApp.ItemViewEvent.prototype.clone = function(){
    return new SampleApp.ItemViewEvent( this.type, this.payload)
}

SampleApp.ItemViewEvent.LOAD_IMAGES = 'smpLoadImages';