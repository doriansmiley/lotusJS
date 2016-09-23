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
    //TODO:add event listener to load data when paging recordset
    //this.componentInstance.addEventListener('click', this, 'onClick');
}

SampleApp.ImageGalleryMediator.prototype.removeEventListeners = function () {
    //TODO:remove event listener to load data when paging recordset
    //this.componentInstance.removeEventListener('click', this, 'onClick');
}