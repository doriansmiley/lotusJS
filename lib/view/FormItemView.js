"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractItemView_1 = require("./AbstractItemView");
const InputCollectionModel_1 = require("../model/form/InputCollectionModel");
const SkinPart_1 = require("./SkinPart");
const ComponentEvent_1 = require("../control/events/ComponentEvent");
/**
 * Created by dsmiley on 10/12/17.
 */
class FormItemView extends AbstractItemView_1.AbstractItemView {
    //read only!
    get activeSkinPart() {
        return this._activeSkinPart;
    }
    get input() {
        return this._input;
    }
    set input(value) {
        this._input = value;
        this.notify(value, 'input');
    }
    get list() {
        return this._list;
    }
    set list(value) {
        this._list = value;
        this.notify(value, 'list');
    }
    get radioGroup() {
        return this._radioGroup;
    }
    set radioGroup(value) {
        this._radioGroup = value;
        this.notify(value, 'radioGroup');
    }
    get file() {
        return this._file;
    }
    set file(value) {
        this._file = value;
        this.notify(value, 'file');
    }
    removeSkinPart(element, parent) {
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
    }
    setUpSkinParts() {
        if (!this.ready || !this.model) {
            return;
        }
        let skinPartsToRemove = [
            this.input,
            this.list,
            this.radioGroup,
            this.file
        ];
        //set up the required skin part and remove it from the list of skin parts to remove
        //only one of these skin parts can stay
        let head;
        let tail;
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
        for (let i = 0; i < skinPartsToRemove.length; i++) {
            this.removeSkinPart(skinPartsToRemove[i], skinPartsToRemove[i].parentElement);
        }
    }
    setUpSkinPart(part) {
        this._activeSkinPart = part;
        if (part.ready) {
            this.setComponentModel(this.model, part);
        }
        else {
            part.addEventListener(ComponentEvent_1.ComponentEvent.READY, this, 'onItemDetailReady');
        }
    }
    setComponentModel(value, component) {
        if (value) {
            switch (value.type) {
                case InputCollectionModel_1.InputCollectionModel.TYPE_INPUT:
                    component.model = value.collection.getItemAt(0);
                    break;
                case InputCollectionModel_1.InputCollectionModel.TYPE_FILE:
                    component.model = value.collection.getItemAt(0);
                    break;
                case InputCollectionModel_1.InputCollectionModel.TYPE_LIST:
                    component.model = value;
                    break;
                case InputCollectionModel_1.InputCollectionModel.TYPE_RADIO_GROUP:
                    component.model = value;
                    break;
            }
            //bind validation
            this.binder.bind(value, 'isValid', component, 'isValid');
            //set intital isValid value for component
            component.isValid = value.isValid;
        }
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('input', this, 'input'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('list', this, 'list'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('radioGroup', this, 'radioGroup'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('file', this, 'file'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        if (this.input && this.radioGroup && this.file && this.list && this.model) {
            //we have to call this here because only the component map calls onReady, but item views are not mapped to tags, so the map will never call it
            this.onReady();
        }
    }
    onItemDetailReady(event) {
        this.setComponentModel(this.model, event.payload['target']);
        event.payload['target'].removeEventListener(ComponentEvent_1.ComponentEvent.READY, this, 'onItemDetailReady');
    }
    onReady() {
        super.onReady();
        this.setUpSkinParts();
    }
    onModelChange(value) {
        super.onModelChange(value);
        if (!value) {
            return;
        }
        this.binder.bind(value, 'isValid', this, 'isValid');
        //set initial valid value
        this.isValid = value.isValid;
        this.setUpSkinParts();
    }
    destroy() {
        super.destroy();
        this.activeSkinPart.destroy();
        this._activeSkinPart = null;
        this.input = null;
        this.file = null;
        this.list = null;
        this.radioGroup = null;
    }
}
exports.FormItemView = FormItemView;
//# sourceMappingURL=FormItemView.js.map