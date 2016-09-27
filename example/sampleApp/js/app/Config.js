/**
 * Created by dsmiley on 6/26/15.
 */
SampleApp.Model = function() {
    var model = Lavender.ModelLocator.getInstance();
//add dynamic config properties
    model.config.httpServiceCode = 'xhr';
    model.config.eventDispatcherCode = "abstract";
//base URL for the node services
    model.config.baseUrl = 'http://localhost';//IMPORTANT:no trailing slash
//api params
    model.config.defaultSystemId = 'printimages';//IMPORTANT:no trailing slash
    model.config.defaultAssetType = 'photos';//IMPORTANT:no trailing slash
    model.config.defaultAssetVisibility = 'private';//IMPORTANT:no trailing slash
//define the service end points
    model.config.serviceMap = {
        //IMPORTANT: these end points are used by unit tests!!!
        'createSDSession': '/sdsession/action/create',
        'getInstance': '/instance/{0}',// {0} = instanceId
        'echoJSON': '/key/value/{0}/{1}',// {0} = instanceId
        'localRequest': ':3000/printondemand/1234/photos/{0}',
        'readImageAssets': ':3000/readImageAssets/{0}/{1}/{2}'
    };
//set up record set model where our image gallery records will be loaded
     model.recordsetModel = new Lavender.RecordSetModel();
}