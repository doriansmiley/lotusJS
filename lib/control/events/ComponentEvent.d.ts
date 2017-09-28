/**
 * Created by dsmiley on 7/31/17.
 */
import * as Lavender from 'lavenderjs/lib';
export declare class ComponentEvent extends Lavender.AbstractEvent {
    constructor(type: string, payload?: Object);
    static READY: string;
    static CLICK: string;
    clone(type: string, payload: Object): Lavender.IEvent;
}
