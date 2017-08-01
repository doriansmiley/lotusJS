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
var ComponentEvent = (function (_super) {
    __extends(ComponentEvent, _super);
    function ComponentEvent(type, payload) {
        return _super.call(this, type, payload) || this;
    }
    ComponentEvent.prototype.clone = function (type, payload) {
        return new ComponentEvent(this.type, this.payload);
    };
    ComponentEvent.READY = 'lotusComponentReady';
    return ComponentEvent;
}(lib_1.AbstractEvent));
exports.ComponentEvent = ComponentEvent;
//# sourceMappingURL=ComponentEvent.js.map