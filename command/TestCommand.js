/**
 * Created by dsmiley on 3/4/14.
 */
Lotus.TestCommand = function(context){
    Lavender.BaseCommand.prototype.constructor.call(this, context);
    //get injected params.
    //IMPORTANT: this is just an example of how to obtain object instances, in a production application you could use global variables, instance attributes, or static attributes
    //Anything but a hard coded string
    this.service = context.injector.inject('service');
    this.model = context.injector.inject('model');
    this.parser = context.injector.inject('parser');
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.BaseCommand, Lotus.TestCommand);

Lotus.TestCommand.prototype.getAction = function (event) {
    //config, service, opModel, parser, errorModel
    return new Lotus.TestAction(this.model.config, this.service, this.model.asyncOperationModel, this.parser, this.model.errorModel);
}

Lotus.TestCommand.prototype.onSuccess = function(event){
    //update model
    this.model.result = event.payload.result;
    this.destroy();
}

Lotus.TestCommand.prototype.destroy = function () {
    Lavender.BaseCommand.prototype.destroy.call(this, context);
    this.service = null;
    this.model = null;
    this.parser = null;
}