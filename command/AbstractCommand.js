/**
 * Created by dsmiley on 3/4/14.
 */
Lotus.AbstractCommand = function(context){
    //IMPORTANT: model should extend or be instance of Lavender.ModelLocator
    //All these params will be injected
    this.action = null;
    this.context = context;
    Lavender.ObjectUtils.mixin(Lavender.AbstractEventDispatcher, Lotus.AbstractCommand, this);
}

Lotus.AbstractCommand.prototype.execute = function (event) {
    //config, service, opModel, parser, errorModel
    this.action = this.getAction(event);
    this.action.addEventListener(Lavender.ActionSuccessEvent.SUCCESS, this, 'onSuccess');
    this.action.addEventListener(Lavender.ActionErrorEvent.ERROR, this, 'onError');//event, instance, handler
    this.action.execute();
}

//stub for override
Lotus.AbstractCommand.prototype.getAction = function (event) {
    return null;
}

//stub for override
Lotus.AbstractCommand.prototype.onSuccess = function(event){

}

Lotus.AbstractCommand.prototype.onError = function (event) {
    this.destroy();
    //the action will update the error mode, this is just here to help debugging
    if( console !== null && console !== undefined ){
        console.log('Lotus.AbstractCommand.prototype.onError: ' + event.payload.message);
    }
}

Lotus.AbstractCommand.prototype.destroy = function () {
    if( this.canListen(Lavender.ActionErrorEvent.ERROR, this, 'onError') ){
        this.removeEventListener(Lavender.ActionErrorEvent.ERROR, this, 'onError');
    }
    if( this.canListen(Lavender.ActionSuccessEvent.SUCCESS, this, 'onSuccess') ){
        this.removeEventListener(Lavender.ActionSuccessEvent.SUCCESS, this, 'onSuccess');
    }
    this.action = null;
    this.context = null;
}