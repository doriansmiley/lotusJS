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
var ItemViewEvent_1 = require("../control/events/ItemViewEvent");
var InputEvent_1 = require("../control/events/InputEvent");
var AbstractCollectionView_1 = require("./AbstractCollectionView");
var ListCollectionView = (function (_super) {
    __extends(ListCollectionView, _super);
    function ListCollectionView() {
        return _super.call(this) || this;
    }
    ListCollectionView.prototype.onChange = function (event) {
        //get the associated item view for the selected list item
        var itemView = this.childViews.getItemAt(event.target.selectedIndex);
        console.log('Lotus.List.prototype.onChange: input value is ' + itemView.element['value']);
        console.log('Lotus.List.prototype.onChange: my id is ' + this.id);
        //set selected item view
        this.dispatch(new InputEvent_1.InputEvent(InputEvent_1.InputEvent.CHANGE, { target: this.collectionContainer, originalEvent: event }));
        //set the selected item
        this.onItemSelectedDeselect(new ItemViewEvent_1.ItemViewEvent(ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED, { item: itemView }));
        console.log('Lotus.List.prototype.onChange: selected item is ' + itemView);
    };
    //(event.target as HTMLSelectElement).options[(event.target as HTMLSelectElement).selectedIndex].value
    ListCollectionView.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        this.collectionContainer.addEventListener('change', this.onChange.bind(this));
    };
    ListCollectionView.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        this.collectionContainer.removeEventListener('change', this.onChange);
    };
    ListCollectionView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            //required, defines the layout for child views
            case 'collectionContainer':
                this.addEventListeners();
                break;
        }
    };
    ListCollectionView.prototype.destroy = function () {
        this.removeEventListeners();
        _super.prototype.destroy.call(this);
    };
    return ListCollectionView;
}(AbstractCollectionView_1.AbstractCollectionView));
exports.ListCollectionView = ListCollectionView;
//# sourceMappingURL=ListCollectionView.js.map