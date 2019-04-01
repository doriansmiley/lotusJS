"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 8/4/17.
 */
const Lavender = require("lavenderjs/lib");
const AbstractComponent_1 = require("./AbstractComponent");
const SkinPart_1 = require("./SkinPart");
const ItemViewEvent_1 = require("../control/events/ItemViewEvent");
class AbstractCollectionView extends AbstractComponent_1.AbstractComponent {
    constructor() {
        super();
        this._childViews = new Lavender.ArrayList();
    }
    get collectionContainer() {
        return this._collectionContainer;
    }
    set collectionContainer(value) {
        this._collectionContainer = value;
        this.notify(value, 'collectionContainer');
    }
    get itemTemplate() {
        return this._itemTemplate;
    }
    set itemTemplate(value) {
        this._itemTemplate = value;
        this.notify(value, 'itemTemplate');
    }
    get selectedItem() {
        return this._selectedItem;
    }
    set selectedItem(value) {
        this._selectedItem = value;
        this.notify(value, 'selectedItem');
    }
    get collection() {
        return this._collection;
    }
    set collection(value) {
        this.removeCollectionEventListeners(); //must occur first
        this._collection = value;
        if (value) {
            this.addCollectionEventListeners();
        } //must occur after line above
        this.notify(value, 'collection');
        //render the view as long as there are items in the collection
        if (value && this.ready) {
            this.render();
        }
    }
    get childViews() {
        return this._childViews;
    }
    get itemView() {
        return this._itemView;
    }
    set itemView(value) {
        this._itemView = value;
        this.notify(value, 'itemView');
    }
    destroyChildViews() {
        this.removeAllChildViews();
        if (this.collectionContainer !== null && this.collectionContainer !== undefined) {
            while (this.collectionContainer.firstChild) {
                this.collectionContainer.removeChild(this.collectionContainer.firstChild);
            }
        }
        else if (this.element) {
            //remove child nodes
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        }
        this._childViews = null;
    }
    addCollectionEventListeners() {
        if (this.collection !== null && this.collection !== undefined) {
            this.collection.addEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'onCollectionChange');
        }
    }
    removeCollectionEventListeners() {
        if (this.collection !== null && this.collection !== undefined) {
            this.collection.removeEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'onCollectionChange');
        }
    }
    onCollectionChange(event) {
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
    }
    //override point
    createChildView(model) {
        let evalClass = eval(this.itemView);
        return new evalClass();
    }
    //override point
    cloneItemTemplate(model) {
        return this.itemTemplate.cloneNode(true);
    }
    //override point for objects that require manipulation of the model such as implementation of adapter pattern
    getModel(model) {
        return model;
    }
    addChildView(model) {
        let view = this.createChildView(model);
        //clone the view
        let clone = this.cloneItemTemplate(model);
        view.model = this.getModel(model);
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
        //set the selected item from the model
        //this allows data models to drive the selected item when they are assigned, or a new item added
        if (view.model['selected']) {
            this.onItemSelectedDeselect(new ItemViewEvent_1.ItemViewEvent(ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED, { item: view }));
        }
    }
    addViewEventListeners(view) {
        view.addEventListener(ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED, this, 'onItemSelectedDeselect');
        view.addEventListener(ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED, this, 'onItemSelectedDeselect');
        view.addEventListener(ItemViewEvent_1.ItemViewEvent.REMOVE_ITEM, this, 'onItemRemove');
    }
    removeViewEventListeners(view) {
        view.removeEventListener(ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED, this, 'onItemSelectedDeselect');
        view.removeEventListener(ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED, this, 'onItemSelectedDeselect');
        view.removeEventListener(ItemViewEvent_1.ItemViewEvent.REMOVE_ITEM, this, 'onItemRemove');
    }
    onItemSelectedDeselect(event) {
        if (this.selectedItem !== null && this.selectedItem !== undefined && this.selectedItem != event.payload['item']) {
            this.selectedItem.resetState();
        }
        this.selectedItem = (event.type == ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED) ? event.payload['item'] : null;
    }
    onItemRemove(event) {
        let index = this.collection.indexOf(event.payload['item'].model);
        if (index >= 0) {
            this.collection.removeItemAt(index);
        }
    }
    //IMPORTANT: this is a convience method for manual population only, do not bind it to a collection models collection change event as the add event is also fired
    addAllChildViews(models) {
        for (let i = 0; i < models.length; i++) {
            this.addChildView(models[i]);
        }
    }
    removeAllChildViews() {
        if (!this.childViews) {
            return;
        }
        for (let i = this.childViews.length - 1; i >= 0; i--) {
            this.removeChildView(this.childViews.getItemAt(i));
        }
    }
    removeChildView(view) {
        this.removeViewEventListeners(view);
        this.removeElement(view.element);
        view.destroy();
        this.childViews.removeItemAt(this.childViews.indexOf(view));
    }
    removeElement(element) {
        if (this.collectionContainer !== null && this.collectionContainer !== undefined) {
            this.collectionContainer.removeChild(element);
        }
        else {
            this.element.removeChild(element);
        }
    }
    removeChildViewFromModel(model) {
        //get the view associated with the model
        for (let i = 0; i < this.childViews.length; i++) {
            if (this.childViews.getItemAt(i).model == model) {
                this.removeChildView(this.childViews.getItemAt(i));
                break;
            }
        }
    }
    initCollection() {
        //assign a default collection if it has not already been set
        if (this.collection === null || this.collection === undefined) {
            this.collection = this.getCollection();
        }
    }
    refreshView(value) {
        //stub for override
    }
    //override point
    validateViewsFunctions() {
        if (this.itemView === null || this.itemView == undefined) {
            throw Error('data-attribute-item-view must be defined on the tag instance and point to a valid constructor');
        }
    }
    setSelectedItem(model) {
        //since this can be used as a bindable end point make sure recursion does not occur
        if (this.selectedItem && this.selectedItem.model == model) {
            return;
        }
        for (let i = 0; i < this.childViews.length; i++) {
            if (this.childViews.getItemAt(i).model == model) {
                //set the selected item
                this.onItemSelectedDeselect(new ItemViewEvent_1.ItemViewEvent(ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED, { item: this.childViews.getItemAt(i) }));
                //refresh the view
                if (this.selectedItem) {
                    this.refreshView(model['value']);
                }
                break;
            }
        }
    }
    init() {
        super.init();
        this.initCollection();
        this.render();
    }
    render() {
        this.validateViewsFunctions();
        this.removeAllChildViews();
        for (let i = 0; i < this.collection.length; i++) {
            this.addChildView(this.collection.getItemAt(i));
        }
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('collectionContainer', this, 'collectionContainer'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('itemTemplate', this, 'itemTemplate'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            //required, defines the layout for child views
            case 'itemTemplate':
                element.parentNode.removeChild(element); //remove from the view
                break;
        }
    }
    getCollection() {
        return new Lavender.ArrayList();
    }
    destroy() {
        this.destroyChildViews();
        super.destroy();
        this.collection = null;
        this.itemView = null;
        this.collectionContainer = null;
        this.itemTemplate = null;
        this.selectedItem = null;
    }
}
exports.AbstractCollectionView = AbstractCollectionView;
//# sourceMappingURL=AbstractCollectionView.js.map