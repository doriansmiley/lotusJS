/**
 * Created by dsmiley on 5/18/17.
 */
import { IEvent } from 'lavenderjs/lib';
import { AbstractEvent } from 'lavenderjs/lib';
export declare class ActionSuccessEvent extends AbstractEvent {
    constructor(type: string, payload?: Object);
    static SUCCESS: string;
    clone(type: string, payload: Object): IEvent;
}
