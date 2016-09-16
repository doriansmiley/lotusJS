/**
 * Created by dsmiley on 9/15/16.
 */
Lotus.ButtonMediator = function (componentInstance, context) {
    Lotus.AbstractMediator.prototype.constructor.call(this);
}
/************* Inherit from AbstractEventDispatcher for event dispatching *************/
Lavender.ObjectUtils.extend(Lotus.AbstractMediator, Lotus.ButtonMediator);