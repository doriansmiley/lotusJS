/**
 * Created by dsmiley on 7/24/17.
 */
import {IContext} from './IContext';

export interface IInjector{
    context:IContext;
    objectMap:Object;
    mapObject(key:any, constructor:Function, useSingleton:boolean):void;
    mapSingletonInstance(key:any, instance:any):void;
    inject(key:any):Object;
}