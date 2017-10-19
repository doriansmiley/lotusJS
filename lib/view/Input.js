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
var AbstractItemView_1 = require("./AbstractItemView");
var SkinPart_1 = require("./SkinPart");
var InputEvent_1 = require("../control/events/InputEvent");
var InputModel_1 = require("../model/form/InputModel");
var Input = (function (_super) {
    __extends(Input, _super);
    function Input(type) {
        var _this = _super.call(this) || this;
        _this.type = type;
        return _this;
    }
    Object.defineProperty(Input.prototype, "label", {
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
            this._value = value;
            //manually this.inputSkinPart.value if there are no two way bindings
            if (this.inputSkinPart) {
                this.inputSkinPart.value = value;
            }
            this.notify(value, 'value');
        },
        enumerable: true,
        configurable: true
    });
    //add the invalid/valid class after validation. This method id typically called as part of a data binding on this.isValid
    Input.prototype.attachValidationClass = function (classToAdd, classToRemove) {
        if (this.inputSkinPart) {
            this.inputSkinPart.classList.remove(classToRemove);
            this.inputSkinPart.classList.add(classToAdd);
        }
    };
    //TODO: add invalid classes and bindings to trigger attachment of invlaid styles when model's isValid state changes
    Input.prototype.onModelChange = function (value) {
        _super.prototype.onModelChange.call(this, value);
        if (value instanceof InputModel_1.InputModel) {
            //set up two way bindings on model
            this.binder.bind(value, 'value', this, 'value');
            this.binder.bind(this, 'value', value, 'value');
            //set the intital value, IMORTANT: do this after bindings are set up to trigger validation
            this.value = value.value;
        }
        if (this.label && value['label']) {
            this.label.innerHTML = value['label'];
        }
    };
    Input.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('input', this, 'inputSkinPart'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('label', this, 'label'));
    };
    Input.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'input':
                //add event listener or whatever else you want to do when this skin part is added
                //you could hold until all skin parts are added and then call addEventListeners
                console.log('Lotus.Input.prototype.onSkinPartAdded: part: ' + part);
                this.inputSkinPart.setAttribute('type', this.type);
                this.addEventListeners();
                if (this.model) {
                    this.inputSkinPart.value = this.model['value'];
                    //trigger change event to update bidings and trigger validation
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("change", false, true);
                    this.inputSkinPart.dispatchEvent(evt);
                }
                break;
            case 'label': {
                if (this.model && this.model['label']) {
                    this.label.innerHTML = this.model['label'];
                }
                break;
            }
        }
    };
    Input.prototype.onChange = function (event) {
        console.log('Lotus.Input.prototype.onChange: input value is ' + event.target.value);
        console.log('Lotus.Input.prototype.onChange: my id is ' + this.id);
        this.value = this.inputSkinPart.value;
        this.dispatch(new InputEvent_1.InputEvent(InputEvent_1.InputEvent.CHANGE, { target: this, originalEvent: event }));
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
}(AbstractItemView_1.AbstractItemView));
exports.Input = Input;
//# sourceMappingURL=Input.js.map