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
 * Created by dsmiley on 7/31/17.
 */
var Lavender = require("lavenderjs/lib");
var ItemViewEvent = (function (_super) {
    __extends(ItemViewEvent, _super);
    function ItemViewEvent(type, payload) {
        var _this = _super.call(this, type, payload) || this;
        if (type == ItemViewEvent.ITEM_SELECTED && (!payload.hasOwnProperty('item') || payload['item'] === null || payload['item'] === undefined)) {
            throw new Error('Lotus.ItemViewEvent payload.item is required');
        }
        return _this;
    }
    ItemViewEvent.prototype.clone = function (type, payload) {
        return new ItemViewEvent(this.type, this.payload);
    };
    ItemViewEvent.ITEM_SELECTED = 'itemViewItemSelected';
    ItemViewEvent.ITEM_DESELECTED = 'itemViewItemDeselected';
    ItemViewEvent.REMOVE_ITEM = 'itemViewRemoveItem';
    return ItemViewEvent;
}(Lavender.AbstractEvent));
exports.ItemViewEvent = ItemViewEvent;
//# sourceMappingURL=ItemViewEvent.js.map