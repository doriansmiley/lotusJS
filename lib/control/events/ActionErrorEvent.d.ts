/**
 * Created by dsmiley on 5/18/17.
 */
import { IEvent } from '../../../node_modules/lavenderjs/lib';
import { AbstractEvent } from '../../../node_modules/lavenderjs/lib';
export declare class ActionErrorEvent extends AbstractEvent {
    constructor(type: string, payload?: Object);
    static ERROR: string;
    clone(type: string, payload: Object): IEvent;
}
