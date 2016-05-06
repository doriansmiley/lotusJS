/**
 * Created by dsmiley on 6/26/15.
 */
var model = Lavender.ModelLocator.getInstance();
//add dynamic config properties
model.config.httpServiceCode = 'xhr';
model.config.eventDispatcherCode = "abstract";
//base URL for the node services
model.config.baseUrl = 'http://localhost:3000';//IMPORTANT:no trailing slash
//api params
model.config.defaultSystemId = 'printimages';//IMPORTANT:no trailing slash
model.config.defaultAssetType = 'photos';//IMPORTANT:no trailing slash
model.config.defaultAssetVisibility = 'private';//IMPORTANT:no trailing slash
//define the service end points
model.config.serviceMap = {
    //end point that loads images for the gallery
    'readImageAssets'			: ':3000/readImageAssets/{0}/{1}/{2}/{3}'
};
//set up our custom model object where we will store image assets accessed by the view
model.imageAssetModel = new SampleApp.ImageGalleryModel();