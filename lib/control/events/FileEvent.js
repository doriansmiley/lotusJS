"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/26/17.
 */
var Lavender = require("lavenderjs/lib");
var FileEvent = (function (_super) {
    __extends(FileEvent, _super);
    function FileEvent(type, payload) {
        return _super.call(this, type, payload) || this;
    }
    FileEvent.prototype.clone = function (type, payload) {
        return new FileEvent(this.type, this.payload);
    };
    FileEvent.REMOVE_FILE_FROM_COLLECTION = 'removeFileFromCollection';
    FileEvent.ABORT_FILE_UPLOAD = 'abortFileUpload';
    FileEvent.UPLOAD_FILE = 'uploadFile';
    return FileEvent;
}(Lavender.AbstractEvent));
exports.FileEvent = FileEvent;
//# sourceMappingURL=FileEvent.js.map