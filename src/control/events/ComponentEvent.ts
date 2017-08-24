/**
 * Created by dsmiley on 7/31/17.
 */
import {IEvent} from 'lavenderjs/lib';
import {AbstractEvent} from 'lavenderjs/lib';

export class ComponentEvent extends AbstractEvent{
    constructor(type:string, payload?:Object){
        super(type, payload);
    }

    public static READY:string = 'lotusComponentReady';

    clone(type:string, payload:Object):IEvent{
        return new ComponentEvent(this.type, this.payload)
    }
}