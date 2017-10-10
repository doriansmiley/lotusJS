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
var InputEvent_1 = require("../control/events/InputEvent");
var AbstractCollectionView_1 = require("./AbstractCollectionView");
var RadioCollectionView = (function (_super) {
    __extends(RadioCollectionView, _super);
    function RadioCollectionView() {
        return _super.call(this) || this;
    }
    RadioCollectionView.prototype.onItemSelectedDeselect = function (event) {
        var dispatchChange = (this.selectedItem != event.payload['item']);
        _super.prototype.onItemSelectedDeselect.call(this, event);
        //if the selected item has changed dispatch input change event
        if (dispatchChange) {
            this.dispatch(new InputEvent_1.InputEvent(InputEvent_1.InputEvent.CHANGE, { target: this.selectedItem, originalEvent: event }));
        }
    };
    RadioCollectionView.prototype.refreshView = function (value) {
        this.selectedItem.element['checked'] = true;
    };
    return RadioCollectionView;
}(AbstractCollectionView_1.AbstractCollectionView));
exports.RadioCollectionView = RadioCollectionView;
//# sourceMappingURL=RadioCollectionView.js.map