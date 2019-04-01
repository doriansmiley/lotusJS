"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/22/17.
 */
const AbstractSelectableFormInput_1 = require("./AbstractSelectableFormInput");
const SkinPart_1 = require("./SkinPart");
class ListItemView extends AbstractSelectableFormInput_1.AbstractSelectableFormInput {
    constructor() {
        super();
    }
    get option() {
        return this._option;
    }
    set option(value) {
        this._option = value;
    }
    refreshView(selected) {
        if (this.option) {
            this.option.selected = selected;
        }
    }
    onClick(event) {
        this.selected = true;
    }
    addEventListeners() {
        super.addEventListeners();
        this.option.addEventListener('click', this.onClick.bind(this));
    }
    removeEventListeners() {
        super.removeEventListeners();
        if (this.option) {
            this.option.removeEventListener('click', this.onClick);
        }
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts. We use the term itemTemplate as it allows us to include this component as a nested component in a collection view.
        //Choosing another name would require it be wrapped in a itemTemplate skin part
        this.skinParts.addItem(new SkinPart_1.SkinPart('itemTemplate', this, 'option'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'itemTemplate':
                //set up listitem value and label
                this.option.value = (typeof this.model.value == 'object') ? JSON.stringify(this.model.value) : this.model.value;
                this.option.innerHTML = this.model.label;
                this.option.selected = this.selected;
                if (this.selected) {
                    this.onClick();
                }
                break;
        }
    }
    destroy() {
        super.destroy();
        this.option = null;
    }
}
exports.ListItemView = ListItemView;
//# sourceMappingURL=ListItemView.js.map