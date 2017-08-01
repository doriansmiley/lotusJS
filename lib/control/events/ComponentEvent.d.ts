/**
 * Created by dsmiley on 7/31/17.
 */
import { IEvent } from '../../../node_modules/lavenderjs/lib';
import { AbstractEvent } from '../../../node_modules/lavenderjs/lib';
export declare class ComponentEvent extends AbstractEvent {
    constructor(type: string, payload?: Object);
    static READY: string;
    clone(type: string, payload: Object): IEvent;
}
