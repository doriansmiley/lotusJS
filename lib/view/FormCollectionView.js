"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 10/9/17.
 */
const AbstractCollectionView_1 = require("./AbstractCollectionView");
const SkinPart_1 = require("./SkinPart");
const Lavender = require("lavenderjs/lib");
class FormCollectionView extends AbstractCollectionView_1.AbstractCollectionView {
    constructor() {
        super();
        this._state = 0; //determines what state the form shows
    }
    get submit() {
        return this._submit;
    }
    set submit(value) {
        this._submit = value;
        this.notify(value, 'submit');
    }
    get clear() {
        return this._clear;
    }
    set clear(value) {
        this._clear = value;
        this.notify(value, 'clear');
    }
    get back() {
        return this._back;
    }
    set back(value) {
        this._back = value;
        this.notify(value, 'back');
    }
    get error() {
        return this._error;
    }
    set error(value) {
        this._error = value;
        this.notify(value, 'error');
    }
    get state() {
        return this._state;
    }
    set state(value) {
        //set new state, this must occure first
        this.resolveState(value, this.state);
        this._state = value;
        this.notify(value, 'state');
    }
    get validationWarning() {
        return this._validationWarning;
    }
    set validationWarning(value) {
        this._validationWarning = value;
        this.notify(value, 'validationWarning');
    }
    get inputState() {
        return this._inputState;
    }
    set inputState(value) {
        this._inputState = value;
        this.notify(value, 'inputState');
    }
    get submitState() {
        return this._submitState;
    }
    set submitState(value) {
        this._submitState = value;
        this.notify(value, 'submitState');
    }
    get errorState() {
        return this._errorState;
    }
    set errorState(value) {
        this._errorState = value;
        this.notify(value, 'errorState');
    }
    clearErrors() {
        if (this.error) {
            while (this.error.firstChild) {
                this.error.removeChild(this.error.firstChild);
            }
        }
    }
    addErrors(errors) {
        if (this.error) {
            for (let i = 0; i < errors.length; i++) {
                let error = errors.getItemAt(i);
                let message = document.createElement('p');
                let node = document.createTextNode(error.errorMessage);
                message.appendChild(node);
                this.error.appendChild(message);
            }
        }
    }
    onSubmit(event) {
        //clear old errors
        this.clearErrors();
        //check that all instances of InputCollectionModel are valid
        let errors = new Lavender.ArrayList();
        for (let i = 0; i < this.collection.length; i++) {
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
    }
    onClear(event) {
        this.reset();
    }
    reset() {
        //clear the form by iterating model and setting appropriate values. We need to a way to clear selection for Lists and radio groups
        for (let i = 0; i < this.collection.length; i++) {
            this.collection.getItemAt(i).clear();
        }
        this.state = FormCollectionView.INPUT;
    }
    onBack(event) {
        this.state = FormCollectionView.INPUT;
    }
    resolveState(state, oldState, errors) {
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
    }
    onError(error) {
        //only the external application can trigger state error which results from a service error
    }
    onReady() {
        super.onReady();
        //set the default state
        this.resolveState(FormCollectionView.INPUT, null);
    }
    //define required skin parts
    defineSkinParts() {
        super.defineSkinParts();
        this.skinParts.addItem(new SkinPart_1.SkinPart('validationWarning', this, 'validationWarning'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('inputState', this, 'inputState'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('submitState', this, 'submitState'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('errorState', this, 'errorState'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('error', this, 'error'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('submit', this, 'submit'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('clear', this, 'clear'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('back', this, 'back'));
    }
    //set up event handlers and bindings
    onSkinPartAdded(part, element) {
        //attach event listeners for submit and clear buttons
        super.onSkinPartAdded(part, element);
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
    }
    destroy() {
        super.destroy();
        //TODO clear all references
    }
}
FormCollectionView.INPUT = 0;
FormCollectionView.VALIDATION_ERROR = 1;
FormCollectionView.SUBMIT = 2;
FormCollectionView.ERROR = 2;
exports.FormCollectionView = FormCollectionView;
//# sourceMappingURL=FormCollectionView.js.map