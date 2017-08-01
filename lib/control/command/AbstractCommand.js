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
var lib_1 = require("../../../node_modules/lavenderjs/lib");
var ActionSuccessEvent_1 = require("../events/ActionSuccessEvent");
var ActionErrorEvent_1 = require("../events/ActionErrorEvent");
/**
 * Created by dsmiley on 7/28/17.
 */
var AbstractCommand = (function (_super) {
    __extends(AbstractCommand, _super);
    function AbstractCommand(context) {
        var _this = _super.call(this) || this;
        _this.context = context;
        _this.service = context.injector.inject('service');
        _this.parser = context.injector.inject('parser');
        _this.opModel = context.injector.inject('opModel');
        _this.errorModel = context.injector.inject('errorModel');
        return _this;
    }
    AbstractCommand.prototype.execute = function (event) {
        if (this.service === null || this.service === undefined || this.opModel === null || this.opModel === undefined || this.parser === null || this.parser === undefined) {
            this.executionError();
        }
        this.opModel.asyncOperationComplete = false;
        this.opModel.asyncOperationCount += 1;
        return this.executeServiceMethod();
    };
    //method must return a requestID
    //Override this method in subclasses
    AbstractCommand.prototype.executeServiceMethod = function () {
        return null;
    };
    //Override this method in subclasses
    //it should parse the result and return the resulting Object tree
    AbstractCommand.prototype.parseResponse = function (result) {
        return null;
    };
    AbstractCommand.prototype.dispatchSuccess = function (parsedResult) {
        var doneEvent = new ActionSuccessEvent_1.ActionSuccessEvent(ActionSuccessEvent_1.ActionSuccessEvent.SUCCESS, { result: parsedResult });
        this.dispatch(doneEvent);
    };
    AbstractCommand.prototype.success = function (result) {
        try {
            //result is instance of Lavender.HttpSuccess
            var parsedResult = this.parseResponse(result);
            this.dispatchSuccess(parsedResult);
        }
        catch (e) {
            var errorMessage = this.getErrorMessage() + "\n" + e.message + "\n" + e.stack;
            var errorEvent = new ActionErrorEvent_1.ActionErrorEvent(ActionErrorEvent_1.ActionErrorEvent.ERROR, { message: errorMessage });
            this.dispatch(errorEvent);
            var error = { name: 'error', message: errorMessage };
            this.errorModel.errors.addItem(error);
            this.errorModel.appError = true;
        }
        finally {
            this.opModel.asyncOperationCount -= 1;
            if (this.opModel.asyncOperationCount == 0) {
                this.opModel.asyncOperationComplete = true;
            }
            this.destroy();
        }
    };
    AbstractCommand.prototype.fault = function (fault) {
        //fault is an instance of Lavender.HttpFault
        this.opModel.asyncOperationCount -= 1;
        if (this.opModel.asyncOperationCount == 0) {
            this.opModel.asyncOperationComplete = true;
        }
        var errorMessage = this.getFaultString() + fault.message;
        var errorEvent = new ActionErrorEvent_1.ActionErrorEvent(ActionErrorEvent_1.ActionErrorEvent.ERROR, { message: errorMessage });
        this.dispatch(errorEvent);
        var error = { name: fault.status, message: errorMessage };
        this.errorModel.errors.addItem(error);
        this.errorModel.appError = true;
        this.destroy();
    };
    //Override this method in subclasses
    AbstractCommand.prototype.onProgress = function (progress) {
    };
    //Override this method in subclasses
    AbstractCommand.prototype.getFaultString = function () {
        return null;
    };
    //Override this method in subclasses
    AbstractCommand.prototype.getErrorMessage = function () {
        return null;
    };
    AbstractCommand.prototype.executionError = function () {
        // These properties weren't injected or supplied in the constructor or manually.
        // They are needed so we throw an error.
        var msg = this.getExecErrorString();
        if (this.service === null || this.service === undefined) {
            msg += " service";
        }
        if (this.opModel === null || this.opModel) {
            msg += ", opModel";
        }
        if (this.parser === null || this.parser === undefined) {
            msg += ", parser";
        }
        msg += ".";
        throw new Error(msg);
    };
    //Override this method in subclasses
    AbstractCommand.prototype.getExecErrorString = function () {
        return 'Lavender.AbstractServiceAction.prototype.executionError: the following are required: ';
    };
    AbstractCommand.prototype.destroy = function () {
        if (this.canListen(ActionErrorEvent_1.ActionErrorEvent.ERROR, this, 'onError')) {
            this.removeEventListener(ActionErrorEvent_1.ActionErrorEvent.ERROR, this, 'onError');
        }
        if (this.canListen(ActionSuccessEvent_1.ActionSuccessEvent.SUCCESS, this, 'onSuccess')) {
            this.removeEventListener(ActionSuccessEvent_1.ActionSuccessEvent.SUCCESS, this, 'onSuccess');
        }
        this.context = null;
        this.opModel = null;
        this.service = null;
        this.parser = null;
        this.errorModel = null;
    };
    return AbstractCommand;
}(lib_1.EventDispatcher));
exports.AbstractCommand = AbstractCommand;
//# sourceMappingURL=AbstractCommand.js.map