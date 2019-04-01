"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCollectionView_1 = require("./AbstractCollectionView");
const InputEvent_1 = require("../control/events/InputEvent");
/**
 * Created by dsmiley on 10/5/17.
 */
class AbstractInputCollectionView extends AbstractCollectionView_1.AbstractCollectionView {
    get model() {
        return this._model;
    }
    set model(value) {
        this._model = value;
        this.notify(value, 'model');
        if (this.model) {
            this.collection = this.model.collection;
        }
    }
    //add the invalid/valid class after validation. This method id typically called as part of a data binding on this.isValid
    attachValidationClass(classToAdd, classToRemove) {
        if (this.collectionContainer) {
            this.collectionContainer.classList.remove(classToRemove);
            this.collectionContainer.classList.add(classToAdd);
        }
    }
    onItemSelectedDeselect(event) {
        let dispatchChange = (this.selectedItem != event.payload['item']);
        super.onItemSelectedDeselect(event);
        //if the selected item has changed dispatch input change event
        if (dispatchChange) {
            this.dispatch(new InputEvent_1.InputEvent(InputEvent_1.InputEvent.CHANGE, { target: this, selectedItem: this.selectedItem, originalEvent: event }));
        }
    }
    destroy() {
        super.destroy();
        if (this.model) {
            this.model.destroy();
        }
        this.model = null;
    }
}
exports.AbstractInputCollectionView = AbstractInputCollectionView;
//# sourceMappingURL=AbstractInputCollectionView.js.map