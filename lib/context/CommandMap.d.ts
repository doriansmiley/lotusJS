/**
 * Created by dsmiley on 7/24/17.
 */
import { IContext } from './IContext';
import { ICommandMap } from './ICommandMap';
import { IEvent } from '../../node_modules/lavenderjs/lib';
export declare class CommandMap implements ICommandMap {
    eventFunctionMap: Object;
    instanceMap: Object;
    context: IContext;
    constructor(context: IContext);
    addCommand(eventType: string, handler: any, functionName?: string, useSingleton?: boolean): void;
    hasCommandMap(eventType: string, handler: Object, functionName: string): boolean;
    removeCommand(eventType: string, handler: Object): void;
    removeAllCommands(): void;
    routeEventToCommand(event: IEvent): void;
}
