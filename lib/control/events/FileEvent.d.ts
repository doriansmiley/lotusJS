/**
 * Created by dsmiley on 9/26/17.
 */
import * as Lavender from 'lavenderjs/lib';
export declare class FileEvent extends Lavender.AbstractEvent {
    constructor(type: string, payload?: Object);
    static REMOVE_FILE_FROM_COLLECTION: string;
    static ABORT_FILE_UPLOAD: string;
    clone(type: string, payload: Object): Lavender.IEvent;
}
