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
var AbstractMediator_1 = require("./AbstractMediator");
/**
 * Created by dsmiley on 7/26/17.
 */
var ButtonMediator = (function (_super) {
    __extends(ButtonMediator, _super);
    function ButtonMediator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ButtonMediator;
}(AbstractMediator_1.AbstractMediator));
exports.ButtonMediator = ButtonMediator;
//# sourceMappingURL=ButtonMediator.js.map