"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 10/5/17.
 */
const AbstractItemView_1 = require("./AbstractItemView");
const InputModel_1 = require("../model/form/InputModel");
const ItemViewEvent_1 = require("../control/events/ItemViewEvent");
class AbstractSelectableFormInput extends AbstractItemView_1.AbstractItemView {
    constructor() {
        super();
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this.refreshView(value);
        this.notify(value, 'selected');
        let eventType = (this.selected) ? ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED : ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED;
        //dispatch event to notify view that the layout was selected/or deselected
        this.dispatch(new ItemViewEvent_1.ItemViewEvent(eventType, { item: this }));
    }
    //stub for override
    refreshView(selected) {
    }
    //called when anewitemis clickedbythe end user in a collection view
    //this is called to reset the state of the currently selected item
    resetState() {
        this.selected = false;
    }
    onModelChange(value) {
        super.onModelChange(value);
        if (value && value instanceof InputModel_1.InputModel) {
            //set initial value
            this.selected = value.selected;
            //set up two way bindings
            this.binder.bind(value, 'selected', this, 'selected');
            this.binder.bind(this, 'selected', value, 'selected');
        }
        else if (value && value['selected']) {
            this.selected = value['selected'];
        }
    }
}
exports.AbstractSelectableFormInput = AbstractSelectableFormInput;
//# sourceMappingURL=AbstractSelectableFormInput.js.map