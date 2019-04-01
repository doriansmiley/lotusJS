"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 8/23/17.
 */
const Lavender = require("lavenderjs/lib");
const AbstractItemView_1 = require("./AbstractItemView");
const SkinPart_1 = require("./SkinPart");
const ItemViewEvent_1 = require("../control/events/ItemViewEvent");
class AbstractThumbnailView extends AbstractItemView_1.AbstractItemView {
    constructor() {
        super();
        this._allowDrag = true;
    }
    get thumbWidth() {
        return this._thumbWidth;
    }
    set thumbWidth(value) {
        this._thumbWidth = value;
        this.notify(value, 'thumbWidth');
    }
    get thumbHeight() {
        return this._thumbHeight;
    }
    set thumbHeight(value) {
        this._thumbHeight = value;
        this.notify(value, 'thumbHeight');
    }
    get thumbnail() {
        return this._thumbnail;
    }
    set thumbnail(value) {
        this._thumbnail = value;
        this.notify(value, 'thumbnail');
    }
    get thumbnailContainer() {
        return this._thumbnailContainer;
    }
    set thumbnailContainer(value) {
        this._thumbnailContainer = value;
        this.notify(value, 'thumbnailContainer');
    }
    get allowDrag() {
        return this._allowDrag;
    }
    set allowDrag(value) {
        this._allowDrag = value;
        this.notify(value, 'allowDrag');
    }
    sizeImage() {
        if (this.thumbnail === null || this.thumbnail === undefined) {
            return;
        }
        let defaultSize = this.getDefaultSize();
        let containerSize = this.getContainerSize();
        let scale = Lavender.ResizeUtils.getScaleToFit(defaultSize, containerSize);
        let width = defaultSize['width'] * scale;
        let height = defaultSize['height'] * scale;
        //console.log("width/height "+width+"/"+height)
        this.thumbnail.setAttribute('width', width + 'px');
        this.thumbnail.setAttribute('height', height + 'px');
        this.thumbnail.style.maxWidth = containerSize.width + 'px';
        this.thumbnail.style.maxHeight = containerSize.height + 'px';
    }
    onThumbClick(event) {
        this.resetState();
    }
    //stub for override
    onDragStart(event) {
    }
    getImageURL(model) {
        if (model) {
            return model['thumbUrl'];
        }
        return this.model['thumbUrl'];
    }
    getDefaultSize() {
        return { width: parseInt(this.thumbnail.getAttribute('width')), height: parseInt(this.thumbnail.getAttribute('height')) };
    }
    getContainerSize() {
        let returnObj = (this.thumbnailContainer !== null && this.thumbnailContainer !== undefined) ? { width: parseInt(window.getComputedStyle(this.thumbnailContainer).width), height: parseInt(window.getComputedStyle(this.thumbnailContainer).height) } : { width: NaN, height: NaN };
        //if the container has a defined width and height set in the tempalte use that instead of our defaults
        if (!isNaN(parseInt(this.thumbWidth)) && !isNaN(parseInt(this.thumbWidth))) {
            returnObj = { width: parseInt(this.thumbWidth), height: parseInt(this.thumbHeight) };
        }
        return returnObj;
    }
    onImageLoad(event) {
        if (!this.thumbnail) {
            return;
        }
        this.thumbnail.onload = null;
        this.setElementDisplay(this.thumbnail, this._thumbnailDisplay);
        this.sizeImage();
    }
    setThumbnailSrc(src) {
        if (!this.thumbnail) {
            return;
        }
        this.thumbnail.onload = this.onImageLoad.bind(this);
        this.setElementDisplay(this.thumbnail, 'none');
        this.thumbnail['src'] = src;
    }
    addEventListeners() {
        super.addEventListeners();
        if (this.thumbnail === null || this.thumbnail === undefined) {
            return;
        }
        this.thumbnail.setAttribute('draggable', (this.allowDrag) ? 'true' : 'false');
        this.thumbnail.addEventListener('click', this.onThumbClick.bind(this));
        this.thumbnail.addEventListener('dragstart', this.onDragStart.bind(this));
    }
    removeEventListeners() {
        super.removeEventListeners();
        if (this.thumbnail === null || this.thumbnail === undefined) {
            return;
        }
        this.thumbnail.removeEventListener('click', this.onThumbClick);
        this.thumbnail.removeEventListener('dragstart', this.onDragStart);
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('thumbnail', this, 'thumbnail'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('thumbnailContainer', this, 'thumbnailContainer'));
    }
    onModelChange(model) {
        if (model) {
            this.setThumbnailSrc(this.getImageURL(model));
        }
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'thumbnail':
                this.binder.bind(this, 'model', this, 'onModelChange');
                this._thumbnailDisplay = this.thumbnail.style.display;
                this.setThumbnailSrc(this.getImageURL());
                this.addEventListeners();
                break;
            case 'thumbnailContainer':
                this._thumbnailSelectedClass = this.thumbnailContainer.getAttribute('selected-class');
                break;
        }
    }
    resetState() {
        this.thumbnailContainer.classList.toggle(this._thumbnailSelectedClass);
        let eventType = (this.thumbnailContainer.classList.contains(this._thumbnailSelectedClass)) ? ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED : ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED;
        //dispatch event to notify view that the layout was selected/or deselected
        this.dispatch(new ItemViewEvent_1.ItemViewEvent(eventType, { item: this }));
    }
    destroy() {
        super.destroy();
        this.removeEventListeners();
        this.thumbnail = null;
        this.thumbnailContainer = null;
        this._thumbnailSelectedClass = null;
    }
}
exports.AbstractThumbnailView = AbstractThumbnailView;
//# sourceMappingURL=AbstractThumbnailView.js.map