/**
 * Created by dsmiley on 7/24/17.
 */
import {IContext} from './IContext';
import {IInjector} from './IInjector';

export class Injector implements IInjector{
    public context:IContext;
    public objectMap:Object;

    constructor(context:IContext){
        this.context = context;
        this.objectMap = {};
    }

    public mapObject(key:string, constructor:Function, useSingleton:boolean=false){
        //instantiate singleton instance upon request is more efficient
        this.objectMap[key] = {constructor:constructor, useSingleton:useSingleton, instance:null};
    }

    public mapSingletonInstance(key:string, instance:any){
        //map injector as sigleton using the supplied instance
        //this method is very useful for mapping objects that are themselves singletons and may have already been constructed
        //prime example is the model wich generally is constructed before injections are defined
        this.objectMap[key] = {constructor:null, useSingleton:true, instance:instance};
    }

    public inject(key:string):Object{
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
        throw new Error('Lotus.Injector.prototype.getObject: could not find object for key: ' + key);
    }
}