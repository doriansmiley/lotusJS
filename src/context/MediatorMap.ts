import {IMediatorMap} from "./IMediatorMap";
import {IContext} from "./IContext";
import {IComponent} from "../view/IComponent";
import {UuidUtils} from '../../node_modules/lavenderjs/lib';
import {IMediator} from "../mediators/IMediator";

/**
 * Created by dsmiley on 7/26/17.
 */
export class MediatorMap implements IMediatorMap{
    protected _tagConstructorMap:Object;
    protected _mediatorInstanceMap:Object;
    public context:IContext;

    constructor(context:IContext){
        //Note: this could be improved by creating read only accessor methods for tagMap and eventFunctionMap
        this._tagConstructorMap = {};
        this._mediatorInstanceMap = {};
        this.context = context;
    }
    
    get tagConstructorMap():Object{
        return this._tagConstructorMap;
    }

    get mediatorInstanceMap():Object{
        return this._mediatorInstanceMap;
    }

    public add(tagName:string, mediatorConstructor:Function, useSingleton:boolean=false){
        if( this.hasMediatorMap( tagName, mediatorConstructor ) ){
            return;//don't add the mediatorConstructor/function twice
        }
        this.tagConstructorMap[tagName] = {useSingleton:useSingleton, constructor:mediatorConstructor, id:UuidUtils.generateUUID(), name:mediatorConstructor.toString()};
    }

    public remove(tagName:string, mediatorConstructor:Function):string{
        if( !this.hasMediatorMap( tagName, mediatorConstructor ) ){
            return;//don't add the mediatorConstructor/function twice
        }

        let mapId = this.tagConstructorMap[tagName].id;

        this.tagConstructorMap[tagName] = null;
        delete this.tagConstructorMap[tagName];

        if(this._mediatorInstanceMap[mapId] === null ||  this._mediatorInstanceMap[mapId] === undefined){
            return;//mo mediators were applied to this mapping
        }
        //iterate in reverse over all instance and destroy
        for( let i=0; i < (this._mediatorInstanceMap[mapId] as Array<IMediator>).length ; i++){
            this._mediatorInstanceMap[mapId][i].destroy();
        }
        //make the array eligible for garbage collection
        this._mediatorInstanceMap[mapId] = null;
        delete this._mediatorInstanceMap[mapId];

        return mapId;//return mapId to help enable better tests
    }

    public apply(tagName:string, componentInstance:IComponent):void{
        let map = this.tagConstructorMap[tagName];

        if(!map){
            return;//no mediator found for this tag
        }

        if(this._mediatorInstanceMap[map.id] === null ||  this._mediatorInstanceMap[map.id] === undefined){
            this._mediatorInstanceMap[map.id] = [];
        }

        if( map.useSingleton ){
            if( (this._mediatorInstanceMap[map.id] as Array<IMediator>).length == 0 ){
                (this._mediatorInstanceMap[map.id] as Array<IMediator>).push( new map.constructor(componentInstance, this.context) );
            }
        }else{
            (this._mediatorInstanceMap[map.id] as Array<IMediator>).push( new map.constructor(componentInstance, this.context) );
        }
    }

    public hasMediatorMap(tagName:string, mediatorConstructor:Function):boolean{
        return (this.tagConstructorMap.hasOwnProperty(tagName) && this.tagConstructorMap[tagName].name == mediatorConstructor.toString())
    }
}