/**
 * Created by dsmiley on 7/31/17.
 */
import * as Lavender from 'lavenderjs/lib';

export class ComponentEvent extends Lavender.AbstractEvent {
    constructor (type: string, payload?: Record<string, any>) {
        super(type, payload);
    }

    public static READY = 'lotusComponentReady';
    public static CLICK = 'click';

    clone (type: string, payload: Record<string, any>): Lavender.IEvent {
        return new ComponentEvent(this.type, this.payload);
    }
}