"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayList_1 = require("../../model/list/ArrayList");
var UuidUtils_1 = require("../../util/UuidUtils");
var AbstractHttpService = (function () {
    function AbstractHttpService() {
        this.responders = new ArrayList_1.ArrayList();
    }
    //Overriden by subclass
    AbstractHttpService.prototype.success = function (result) {
    };
    //Overriden by subclass
    AbstractHttpService.prototype.fault = function (fault) {
    };
    AbstractHttpService.prototype.addResponder = function (responder) {
        if (responder.fault === null || responder.fault === undefined || responder.success === null || responder.success === undefined) {
            throw new Error('responder must define fault and success methods');
        }
        return this.responders.addItem(responder);
    };
    AbstractHttpService.prototype.removeResponder = function (responder) {
        if (responder.fault === null || responder.fault === undefined || responder.success === null || responder.success === undefined) {
            throw new Error('responder must define fault and success methods');
        }
        var index = this.responders.indexOf(responder);
        this.responders.removeItemAt(index);
    };
    AbstractHttpService.prototype.send = function (type, url, data, contentType, dataType, cache) {
        this.requestId = UuidUtils_1.UuidUtils.generateUUID();
        return this.requestId;
    };
    AbstractHttpService.prototype.destroy = function () {
        this.responders.clear();
        this.responders = null;
    };
    return AbstractHttpService;
}());
exports.AbstractHttpService = AbstractHttpService;
//# sourceMappingURL=AbstractHttpService.js.map