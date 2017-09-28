/**
 * Created by dsmiley on 9/21/17.
 */
import * as Lavender from 'lavenderjs/lib';
export declare class InputEvent extends Lavender.AbstractEvent {
    constructor(type: string, payload?: Object);
    static CHANGE: string;
    clone(type: string, payload: Object): Lavender.IEvent;
}
