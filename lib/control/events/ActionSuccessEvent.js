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
var ActionSuccessEvent = (function (_super) {
    __extends(ActionSuccessEvent, _super);
    function ActionSuccessEvent(type, payload) {
        var _this = _super.call(this, type, payload) || this;
        if (payload === null || payload === undefined) {
            throw new Error('Lavender.ActionSuccessEvent: payload is required');
        }
        return _this;
    }
    ActionSuccessEvent.prototype.clone = function (type, payload) {
        return new ActionSuccessEvent(this.type, this.payload);
    };
    ActionSuccessEvent.SUCCESS = 'actionSuccess';
    return ActionSuccessEvent;
}(lib_1.AbstractEvent));
exports.ActionSuccessEvent = ActionSuccessEvent;
//# sourceMappingURL=ActionSuccessEvent.js.map