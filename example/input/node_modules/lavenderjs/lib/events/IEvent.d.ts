/**
 * Created by dsmiley on 5/11/17.
 */
export interface IEvent {
    type: string;
    payload: Object;
    clone(type: string, payload: Object): IEvent;
}
