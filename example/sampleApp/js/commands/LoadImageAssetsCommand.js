/**
 * Created by dsmiley on 3/4/14.
 */
SampleApp.LoadImageAssetsCommand = function(context){
    Lotus.AbstractCommand.prototype.constructor.call(this, context);
    //get injected params.
    //IMPORTANT: this is just an example of how to obtain object instances, in a production application you could use global variables, instance attributes, or static attributes
    //Anything but a hard coded string
    this.service = context.injector.inject(SampleApp.APP_SERVICES);
    this.model = context.injector.inject(SampleApp.MODEL_KEY);
    this.parser = context.injector.inject(SampleApp.SERVICE_RESULT_PARSER_KEY);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractCommand, SampleApp.LoadImageAssetsCommand);

SampleApp.LoadImageAssetsCommand.prototype.getAction = function (event) {
    //config, service, opModel, parser, errorModel
    this.recordSet = event.payload.recordSet;
    return new SampleApp.LoadImageAssetsAction(this.service, this.model.asyncOperationModel, this.parser, this.model.errorModel);
}

SampleApp.LoadImageAssetsCommand.prototype.onSuccess = function(event){
    this.updateResults(event.payload.result);
    SampleApp.resources.eventDispatcher.dispatch(new SampleApp.AppEvent(SampleApp.AppEvent.IMAGES_LOADED, {result:event.payload.result}));
    this.destroy();
}

SampleApp.LoadImageAssetsCommand.prototype.onError = function (event) {
    alert('Error: ' + event.payload.message);
    Lotus.AbstractCommand.prototype.onError.call(this,event);
}

SampleApp.LoadImageAssetsCommand.prototype.updateResults = function (items) {
    this.recordSet.totalRecords = items.totalRecords;
    //figure out what position to add the records
    var first = (this.recordSet.selectedPage - 1) * this.recordSet.recordsPerPage;
    var recordsToAdd = [];
    for (var i = 0; i < items.length; ++i) {
        var item = items[i];
        var index = first + i;
        recordsToAdd.push( {addItemAt:index, item:item} )
    }
    //IMPORTANT: always use add all so we don't trigger unneeded update events
    //Also addAll can tolerate non sequential additions to the collection. If for example the array contains 5 items and the results start at index 10
    //ArrayList will populate null values up to the star index
    this.recordSet.results.addAll(recordsToAdd, true);
}

SampleApp.LoadImageAssetsCommand.prototype.destroy = function () {
    Lotus.AbstractCommand.prototype.destroy.call(this);
    this.service = null;
    this.model = null;
    this.parser = null;
}