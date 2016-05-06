/**
 * Created by dsmiley on 5/6/16.
 */
SampleApp.Context = function (config, params) {
    Lotus.Context.prototype.constructor.call(this, config, params);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.Context, SampleApp.Context);

SampleApp.Context.prototype.mapComponents = function(){

}

SampleApp.Context.prototype.mapCommands = function(){
    //sample
    //this.commandMap.componentMap.mapComponent('x-lotus-button', null, Lotus.Button);
}

SampleApp.Context.prototype.mapObjects = function(){
    this.injector.mapObject(SampleApp.HTTP_SERVICE_KEY, SampleApp.HttpServiceFactory.getInstance().getHttpService(this.config));
    this.injector.mapObject(SampleApp.IMAGE_ASSETS_PARSER_KEY, SampleApp.ImageAssetsParser);
    //Map singletons
    this.injector.mapSingletonInstance(SampleApp.SERVICE_RESULT_PARSER_KEY, new SampleApp.ServiceResultParser());
    this.injector.mapSingletonInstance(SampleApp.APP_SERVICES, new SampleApp.SampleService(this.config));
    var recordSet = new Lavender.RecordSet();
    recordSet.id = '1234';
    recordSet.selectedPage = 1;
    recordSet.createdOn = new Date();//Date;;
    recordSet.timeToLive = 500000;
    recordSet.source = this.config.baseUrl + model.config.serviceMap['readImageAssets'];
    recordSet.recordsPerPage = 2;
    this.injector.mapSingletonInstance(SampleApp.IMAGES_KEY, recordSet);
}

SampleApp.Context.prototype.mapMediators = function(){

}

SampleApp.IMAGE_ASSETS_PARSER_KEY = 'imageAssetsParser';
SampleApp.HTTP_SERVICE_KEY = 'xhr';
SampleApp.APP_SERVICES = 'appServices';
SampleApp.SERVICE_RESULT_PARSER_KEY = 'serviceResultParser';
SampleApp.IMAGES_KEY = 'images';