/**
 * Created by dsmiley on 6/26/15.
 */
/**
 * Created by dsmiley on 1/10/14.
 */
SampleApp.SerializeFactory = function(){
    if (SampleApp.SerializeFactory.instance != null) {
        throw( 'SampleApp.EventDispatcherFactory.instance: Singleton class has already been instantiated' );
    } else {
        //perform any required object set up
    }
}

/*
 * get the image asset parser based on JSON schema key
 * This is just a sample, a real world method would be tied to known schema key values and default to an error
 * */
SampleApp.SerializeFactory.prototype.getImageAssetParser = function(schemaKey)
{
    var parser;
    switch( schemaKey ){
        case '0.99':
        default:
            parser = new SampleApp.ImageAssetsParser();
            break;
    }
    return parser;
}

/*
 * get the service parser used to deserialize service responses
 * */
SampleApp.SerializeFactory.prototype.getServiceResultParser = function(config)
{
    var parser;
    switch( config.parserCode ){
        case 'testApp':
        default:
            parser = new SampleApp.ServiceResultParser();
            break;
    }
    return parser;
}

/*
 * get the service exporter used for serializing service payloads
 * */
SampleApp.SerializeFactory.prototype.getServiceExporter = function(config)
{
    var exporter;
    //code out once sample app exports data to services
    switch( config.exporterCode ){
        case 'testApp':
        default:
            exporter = {};
            break;
    }
    return exporter;
}

SampleApp.SerializeFactory.getInstance = function(){
    if (SampleApp.SerializeFactory.instance == null) {
        SampleApp.SerializeFactory.instance = new SampleApp.SerializeFactory();
    }
    return SampleApp.SerializeFactory.instance;
}

SampleApp.SerializeFactory.instance = null;
