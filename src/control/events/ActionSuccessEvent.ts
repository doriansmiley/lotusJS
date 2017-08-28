/**
 * Created by dsmiley on 5/18/17.
 */
import * as Lavender from 'lavenderjs/lib';

export class ActionSuccessEvent extends Lavender.AbstractEvent{
    constructor(type:string, payload?:Object){
        super(type, payload);

        if( payload === null || payload === undefined ){
            throw new Error('Lavender.ActionSuccessEvent: payload is required');
        }
    }

    public static SUCCESS:string = 'actionSuccess';

    clone(type:string, payload:Object):Lavender.IEvent{
        return new ActionSuccessEvent(this.type, this.payload)
    }
}
