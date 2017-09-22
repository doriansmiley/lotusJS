/**
 * Created by dsmiley on 7/31/17.
 */
import * as Lavender from 'lavenderjs/lib';

export class ComponentEvent extends Lavender.AbstractEvent{
    constructor(type:string, payload?:Object){
        super(type, payload);
    }

    public static READY:string = 'lotusComponentReady';
    public static CLICK:string = 'click';

    clone(type:string, payload:Object):Lavender.IEvent{
        return new ComponentEvent(this.type, this.payload)
    }
}