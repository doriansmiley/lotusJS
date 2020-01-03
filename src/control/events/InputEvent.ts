/**
 * Created by dsmiley on 9/21/17.
 */
import * as Lavender from 'lavenderjs/lib';

export class InputEvent extends Lavender.AbstractEvent {
    constructor (type: string, payload?: Record<string, any>) {
        super(type, payload);
    }

    public static CHANGE = 'change';

    clone (type: string, payload: Record<string, any>): Lavender.IEvent {
        return new InputEvent(this.type, this.payload);
    }
}