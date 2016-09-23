/**
 * Created by dsmiley on 9/15/16.
 */
SampleApp.ImageGalleryMediator = function (componentInstance, context) {
    Lotus.AbstractMediator.prototype.constructor.call(this, componentInstance, context);
}
/************* Inherit from AbstractEventDispatcher for event dispatching *************/
Lavender.ObjectUtils.extend(Lotus.AbstractMediator, SampleApp.ImageGalleryMediator);

SampleApp.ImageGalleryMediator.toString = function(){
    return 'SampleApp.ImageGalleryMediator';
}

SampleApp.ImageGalleryMediator.prototype.addEventListeners = function () {
    this.componentInstance.addEventListener('click', this, 'onClick');
}

SampleApp.ImageGalleryMediator.prototype.onClick = function (event) {
    console.log('Im the button mediator, I can handle the component click and dispatch an application event')
}

SampleApp.ImageGalleryMediator.prototype.removeEventListeners = function () {
    this.componentInstance.removeEventListener('click', this, 'onClick');
}