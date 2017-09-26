/**
 * Created by dsmiley on 9/26/17.
 */
import * as Lavender from 'lavenderjs/lib';

export class FileEvent extends Lavender.AbstractEvent{
    constructor(type:string, payload?:Object){
        super(type, payload);
    }

    public static REMOVE_FILE_FROM_COLLECTION:string = 'removeFileFromCollection';
    public static ABORT_FILE_UPLOAD:string = 'abortFileUpload';

    clone(type:string, payload:Object):Lavender.IEvent{
        return new FileEvent(this.type, this.payload)
    }
}