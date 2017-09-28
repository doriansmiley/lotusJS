/**
 * Created by dsmiley on 9/21/17.
 */
import * as Lavender from 'lavenderjs/lib';

export class InputEvent extends Lavender.AbstractEvent{
    constructor(type:string, payload?:Object){
        super(type, payload);
    }

    public static CHANGE:string = 'change';

    clone(type:string, payload:Object):Lavender.IEvent{
        return new InputEvent(this.type, this.payload)
    }
}