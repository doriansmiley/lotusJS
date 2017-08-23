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
 * Created by dsmiley on 8/4/17.
 */
var lib_1 = require("../../node_modules/lavenderjs/lib");
var lib_2 = require("../../node_modules/lavenderjs/lib");
var AbstractComponent_1 = require("./AbstractComponent");
var SkinPart_1 = require("./SkinPart");
var ItemViewEvent_1 = require("../control/events/ItemViewEvent");
var AbstractCollectionView = (function (_super) {
    __extends(AbstractCollectionView, _super);
    function AbstractCollectionView() {
        var _this = _super.call(this) || this;
        _this._childViews = new lib_1.ArrayList();
        return _this;
    }
    Object.defineProperty(AbstractCollectionView.prototype, "collectionContainer", {
        get: function () {
            return this._collectionContainer;
        },
        set: function (value) {
            this._collectionContainer = value;
            this.notify(value, 'collectionContainer');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCollectionView.prototype, "itemTemplate", {
        get: function () {
            return this._itemTemplate;
        },
        set: function (value) {
            this._itemTemplate = value;
            this.notify(value, 'itemTemplate');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCollectionView.prototype, "selectedItem", {
        get: function () {
            return this._selectedItem;
        },
        set: function (value) {
            this._selectedItem = value;
            this.notify(value, 'selectedItem');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCollectionView.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (value) {
            this.removeCollectionEventListeners(); //must occur first
            this._collection = value;
            this.addCollectionEventListeners(); //must occur after line above
            this.notify(value, 'collection');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCollectionView.prototype, "childViews", {
        get: function () {
            return this._childViews;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCollectionView.prototype, "itemView", {
        get: function () {
            return this._itemView;
        },
        set: function (value) {
            this._itemView = value;
            this.notify(value, 'itemView');
        },
        enumerable: true,
        configurable: true
    });
    AbstractCollectionView.prototype.destroyChildViews = function () {
        for (var i = 0; i < this.childViews.length; i++) {
            this.removeChildView(this.childViews.getItemAt(i));
        }
        if (this.collectionContainer !== null && this.collectionContainer !== undefined) {
            while (this.collectionContainer.firstChild) {
                this.collectionContainer.removeChild(this.collectionContainer.firstChild);
            }
        }
        else {
            //remove child nodes
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        }
        this._childViews = null;
    };
    AbstractCollectionView.prototype.addCollectionEventListeners = function () {
        if (this.collection !== null && this.collection !== undefined) {
            this.collection.addEventListener(lib_2.CollectionEvent.COLLECTION_CHANGE, this, 'onCollectionChange');
        }
    };
    AbstractCollectionView.prototype.removeCollectionEventListeners = function () {
        if (this.collection !== null && this.collection !== undefined) {
            this.collection.removeEventListener(lib_2.CollectionEvent.COLLECTION_CHANGE, this, 'onCollectionChange');
        }
    };
    AbstractCollectionView.prototype.onCollectionChange = function (event) {
        switch (event.payload['type']) {
            case 'add':
                this.addChildView(event.payload['item']);
                break;
            case 'remove':
                this.removeChildViewFromModel(event.payload['item']);
                break;
            case 'removeAll':
                this.removeAllChildViews();
                break;
        }
    };
    AbstractCollectionView.prototype.createChildView = function (model) {
        var evalClass = eval(this.itemView);
        return new evalClass();
    };
    AbstractCollectionView.prototype.addChildView = function (model) {
        var view = this.createChildView(model);
        //clone the view
        var clone = this.itemTemplate.cloneNode(true);
        view.model = model;
        view.element = clone;
        view.init();
        this.childViews.addItem(view);
        if (this.collectionContainer !== null && this.collectionContainer !== undefined) {
            this.collectionContainer.appendChild(view.element);
        }
        else {
            this.element.appendChild(view.element);
        }
        this.addViewEventListeners(view);
    };
    AbstractCollectionView.prototype.addViewEventListeners = function (view) {
        view.addEventListener(ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED, this, 'onItemSelectedDeselect');
        view.addEventListener(ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED, this, 'onItemSelectedDeselect');
        view.addEventListener(ItemViewEvent_1.ItemViewEvent.REMOVE_ITEM, this, 'onItemRemove');
    };
    AbstractCollectionView.prototype.removeViewEventListeners = function (view) {
        view.removeEventListener(ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED, this, 'onItemSelectedDeselect');
        view.removeEventListener(ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED, this, 'onItemSelectedDeselect');
        view.removeEventListener(ItemViewEvent_1.ItemViewEvent.REMOVE_ITEM, this, 'onItemRemove');
    };
    AbstractCollectionView.prototype.onItemSelectedDeselect = function (event) {
        if (this.selectedItem !== null && this.selectedItem !== undefined && this.selectedItem != event.payload['item']) {
            this.selectedItem.resetState();
        }
        this.selectedItem = (event.type == ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED) ? event.payload['item'] : null;
    };
    AbstractCollectionView.prototype.onItemRemove = function (event) {
        var index = this.collection.indexOf(event.payload['item'].model);
        if (index >= 0) {
            this.collection.removeItemAt(index);
        }
    };
    //IMPORTANT: this is a convience method for manual population only, do not bind it to a collection models collection change event as the add event is also fired
    AbstractCollectionView.prototype.addAllChildViews = function (models) {
        for (var i = 0; i < models.length; i++) {
            this.addChildView(models[i]);
        }
    };
    AbstractCollectionView.prototype.removeAllChildViews = function () {
        for (var i = this.childViews.length - 1; i >= 0; i--) {
            this.removeChildView(this.childViews.getItemAt(i));
        }
    };
    AbstractCollectionView.prototype.removeChildView = function (view) {
        this.removeViewEventListeners(view);
        this.removeElement(view.element);
        view.destroy();
        this.childViews.removeItemAt(this.childViews.indexOf(view));
    };
    AbstractCollectionView.prototype.removeElement = function (element) {
        if (this.collectionContainer !== null && this.collectionContainer !== undefined) {
            this.collectionContainer.removeChild(element);
        }
        else {
            this.element.removeChild(element);
        }
    };
    AbstractCollectionView.prototype.removeChildViewFromModel = function (model) {
        //get the view associated with the model
        for (var i = 0; i < this.childViews.length; i++) {
            if (this.childViews.getItemAt(i).model == model) {
                this.removeChildView(this.childViews.getItemAt(i));
                break;
            }
        }
    };
    AbstractCollectionView.prototype.initCollection = function () {
        //assign a default collection if it has not already been set
        if (this.collection === null || this.collection === undefined) {
            this.collection = this.getCollection();
        }
    };
    AbstractCollectionView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.initCollection();
        this.render();
    };
    AbstractCollectionView.prototype.render = function () {
        if (this.itemView === null || this.itemView == undefined) {
            throw Error('data-attribute-item-view must be defined on the tag instance and point to a valid constructor');
        }
        for (var i = 0; i < this.collection.length; i++) {
            this.addChildView(this.collection.getItemAt(i));
        }
    };
    AbstractCollectionView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('collectionContainer', this, 'collectionContainer'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('itemTemplate', this, 'itemTemplate'));
    };
    AbstractCollectionView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            //required, defines the layout for child views
            case 'itemTemplate':
                element.parentNode.removeChild(element); //remove from the view
                break;
        }
    };
    AbstractCollectionView.prototype.getCollection = function () {
        return new lib_1.ArrayList();
    };
    AbstractCollectionView.prototype.destroy = function () {
        this.destroyChildViews();
        _super.prototype.destroy.call(this);
        this.collection = null;
        this.itemView = null;
        this.collectionContainer = null;
        this.itemTemplate = null;
        this.selectedItem = null;
    };
    return AbstractCollectionView;
}(AbstractComponent_1.AbstractComponent));
exports.AbstractCollectionView = AbstractCollectionView;
//# sourceMappingURL=AbstractCollectionView.js.map