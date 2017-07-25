/**
 * Created by dsmiley on 7/24/17.
 */
import {IContext} from './IContext';
import {IEvent} from '../../node_modules/lavenderjs/lib';

export interface ICommandMap{
    eventFunctionMap:Object;
    instanceMap:Object;
    context:IContext;

    addCommand(eventType:string, handler:any, functionName:string, useSingleton:boolean);
    hasCommandMap(eventType:string, handler:Object, functionName:string);
    removeCommand(eventType:string, handler:Object);
    removeAllCommands();
    routeEventToCommand(event:IEvent);
}