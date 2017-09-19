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

//execute the service call
SampleApp.LoadImageAssetsCommand.prototype.execute = function (event) {
    Lotus.AbstractCommand.prototype.execute.call(this, event);
    this.recordSet = event.payload.recordSet;
}

//execute the service call
SampleApp.LoadImageAssetsCommand.prototype.executeServiceMethod = function () {
    //params, key, responder, format, contentType, localRequest, cache
    return this.service.readImageAssets(['userID','all','public'], 'readImageAssets', this, 'json', null, true, true);
}

SampleApp.LoadImageAssetsCommand.prototype.parseResponse = function (result) {
    var imageAssets = this.parser.parserImageAssets(result.resultObj);
    if(imageAssets === null || imageAssets === undefined ){
        throw new Error('Unable to parse image assets from results: ' + result.resultObj);
    }
    this.updateResults(imageAssets);
    this.context.eventDispatcher.dispatch(new SampleApp.AppEvent(SampleApp.AppEvent.IMAGES_LOADED, {result:imageAssets}));
}

//get string to append to fault message
SampleApp.LoadImageAssetsCommand.prototype.getFaultString = function () {
    return 'Failed to load image assets. Please be sure the image api is running and reachable. Config.js contains the api settings.';
}

//get string to append to error message
SampleApp.LoadImageAssetsCommand.prototype.getErrorMessage = function () {
    return 'SampleApp.LoadImageAssetsCommand.prototype.getErrorMessage:  ';
}

//get string to append to execution error message
SampleApp.LoadImageAssetsCommand.prototype.getExecErrorString = function (msg) {
    return 'SampleApp.LoadImageAssetsCommand.prototype.executionError: the following are required: ';
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