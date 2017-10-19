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
 * Created by dsmiley on 9/22/17.
 */
var AbstractSelectableFormInput_1 = require("./AbstractSelectableFormInput");
var SkinPart_1 = require("./SkinPart");
var RadioItemView = (function (_super) {
    __extends(RadioItemView, _super);
    function RadioItemView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RadioItemView.prototype, "radio", {
        get: function () {
            return this._radio;
        },
        set: function (value) {
            this._radio = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioItemView.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
        },
        enumerable: true,
        configurable: true
    });
    RadioItemView.prototype.onClick = function (event) {
        this.selected = this.radio.checked;
    };
    RadioItemView.prototype.refreshView = function (selected) {
        if (this.radio) {
            this.radio.checked = selected;
        }
    };
    RadioItemView.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        this.radio.addEventListener('click', this.onClick.bind(this));
    };
    RadioItemView.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        if (this.radio) {
            this.radio.removeEventListener('click', this.onClick);
        }
    };
    RadioItemView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        this.skinParts.addItem(new SkinPart_1.SkinPart('radio', this, 'radio'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('label', this, 'label'));
    };
    RadioItemView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'radio':
                //set up listitem value and label
                this.radio.value = (typeof this.model.value == 'object') ? JSON.stringify(this.model.value) : this.model.value;
                this.radio.name = this.model.name;
                this.radio.checked = this.selected;
                this.addEventListeners();
                break;
            case 'label':
                this.label.innerHTML = this.model.label;
                break;
        }
    };
    RadioItemView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.removeEventListeners();
        this.radio = null;
        this.label = null;
    };
    return RadioItemView;
}(AbstractSelectableFormInput_1.AbstractSelectableFormInput));
exports.RadioItemView = RadioItemView;
//# sourceMappingURL=RadioItemView.js.map