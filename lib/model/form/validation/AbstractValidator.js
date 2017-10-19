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
var Lavender = require("lavenderjs/lib");
/**
 * Created by dsmiley on 10/10/17.
 */
var AbstractValidator = (function (_super) {
    __extends(AbstractValidator, _super);
    function AbstractValidator() {
        var _this = _super.call(this) || this;
        _this._isValid = false;
        _this._hasWarnings = false;
        return _this;
    }
    Object.defineProperty(AbstractValidator.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        set: function (value) {
            this._errors = value;
            this.notify(value, "errors");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractValidator.prototype, "warnings", {
        get: function () {
            return this._warnings;
        },
        set: function (value) {
            this._warnings = value;
            this.notify(value, "warnings");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractValidator.prototype, "source", {
        get: function () {
            return this._source;
        },
        set: function (value) {
            this._source = value;
            if (this.source !== null && this.source !== undefined) {
                this.init(); //set up initial state
            }
            this.notify(value, "source");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractValidator.prototype, "isValid", {
        get: function () {
            return this._isValid;
        },
        set: function (value) {
            this._isValid = value;
            this.notify(value, "isValid");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractValidator.prototype, "hasWarnings", {
        get: function () {
            return this._hasWarnings;
        },
        set: function (value) {
            this._hasWarnings = value;
            this.notify(value, "hasWarnings");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractValidator.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this.notify(value, "id");
        },
        enumerable: true,
        configurable: true
    });
    AbstractValidator.prototype.getValidationResult = function () {
        return this.errors.length <= 0;
    };
    AbstractValidator.prototype.getValidationWarningsResult = function () {
        return this.warnings.length > 0;
    };
    //stub for override
    AbstractValidator.prototype.getValidationErrors = function () {
        return new Lavender.ArrayList(); //returns ArrayList of SpiSdk.ValidationError instances
    };
    //stub for override
    AbstractValidator.prototype.getValidationWarnings = function () {
        return new Lavender.ArrayList(); //returns ArrayList of SpiSdk.ValidationError instances
    };
    AbstractValidator.prototype.validateOnChange = function (value) {
        this.validate();
    };
    AbstractValidator.prototype.setUpBindings = function () {
    };
    AbstractValidator.prototype.addEventListeners = function () {
    };
    AbstractValidator.prototype.validate = function () {
        this.errors = this.getValidationErrors(); //get all errors and store
        this.warnings = this.getValidationWarnings();
        this.isValid = this.getValidationResult();
        this.hasWarnings = this.getValidationWarningsResult();
        return this.isValid; //returns true or false, to obtain specific errors use this.errors
    };
    AbstractValidator.prototype.init = function () {
        this.addEventListeners();
        this.setUpBindings();
        this.validate();
    };
    AbstractValidator.prototype.destroy = function () {
        this.binder.unbindAll();
        this.binder = null;
        this.source = null;
        this.errors = null;
        this.warnings = null;
    };
    return AbstractValidator;
}(Lavender.Subject));
exports.AbstractValidator = AbstractValidator;
//# sourceMappingURL=AbstractValidator.js.map