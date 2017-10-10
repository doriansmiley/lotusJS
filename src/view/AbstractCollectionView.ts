/**
 * Created by dsmiley on 8/4/17.
 */
import * as Lavender from 'lavenderjs/lib';
import {AbstractComponent} from "./AbstractComponent";
import {AbstractItemView} from "./AbstractItemView";
import {SkinPart} from "./SkinPart";
import {ItemViewEvent} from "../control/events/ItemViewEvent";
import {LotusHTMLElement} from "../context/LotusHTMLElement";

export class AbstractCollectionView extends AbstractComponent{
    private _collectionContainer:HTMLElement;
    private _itemTemplate:HTMLElement;
    private _selectedItem:AbstractItemView;
    private _collection:Lavender.IList;
    private _itemView:string;//IMPORTANT: this value must be defined on the tag
    private _childViews:Lavender.ArrayList = new Lavender.ArrayList();

    constructor(){
        super();
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

    get collection():Lavender.IList {
        return this._collection;
    }

    set collection(value) {
        this.removeCollectionEventListeners();//must occur first
        this._collection = value;
        if(value){
            this.addCollectionEventListeners();
        }//must occur after line above
        this.notify(value, 'collection');
        //render the view as long as there are items in the collection
        if(value && this.ready){
            this.render();
        }
    }

    get childViews():Lavender.ArrayList {
        return this._childViews;
    }

    get itemView() {
        return this._itemView;
    }

    set itemView(value) {
        this._itemView = value;
        this.notify(value, 'itemView');
    }

    protected destroyChildViews():void{
        for( let i=0; i < this.childViews.length; i++){
            this.removeChildView( this.childViews.getItemAt(i) );
        }
        if( this.collectionContainer !== null && this.collectionContainer !== undefined ){
            while (this.collectionContainer.firstChild) {
                this.collectionContainer.removeChild(this.collectionContainer.firstChild);
            }
        }else{
            //remove child nodes
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        }
        this._childViews = null;
    }

    protected addCollectionEventListeners():void{
        if( this.collection !== null && this.collection !== undefined ){
            this.collection.addEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'onCollectionChange');
        }
    }

    protected removeCollectionEventListeners():void{
        if( this.collection !== null && this.collection !== undefined ){
            this.collection.removeEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'onCollectionChange');
        }
    }

    protected onCollectionChange(event:Lavender.CollectionEvent):void{
        switch(event.payload['type']){
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

    protected createChildView(model:Object):AbstractItemView{
        let evalClass = eval(this.itemView);
        return new evalClass();
    }

    protected addChildView(model:Object):void{
        let view:AbstractItemView = this.createChildView( model );
        //clone the view
        let clone = this.itemTemplate.cloneNode(true);
        view.model = model;
        view.element = clone as LotusHTMLElement;
        view.init();
        this.childViews.addItem( view );
        if( this.collectionContainer !== null && this.collectionContainer !== undefined ){
            this.collectionContainer.appendChild(view.element);
        }else{
            this.element.appendChild(view.element);
        }
        this.addViewEventListeners( view );
    }

    protected addViewEventListeners(view:AbstractItemView):void{
        view.addEventListener(ItemViewEvent.ITEM_SELECTED, this, 'onItemSelectedDeselect');
        view.addEventListener(ItemViewEvent.ITEM_DESELECTED, this, 'onItemSelectedDeselect');
        view.addEventListener(ItemViewEvent.REMOVE_ITEM, this, 'onItemRemove');
    }

    protected removeViewEventListeners(view:AbstractItemView):void{
        view.removeEventListener(ItemViewEvent.ITEM_SELECTED, this, 'onItemSelectedDeselect');
        view.removeEventListener(ItemViewEvent.ITEM_DESELECTED, this, 'onItemSelectedDeselect');
        view.removeEventListener(ItemViewEvent.REMOVE_ITEM, this, 'onItemRemove');
    }

    protected onItemSelectedDeselect(event:ItemViewEvent):void{
        if( this.selectedItem !== null && this.selectedItem !== undefined && this.selectedItem != event.payload['item'] ){
            this.selectedItem.resetState();
        }
        this.selectedItem = ( event.type == ItemViewEvent.ITEM_SELECTED ) ? event.payload['item'] : null;
    }

    protected onItemRemove(event:ItemViewEvent):void{
        let index = this.collection.indexOf( event.payload['item'].model );
        if( index >= 0 ){
            this.collection.removeItemAt(index);
        }
    }

    //IMPORTANT: this is a convience method for manual population only, do not bind it to a collection models collection change event as the add event is also fired
    protected addAllChildViews(models:Lavender.IList):void{
        for( let i=0; i < models.length; i++ ){
            this.addChildView( models[i] );
        }
    }

    protected removeAllChildViews():void{
        if(!this.childViews){
            return;
        }
        for( let i=this.childViews.length-1; i >= 0; i--){
            this.removeChildView( this.childViews.getItemAt(i) );
        }
    }

    protected removeChildView(view:AbstractItemView):void{
        this.removeViewEventListeners( view );
        this.removeElement( view.element );
        view.destroy();
        this.childViews.removeItemAt( this.childViews.indexOf(view) );
    }

    protected removeElement(element:HTMLElement):void{
        if( this.collectionContainer !== null && this.collectionContainer !== undefined ){
            this.collectionContainer.removeChild(element);
        }else{
            this.element.removeChild(element);
        }
    }

    protected removeChildViewFromModel(model:Object):void{
        //get the view associated with the model
        for( let i=0; i < this.childViews.length; i++){
            if( this.childViews.getItemAt(i).model == model ){
                this.removeChildView( this.childViews.getItemAt(i) );
                break;
            }
        }
    }

    protected initCollection():void{
        //assign a default collection if it has not already been set
        if( this.collection === null || this.collection === undefined ){
            this.collection = this.getCollection();
        }
    }

    protected refreshView(value:any):void{
        //stub for override
    }

    public setSelectedItem(model:Object):void{
        //since this can be used as a bindable end point make sure recursion does not occur
        if(this.selectedItem && this.selectedItem.model == model){
            return;
        }
        for( let i=0; i < this.childViews.length; i++){
            if( this.childViews.getItemAt(i).model == model){
                //set the selected item
                this.onItemSelectedDeselect( new ItemViewEvent(ItemViewEvent.ITEM_SELECTED, {item:this.childViews.getItemAt(i)}) );
                //refresh the view
                if(this.selectedItem){
                    this.refreshView(model['value']);
                }
                break;
            }
        }
    }

    public init():void{
        super.init();
        this.initCollection();
        this.render();
    }

    public render():void{
        if( this.itemView === null || this.itemView == undefined ){
            throw Error('data-attribute-item-view must be defined on the tag instance and point to a valid constructor');
        }
        this.removeAllChildViews();
        for( let i=0; i < this.collection.length; i++ ){
            this.addChildView( this.collection.getItemAt(i) );
        }
    }

    public defineSkinParts():void{
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart('collectionContainer', this, 'collectionContainer'));
        this.skinParts.addItem(new SkinPart('itemTemplate', this, 'itemTemplate'));
    }

    public onSkinPartAdded(part:string, element:HTMLElement):void{
        super.onSkinPartAdded(part, element );
        switch(part){
            //required, defines the layout for child views
            case 'itemTemplate':
                element.parentNode.removeChild(element);//remove from the view
                break;

        }
    }

    public getCollection():Lavender.IList{
        return new Lavender.ArrayList();
    }

    public destroy():void{
        this.destroyChildViews();
        super.destroy();
        this.collection = null;
        this.itemView = null;
        this.collectionContainer = null;
        this.itemTemplate = null;
        this.selectedItem = null;
    }
}