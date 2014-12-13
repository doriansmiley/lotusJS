/**
 * Created by dsmiley on 11/18/14.
 * This is a sample asynchronous action used in unit tests. It can be used as a template though for all asynch actions
 */
Lotus.SampleAction = function (jsonKey, jsonValue, service, opModel, parser, errorModel) {
    this.jsonKey = jsonKey;
    this.jsonValue = jsonValue;
    Lavender.AbstractServiceAction.prototype.constructor.call(this, service, opModel, parser, errorModel);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.AbstractServiceAction, Lotus.SampleAction);

//abstract method for override
Lotus.SampleAction.prototype.parseResponse = function (result) {
    return result;//use this.parser.parse to deserialize results. You'll of course need to implement the parser
}

//execute the service call
Lotus.SampleAction.prototype.executeServiceMethod = function () {
    return this.service.echoJSON(this.jsonKey, this.jsonValue, 'echoJSON', this, 'json', null, true, true);
}

//get string to append to fault message
Lotus.SampleAction.prototype.getFaultString = function () {
    return 'Lotus.SampleAction.prototype.getFaultString:  ';
}

//get string to append to error message
Lotus.SampleAction.prototype.getErrorMessage = function () {
    return 'Lotus.SampleAction.prototype.getErrorMessage:  ';
}

//get string to append to execution error message
Lotus.SampleAction.prototype.getExecErrorString = function (msg) {
    return 'Lotus.SampleAction.prototype.executionError: the following are required: ';
}

Lotus.SampleAction.prototype.dispatchSuccess = function (parsedResult) {
    //notify listeners and include all known values.
    //In an actual concrete command instance you could dispatch a custom event that is a subclass of the Lavender Event object
    //We override the dispatchSuccess method simply to show how you could dispatch a custom event
    var doneEvent = new Lavender.ActionSuccessEvent(Lavender.ActionSuccessEvent.SUCCESS,{result:parsedResult});
    this.dispatch(doneEvent);
}
