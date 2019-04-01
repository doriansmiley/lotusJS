"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/22/17.
 */
const AbstractSelectableFormInput_1 = require("./AbstractSelectableFormInput");
const SkinPart_1 = require("./SkinPart");
class RadioItemView extends AbstractSelectableFormInput_1.AbstractSelectableFormInput {
    constructor() {
        super();
    }
    get radio() {
        return this._radio;
    }
    set radio(value) {
        this._radio = value;
    }
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
    onClick(event) {
        this.selected = this.radio.checked;
    }
    refreshView(selected) {
        if (this.radio) {
            this.radio.checked = selected;
        }
    }
    addEventListeners() {
        super.addEventListeners();
        this.radio.addEventListener('click', this.onClick.bind(this));
    }
    removeEventListeners() {
        super.removeEventListeners();
        if (this.radio) {
            this.radio.removeEventListener('click', this.onClick);
        }
    }
    defineSkinParts() {
        super.defineSkinParts();
        this.skinParts.addItem(new SkinPart_1.SkinPart('radio', this, 'radio'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('label', this, 'label'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'radio':
                //set up listitem value and label
                this.radio.value = (typeof this.model.value == 'object') ? JSON.stringify(this.model.value) : this.model.value;
                this.radio.name = this.model.name;
                this.radio.checked = this.selected;
                this.addEventListeners();
                break;
            case 'label':
                this.label.innerHTML = this.model.label;
                break;
        }
    }
    destroy() {
        super.destroy();
        this.removeEventListeners();
        this.radio = null;
        this.label = null;
    }
}
exports.RadioItemView = RadioItemView;
//# sourceMappingURL=RadioItemView.js.map