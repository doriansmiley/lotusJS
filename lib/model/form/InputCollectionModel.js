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
 * Created by dsmiley on 10/10/17.
 */
var Lavender = require("lavenderjs/lib");
var InputCollectionModel = (function (_super) {
    __extends(InputCollectionModel, _super);
    function InputCollectionModel(type, collection, selectionRequired, validators) {
        if (selectionRequired === void 0) { selectionRequired = false; }
        if (validators === void 0) { validators = new Lavender.ArrayList(); }
        var _this = _super.call(this) || this;
        _this.selectionRequired = false;
        _this._isValid = false;
        _this.type = type;
        _this.collection = collection;
        _this.selectionRequired = selectionRequired;
        _this.validators = validators;
        _this.setUpBindings();
        return _this;
    }
    Object.defineProperty(InputCollectionModel.prototype, "label", {
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
    Object.defineProperty(InputCollectionModel.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        set: function (value) {
            this._errors = value;
            this.notify(value, 'errors');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputCollectionModel.prototype, "validators", {
        get: function () {
            return this._validators;
        },
        set: function (value) {
            this._validators = value;
            this.notify(value, 'validators');
            this.setUpBindings();
            this.addEventListeners();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputCollectionModel.prototype, "isValid", {
        get: function () {
            return this._isValid;
        },
        set: function (value) {
            this._isValid = value;
            this.notify(value, "isValid");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputCollectionModel.prototype, "type", {
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
    Object.defineProperty(InputCollectionModel.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (value) {
            this._collection = value;
            this.notify(value, 'collection');
        },
        enumerable: true,
        configurable: true
    });
    InputCollectionModel.prototype.addEventListeners = function () {
        if (!this.validators) {
            return;
        }
        this.validators.addEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'setUpBindings');
    };
    InputCollectionModel.prototype.removeEventListeners = function () {
        if (!this.validators) {
            return;
        }
        if (this.validators) {
            this.validators.addEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'setUpBindings');
        }
    };
    InputCollectionModel.prototype.setUpBindings = function () {
        if (!this.binder || !this.validators) {
            return;
        }
        this.binder.unbindAll();
        for (var i = 0; i < this.validators.length; i++) {
            this.binder.bind(this.validators.getItemAt(i), 'isValid', this, 'validate');
        }
        this.validate();
    };
    InputCollectionModel.prototype.validate = function (value) {
        this.errors = new Lavender.ArrayList();
        for (var i = 0; i < this.validators.length; i++) {
            var validator = this.validators.getItemAt(i);
            if (!validator.isValid) {
                this.errors.addAll(validator.errors.source());
            }
        }
        this.isValid = this.errors.length == 0;
        //return the failed results
        return this.errors;
    };
    InputCollectionModel.prototype.clear = function () {
        //reset all form fields by clearing InputModel values
        for (var i = 0; i < this.collection.length; i++) {
            var item = this.collection.getItemAt(i);
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
    };
    InputCollectionModel.prototype.destroy = function () {
        if (this.binder) {
            this.binder.unbindAll();
        }
        this.removeEventListeners();
        this.binder = null;
        this.collection = null;
        this.validators = null;
        this.errors = null;
    };
    InputCollectionModel.TYPE_INPUT = 0;
    InputCollectionModel.TYPE_LIST = 1;
    InputCollectionModel.TYPE_RADIO_GROUP = 2;
    InputCollectionModel.TYPE_FILE = 3;
    return InputCollectionModel;
}(Lavender.Subject));
exports.InputCollectionModel = InputCollectionModel;
//# sourceMappingURL=InputCollectionModel.js.map