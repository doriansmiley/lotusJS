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
 * Created by dsmiley on 10/9/17.
 */
var AbstractCollectionView_1 = require("./AbstractCollectionView");
var SkinPart_1 = require("./SkinPart");
var Lavender = require("lavenderjs/lib");
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
    FormCollectionView.prototype.clearErrors = function () {
        if (this.error) {
            while (this.error.firstChild) {
                this.error.removeChild(this.error.firstChild);
            }
        }
    };
    FormCollectionView.prototype.addErrors = function (errors) {
        if (this.error) {
            for (var i = 0; i < errors.length; i++) {
                var error = errors.getItemAt(i);
                var message = document.createElement('p');
                var node = document.createTextNode(error.errorMessage);
                message.appendChild(node);
                this.error.appendChild(message);
            }
        }
    };
    FormCollectionView.prototype.onSubmit = function (event) {
        //clear old errors
        this.clearErrors();
        //check that all instances of InputCollectionModel are valid
        var errors = new Lavender.ArrayList();
        for (var i = 0; i < this.collection.length; i++) {
            if (!this.collection.getItemAt(i).isValid) {
                errors.addAll(this.collection.getItemAt(i).errors.source());
            }
        }
        //display any validation errors
        if (errors.length > 0) {
            this.addErrors(errors);
            if (this.validationWarning) {
                this.validationWarning.style.display = this._validationWarningDisplay;
            }
            if (this.error) {
                this.error.style.display = this._errorDisplay;
            }
        }
        else {
            this.state = FormCollectionView.SUBMIT;
            if (this.validationWarning) {
                this.validationWarning.style.display = 'none';
            }
            if (this.error) {
                this.error.style.display = 'none';
            }
        }
    };
    FormCollectionView.prototype.onClear = function (event) {
        this.reset();
    };
    FormCollectionView.prototype.reset = function () {
        //clear the form by iterating model and setting appropriate values. We need to a way to clear selection for Lists and radio groups
        for (var i = 0; i < this.collection.length; i++) {
            this.collection.getItemAt(i).clear();
        }
        this.state = FormCollectionView.INPUT;
    };
    FormCollectionView.prototype.onBack = function (event) {
        this.state = FormCollectionView.INPUT;
    };
    FormCollectionView.prototype.resolveState = function (state, oldState, errors) {
        switch (oldState) {
            case FormCollectionView.INPUT:
                if (this.inputState && state != FormCollectionView.VALIDATION_ERROR) {
                    this.inputState.style.display = 'none';
                }
                break;
            case FormCollectionView.SUBMIT:
                if (this.submitState) {
                    this.submitState.style.display = 'none';
                }
                break;
            case FormCollectionView.ERROR:
                if (this.errorState) {
                    this.errorState.style.display = 'none';
                }
                break;
        }
        switch (state) {
            case FormCollectionView.INPUT:
                if (this.inputState) {
                    this.inputState.style.display = this._inputStateDisplay;
                }
                break;
            case FormCollectionView.SUBMIT:
                if (this.submitState) {
                    this.submitState.style.display = this._submitStateDisplay;
                }
                break;
            case FormCollectionView.ERROR:
                if (this.errorState) {
                    this.errorState.style.display = this._errorStateDisplay;
                }
                break;
        }
    };
    FormCollectionView.prototype.onError = function (error) {
        //only the external application can trigger state error which results from a service error
    };
    FormCollectionView.prototype.onReady = function () {
        _super.prototype.onReady.call(this);
        //set the default state
        this.resolveState(FormCollectionView.INPUT, null);
    };
    //define required skin parts
    FormCollectionView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        this.skinParts.addItem(new SkinPart_1.SkinPart('validationWarning', this, 'validationWarning'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('inputState', this, 'inputState'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('submitState', this, 'submitState'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('errorState', this, 'errorState'));
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
            case 'error':
                this._errorDisplay = this.error.style.display;
                this.error.style.display = 'none';
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