"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/21/17.
 */
const AbstractItemView_1 = require("./AbstractItemView");
const SkinPart_1 = require("./SkinPart");
const InputEvent_1 = require("../control/events/InputEvent");
const InputModel_1 = require("../model/form/InputModel");
class Input extends AbstractItemView_1.AbstractItemView {
    constructor(type) {
        super();
        this.type = type;
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
        this.notify(value, 'label');
    }
    get inputSkinPart() {
        return this._inputSkinPart;
    }
    set inputSkinPart(value) {
        this._inputSkinPart = value;
        this.notify(value, 'inputSkinPart');
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
        this.notify(value, 'type');
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        //manually this.inputSkinPart.value if there are no two way bindings
        if (this.inputSkinPart) {
            this.inputSkinPart.value = value;
        }
        this.notify(value, 'value');
    }
    //add the invalid/valid class after validation. This method id typically called as part of a data binding on this.isValid
    attachValidationClass(classToAdd, classToRemove) {
        if (this.inputSkinPart) {
            this.inputSkinPart.classList.remove(classToRemove);
            this.inputSkinPart.classList.add(classToAdd);
        }
    }
    //TODO: add invalid classes and bindings to trigger attachment of invlaid styles when model's isValid state changes
    onModelChange(value) {
        super.onModelChange(value);
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
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('input', this, 'inputSkinPart'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('label', this, 'label'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
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
    }
    onChange(event) {
        console.log('Lotus.Input.prototype.onChange: input value is ' + event.target.value);
        console.log('Lotus.Input.prototype.onChange: my id is ' + this.id);
        this.value = this.inputSkinPart.value;
        this.dispatch(new InputEvent_1.InputEvent(InputEvent_1.InputEvent.CHANGE, { target: this, originalEvent: event }));
    }
    addEventListeners() {
        super.addEventListeners();
        this.inputSkinPart.addEventListener('change', this.onChange.bind(this));
    }
    removeEventListeners() {
        super.removeEventListeners();
        this.inputSkinPart.removeEventListener('change', this.onChange);
    }
    destroy() {
        super.destroy();
        this.inputSkinPart = null;
    }
}
exports.Input = Input;
//# sourceMappingURL=Input.js.map