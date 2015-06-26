/**
 * Created by dsmiley on 5/11/15.
 */
SampleApp.ImageAssetsParser = function () {

}

SampleApp.ImageAssetsParser.prototype.canParse = function (json) {
    //only URL is required at this time
    return ( ( json.hasOwnProperty('photos') && json.photos !== undefined && json.photos !== null ) );
}

SampleApp.ImageAssetsParser.prototype.parse = function (json) {
    var assets = [];
    for( var i=0; i < json.photos.length; i++ ){
        //IMPORTANT the object name must be parsed from the URL using var objectName = url.substr(url.lastIndexOf('/')+1);
        //get the parser, use of this method is an implementation of the builder pattern and allows subclasses to handle variations is future service responses
        var parser = this.getImageAssetParser();
        //Create the asset
        var asset = ( parser.canParse(json.photos[i]) ) ? parser.parse(json.photos[i]): null;
        if( asset === null ){
            throw new Error("ImageAsset JSON is invalid: " + json.photos[i] );
        }
        assets.push(asset);
    }
    return assets;
}

SampleApp.ImageAssetsParser.prototype.getImageAssetParser = function(){
    return new SampleApp.ImageAssetParser();
}

