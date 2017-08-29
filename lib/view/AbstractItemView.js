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
 * Created by dsmiley on 8/4/17.
 */
var AbstractItemView = (function (_super) {
    __extends(AbstractItemView, _super);
    function AbstractItemView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AbstractItemView.prototype, "model", {
        get: function () {
            return this._model;
        },
        set: function (val) {
            this._model = val;
            this.onModelChange(val);
            this.notify(val, 'model');
        },
        enumerable: true,
        configurable: true
    });
    AbstractItemView.prototype.setElementDisplay = function (element, display) {
        //at some points in the items lifecycle element could be null, se we require this check
        if (element !== null && element !== undefined) {
            element.style.display = display;
        }
    };
    //stub for override
    AbstractItemView.prototype.onModelChange = function (value) {
    };
    //stub for override
    AbstractItemView.prototype.resetState = function () {
    };
    AbstractItemView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.model = null;
    };
    return AbstractItemView;
}(AbstractComponent_1.AbstractComponent));
exports.AbstractItemView = AbstractItemView;
//# sourceMappingURL=AbstractItemView.js.map