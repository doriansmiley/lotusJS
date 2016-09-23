/**
 * Created by dsmiley on 5/6/16.
 */
SampleApp.Context = function (model, params) {
    this.model = model;
    Lotus.Context.prototype.constructor.call(this, this,model.config, params);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.Context, SampleApp.Context);

SampleApp.Context.prototype.mapComponents = function(){
    //sample
    //this.componentMap.mapComponent('x-lotus-button', HTMLButtonElement.prototype, Lotus.Button);
}

SampleApp.Context.prototype.mapCommands = function(){
    //triggers loading of images
    this.commandMap.addCommand( SampleApp.ItemViewEvent.LOAD_IMAGES, SampleApp.LoadImageAssetsCommand );
    // you can optionally pass functionName and useSingleton
    //functionName defaults to 'execute'
    //if useSingleton is true only a single instance of the command will be executed when the events is dispatched, use this options with extreme caution
    //this.commandMap.addCommand( 'testEvent1', Lotus.SampleCommand, 'myFunction', true )
}

SampleApp.Context.prototype.mapObjects = function(){
    //map objects for construction
    this.injector.mapObject(SampleApp.HTTP_SERVICE_KEY, SampleApp.HttpServiceFactory.getInstance().getHttpServiceForInjection(this.config));
    //Map singletons
    this.injector.mapSingletonInstance(SampleApp.SERVICE_RESULT_PARSER_KEY, SampleApp.SerializeFactory.getInstance().getServiceResultParser(this.config));
    this.injector.mapSingletonInstance(SampleApp.SERIALIZE_FACTORY_KEY, SampleApp.SerializeFactory.getInstance());
    this.injector.mapSingletonInstance(SampleApp.APP_SERVICES, new SampleApp.SampleService(this.config));
    this.injector.mapSingletonInstance(SampleApp.EVENT_DISPATCHER_KEY, Lotus.EventDispatcherFactory.getInstance().getEventDispatcher( this.config ));
    this.injector.mapSingletonInstance(SampleApp.MODEL_KEY, this.model);
}

SampleApp.Context.prototype.mapMediators = function(){

}

SampleApp.IMAGE_ASSETS_PARSER_KEY = 'imageAssetsParser';
SampleApp.HTTP_SERVICE_KEY = 'xhr';
SampleApp.APP_SERVICES = 'appServices';
SampleApp.SERVICE_RESULT_PARSER_KEY = 'serviceResultParser';
SampleApp.SERIALIZE_FACTORY_KEY = 'serializeFactoryKey';
SampleApp.EVENT_DISPATCHER_KEY = 'eventDispatcher';
SampleApp.MODEL_KEY = 'images';