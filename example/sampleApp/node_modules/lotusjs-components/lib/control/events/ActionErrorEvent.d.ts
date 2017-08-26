/**
 * Created by dsmiley on 5/18/17.
 */
import * as Lavender from 'lavenderjs/lib';
export declare class ActionErrorEvent extends Lavender.AbstractEvent {
    constructor(type: string, payload?: Object);
    static ERROR: string;
    clone(type: string, payload: Object): Lavender.IEvent;
}
