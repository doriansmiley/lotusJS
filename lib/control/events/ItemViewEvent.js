"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 7/31/17.
 */
const Lavender = require("lavenderjs/lib");
class ItemViewEvent extends Lavender.AbstractEvent {
    constructor(type, payload) {
        super(type, payload);
        if (type == ItemViewEvent.ITEM_SELECTED && (!payload.hasOwnProperty('item') || payload['item'] === null || payload['item'] === undefined)) {
            throw new Error('Lotus.ItemViewEvent payload.item is required');
        }
    }
    clone(type, payload) {
        return new ItemViewEvent(this.type, this.payload);
    }
}
ItemViewEvent.ITEM_SELECTED = 'itemViewItemSelected';
ItemViewEvent.ITEM_DESELECTED = 'itemViewItemDeselected';
ItemViewEvent.REMOVE_ITEM = 'itemViewRemoveItem';
exports.ItemViewEvent = ItemViewEvent;
//# sourceMappingURL=ItemViewEvent.js.map