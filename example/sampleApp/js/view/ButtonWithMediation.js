/**
 * Created by dsmiley on 5/6/16.
 */
SampleApp.ButtonWithMediation = function(){
    Lotus.Button.prototype.constructor.call(this);
}
/************* Inherit from Lotus.AbstractComponent for data binding *************/
Lavender.ObjectUtils.extend(Lotus.Button, Lotus.ButtonWithMediation);

//add event listeners for mediation
//This component is an example of how to mediate events dispatched on stock components and dispatch application level events