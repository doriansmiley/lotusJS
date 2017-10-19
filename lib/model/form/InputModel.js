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
 * Created by dsmiley on 10/5/17.
 */
var Lavender = require("lavenderjs/lib");
var InputModel = (function (_super) {
    __extends(InputModel, _super);
    function InputModel(label, value, name, selected, required) {
        if (selected === void 0) { selected = false; }
        if (required === void 0) { required = false; }
        var _this = _super.call(this) || this;
        _this._selected = false;
        _this._required = false;
        _this.label = label;
        _this.value = value;
        _this.name = name;
        _this.selected = selected;
        _this.required = required;
        return _this;
    }
    Object.defineProperty(InputModel.prototype, "nonFormattedValue", {
        get: function () {
            return this._nonFormattedValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputModel.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
            this.notify(value, 'label');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputModel.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._nonFormattedValue = value;
            if (this.format) {
                value = this.format(value);
            }
            this._value = value;
            this.notify(value, 'value');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputModel.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
            this.notify(value, 'name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputModel.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            this.notify(value, 'selected');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputModel.prototype, "required", {
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = value;
            this.notify(value, 'required');
        },
        enumerable: true,
        configurable: true
    });
    return InputModel;
}(Lavender.Subject));
exports.InputModel = InputModel;
//# sourceMappingURL=InputModel.js.map