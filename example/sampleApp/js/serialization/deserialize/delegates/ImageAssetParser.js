/**
 * Created by dsmiley on 5/11/15.
 */
Hmk.ImageAssetParser = function () {

}

Hmk.ImageAssetParser.prototype.canParse = function (json) {
    //only URL is required at this time
    return ( ( json.hasOwnProperty('url') && json.url !== undefined && json.url != '' ) );
}

Hmk.ImageAssetParser.prototype.parse = function (json) {
    //IMPORTANT the object name must be parsed from the URL using var objectName = url.substr(url.lastIndexOf('/')+1);
    //Create the asset
    var asset = new Hmk.HallmarkAsset();
    asset.id = json.id;
    asset.url = json.url;
    asset.createdDate = json.created_date;
    asset.lastAccessDate = json.last_access_date;
    asset.objectName = asset.url.substr(asset.url.lastIndexOf('/')+1);
    return asset;
}

