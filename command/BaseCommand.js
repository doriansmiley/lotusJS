/**
 * Created by dsmiley on 3/4/14.
 */
Lotus.BaseCommand = function(){
    Lavender.ObjectUtils.mixin(Lavender.AbstractEventDispatcher, Lotus.BaseCommand, this);
}

Lotus.BaseCommand.prototype.execute = function (event) {

    this.addEventListener(SpiSdk.ActionErrorEvent.ERROR, this, 'onError');//event, instance, handler

}

Lotus.BaseCommand.prototype.onError = function (event) {
    this.destroy();
    if( console !== null && console !== undefined ){
        console.log(event.payload.message);
    }
    //throw new Error(event.payload.message);
}

Lotus.BaseCommand.prototype.destroy = function (event) {
    if( this.canListen(SpiSdk.ActionErrorEvent.ERROR, this, 'onError') ){
        this.removeEventListener(SpiSdk.ActionErrorEvent.ERROR, this, 'onError');
    }
}