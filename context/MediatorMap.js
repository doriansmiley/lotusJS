/**
 * Created by dsmiley on 9/16/16.
 */
Lotus.MediatorMap = function( context ){
    //Note: this could be improved by creating read only accessor methods for tagMap and eventFunctionMap
    this.tagConstructorMap = {};
    this.mediatorInstanceMap = [];
    this.context = context;
}

Lotus.MediatorMap.prototype.add = function( tagName, mediatorConstructor, useSingleton ){
    if( useSingleton === null || useSingleton === undefined ){
        useSingleton = false;
    }

    if( this.hasMediatorMap( tagName, mediatorConstructor ) ){
        return;//don't add the mediatorConstructor/function twice
    }

    this.tagConstructorMap[tagName] = {useSingleton:useSingleton, constructor:mediatorConstructor, id:Lavender.UuidUtils.generateUUID(), name:mediatorConstructor.toString()};
}

Lotus.MediatorMap.prototype.remove = function( tagName, mediatorConstructor ){
    if( !this.hasMediatorMap( tagName, mediatorConstructor ) ){
        return;//don't add the mediatorConstructor/function twice
    }

    var mapId = this.tagConstructorMap[tagName].id;

    this.tagConstructorMap[tagName] = null;
    delete this.tagConstructorMap[tagName];

    if(this.mediatorInstanceMap[mapId] === null ||  this.mediatorInstanceMap[mapId] === undefined){
        return;//mo mediators were applied to this mapping
    }
    //iterate in reverse over all instance and destroy
    for( var i=0; i < this.mediatorInstanceMap[mapId].length ; i++){
        this.mediatorInstanceMap[mapId][i].destroy();
    }
    //make the array eligible for garbage collection
    this.mediatorInstanceMap[mapId] = null;
    delete this.mediatorInstanceMap[mapId];

    return mapId;//return mapId to help enable better tests
}

Lotus.MediatorMap.prototype.apply = function( tagName, componentInstance ){
    var map = this.tagConstructorMap[tagName];

    if(!map){
        return;//no mediator found for this tag
    }

    if(this.mediatorInstanceMap[map.id] === null ||  this.mediatorInstanceMap[map.id] === undefined){
        this.mediatorInstanceMap[map.id] = [];
    }

    if( map.useSingleton ){
        if( this.mediatorInstanceMap[map.id].length == 0 ){
            this.mediatorInstanceMap[map.id].push( new map.constructor(componentInstance, this.context) );
        }
    }else{
        this.mediatorInstanceMap[map.id].push( new map.constructor(componentInstance, this.context) );
    }
}

Lotus.MediatorMap.prototype.hasMediatorMap = function( tagName, mediatorConstructor ){
    return (this.tagConstructorMap.hasOwnProperty(tagName) && this.tagConstructorMap[tagName].name == mediatorConstructor.toString())
}