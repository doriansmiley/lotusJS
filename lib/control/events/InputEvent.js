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
 * Created by dsmiley on 9/21/17.
 */
var Lavender = require("lavenderjs/lib");
var InputEvent = (function (_super) {
    __extends(InputEvent, _super);
    function InputEvent(type, payload) {
        return _super.call(this, type, payload) || this;
    }
    InputEvent.prototype.clone = function (type, payload) {
        return new InputEvent(this.type, this.payload);
    };
    InputEvent.CHANGE = 'change';
    return InputEvent;
}(Lavender.AbstractEvent));
exports.InputEvent = InputEvent;
//# sourceMappingURL=InputEvent.js.map