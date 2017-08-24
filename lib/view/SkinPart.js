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
 * Created by dsmiley on 8/1/17.
 */
var Lavender = require("lavenderjs/lib");
var SkinPart = (function (_super) {
    __extends(SkinPart, _super);
    function SkinPart(label, instance, attribute) {
        var _this = _super.call(this) || this;
        _this._label = label;
        _this._instance = instance;
        _this._attribute = attribute;
        return _this;
    }
    Object.defineProperty(SkinPart.prototype, "label", {
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkinPart.prototype, "element", {
        get: function () {
            return this._instance[this._attribute];
        },
        set: function (val) {
            this._instance[this._attribute] = val;
            this.notify(val, 'element');
        },
        enumerable: true,
        configurable: true
    });
    return SkinPart;
}(Lavender.Subject));
exports.SkinPart = SkinPart;
//# sourceMappingURL=SkinPart.js.map