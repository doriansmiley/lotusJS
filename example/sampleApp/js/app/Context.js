/**
 * Created by dsmiley on 5/6/16.
 */
SampleApp.Context = function (model, params) {
    this.model = model;
    Lotus.Context.prototype.constructor.call(this, model.config, params);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.Context, SampleApp.Context);

SampleApp.Context.prototype.mapComponents = function(){
    this.componentMap.mapComponent('x-lotus-image-gallery', HTMLDivElement.prototype, Lotus.ImageGalleryCollectionView, xtag);
    this.componentMap.mapComponent('x-lotus-gallery-detail', HTMLDivElement.prototype, Lotus.ImageGalleryItemDetail, xtag);
}

SampleApp.Context.prototype.mapCommands = function(){
    //triggers loading of images
    //TODO: we need to replace Lavender.RecordSetEvent.LOAD_PAGE_DATA with a component specific event, like MyAppEvent.LOAD_IMAGE_ASSETS
    this.commandMap.addCommand( Lavender.RecordSetEvent.LOAD_PAGE_DATA, SampleApp.LoadImageAssetsCommand );
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
    this.injector.mapSingletonInstance(SampleApp.APP_SERVICES, new SampleApp.SampleService(this.model.config));
    this.injector.mapSingletonInstance(SampleApp.EVENT_DISPATCHER_KEY, Lotus.EventDispatcherFactory.getInstance().getEventDispatcher( this.config ));
    this.injector.mapSingletonInstance(SampleApp.MODEL_KEY, this.model);
    this.injector.mapSingletonInstance(SampleApp.OP_MODEL_KEY, this.model.opMpdel);
    this.injector.mapSingletonInstance(SampleApp.ERROR_MODEL_KEY, this.model.errorModel);
}

SampleApp.Context.prototype.mapMediators = function(){
    this.mediatorMap.add('x-lotus-image-gallery',SampleApp.ImageGalleryMediator);
    this.mediatorMap.add('x-lotus-gallery-detail',SampleApp.ImageGalleryItemDetailMediator);
    //you can optionally add a singleton instance using the following form
    //context.mediatorMap.add('x-lotus-image-gallery',SampleApp.ImageGalleryMediator,true);
}

SampleApp.IMAGE_ASSETS_PARSER_KEY = 'imageAssetsParser';
SampleApp.HTTP_SERVICE_KEY = 'xhr';
SampleApp.APP_SERVICES = 'service';
SampleApp.SERVICE_RESULT_PARSER_KEY = 'parser';
SampleApp.SERIALIZE_FACTORY_KEY = 'serializeFactoryKey';
SampleApp.EVENT_DISPATCHER_KEY = 'eventDispatcher';
SampleApp.MODEL_KEY = 'model';
SampleApp.OP_MODEL_KEY = 'opModel';
SampleApp.ERROR_MODEL_KEY = 'errorModel';