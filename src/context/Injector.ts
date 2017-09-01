/**
 * Created by dsmiley on 7/24/17.
 */
import {IContext} from './IContext';
import {IInjector} from './IInjector';

export class Injector implements IInjector{
    public context:IContext;
    public objectMap:Object;
    public typeMap:Array<Object> = [];

    constructor(context:IContext){
        this.context = context;
        this.objectMap = {};
    }

    public mapObject(key:any, constructor:Function, useSingleton:boolean=false):void{
        if(typeof key == 'function'){
            var mapIndex = -1;
            this.typeMap.forEach(function(value:any, index:number){
                if(value.constructor == constructor){
                    mapIndex = index;
                    return false;
                }
            });
            if(mapIndex < 0){
                this.typeMap.push({constructor:constructor, useSingleton:useSingleton, instance:null, type:key});
            }
        }else{
            //instantiate singleton instance upon request is more efficient
            this.objectMap[key] = {constructor:constructor, useSingleton:useSingleton, instance:null};
        }
    }

    public mapSingletonInstance(key:any, instance:any):void{
        if(typeof key == 'function'){
            var mapIndex = -1;
            this.typeMap.forEach(function(value:any, index:number){
                if(value.instance == instance){
                    mapIndex = index;
                    return false;
                }
            });
            if(mapIndex < 0){
                this.typeMap.push({constructor: null, useSingleton: true, instance: instance});
            }
        }else {
            //map injector as sigleton using the supplied instance
            //this method is very useful for mapping objects that are themselves singletons and may have already been constructed
            //prime example is the model wich generally is constructed before injections are defined
            this.objectMap[key] = {constructor: null, useSingleton: true, instance: instance};
        }
    }

    public inject(key:any):Object{
        if(typeof key == 'function'){
            var map:Object;
            this.typeMap.forEach(function(value:any, index:number){
                if(value.type == key){
                    map = value;
                    return false;
                }
            });
            if(map){
                if( map['useSingleton'] ){
                    if( map['instance'] === null ){
                        map['instance'] = new (map.constructor as FunctionConstructor)();
                    }
                    return map['instance'];
                }else{
                    return new (map.constructor as FunctionConstructor)();
                }
            }
        }else{
            if( this.objectMap[key] !== null && this.objectMap[key] !== undefined ){
                if( this.objectMap[key].useSingleton ){
                    if( this.objectMap[key].instance === null ){
                        this.objectMap[key].instance = new this.objectMap[key].constructor();
                    }
                    return this.objectMap[key].instance;
                }else{
                    return new this.objectMap[key].constructor();
                }
            }
        }
        throw new Error('Lotus.Injector.prototype.getObject: could not find object for key: ' + key);
    }
}