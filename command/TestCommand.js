/**
 * Created by dsmiley on 3/4/14.
 */
Lotus.TestCommand = function(context){
    Lavender.BaseCommand.prototype.constructor.call(this, context);
    //get injected params.
    this.service = context.injector.getObject('service');
    this.model = context.injector.getObject('model');
    this.parser = context.injector.getObject('parser');
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