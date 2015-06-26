/**
 * Created by dsmiley on 5/20/15.
 */
SampleApp.ImageGalleryItemView = function () {
    var _allowDrag;
    var _selectedClass;

    Lotus.AbstractItemView.prototype.constructor.call(this);

    this.addProperties({
            allowDrag: {
                get: function () {
                    return _allowDrag;
                },
                set: function (val) {
                    _allowDrag = val;
                    this.Notify(val, 'allowDrag');
                }
            },
            selectedClass: {
                get: function () {
                    return _selectedClass;
                },
                set: function (val) {
                    _selectedClass = val;
                    this.Notify(val, 'selectedClass');
                }
            }
        }
    );
    this.image = null;
    this.imageClickProxy = this.onImageClick.bind(this);
    this.onDragStartProxy = this.onDragStart.bind(this);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractItemView, SampleApp.ImageGalleryItemView);

SampleApp.ImageGalleryItemView.prototype.init = function () {
    Lotus.AbstractComponent.prototype.init.call(this);

}

SampleApp.ImageGalleryItemView.prototype.addSkinPart = function (part, element) {
    Lotus.AbstractItemView.prototype.addSkinPart.call(this, part, element);
    switch( part ){
        case 'image':
            this.image = element;
            this.selectedClass = this.image.getAttribute('selected-class');
            this.allowDrag = this.image.getAttribute('allow-drag');
            this.image.setAttribute('draggable', this.allowDrag);
            this.image.setAttribute('src', this.model.uriPath);
            //add event listeners to handle image click and drag
            this.image.addEventListener('click', this.imageClickProxy);
            this.image.addEventListener('dragstart', this.onDragStartProxy);
            break;
        case 'imageContainer':
            this.imageContainer = element;
            this.imageContainerSelectedClass = this.imageContainer.getAttribute('selected-class');
            break;
    }
}

SampleApp.ImageGalleryItemView.prototype.onDragStart = function ( event ) {
    if( event.dataTransfer !== null && event.dataTransfer !== undefined ){
        event.dataTransfer.effectAllowed = 'all';
        event.dataTransfer.setData('imageGalleryItem', this.model);
    }else{
        event.originalEvent.dataTransfer.effectAllowed = 'all';
        event.originalEvent.dataTransfer.setData('imageGalleryItem', this.model);
    }
}

SampleApp.ImageGalleryItemView.prototype.onImageClick = function (event) {
    this.resetState();
}

SampleApp.ImageGalleryItemView.prototype.resetState = function () {
    this.image.classList.toggle(this.selectedClass);
    this.imageContainer.classList.toggle(this.imageContainerSelectedClass);
    var eventType = ( this.image.classList.contains(this.selectedClass) ) ? Lotus.ItemViewEvent.ITEM_SELECTED : Lotus.ItemViewEvent.ITEM_DESELECTED;
    //dispatch event to notify view that the layout was selected/or deselected
    this.dispatch(new Lotus.ItemViewEvent(eventType, {item:this}));
}

SampleApp.ImageGalleryItemView.prototype.destroy = function(){
    Lotus.AbstractItemView.prototype.destroy.call(this);
    if( this.image ){
        this.image.removeEventListener('click', this.imageClickProxy);
        this.image.removeEventListener('dragstart', this.onDragStartProxy);
    }
    this.image = null;
    this.imageContainer = null;
    this.imageClickProxy = null;
    this.onDragStartProxy = null;
}