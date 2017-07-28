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
/**
 * Created by dsmiley on 7/28/17.
 */
var SampleAction = (function (_super) {
    __extends(SampleAction, _super);
    function SampleAction(service, opModel, parser, errorModel) {
        return _super.call(this, service, opModel, parser, errorModel) || this;
    }
    SampleAction.prototype.executeServiceMethod = function () {
        //since services will always be injected by the IOC container always user the interface type
        return this.service.testRequestUsingIncludedAPI('localRequest', this);
    };
    SampleAction.prototype.parseResponse = function (result) {
        //since serilization objects will always be injected by the IOC container always user the interface type
        return this.parser.parse(result); //use this.parser.parse to deserialize results. You'll of course need to implement the parser, our tests just use a generic function that returns the result
    };
    SampleAction.prototype.getFaultString = function () {
        return 'Lotus.SampleAction a service request error occured';
    };
    SampleAction.prototype.getErrorMessage = function () {
        return 'Lotus.SampleAction an execution error occured ';
    };
    SampleAction.prototype.getExecErrorString = function () {
        return 'Lotus.SampleAction the following are required: ';
    };
    return SampleAction;
}(lib_1.AbstractServiceAction));
exports.SampleAction = SampleAction;
//# sourceMappingURL=SampleAction.js.map