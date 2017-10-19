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
 * Created by dsmiley on 9/22/17.
 */
var AbstractInputCollectionView_1 = require("./AbstractInputCollectionView");
var SkinPart_1 = require("./SkinPart");
var ListCollectionView = (function (_super) {
    __extends(ListCollectionView, _super);
    function ListCollectionView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ListCollectionView.prototype, "prompt", {
        get: function () {
            return this._prompt;
        },
        set: function (value) {
            this._prompt = value;
            this.notify(value, 'prompt');
        },
        enumerable: true,
        configurable: true
    });
    ListCollectionView.prototype.onChange = function (event) {
        //account for the existence of the prompt which adds an additional list item! this offset the index in this.childViews which does not include the prompt.
        var index = (this.prompt) ? event.target.selectedIndex - 1 : event.target.selectedIndex;
        if (index < 0) {
            return; //prompt is selected
        }
        //get the associated item view for the selected list item
        var itemView = this.childViews.getItemAt(index);
        //html option elements appear to not dispatch,or at least not bubble the click event on list items
        //so we force it here
        itemView.onClick();
    };
    ListCollectionView.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        this.collectionContainer.addEventListener('change', this.onChange.bind(this));
    };
    ListCollectionView.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        this.collectionContainer.removeEventListener('change', this.onChange);
    };
    ListCollectionView.prototype.addPrompt = function () {
        if (this.prompt && this.model && this.model.label) {
            this.prompt.innerHTML = this.model.label;
        }
    };
    ListCollectionView.prototype.addCollectionEventListeners = function () {
        _super.prototype.addCollectionEventListeners.call(this);
        this.addPrompt();
    };
    ListCollectionView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('prompt', this, 'prompt'));
    };
    ListCollectionView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            //required, defines the layout for child views
            case 'collectionContainer':
                this.addEventListeners();
                break;
            case 'prompt':
                this.addPrompt();
                break;
        }
    };
    ListCollectionView.prototype.refreshView = function (value) {
        if (this.collectionContainer) {
            this.collectionContainer.value = value;
        }
        if (this.selectedItem && !this.selectedItem.element['selected']) {
            this.selectedItem.element['selected'] = true;
        }
    };
    ListCollectionView.prototype.destroy = function () {
        this.removeEventListeners();
        _super.prototype.destroy.call(this);
        this.prompt = null;
    };
    return ListCollectionView;
}(AbstractInputCollectionView_1.AbstractInputCollectionView));
exports.ListCollectionView = ListCollectionView;
//# sourceMappingURL=ListCollectionView.js.map