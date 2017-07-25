/**
 * Created by dsmiley on 7/24/17.
 */
import { IContext } from './IContext';
import { IEvent } from '../../node_modules/lavenderjs/lib';
export interface ICommandMap {
    eventFunctionMap: Object;
    instanceMap: Object;
    context: IContext;
    addCommand(eventType: string, handler: any, functionName: string, useSingleton: boolean): any;
    hasCommandMap(eventType: string, handler: Object, functionName: string): any;
    removeCommand(eventType: string, handler: Object): any;
    removeAllCommands(): any;
    routeEventToCommand(event: IEvent): any;
}
