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
var AbstractCollectionView_1 = require("./AbstractCollectionView");
var SkinPart_1 = require("./SkinPart");
var InputCollectionModel_1 = require("../model/form/InputCollectionModel");
var FormCollectionView = (function (_super) {
    __extends(FormCollectionView, _super);
    function FormCollectionView() {
        var _this = _super.call(this) || this;
        _this._state = 0; //determines what state the form shows
        return _this;
    }
    Object.defineProperty(FormCollectionView.prototype, "submit", {
        get: function () {
            return this._submit;
        },
        set: function (value) {
            this._submit = value;
            this.notify(value, 'submit');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormCollectionView.prototype, "clear", {
        get: function () {
            return this._clear;
        },
        set: function (value) {
            this._clear = value;
            this.notify(value, 'clear');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormCollectionView.prototype, "back", {
        get: function () {
            return this._back;
        },
        set: function (value) {
            this._back = value;
            this.notify(value, 'back');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormCollectionView.prototype, "error", {
        get: function () {
            return this._error;
        },
        set: function (value) {
            this._error = value;
            this.notify(value, 'error');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormCollectionView.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            //set new state, this must occure first
            this.resolveState(value, this.state);
            this._state = value;
            this.notify(value, 'state');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormCollectionView.prototype, "validationWarning", {
        get: function () {
            return this._validationWarning;
        },
        set: function (value) {
            this._validationWarning = value;
            this.notify(value, 'validationWarning');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormCollectionView.prototype, "inputState", {
        get: function () {
            return this._inputState;
        },
        set: function (value) {
            this._inputState = value;
            this.notify(value, 'inputState');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormCollectionView.prototype, "submitState", {
        get: function () {
            return this._submitState;
        },
        set: function (value) {
            this._submitState = value;
            this.notify(value, 'submitState');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormCollectionView.prototype, "errorState", {
        get: function () {
            return this._errorState;
        },
        set: function (value) {
            this._errorState = value;
            this.notify(value, 'errorState');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormCollectionView.prototype, "input", {
        get: function () {
            return this._input;
        },
        set: function (value) {
            this._input = value;
            this.notify(value, 'input');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormCollectionView.prototype, "list", {
        get: function () {
            return this._list;
        },
        set: function (value) {
            this._list = value;
            this.notify(value, 'list');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormCollectionView.prototype, "radioGroup", {
        get: function () {
            return this._radioGroup;
        },
        set: function (value) {
            this._radioGroup = value;
            this.notify(value, 'radioGroup');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormCollectionView.prototype, "file", {
        get: function () {
            return this._file;
        },
        set: function (value) {
            this._file = value;
            this.notify(value, 'file');
        },
        enumerable: true,
        configurable: true
    });
    FormCollectionView.prototype.getModel = function (model) {
        //TODO: switch case on type and send back either model.collection.getItemAt(o) or model.collection
        var value = model;
        switch (model.type) {
            case InputCollectionModel_1.InputCollectionModel.TYPE_INPUT:
            case InputCollectionModel_1.InputCollectionModel.TYPE_FILE:
                value = model.collection.getItemAt(0);
                break;
            case InputCollectionModel_1.InputCollectionModel.TYPE_LIST:
            case InputCollectionModel_1.InputCollectionModel.TYPE_RADIO_GROUP:
                value = model.collection;
                break;
        }
        return value;
    };
    //grab the appropriate function based on the model object type and skin part definitions
    FormCollectionView.prototype.createChildView = function (model) {
        //TODO: switch case on type and add the appropriate corresponding Lotus input control.
        var evalClass = eval(this.itemView);
        return new evalClass();
    };
    //create the appropriate item template based on model type and skin part deinitions
    FormCollectionView.prototype.cloneItemTemplate = function (model) {
        // clone the appropriate item template (input, radio group, list, file) based on model.type. there is a skins part corresponding to each type
        return this.itemTemplate.cloneNode(true);
    };
    FormCollectionView.prototype.onSubmit = function (event) {
        //TODO: onSubmit bindings trigger validation by iterating each item in this.collection, then each item in this.collection[i].collection calling this.collection[i].collection[y].validate.
        //TODO: Once you create the InputCollectionModel we could probably store references to each item in this.collection[i].collection so we don't need to two loops here
        // If all fields valid then set state=submit, else submit=validation errors.
        //only the external application can trigger state error which results from a service error
        //if all items in the model are
    };
    FormCollectionView.prototype.onClear = function (event) {
        //clear the form by iterating model and setting appropriate values. We need to a way to clear selection for Lists and radio groups
        for (var i = 0; i < this.collection.length; i++) {
            this.collection.getItemAt(i).clear();
        }
    };
    FormCollectionView.prototype.onBack = function (event) {
        //reset state to input
        this.state = FormCollectionView.INPUT;
    };
    //stubs for override in subclasses. If you require notifications when a form element has focus etc you can dispatch them in your callbacks assigned here
    FormCollectionView.prototype.addViewEventListeners = function (view) {
        _super.prototype.addViewEventListeners.call(this, view);
        //TODO:add bindings for view.model.isValid to view.isValid
        //This requires a form base class that defines valid and invalid styles and the isValid accessors
        //When view.isValid is false the invalid styles are applied, when view.invalid is true the invalid style is removed and the valid style applied
    };
    //stub for override, remove your custom view cllbacks here
    FormCollectionView.prototype.removeViewEventListeners = function (view) {
        _super.prototype.removeViewEventListeners.call(this, view);
    };
    FormCollectionView.prototype.resolveState = function (state, oldState) {
        switch (oldState) {
            case FormCollectionView.INPUT:
                this.inputState.style.display = 'none';
                break;
            case FormCollectionView.VALIDATION_ERROR:
                this.validationWarning.style.display = 'none';
                break;
            case FormCollectionView.SUBMIT:
                this.submitState.style.display = 'none';
                break;
            case FormCollectionView.ERROR:
                this.errorState.style.display = 'none';
                break;
        }
        switch (state) {
            case FormCollectionView.INPUT:
                this.inputState.style.display = this._inputStateDisplay;
                break;
            case FormCollectionView.VALIDATION_ERROR:
                this.validationWarning.style.display = this._validationWarningDisplay;
                break;
            case FormCollectionView.SUBMIT:
                this.submitState.style.display = this._submitStateDisplay;
                break;
            case FormCollectionView.ERROR:
                this.errorState.style.display = this._errorStateDisplay;
                break;
        }
    };
    FormCollectionView.prototype.onReady = function () {
        _super.prototype.onReady.call(this);
        //set the default state
        this.resolveState(this.state, null);
    };
    //define required skin parts
    FormCollectionView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        this.skinParts.addItem(new SkinPart_1.SkinPart('validationWarning', this, 'validationWarning'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('inputState', this, 'inputState'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('submitState', this, 'submitState'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('errorState', this, 'errorState'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('input', this, 'input'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('list', this, 'list'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('radioGroup', this, 'radioGroup'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('file', this, 'file'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('error', this, 'error'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('submit', this, 'submit'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('clear', this, 'clear'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('back', this, 'back'));
    };
    //set up event handlers and bindings
    FormCollectionView.prototype.onSkinPartAdded = function (part, element) {
        //attach event listeners for submit and clear buttons
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'back':
                this.back.addEventListener('click', this.onBack.bind(this));
                break;
            case 'clear':
                this.clear.addEventListener('click', this.onClear.bind(this));
                break;
            case 'submit':
                this.submit.addEventListener('click', this.onSubmit.bind(this));
                break;
            case 'validationWarning':
                this._validationWarningDisplay = this.validationWarning.style.display;
                this.validationWarning.style.display = 'none';
                break;
            case 'inputState':
                this._inputStateDisplay = this.inputState.style.display;
                this.inputState.style.display = 'none';
                break;
            case 'submitState':
                this._submitStateDisplay = this.submitState.style.display;
                this.submitState.style.display = 'none';
                break;
            case 'errorState':
                this._errorStateDisplay = this.errorState.style.display;
                this.errorState.style.display = 'none';
                break;
        }
    };
    FormCollectionView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        //TODO clear all references
    };
    FormCollectionView.INPUT = 0;
    FormCollectionView.VALIDATION_ERROR = 1;
    FormCollectionView.SUBMIT = 2;
    FormCollectionView.ERROR = 2;
    return FormCollectionView;
}(AbstractCollectionView_1.AbstractCollectionView));
exports.FormCollectionView = FormCollectionView;
//# sourceMappingURL=FormCollectionView.js.map