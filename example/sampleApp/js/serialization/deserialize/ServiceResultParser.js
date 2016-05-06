/**
 * Created by dsmiley on 6/26/15.
 */
SampleApp.ServiceResultParser = function () {

}

SampleApp.ServiceResultParser.prototype.parserImageAssets = function( result )
{
    var parsedJSON = JSON.parse(result);
    var parser = SampleApp.resources.injector.inject(SampleApp.IMAGE_ASSETS_PARSER_KEY);
    //walk the theme list
    if( !parser.canParse(parsedJSON))
    {
        throw new Error('Can not parse image assets ' + parsedJSON);
    }
    //IMPORTANT: ServiceResultParser should never pass the context through to delegates!!! The reason is we don't want low level objects having framework dependencies as this is bad encapsulation and hurts portability
    return parser.parse(parsedJSON);
}