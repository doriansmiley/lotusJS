/**
 * Created by dsmiley on 8/18/15.
 */
Lotus.AbstractThumbnailView = function () {
    var _thumbWidth;
    var _thumbHeight;
    var _thumbnail;
    var _thumbnailContainer;
    var _allowDrag = true;
    Lotus.AbstractItemView.prototype.constructor.call(this);
    // Define our getters and setters
    this.addProperties({
            thumbnail: {
                get: function () {
                    return _thumbnail;
                },
                set: function (val) {
                    _thumbnail = val;
                    this.Notify(val, 'thumbnail');
                }
            },
            thumbnailContainer: {
                get: function () {
                    return _thumbnailContainer;
                },
                set: function (val) {
                    _thumbnailContainer = val;
                    this.Notify(val, 'thumbnailContainer');
                }
            },
            thumbWidth: {
                get: function () {
                    return _thumbWidth;
                },
                set: function (val) {
                    _thumbWidth = val;
                    this.Notify(val, 'thumbWidth');
                }
            },
            thumbHeight: {
                get: function () {
                    return _thumbHeight;
                },
                set: function (val) {
                    _thumbHeight = val;
                    this.Notify(val, 'thumbHeight');
                }
            },
            allowDrag: {
                get: function () {
                    return _allowDrag;
                },
                set: function (val) {
                    _allowDrag = val;
                    this.Notify(val, 'allowDrag');
                }
            }
        }
    );
    this.thumbClickProxy = this.onThumbClick.bind(this);
    this.onDragStartProxy = this.onDragStart.bind(this);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractItemView, Lotus.AbstractThumbnailView);

Lotus.AbstractThumbnailView.prototype.setUpBindings = function(){
    this.binder.bind(this, 'model', this, 'onModelChange');
}

Lotus.AbstractThumbnailView.prototype.sizeImage = function(){
    if( this.thumbnail === null ||  this.thumbnail === undefined ){
        return;
    }
    var defaultSize = this.getDefaultSize();
    var containerSize = this.getContainerSize();
    var scale = Lavender.ResizeUtils.getScaleToFit(defaultSize, containerSize);
    var width = defaultSize.width * scale;
    var height = defaultSize.height * scale;
    //console.log("width/height "+width+"/"+height)
    this.thumbnail.setAttribute('width', width + 'px');
    this.thumbnail.setAttribute('height', height + 'px');
    this.thumbnail.style.maxWidth = containerSize.width + 'px';
    this.thumbnail.style.maxHeight = containerSize.height + 'px';
}

Lotus.AbstractThumbnailView.prototype.addEventListeners = function(){
    if( this.thumbnail === null ||  this.thumbnail === undefined ){
        return;
    }
    this.thumbnail.setAttribute('draggable', this.allowDrag);
    this.thumbnail.addEventListener('click', this.thumbClickProxy);
    this.thumbnail.addEventListener('dragstart', this.onDragStartProxy);
}

Lotus.AbstractThumbnailView.prototype.removeEventListeners = function(){
    if( this.thumbnail === null ||  this.thumbnail === undefined ){
        return;
    }
    this.thumbnail.removeEventListener('click', this.thumbClickProxy);
    this.thumbnail.removeEventListener('dragstart', this.onDragStartProxy);
}

Lotus.AbstractThumbnailView.prototype.onThumbClick = function (event) {
    this.resetState();
}

Lotus.AbstractThumbnailView.prototype.onDragStart = function ( event ) {
    //to be overrided
}

Lotus.AbstractThumbnailView.prototype.getImageURL = function(){
    return this.model.thumbUrl;
}

Lotus.AbstractThumbnailView.prototype.getDefaultSize = function(){
    return {width:this.thumbnail.width, height:this.thumbnail.height};
}

Lotus.AbstractThumbnailView.prototype.getContainerSize = function(){
    var returnObj = (this.thumbnailContainer !== null && this.thumbnailContainer !== undefined ) ? {width:parseInt(window.getComputedStyle(this.thumbnailContainer).width), height:parseInt(window.getComputedStyle(this.thumbnailContainer).height)} : {width:NaN, height:NaN};
    //if the container has a defined width and height set in the tempalte use that instead of our defaults
    if( !isNaN( parseInt(this.thumbWidth) ) && !isNaN( parseInt(this.thumbWidth) ) ){
        returnObj = {width:this.thumbWidth, height:this.thumbHeight};
    }
    return returnObj;
}

Lotus.AbstractThumbnailView.prototype.defineSkinParts = function(){
    Lotus.AbstractItemView.prototype.defineSkinParts.call(this);
    //set up skin parts
    this.skinParts.addItem(new Lotus.SkinPart('thumbnail', this, 'thumbnail'));
    this.skinParts.addItem(new Lotus.SkinPart('thumbnailContainer', this, 'thumbnailContainer'));
}

Lotus.AbstractThumbnailView.prototype.onSkinPartAdded = function (part, element) {
    Lotus.AbstractItemView.prototype.onSkinPartAdded.call(this, part, element);
    switch( part ){
        case 'thumbnail':
            this.thumbnailDisplay = this.thumbnail.style.display;
            this.thumbnail.onload = function(event){
                if(!this.thumbnail){
                    return;
                }
                this.thumbnail.onload = null;
                this.thumbnail.style.display = this.thumbnailDisplay;
                this.sizeImage();
            }.bind(this);
            this.thumbnail.style.display = 'none';
            this.thumbnail.src = this.getImageURL();
            this.addEventListeners();
            break;
        case 'thumbnailContainer':
            this.thumbnailSelectedClass = this.thumbnailContainer.getAttribute('selected-class');
            break;
    }
}

Lotus.AbstractThumbnailView.prototype.onThumbClick = function (event) {
    this.resetState();
}

Lotus.AbstractThumbnailView.prototype.resetState = function () {
    this.thumbnailContainer.classList.toggle(this.thumbnailSelectedClass);
    var eventType = ( this.thumbnailContainer.classList.contains(this.thumbnailSelectedClass) ) ? Lotus.ItemViewEvent.ITEM_SELECTED : Lotus.ItemViewEvent.ITEM_DESELECTED;
    //dispatch event to notify view that the layout was selected/or deselected
    this.dispatch(new Lotus.ItemViewEvent(eventType, {item:this}));
}

Lotus.AbstractThumbnailView.prototype.destroy = function(){
    Lotus.AbstractItemView.prototype.destroy.call(this);
    this.removeEventListeners()
    this.thumbnail = null;
    this.thumbnailContainer = null;
    this.thumbnailSelectedClass = null;
    this.thumbClickProxy = null;
    this.onDragStartProxy = null;
}