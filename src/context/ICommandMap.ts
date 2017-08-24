/**
 * Created by dsmiley on 7/24/17.
 */
import {IContext} from './IContext';
import {IEvent} from 'lavenderjs/lib';

export interface ICommandMap{
    eventFunctionMap:Object;
    instanceMap:Object;
    context:IContext;

    addCommand(eventType:string, handler:any, functionName:string, useSingleton:boolean):void;
    hasCommandMap(eventType:string, handler:Object, functionName:string):boolean;
    removeCommand(eventType:string, handler:Object):void;
    removeAllCommands():void;
    routeEventToCommand(event:IEvent):void;
}