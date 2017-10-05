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
 * Created by dsmiley on 9/21/17.
 */
var AbstractComponent_1 = require("./AbstractComponent");
var SkinPart_1 = require("./SkinPart");
var InputEvent_1 = require("../control/events/InputEvent");
var Input = (function (_super) {
    __extends(Input, _super);
    function Input(type) {
        var _this = _super.call(this) || this;
        _this.type = type;
        return _this;
    }
    Object.defineProperty(Input.prototype, "inputSkinPart", {
        get: function () {
            return this._inputSkinPart;
        },
        set: function (value) {
            this._inputSkinPart = value;
            this.notify(value, 'inputSkinPart');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.notify(value, 'type');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this.format) {
                value = this.format(value);
            }
            this._value = value;
            this.notify(value, 'value');
            if (this.inputSkinPart && this.inputSkinPart.value != value) {
                this.inputSkinPart.value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Input.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('input', this, 'inputSkinPart'));
    };
    Input.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'input':
                //add event listener or whatever else yo want to do when this skin part is added
                //you could hold until all skin parts are added and then call addEventListeners
                console.log('Lotus.Input.prototype.onSkinPartAdded: part: ' + part);
                this.inputSkinPart.setAttribute('type', this.type);
                this.addEventListeners();
                break;
        }
    };
    Input.prototype.onChange = function (event) {
        console.log('Lotus.Input.prototype.onChange: input value is ' + event.target.value);
        console.log('Lotus.Input.prototype.onChange: my id is ' + this.id);
        this.value = this.inputSkinPart.value;
        this.dispatch(new InputEvent_1.InputEvent(InputEvent_1.InputEvent.CHANGE, { target: this.inputSkinPart, originalEvent: event }));
    };
    Input.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        this.inputSkinPart.addEventListener('change', this.onChange.bind(this));
    };
    Input.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        this.inputSkinPart.removeEventListener('change', this.onChange);
    };
    Input.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.inputSkinPart = null;
    };
    return Input;
}(AbstractComponent_1.AbstractComponent));
exports.Input = Input;
//# sourceMappingURL=Input.js.map