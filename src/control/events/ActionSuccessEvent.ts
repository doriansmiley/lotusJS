/**
 * Created by dsmiley on 5/18/17.
 */
import {IEvent} from 'lavenderjs/lib';
import {AbstractEvent} from 'lavenderjs/lib';

export class ActionSuccessEvent extends AbstractEvent{
    constructor(type:string, payload?:Object){
        super(type, payload);

        if( payload === null || payload === undefined ){
            throw new Error('Lavender.ActionSuccessEvent: payload is required');
        }
    }

    public static SUCCESS:string = 'actionSuccess';

    clone(type:string, payload:Object):IEvent{
        return new ActionSuccessEvent(this.type, this.payload)
    }
}
