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
var AbstractComponent_1 = require("./AbstractComponent");
/**
 * Created by dsmiley on 7/26/17.
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super.call(this) || this;
    }
    return Button;
}(AbstractComponent_1.AbstractComponent));
exports.Button = Button;
//# sourceMappingURL=Button.js.map