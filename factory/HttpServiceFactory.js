/**
 * Created by dsmiley on 2/10/14.
 */
Lotus.HttpServiceFactory = function(){
    if (Lotus.HttpServiceFactory.instance != null) {
        throw( 'Lotus.EventDispatcherFactory.instance: Singleton class has already been instantiated' );
    } else {
        //perform any required object set up
    }
}

Lotus.HttpServiceFactory.getInstance = function(){
    if (Lotus.HttpServiceFactory.instance == null) {
        Lotus.HttpServiceFactory.instance = new Lotus.HttpServiceFactory();
    }
    return Lotus.HttpServiceFactory.instance;
}

Lotus.HttpServiceFactory.instance = null;

Lotus.HttpServiceFactory.prototype.getHttpService = function( config ){
    var httpService;
    switch( config.httpServiceCode ){
        case "angular":
            httpService = new Lavender.AngularHttpService();
            break;
        case "jquery":
        default:
            httpService = new Lavender.JqueryHttpService();
            break;
    }
    return httpService;
}
