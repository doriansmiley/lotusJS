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
 * Created by dsmiley on 7/12/17.
 */
var HttpSuccess_1 = require("./HttpSuccess");
var HttpFault_1 = require("./HttpFault");
var AbstractHttpService_1 = require("../service/AbstractHttpService");
var XhrHttpService = (function (_super) {
    __extends(XhrHttpService, _super);
    function XhrHttpService(async, notifyOnProgress) {
        if (async === void 0) { async = true; }
        if (notifyOnProgress === void 0) { notifyOnProgress = false; }
        var _this = _super.call(this) || this;
        _this.xhrRequest = null;
        _this.async = async;
        _this.notifyOnProgress = notifyOnProgress;
        return _this;
    }
    XhrHttpService.prototype.addEventListeners = function () {
        if (this.notifyOnProgress) {
            this.xhrRequest.addEventListener("progress", this.updateProgress, false);
        }
        this.xhrRequest.addEventListener("load", this.load, false);
        this.xhrRequest.addEventListener("error", this.onXhrFault, false);
    };
    XhrHttpService.prototype.removeEventListeners = function () {
        this.xhrRequest.removeEventListener("load", this.load, false);
        this.xhrRequest.removeEventListener("error", this.onXhrFault, false);
        this.xhrRequest.removeEventListener("progress", this.updateProgress, false);
    };
    XhrHttpService.prototype.success = function (result) {
        if (this.xhrRequest.status != 200) {
            //errorObj:any, status:number, message:string, requestId:string
            var faultObj = new HttpFault_1.HttpFault(this.xhrRequest.response, this.xhrRequest.status, this.xhrRequest.responseText, this.requestId);
            this.fault(faultObj);
            return;
        }
        var sucessObj = new HttpSuccess_1.HttpSuccess(this.xhrRequest.response, this.xhrRequest.status, this.requestId);
        for (var responderIndex = 0; responderIndex < this.responders.length; responderIndex++) {
            var responder = this.responders.getItemAt(responderIndex);
            responder.success(sucessObj);
        }
        this.destroy();
    };
    XhrHttpService.prototype.fault = function (fault) {
        for (var responderIndex = 0; responderIndex < this.responders.length; responderIndex++) {
            var responder = this.responders.getItemAt(responderIndex);
            responder.fault(fault);
        }
        this.destroy();
    };
    XhrHttpService.prototype.load = function (event) {
        if (this.notifyOnProgress) {
            for (var responderIndex = 0; responderIndex < this.responders.length; responderIndex++) {
                var responder = this.responders.getItemAt(responderIndex);
                responder.onProgress(100, this.requestId);
            }
        }
    };
    XhrHttpService.prototype.updateProgress = function (event) {
        //event.lengthComputable seems to always be false, this might be because the service is not sending back progress events though
        //so I've commented it our for now
        //if (event.lengthComputable) {
        var percentComplete = event.loaded / ((event.total > 0) ? event.total : event.loaded); //prevent division by zero when !event.lengthComputable
        for (var responderIndex = 0; responderIndex < this.responders.length; responderIndex++) {
            var responder = this.responders.getItemAt(responderIndex);
            responder.onProgress(percentComplete, this.requestId);
        }
        //}
    };
    XhrHttpService.prototype.send = function (type, url, data, contentType, dataType, cache) {
        if (cache === void 0) { cache = false; }
        var requestId = _super.prototype.send.call(this, type, url, data, contentType, dataType, cache);
        this.xhrRequest = new XMLHttpRequest();
        this.addEventListeners();
        this.xhrRequest.onreadystatechange = function (event) {
            if (this.xhrRequest.readyState == 4) {
                this.success(this.xhrRequest.response);
            }
        }.bind(this);
        this.xhrRequest.open(type, url, this.async);
        if (dataType !== null) {
            this.xhrRequest.responseType = dataType;
        }
        if (contentType !== null) {
            this.xhrRequest.setRequestHeader("Content-Type", contentType);
        }
        this.xhrRequest.send(data);
        return requestId;
    };
    XhrHttpService.prototype.onXhrFault = function (event) {
        var faultObj = new HttpFault_1.HttpFault(this.xhrRequest.response, this.xhrRequest.status, this.xhrRequest.responseText, this.requestId);
        this.fault(faultObj);
    };
    XhrHttpService.prototype.abort = function () {
        this.xhrRequest.onreadystatechange = null;
        this.removeEventListeners();
        this.xhrRequest.abort();
        this.destroy();
    };
    XhrHttpService.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.removeEventListeners();
        this.xhrRequest.onreadystatechange = null;
        this.xhrRequest = null;
    };
    return XhrHttpService;
}(AbstractHttpService_1.AbstractHttpService));
exports.XhrHttpService = XhrHttpService;
//# sourceMappingURL=XhrHttpService.js.map