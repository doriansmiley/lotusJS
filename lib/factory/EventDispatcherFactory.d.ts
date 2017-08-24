import { IEventDispatcherFactory } from "./IEventDispatcherFactory";
import * as Lavender from 'lavenderjs/lib';
/**
 * Created by dsmiley on 7/27/17.
 */
export declare class EventDispatcherFactory implements IEventDispatcherFactory {
    private static INSTANCE;
    constructor();
    static getInstance(): IEventDispatcherFactory;
    getEventDispatcher(eventDispatcherCode?: string): Lavender.IEventDispatcher;
}
