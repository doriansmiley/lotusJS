/**
 * Created by dsmiley on 5/18/17.
 */
import * as Lavender from 'lavenderjs/lib';

export class ActionErrorEvent extends Lavender.AbstractEvent{
    constructor(type:string, payload?:Object){
        super(type, payload);

        if( !payload || (payload as any).message === null || (payload as any).message === undefined ){
            throw new Error('Lavender.ActionErrorEvent: payload.message is required');
        }
    }

    public static ERROR:string = 'actionError';

    clone(type:string, payload:Object):Lavender.IEvent{
        return new ActionErrorEvent(this.type, this.payload)
    }
}