"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/22/17.
 */
const AbstractInputCollectionView_1 = require("./AbstractInputCollectionView");
const SkinPart_1 = require("./SkinPart");
class RadioCollectionView extends AbstractInputCollectionView_1.AbstractInputCollectionView {
    constructor() {
        super();
    }
    get legend() {
        return this._legend;
    }
    set legend(value) {
        this._legend = value;
        this.notify(value, 'legend');
    }
    refreshView(value) {
        if (this.selectedItem) {
            this.selectedItem.element['checked'] = true;
        }
    }
    addCollectionEventListeners() {
        super.addCollectionEventListeners();
        this.setLegend();
    }
    setLegend() {
        if (this.legend && this.model && this.model.label) {
            this.legend.innerHTML = this.model.label;
        }
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('legend', this, 'legend'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'label': {
                this.setLegend();
                break;
            }
        }
    }
    destroy() {
        super.destroy();
        this.legend = null;
    }
}
exports.RadioCollectionView = RadioCollectionView;
//# sourceMappingURL=RadioCollectionView.js.map