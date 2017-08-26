/**
 * Created by dsmiley on 5/11/17.
 */
import { IEvent } from './IEvent';
export declare abstract class AbstractEvent implements IEvent {
    type: string;
    payload: Object;
    constructor(type: string, payload?: Object);
    abstract clone(type: string, payload: Object): IEvent;
}
