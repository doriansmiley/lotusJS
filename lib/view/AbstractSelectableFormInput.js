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
 * Created by dsmiley on 10/5/17.
 */
var AbstractItemView_1 = require("./AbstractItemView");
var InputModel_1 = require("../model/form/InputModel");
var ItemViewEvent_1 = require("../control/events/ItemViewEvent");
var AbstractSelectableFormInput = (function (_super) {
    __extends(AbstractSelectableFormInput, _super);
    function AbstractSelectableFormInput() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AbstractSelectableFormInput.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            this.refreshView(value);
            this.notify(value, 'selected');
            var eventType = (this.selected) ? ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED : ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED;
            //dispatch event to notify view that the layout was selected/or deselected
            this.dispatch(new ItemViewEvent_1.ItemViewEvent(eventType, { item: this }));
        },
        enumerable: true,
        configurable: true
    });
    //stub for override
    AbstractSelectableFormInput.prototype.refreshView = function (selected) {
    };
    //called when anewitemis clickedbythe end user in a collection view
    //this is called to reset the state of the currently selected item
    AbstractSelectableFormInput.prototype.resetState = function () {
        this.selected = false;
    };
    AbstractSelectableFormInput.prototype.onModelChange = function (value) {
        _super.prototype.onModelChange.call(this, value);
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
    };
    return AbstractSelectableFormInput;
}(AbstractItemView_1.AbstractItemView));
exports.AbstractSelectableFormInput = AbstractSelectableFormInput;
//# sourceMappingURL=AbstractSelectableFormInput.js.map