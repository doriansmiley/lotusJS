"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpFault = (function () {
    function HttpFault(errorObj, status, message, requestId) {
        this.errorObj = errorObj;
        this.status = status;
        this.message = message;
        this.requestId = requestId;
    }
    return HttpFault;
}());
exports.HttpFault = HttpFault;
//# sourceMappingURL=HttpFault.js.map