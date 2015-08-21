/**
 * Created by dsmiley on 8/18/15.
 */
Lotus.AbstractThumbnailView = function () {
    var _thumbWidth;
    var _thumbHeight;
    var _thumbnail;
    var _thumbnailContainer;
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
            }
        }
    );
    this.thumbClickProxy = this.onThumbClick.bind(this);
    this.setUpBindings();
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractItemView, Lotus.AbstractThumbnailView);

Lotus.AbstractThumbnailView.prototype.setUpBindings = function(){
    this.binder.bind(this, 'model', this, 'onModelChange');
}

Lotus.AbstractThumbnailView.prototype.onModelChange = function( value ){
    if( value !== null && value !== undefined && this.thumbnail !== null && this.thumbnail !== undefined ){
        this.thumbnail.src = this.model.asset.thumbUrl;
        if( this.thumbWidth !== null && this.thumbWidth !== undefined && this.thumbHeight !== null && this.thumbHeight !== undefined){
            var scale = Lavender.ResizeUtils.getScaleToFit({width: this.model.defaultWidth, height: this.model.defaultHeight}, {width: this.thumbWidth, height: this.thumbHeight});
            var width = ( !isNaN(scale) ) ? this.model.defaultWidth * scale : 50;
            var height = ( !isNaN(scale) ) ? this.model.defaultHeight * scale : 50;
            this.thumbnail.setAttribute('width', width + 'px');
            this.thumbnail.setAttribute('height', height + 'px');
        }
    }
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
            this.thumbnail.addEventListener('click', this.thumbClickProxy);
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
    if( this.thumbnail !== null && this.thumbnail !== undefined ){
        this.thumbnail.removeEventListener('click', this.thumbClickProxy);
        this.thumbnail = null;
    }
    if( this.thumbnailContainer !== null && this.thumbnailContainer !== undefined ){
        this.thumbnailContainer = null;
        this.thumbnailSelectedClass = null;
    }
    this.thumbClickProxy = null;
}