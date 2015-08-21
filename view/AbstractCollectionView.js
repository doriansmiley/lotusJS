/**
 * Created by dsmiley on 1/28/15.
 */
/**
 * Created by dsmiley on 1/28/15.
 */
Lotus.AbstractCollectionView = function () {
    var _collectionContainer;
    var _itemTemplate;
    var _selectedItem;
    var _collection;
    var _itemView;//IMPORTANT: this value must be defined on the tag
    var _childViews = new Lavender.ArrayList();
    Lotus.AbstractComponent.prototype.constructor.call(this);
    // Define our getters and setters
    this.addProperties({
            collectionContainer: {
                get: function () {
                    return _collectionContainer;
                },
                set: function (val) {
                    _collectionContainer = val;
                    this.Notify(val, 'collectionContainer');
                }
            },
            itemTemplate: {
                get: function () {
                    return _itemTemplate;
                },
                set: function (val) {
                    _itemTemplate = val;
                    this.Notify(val, 'itemTemplate');
                }
            },
            selectedItem: {
                get: function () {
                    return _selectedItem;
                },
                set: function (val) {
                    _selectedItem = val;
                    this.Notify(val, 'selectedItem');
                }
            },
            collection: {
                get: function () {
                    return _collection;
                },
                set: function (val) {
                    this.removeCollectionEventListeners();//must occur first
                    _collection = val;
                    this.addCollectionEventListeners();//must occur after line above
                    this.Notify(val, 'collection');
                }
            },
            itemView: {
                get: function () {
                    return _itemView;
                },
                set: function (val) {
                    _itemView = val;
                    this.Notify(val, 'itemView');
                }
            },
            childViews: {
                get: function () {
                    return _childViews;
                }
            }
        }
    );
    //closure method, final
    this.destoryChildViews = function(){
        for( var i=0; i < _childViews.length; i++){
            this.removeChildView( _childViews[i] );
        }
        _childViews = null;
    }
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractComponent, Lotus.AbstractCollectionView);

Lotus.AbstractCollectionView.prototype.init = function () {
    Lotus.AbstractComponent.prototype.init.call(this);
    //assign a default collection if it has not already been set
    if( this.collection === null || this.collection === undefined ){
        this.collection = this.getCollection();
    }
    this.render();
}

Lotus.AbstractCollectionView.prototype.addCollectionEventListeners = function () {
    if( this.collection !== null && this.collection !== undefined ){
        this.collection.addEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'onCollectionChange');
    }
}

Lotus.AbstractCollectionView.prototype.removeCollectionEventListeners = function () {
    if( this.collection !== null && this.collection !== undefined ){
        this.collection.removeEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'onCollectionChange');
    }
}

//IMPORTANT: render is called only once during the components lifecycle, during init. Never call this method directly
Lotus.AbstractCollectionView.prototype.render = function () {
    if( this.itemView === null || this.itemView == undefined ){
        throw Error('data-attribute-item-view must be defined on the tag instance and point to a valid constructor');
    }
    for( var i=0; i < this.collection.length; i++ ){
        this.addChildView( this.collection.getItemAt(i) );
    }
}

Lotus.AbstractCollectionView.prototype.defineSkinParts = function(){
    Lotus.AbstractComponent.prototype.defineSkinParts.call(this);
    //set up skin parts
    this.skinParts.addItem(new Lotus.SkinPart('collectionContainer', this, 'collectionContainer'));
    this.skinParts.addItem(new Lotus.SkinPart('itemTemplate', this, 'itemTemplate'));
}

Lotus.AbstractCollectionView.prototype.onSkinPartAdded = function (part, element) {
    Lotus.AbstractComponent.prototype.onSkinPartAdded.call(this, part, element );
    switch(part){
        //required, defines the layout for child views
        case 'itemTemplate':
            element.parentNode.removeChild(element);//remove from the view
            break;

    }
}

Lotus.AbstractCollectionView.prototype.getCollection = function (event) {
    return new Lavender.ArrayList();
}

Lotus.AbstractCollectionView.prototype.onCollectionChange = function (event) {
    switch(event.payload.type){
        case 'add':
            this.addChildView(event.payload.item);
            break;
        case 'remove':
            this.removeChildViewFromModel(event.payload.item);
            break;
        case 'removeAll':
            this.removeAllChildViews();
            break;
    }
}

//stub for override
Lotus.AbstractCollectionView.prototype.createChildView = function( model ){
    var evalClass = eval(this.itemView);
    return new evalClass();
}


Lotus.AbstractCollectionView.prototype.addChildView = function( model ){
    var view = this.createChildView( model );
    //clone the view
    var clone = this.itemTemplate.cloneNode(true);
    view.model = model;
    view.element = clone;
    view.init();
    this.childViews.addItem( view );
    if( this.collectionContainer !== null && this.collectionContainer !== undefined ){
        this.collectionContainer.appendChild(view.element);
    }else{
        this.element.appendChild(view.element);
    }
    this.addViewEventListeners( view );
}

Lotus.AbstractCollectionView.prototype.addViewEventListeners = function( view ){
    view.addEventListener(Lotus.ItemViewEvent.ITEM_SELECTED, this, 'onItemSelectedDeselect');
    view.addEventListener(Lotus.ItemViewEvent.ITEM_DESELECTED, this, 'onItemSelectedDeselect');
    view.addEventListener(Lotus.ItemViewEvent.REMOVE_ITEM, this, 'onItemRemove');
}

Lotus.AbstractCollectionView.prototype.removeViewEventListeners = function( view ){
    view.removeEventListener(Lotus.ItemViewEvent.ITEM_SELECTED, this, 'onItemSelectedDeselect');
    view.removeEventListener(Lotus.ItemViewEvent.ITEM_DESELECTED, this, 'onItemSelectedDeselect');
    view.removeEventListener(Lotus.ItemViewEvent.REMOVE_ITEM, this, 'onItemRemove');
}

Lotus.AbstractCollectionView.prototype.onItemSelectedDeselect = function( event ){
    this.selectedItem = ( event.type == Lotus.ItemViewEvent.ITEM_SELECTED ) ? event.payload.item : null;
}

Lotus.AbstractCollectionView.prototype.onItemRemove = function( event ){
    var index = this.collection.indexOf( event.payload.item.model );
    if( index >= 0 ){
        this.collection.removeItemAt(index);
    }
}

//IMPORTANT: this is a convience method for manual population only, do not bind it to a collection models collection change event as the add event is also fired
Lotus.AbstractCollectionView.prototype.addAllChildViews = function( models ){
    for( var i=0; i < models.length; i++ ){
        this.addChildView( models[i] );
    }
}

Lotus.AbstractCollectionView.prototype.removeAllChildViews = function(){
    for( var i=this.childViews.length()-1; i >= 0; i--){
        this.removeChildView( this.childViews.getItemAt(i) );
    }
}

Lotus.AbstractCollectionView.prototype.removeChildView = function( view ){
    this.removeViewEventListeners( view );
    this.removeElement( view.element );
    view.destroy();
    this.childViews.removeItemAt( this.childViews.indexOf(view) );
    //remove
}

Lotus.AbstractCollectionView.prototype.removeElement = function (element) {
    if( this.collectionContainer !== null && this.collectionContainer !== undefined ){
        this.collectionContainer.removeChild(element);
    }else{
        this.element.removeChild(element);
    }
}

Lotus.AbstractCollectionView.prototype.removeChildViewFromModel = function( model ){
    //get the view associated with the model
    for( var i=0; i < this.childViews.length(); i++){
        if( this.childViews.getItemAt(i).model == model ){
            this.removeChildView( this.childViews.getItemAt(i) );
            break;
        }
    }
}

Lotus.AbstractCollectionView.prototype.destroy = function () {
    Lotus.AbstractComponent.prototype.destroy.call(this);
    if( this.collectionContainer !== null && this.collectionContainer !== undefined ){
        while (this.collectionContainer.firstChild) {
            this.collectionContainer.removeChild(this.collectionContainer.firstChild);
        }
    }else{
        //remove child nodes
        while (this.element.firstChild) {
            this.element.removeChild(this.firstChild);
        }
    }
    this.destoryChildViews();
    this.collection = null;
    this.itemView = null;
    this.collectionContainer = null;
    this.itemTemplate = null;
    this.selectedItem = null;
}