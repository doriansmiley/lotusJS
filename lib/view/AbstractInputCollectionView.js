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
var AbstractCollectionView_1 = require("./AbstractCollectionView");
var InputEvent_1 = require("../control/events/InputEvent");
/**
 * Created by dsmiley on 10/5/17.
 */
var AbstractInputCollectionView = (function (_super) {
    __extends(AbstractInputCollectionView, _super);
    function AbstractInputCollectionView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AbstractInputCollectionView.prototype, "model", {
        get: function () {
            return this._model;
        },
        set: function (value) {
            this._model = value;
            this.notify(value, 'model');
            if (this.model) {
                this.collection = this.model.collection;
            }
        },
        enumerable: true,
        configurable: true
    });
    //add the invalid/valid class after validation. This method id typically called as part of a data binding on this.isValid
    AbstractInputCollectionView.prototype.attachValidationClass = function (classToAdd, classToRemove) {
        if (this.collectionContainer) {
            this.collectionContainer.classList.remove(classToRemove);
            this.collectionContainer.classList.add(classToAdd);
        }
    };
    AbstractInputCollectionView.prototype.onItemSelectedDeselect = function (event) {
        var dispatchChange = (this.selectedItem != event.payload['item']);
        _super.prototype.onItemSelectedDeselect.call(this, event);
        //if the selected item has changed dispatch input change event
        if (dispatchChange) {
            this.dispatch(new InputEvent_1.InputEvent(InputEvent_1.InputEvent.CHANGE, { target: this.selectedItem, originalEvent: event }));
        }
    };
    return AbstractInputCollectionView;
}(AbstractCollectionView_1.AbstractCollectionView));
exports.AbstractInputCollectionView = AbstractInputCollectionView;
//# sourceMappingURL=AbstractInputCollectionView.js.map