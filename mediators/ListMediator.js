/**
 * Created by dsmiley on 9/15/16.
 */
Lotus.ListMediator = function (componentInstance, context) {
    Lotus.AbstractMediator.prototype.constructor.call(this);
}
/************* Inherit from AbstractEventDispatcher for event dispatching *************/
Lavender.ObjectUtils.extend(Lotus.AbstractMediator, Lotus.ListMediator);