"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/22/17.
 */
const AbstractInputCollectionView_1 = require("./AbstractInputCollectionView");
const SkinPart_1 = require("./SkinPart");
class ListCollectionView extends AbstractInputCollectionView_1.AbstractInputCollectionView {
    constructor() {
        super();
    }
    get prompt() {
        return this._prompt;
    }
    set prompt(value) {
        this._prompt = value;
        this.notify(value, 'prompt');
    }
    onChange(event) {
        //account for the existence of the prompt which adds an additional list item! this offset the index in this.childViews which does not include the prompt.
        let index = (this.prompt) ? event.target.selectedIndex - 1 : event.target.selectedIndex;
        if (index < 0) {
            return; //prompt is selected
        }
        //get the associated item view for the selected list item
        let itemView = this.childViews.getItemAt(index);
        //html option elements appear to not dispatch,or at least not bubble the click event on list items
        //so we force it here
        itemView.onClick();
    }
    addEventListeners() {
        super.addEventListeners();
        this.collectionContainer.addEventListener('change', this.onChange.bind(this));
    }
    removeEventListeners() {
        super.removeEventListeners();
        this.collectionContainer.removeEventListener('change', this.onChange);
    }
    addPrompt() {
        if (this.prompt && this.model && this.model.label) {
            this.prompt.innerHTML = this.model.label;
        }
    }
    addCollectionEventListeners() {
        super.addCollectionEventListeners();
        this.addPrompt();
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('prompt', this, 'prompt'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            //required, defines the layout for child views
            case 'collectionContainer':
                this.addEventListeners();
                break;
            case 'prompt':
                this.addPrompt();
                break;
        }
    }
    refreshView(value) {
        if (this.collectionContainer) {
            this.collectionContainer.value = value;
        }
        if (this.selectedItem && !this.selectedItem.element['selected']) {
            this.selectedItem.element['selected'] = true;
        }
    }
    destroy() {
        this.removeEventListeners();
        super.destroy();
        this.prompt = null;
    }
}
exports.ListCollectionView = ListCollectionView;
//# sourceMappingURL=ListCollectionView.js.map