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
 * Created by dsmiley on 10/10/17.
 */
var Lavender = require("lavenderjs/lib");
var ValidationError = (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(property, errorCode, errorMessage) {
        var _this = _super.call(this) || this;
        _this.property = property;
        _this.errorCode = errorCode;
        _this.errorMessage = errorMessage;
        return _this;
    }
    Object.defineProperty(ValidationError.prototype, "property", {
        get: function () {
            return this._property;
        },
        set: function (value) {
            this._property = value;
            this.notify(value, "property");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationError.prototype, "errorCode", {
        get: function () {
            return this._errorCode;
        },
        set: function (value) {
            this._errorCode = value;
            this.notify(value, "errorCode");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationError.prototype, "errorMessage", {
        get: function () {
            return this._errorMessage;
        },
        set: function (value) {
            this._errorMessage = value;
            this.notify(value, "errorMessage");
        },
        enumerable: true,
        configurable: true
    });
    ValidationError.prototype.destroy = function () {
        this.property = null;
        this.errorCode = null;
        this.errorMessage = null;
    };
    return ValidationError;
}(Lavender.Subject));
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map