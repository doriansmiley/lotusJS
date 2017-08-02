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
 * Created by dsmiley on 7/26/17.
 */
var LotusHTMLElement = (function (_super) {
    __extends(LotusHTMLElement, _super);
    function LotusHTMLElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LotusHTMLElement.prototype.createShadowRoot = function () {
        return null;
    };
    LotusHTMLElement.prototype.getComponentInstance = function () {
        return this.lotusComponentInstance;
    };
    return LotusHTMLElement;
}(HTMLElement));
exports.LotusHTMLElement = LotusHTMLElement;
//# sourceMappingURL=LotusHTMLElement.js.map