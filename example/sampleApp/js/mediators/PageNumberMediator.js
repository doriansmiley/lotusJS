/**
 * Created by dsmiley on 8/28/17.
 */
/**
 * Created by dsmiley on 9/15/16.
 */
SampleApp.PageNumberMediator = function (componentInstance, context) {
    Lotus.AbstractMediator.prototype.constructor.call(this, componentInstance, context);

}
/************* Inherit from AbstractEventDispatcher for event dispatching *************/
Lavender.ObjectUtils.extend(Lotus.AbstractMediator, SampleApp.PageNumberMediator);

SampleApp.PageNumberMediator.toString = function(){
    return 'SampleApp.PageNumberMediator';
}

SampleApp.PageNumberMediator.prototype.init = function () {
    Lotus.AbstractMediator.prototype.init.call(this);
    var recordSetLabel = this.componentInstance.element.getAttribute('data-source');//note the attribute recordset should be set on the element identitifed as your component root in your template file (templates/imageGallery.html)
    var model = this.context.injector.inject(SampleApp.MODEL_KEY);
    if( model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel] === null || model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel] === undefined ){
        //create the record set for the source if it's not already defined
        model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel] = new Lavender.RecordSet(NaN, Lavender.ArrayList);
        model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel].createdOn = new Date();
        model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel].id = Lavender.UuidUtils.generateUUID();
        model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel].recordsPerPage = model.config.galleryItemsPerPage;
        model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel].results.allowDuplicates = true;
        model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel].source = recordSetLabel;
    }
    this.binder.bind(model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel], 'selectedPage', this.componentInstance , 'model');
    this.componentInstance.model = model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel].selectedPage
}
