/**
 * Created by dsmiley on 3/4/14.
 */
SampleApp.LoadImageAssetsCommand = function(context){
    Lotus.AbstractCommand.prototype.constructor.call(this, context);
    //get injected params.
    //IMPORTANT: this is just an example of how to obtain object instances, in a production application you could use global variables, instance attributes, or static attributes
    //Anything but a hard coded string
    this.service = context.injector.inject('service');
    this.model = context.injector.inject('model');
    this.parser = context.injector.inject('parser');
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractCommand, SampleApp.LoadImageAssetsCommand);

SampleApp.LoadImageAssetsCommand.prototype.getAction = function (event) {
    //config, service, opModel, parser, errorModel
    return new SampleApp.SampleAction(this.service, this.model.asyncOperationModel, this.parser, this.model.errorModel);
}

SampleApp.LoadImageAssetsCommand.prototype.onSuccess = function(event){
    //update model, in an actual command you would call something like this.parser.parse( event.payload.result )
    this.model.result = event.payload.result;
    this.destroy();
}

SampleApp.LoadImageAssetsCommand.prototype.destroy = function () {
    SampleApp.AbstractCommand.prototype.destroy.call(this);
    this.service = null;
    this.model = null;
    this.parser = null;
}