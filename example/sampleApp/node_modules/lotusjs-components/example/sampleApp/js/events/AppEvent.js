/**
 * Created by dsmiley on 9/22/16.
 */
SampleApp.AppEvent = function( eventType, payload ){
    if( eventType == SampleApp.AppEvent.ITEM_SELECTED && ( payload.item === null || payload.item === undefined ) ){
        throw  new Error('SampleApp.AppEvent payload.item is required');
    }
    Lavender.AbstractEvent.prototype.constructor.call(this, eventType, payload);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend( Lavender.AbstractEvent, SampleApp.AppEvent );

SampleApp.AppEvent.prototype.clone = function(){
    return new SampleApp.AppEvent( this.type, this.payload)
}

SampleApp.AppEvent.LOAD_IMAGES = 'smpLoadImages';
SampleApp.AppEvent.IMAGES_LOADED = 'smpImagesLoaded';