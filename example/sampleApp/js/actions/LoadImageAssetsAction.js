/**
 * Created by dsmiley on 11/18/14.
 * This is a sample asynchronous action used in unit tests. It can be used as a template though for all asynch actions
 */
SampleApp.LoadImageAssetsAction = function (service, opModel, parser, errorModel) {
    Lavender.AbstractServiceAction.prototype.constructor.call(this, service, opModel, parser, errorModel);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.AbstractServiceAction, SampleApp.LoadImageAssetsAction);

//abstract method for override
SampleApp.LoadImageAssetsAction.prototype.parseResponse = function (result) {
    var imageAssets = this.parser.parserImageAssets(result.resultObj);
    if(imageAssets === null || imageAssets === undefined ){
        throw new Error('Unable to parse image assets from results: ' + result.resultObj);
    }
    return imageAssets;
}

//execute the service call
SampleApp.LoadImageAssetsAction.prototype.executeServiceMethod = function () {
    //params, key, responder, format, contentType, localRequest, cache
    return this.service.readImageAssets(['userID','all','public'], 'readImageAssets', this, 'json', null, true, true);
}

//get string to append to fault message
SampleApp.LoadImageAssetsAction.prototype.getFaultString = function () {
    return 'Failed to load image assets. Please be sure the image api is running and reachable. Config.js contains the api settings.';
}

//get string to append to error message
SampleApp.LoadImageAssetsAction.prototype.getErrorMessage = function () {
    return 'SampleApp.LoadImageAssetsAction.prototype.getErrorMessage:  ';
}

//get string to append to execution error message
SampleApp.LoadImageAssetsAction.prototype.getExecErrorString = function (msg) {
    return 'SampleApp.LoadImageAssetsAction.prototype.executionError: the following are required: ';
}

SampleApp.LoadImageAssetsAction.prototype.dispatchSuccess = function (parsedResult) {
    //notify listeners and include all known values.
    //In an actual concrete command instance you could dispatch a custom event that is a subclass of the Lavender Event object
    //We override the dispatchSuccess method simply to show how you could dispatch a custom event
    var doneEvent = new Lavender.ActionSuccessEvent(Lavender.ActionSuccessEvent.SUCCESS,{result:parsedResult});
    this.dispatch(doneEvent);
}
