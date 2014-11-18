/**
 * Created by dsmiley on 11/18/14.
 * This is a sample asynchronous action used in unit tests. It can be used as a template though for all asynch actions
 */
Lotus.TestAction = function (config, service, opModel, parser, errorModel) {
    this.config = config;
    Lavender.AbstractServiceAction.prototype.constructor.call(this, config, service, opModel, parser);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.AbstractServiceAction, Lotus.TestAction);

//abstract method for override
Lotus.TestAction.prototype.parseResponse = function (result) {
    return result;//use this.parser.parse to deserialize results. You'll of course need to implement the parser
}

//execute the service call
Lotus.TestAction.prototype.executeServiceMethod = function () {
    return this.service.createSDSession(this.config.context, this.config.user, this.config.password, 'createSDSession', this, null, null, true, true);
}

//get string to append to fault message
Lotus.TestAction.prototype.getFaultString = function () {
    return 'Lotus.TestAction.prototype.getFaultString:  ';
}

//get string to append to error message
Lotus.TestAction.prototype.getErrorMessage = function () {
    return 'Lotus.TestAction.prototype.getErrorMessage:  ';
}

//get string to append to execution error message
Lotus.TestAction.prototype.getExecErrorString = function (msg) {
    return 'Lotus.TestAction.prototype.executionError: the following are required: ';
}

Lotus.TestAction.prototype.dispatchSuccess = function (parsedResult) {
    //notify listeners and include all known values.
    //In an actual concrete command instance you could dispatch a custom event that is a subclass of the Lavender Event object
    //We override the dispatchSuccess method simply to show how you could dispatch a custom event
    var doneEvent = new Lavender.ActionSuccessEvent(Lavender.ActionSuccessEvent.SUCCESS,{result:parsedResult});
    this.dispatch(doneEvent);
}
