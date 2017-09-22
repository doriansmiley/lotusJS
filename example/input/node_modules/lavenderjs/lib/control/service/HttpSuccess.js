"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpSuccess = (function () {
    function HttpSuccess(resultObj, status, requestId) {
        if (resultObj === null || resultObj === undefined && status != 304) {
            throw new Error('resultObj is required');
        }
        if (status === null || status === undefined) {
            throw new Error('status is required');
        }
        this.resultObj = resultObj;
        this.status = status;
        this.requestId = requestId;
    }
    return HttpSuccess;
}());
exports.HttpSuccess = HttpSuccess;
//# sourceMappingURL=HttpSuccess.js.map