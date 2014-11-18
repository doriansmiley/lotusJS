/**
 * Created by dsmiley on 11/5/13.
 */
Lotus.EventDispatcherFactory = function(){
    if (Lotus.EventDispatcherFactory.instance != null ) {
        throw( 'Lotus.EventDispatcherFactory.instance: Singleton class has already been instantiated' );
    } else {
        //perform any required object set up
    }
}

Lotus.EventDispatcherFactory.getInstance = function(){
    if (Lotus.EventDispatcherFactory.instance == null) {
        Lotus.EventDispatcherFactory.instance = new Lotus.EventDispatcherFactory();
    }
    return Lotus.EventDispatcherFactory.instance;
}

Lotus.EventDispatcherFactory.instance = null;

Lotus.EventDispatcherFactory.prototype.getEventDispatcher = function( config, params ){
    var dispatcher;
    //config.daoCode defaults to jquery
    switch( config.eventDispatcherCode ){
        case "jquery":
            dispatcher = new Lavender.JqueryEventDispatcher();
            break;
        case "angular":
            dispatcher = new Lavender.AngularEventDispatcher(params);
            break;
        case "abstract":
        default:
            dispatcher = new Lavender.AbstractEventDispatcher();
    }
    return dispatcher;
}
