/**
 * Created by dsmiley on 5/20/15.
 */
Lotus.ComponentEvent = function( eventType, payload ){
    /*
     payload can contain
     item
     */
    Lavender.AbstractEvent.prototype.constructor.call(this, eventType, payload);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend( Lavender.AbstractEvent, Lotus.ComponentEvent );

Lotus.ComponentEvent.prototype.clone = function(){
    return new Lotus.ComponentEvent( this.type, this.payload)
}

Lotus.ComponentEvent.READY = 'lotusComponentReady';