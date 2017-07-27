import { IEventDispatcherFactory } from "./IEventDispatcherFactory";
import { IEventDispatcher } from '../../node_modules/lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export declare class EventDispatcherFactory implements IEventDispatcherFactory {
    private static INSTANCE;
    constructor();
    static getInstance(): IEventDispatcherFactory;
    getEventDispatcher(eventDispatcherCode?: string): IEventDispatcher;
}
