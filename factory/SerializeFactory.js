/**
 * Created by dsmiley on 1/10/14.
 */
Lotus.SerializeFactory = function(){
    if (Lotus.SerializeFactory.instance != null) {
        throw( 'Lotus.SerializeFactory.instance: Singleton class has already been instantiated' );
    } else {
        //perform any required object set up
    }
}

/*
* Stub for override, this method is just an example of how this factory can be used
* */
Lotus.SerializeFactory.prototype.getServiceResultParser = function(config)
{
    var parser;
    switch( config.parserCode ){
        case 'local':
        case 'remote':
        default:
            parser = {};
            break;
    }
    return parser;
}

/*
 * Stub for override, this method is just an example of how this factory can be used
 * */
Lotus.SerializeFactory.prototype.getServiceExporter = function(config)
{
    var exporter;
    //we resuse parserCode which should really probably be called serializationCode
    switch( config.exporterCode ){
        case 'local':
        case 'remote':
        default:
            exporter = {};
            break;
    }
    return exporter;
}

Lotus.SerializeFactory.getInstance = function(){
    if (Lotus.SerializeFactory.instance == null) {
        Lotus.SerializeFactory.instance = new Lotus.SerializeFactory();
    }
    return Lotus.SerializeFactory.instance;
}

Lotus.SerializeFactory.instance = null;
