/**
 * Created by dsmiley on 11/18/14.
 */
Lotus.Context = function(config, params){
    //IMPORTANT: must occur first so application event bus is configured
    this.eventDispatcher = Lotus.EventDispatcherFactory.getInstance().getEventDispatcher(config, params);
    this.componentMap = new Lotus.ComponentMap(this);//create factory if we require sub classes one day
    this.commandMap = new Lotus.CommandMap(this);//create factory if we require sub classes one day
    this.startUp();
}

Lotus.Context.prototype.startUp = function(){
    //set up dependency injection
    this.mapObjects();
    //map view components
    this.mapComponents();
    //map commands
    this.mapCommands();
    //map mediators
    this.mapMediators();
}

//stubs for override
Lotus.Context.prototype.mapComponents = function(){

}

Lotus.Context.prototype.mapCommands = function(){

}

Lotus.Context.prototype.mapObjects = function(){

}

Lotus.Context.prototype.mapMediators = function(){

}