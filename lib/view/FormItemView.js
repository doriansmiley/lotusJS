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
var AbstractItemView_1 = require("./AbstractItemView");
var InputCollectionModel_1 = require("../model/form/InputCollectionModel");
var SkinPart_1 = require("./SkinPart");
var ComponentEvent_1 = require("../control/events/ComponentEvent");
/**
 * Created by dsmiley on 10/12/17.
 */
var FormItemView = (function (_super) {
    __extends(FormItemView, _super);
    function FormItemView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FormItemView.prototype, "input", {
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
    Object.defineProperty(FormItemView.prototype, "list", {
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
    Object.defineProperty(FormItemView.prototype, "radioGroup", {
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
    Object.defineProperty(FormItemView.prototype, "file", {
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
    FormItemView.prototype.removeSkinPart = function (element, parent) {
        if (element.lotusComponentInstance.ready) {
            element.lotusComponentInstance.destroy();
        }
        if (parent) {
            parent.removeChild(element);
        }
        if (this.input == element) {
            this.input = null;
        }
        else if (this.list == element) {
            this.list = null;
        }
        else if (this.radioGroup == element) {
            this.radioGroup = null;
        }
        else if (this.file == element) {
            this.file = null;
        }
    };
    FormItemView.prototype.setUpSkinParts = function () {
        if (!this.ready || !this.model) {
            return;
        }
        var skinPartsToRemove = [
            this.input,
            this.list,
            this.radioGroup,
            this.file
        ];
        //set up the required skin part and remove it from the list of skin parts to remove
        //only one of these skin parts can stay
        var head;
        var tail;
        switch (this.model.type) {
            //remove unused skin parts and set up used skin part
            case InputCollectionModel_1.InputCollectionModel.TYPE_INPUT:
                this.setUpSkinPart(this.input.lotusComponentInstance);
                skinPartsToRemove.shift();
                break;
            case InputCollectionModel_1.InputCollectionModel.TYPE_LIST:
                this.setUpSkinPart(this.list.lotusComponentInstance);
                head = skinPartsToRemove.slice(0, 1);
                tail = skinPartsToRemove.slice(1 + 1);
                skinPartsToRemove = head.concat(tail);
                break;
            case InputCollectionModel_1.InputCollectionModel.TYPE_RADIO_GROUP:
                this.setUpSkinPart(this.radioGroup.lotusComponentInstance);
                head = skinPartsToRemove.slice(0, 2);
                tail = skinPartsToRemove.slice(2 + 1);
                skinPartsToRemove = head.concat(tail);
                break;
            case InputCollectionModel_1.InputCollectionModel.TYPE_FILE:
                this.setUpSkinPart(this.file.lotusComponentInstance);
                skinPartsToRemove.pop();
        }
        for (var i = 0; i < skinPartsToRemove.length; i++) {
            this.removeSkinPart(skinPartsToRemove[i], skinPartsToRemove[i].parentElement);
        }
    };
    FormItemView.prototype.setUpSkinPart = function (part) {
        this._activeSkinPart = part;
        if (part.ready) {
            this.setComponentModel(this.model, part);
        }
        else {
            part.addEventListener(ComponentEvent_1.ComponentEvent.READY, this, 'onItemDetailReady');
        }
    };
    FormItemView.prototype.setComponentModel = function (value, component) {
        if (value) {
            switch (value.type) {
                case InputCollectionModel_1.InputCollectionModel.TYPE_INPUT:
                    component.model = value.collection.getItemAt(0);
                    break;
                case InputCollectionModel_1.InputCollectionModel.TYPE_FILE:
                    component.model = value.collection.getItemAt(0);
                    break;
                case InputCollectionModel_1.InputCollectionModel.TYPE_LIST:
                    component.model = value.collection;
                    break;
                case InputCollectionModel_1.InputCollectionModel.TYPE_RADIO_GROUP:
                    component.model = value.collection;
                    break;
            }
            //bind validation
            this.binder.bind(value, 'isValid', component, 'isValid');
        }
    };
    FormItemView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('input', this, 'input'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('list', this, 'list'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('radioGroup', this, 'radioGroup'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('file', this, 'file'));
    };
    FormItemView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
    };
    FormItemView.prototype.onItemDetailReady = function (event) {
        this.setComponentModel(this.model, event.payload['target']);
        event.payload['target'].removeEventListener(ComponentEvent_1.ComponentEvent.READY, this, 'onItemDetailReady');
    };
    FormItemView.prototype.onReady = function () {
        _super.prototype.onReady.call(this);
        this.setUpSkinParts();
    };
    FormItemView.prototype.onModelChange = function (value) {
        _super.prototype.onModelChange.call(this, value);
        if (!value) {
            return;
        }
        this.binder.bind(value, 'isValid', this, 'isValid');
        this.setUpSkinParts();
    };
    FormItemView.prototype.destroy = function () {
        if (this.input) {
            this.input.lotusComponentInstance.destroy();
        }
        if (this.file) {
            this.file.lotusComponentInstance.destroy();
        }
        if (this.list) {
            this.list.lotusComponentInstance.destroy();
        }
        if (this.radioGroup) {
            this.list.lotusComponentInstance.destroy();
        }
        _super.prototype.destroy.call(this);
        this._activeSkinPart = null;
        this.input = null;
        this.file = null;
        this.list = null;
        this.radioGroup = null;
    };
    return FormItemView;
}(AbstractItemView_1.AbstractItemView));
exports.FormItemView = FormItemView;
//# sourceMappingURL=FormItemView.js.map