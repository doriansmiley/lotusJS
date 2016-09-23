/**
 * Created by dsmiley on 9/15/16.
 */
Lotus.ButtonMediator = function (componentInstance, context) {
    Lotus.AbstractMediator.prototype.constructor.call(this, componentInstance, context);
}
/************* Inherit from AbstractEventDispatcher for event dispatching *************/
Lavender.ObjectUtils.extend(Lotus.AbstractMediator, Lotus.ButtonMediator);

Lotus.ButtonMediator.toString = function(){
    return 'Lotus.ButtonMediator';
}

Lotus.ButtonMediator.prototype.addEventListeners = function () {
    this.componentInstance.addEventListener('click', this, 'onClick');
}

Lotus.ButtonMediator.prototype.onClick = function (event) {
    console.log('Im the button mediator, I can handle the component click and dispatch an application event')
}

Lotus.ButtonMediator.prototype.removeEventListeners = function () {
    this.componentInstance.removeEventListener('click', this, 'onClick');
}