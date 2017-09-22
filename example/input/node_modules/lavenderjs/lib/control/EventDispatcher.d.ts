/**
 * Created by dsmiley on 5/11/17.
 */
import { IEvent } from '../events/IEvent';
import { IEventDispatcher } from './IEventDispatcher';
export declare class EventDispatcher implements IEventDispatcher {
    handlersByEventName: Object;
    constructor();
    addEventListener(event: string, instance: Object, handler: string): void;
    canListen(eventType: string, instance: Object, handler: string): boolean;
    removeEventListener(event: string, instance: Object, handler: string): void;
    removeAllEventListeners(instance: Object): void;
    dispatch(event: IEvent): void;
}
