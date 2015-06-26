/**
 * Created by dsmiley on 6/26/15.
 */
var model = Lavender.ModelLocator.getInstance();
//add dynamic config properties
model.config.httpServiceCode = 'xhr';//IMPORTANT:no trailing slash
//base URL for the node services
model.config.baseUrl = 'http://localhost:3000';//IMPORTANT:no trailing slash
//api params
model.config.defaultSystemId = 'printimages';//IMPORTANT:no trailing slash
model.config.defaultAssetType = 'photos';//IMPORTANT:no trailing slash
model.config.defaultAssetVisibility = 'private';//IMPORTANT:no trailing slash
//set up our custom model object where we will store image assets accessed by the view
model.imageAssetModel = new SampleApp.ImageGalleryModel();