"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/26/17.
 */
const Lavender = require("lavenderjs/lib");
class FileEvent extends Lavender.AbstractEvent {
    constructor(type, payload) {
        super(type, payload);
    }
    clone(type, payload) {
        return new FileEvent(this.type, this.payload);
    }
}
FileEvent.REMOVE_FILE_FROM_COLLECTION = 'removeFileFromCollection';
FileEvent.ABORT_FILE_UPLOAD = 'abortFileUpload';
FileEvent.UPLOAD_FILE = 'uploadFile';
exports.FileEvent = FileEvent;
//# sourceMappingURL=FileEvent.js.map