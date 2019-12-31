/**
 * Created by dsmiley on 9/26/17.
 */
import * as Lavender from 'lavenderjs/lib';

export class FileEvent extends Lavender.AbstractEvent {
    constructor(type: string, payload?: Record<string, any>) {
        super(type, payload);
    }

    public static REMOVE_FILE_FROM_COLLECTION = 'removeFileFromCollection';
    public static ABORT_FILE_UPLOAD = 'abortFileUpload';
    public static UPLOAD_FILE = 'uploadFile';

    clone(type: string, payload: Record<string, any>): Lavender.IEvent {
        return new FileEvent(this.type, this.payload)
    }
}