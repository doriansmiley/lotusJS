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
 * Created by dsmiley on 6/30/17.
 */
var Subject_1 = require("../model/observable/Subject");
var ObjectUtils_1 = require("./ObjectUtils");
var Geometry = (function (_super) {
    __extends(Geometry, _super);
    function Geometry(values) {
        if (values === void 0) { values = {}; }
        var _this = _super.call(this) || this;
        _this._left = undefined;
        _this._top = undefined;
        _this._width = undefined;
        _this._height = undefined;
        _this.left = values.left;
        _this.top = values.top;
        _this.width = values.width;
        _this.height = values.height;
        return _this;
    }
    Object.defineProperty(Geometry.prototype, "left", {
        get: function () {
            return this._left;
        },
        set: function (value) {
            this._left = value;
            this.notify(value, "left");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "top", {
        get: function () {
            return this._top;
        },
        set: function (value) {
            this._top = value;
            this.notify(value, "top");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
            this.notify(value, "width");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            this.notify(value, "height");
        },
        enumerable: true,
        configurable: true
    });
    Geometry.prototype.update = function (values) {
        if (values === void 0) { values = {}; }
        for (var key in values) {
            //note accessor methods that are defined using Object.defineProperty in ES6 are found on the prototype not the object instance, hence the use of getPrototypeOf
            if (ObjectUtils_1.ObjectUtils.isPropDefined(values, key) && Object.getPrototypeOf(this).hasOwnProperty(key)) {
                this[key] = values[key];
            }
        }
    };
    Geometry.prototype.getDefinedValues = function () {
        var _this = this;
        var res = {};
        Object.keys(Object.getPrototypeOf(this)).forEach(function (key) {
            if (_this[key]) {
                res[key] = _this[key];
            }
        });
        return res;
    };
    return Geometry;
}(Subject_1.Subject));
exports.Geometry = Geometry;
//# sourceMappingURL=Geometry.js.map