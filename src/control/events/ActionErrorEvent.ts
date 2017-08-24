/**
 * Created by dsmiley on 5/18/17.
 */
import {IEvent} from 'lavenderjs/lib';
import {AbstractEvent} from 'lavenderjs/lib';

export class ActionErrorEvent extends AbstractEvent{
    constructor(type:string, payload?:Object){
        super(type, payload);

        if( !payload || (payload as any).message === null || (payload as any).message === undefined ){
            throw new Error('Lavender.ActionErrorEvent: payload.message is required');
        }
    }

    public static ERROR:string = 'actionError';

    clone(type:string, payload:Object):IEvent{
        return new ActionErrorEvent(this.type, this.payload)
    }
}