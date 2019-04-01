"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 10/10/17.
 */
const Lavender = require("lavenderjs/lib");
class InputCollectionModel extends Lavender.Subject {
    constructor(type, collection, selectionRequired = false, validators = new Lavender.ArrayList()) {
        super();
        this.selectionRequired = false;
        this._isValid = false;
        this.type = type;
        this.collection = collection;
        this.selectionRequired = selectionRequired;
        this.validators = validators;
        this.setUpBindings();
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
        this.notify(value, 'label');
    }
    get errors() {
        return this._errors;
    }
    set errors(value) {
        this._errors = value;
        this.notify(value, 'errors');
    }
    get validators() {
        return this._validators;
    }
    set validators(value) {
        this._validators = value;
        this.notify(value, 'validators');
        this.setUpBindings();
        this.addEventListeners();
    }
    get isValid() {
        return this._isValid;
    }
    set isValid(value) {
        this._isValid = value;
        this.notify(value, "isValid");
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
        this.notify(value, 'type');
    }
    get collection() {
        return this._collection;
    }
    set collection(value) {
        this._collection = value;
        this.notify(value, 'collection');
    }
    addEventListeners() {
        if (!this.validators) {
            return;
        }
        this.validators.addEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'setUpBindings');
    }
    removeEventListeners() {
        if (!this.validators) {
            return;
        }
        if (this.validators) {
            this.validators.addEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'setUpBindings');
        }
    }
    setUpBindings() {
        if (!this.binder || !this.validators) {
            return;
        }
        this.binder.unbindAll();
        for (let i = 0; i < this.validators.length; i++) {
            this.binder.bind(this.validators.getItemAt(i), 'isValid', this, 'validate');
        }
        this.validate();
    }
    validate(value) {
        this.errors = new Lavender.ArrayList();
        for (let i = 0; i < this.validators.length; i++) {
            let validator = this.validators.getItemAt(i);
            if (!validator.isValid) {
                this.errors.addAll(validator.errors.source());
            }
        }
        this.isValid = this.errors.length == 0;
        //return the failed results
        return this.errors;
    }
    clear() {
        //reset all form fields by clearing InputModel values
        for (let i = 0; i < this.collection.length; i++) {
            let item = this.collection.getItemAt(i);
            switch (this.type) {
                case InputCollectionModel.TYPE_INPUT:
                    item.value = '';
                    break;
                case InputCollectionModel.TYPE_FILE:
                    //TODO: fogure out how to reset file collection view using model. Probably need a ne wmodel attribute
                    break;
                case InputCollectionModel.TYPE_RADIO_GROUP:
                case InputCollectionModel.TYPE_LIST:
                    item.selected = false;
                    break;
            }
        }
    }
    destroy() {
        if (this.binder) {
            this.binder.unbindAll();
        }
        this.removeEventListeners();
        this.binder = null;
        this.collection = null;
        this.validators = null;
        this.errors = null;
    }
}
InputCollectionModel.TYPE_INPUT = 0;
InputCollectionModel.TYPE_LIST = 1;
InputCollectionModel.TYPE_RADIO_GROUP = 2;
InputCollectionModel.TYPE_FILE = 3;
exports.InputCollectionModel = InputCollectionModel;
//# sourceMappingURL=InputCollectionModel.js.map