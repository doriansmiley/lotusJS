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
var AbstractCommand_1 = require("./AbstractCommand");
/**
 * Created by dsmiley on 7/28/17.
 */
var SampleCommand = (function (_super) {
    __extends(SampleCommand, _super);
    function SampleCommand(context) {
        return _super.call(this, context) || this;
    }
    SampleCommand.prototype.executeServiceMethod = function () {
        //since services will always be injected by the IOC container always user the interface type
        return this.service.testRequestUsingIncludedAPI('localRequest', this);
    };
    SampleCommand.prototype.parseResponse = function (result) {
        //since serilization objects will always be injected by the IOC container always user the interface type
        return this.parser.parse(result); //use this.parser.parse to deserialize results. You'll of course need to implement the parser, our tests just use a generic function that returns the result
    };
    SampleCommand.prototype.getFaultString = function () {
        return 'Lotus.SampleCommand a service request error occured';
    };
    SampleCommand.prototype.getErrorMessage = function () {
        return 'Lotus.SampleCommand an execution error occured ';
    };
    SampleCommand.prototype.getExecErrorString = function () {
        return 'Lotus.SampleCommand the following are required: ';
    };
    return SampleCommand;
}(AbstractCommand_1.AbstractCommand));
exports.SampleCommand = SampleCommand;
//# sourceMappingURL=SampleCommand.js.map