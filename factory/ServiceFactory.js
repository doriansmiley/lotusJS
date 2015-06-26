/**
 * Created by dsmiley on 11/5/13.
 */

Lotus.ServiceFactory = function(){
    if (Lotus.ServiceFactory.instance != null) {
        throw( 'Lotus.EventDispatcherFactory.instance: Singleton class has already been instantiated' );
    } else {
        //perform any required object set up
    }
}

Lotus.ServiceFactory.getInstance = function(){
    if (Lotus.ServiceFactory.instance == null) {
        Lotus.ServiceFactory.instance = new Lotus.ServiceFactory();
    }
    return Lotus.ServiceFactory.instance;
}

Lotus.ServiceFactory.instance = null;

Lotus.ServiceFactory.prototype.getService = function( config ){
    var dao;
    switch( config.serviceCode ){
        case "1.0":
        case '1.1':
        case "2.50.4878.21250":
        default:
            dao = new Lotus.SampleService( config );
    }
    return dao;
}
