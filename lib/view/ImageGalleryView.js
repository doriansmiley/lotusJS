"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 8/24/17.
 */
const AbstractThumbnailView_1 = require("./AbstractThumbnailView");
const SkinPart_1 = require("./SkinPart");
const ComponentEvent_1 = require("../control/events/ComponentEvent");
class ImageGalleryView extends AbstractThumbnailView_1.AbstractThumbnailView {
    constructor() {
        super();
    }
    get itemDetail() {
        return this._itemDetail;
    }
    set itemDetail(value) {
        this._itemDetail = value;
        this.notify(value, 'itemDetail');
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('itemDetail', this, 'itemDetail'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            //optional container for displaying collection elements
            case 'itemDetail':
                if (this.model) {
                    //this is an example of working with nested components which are skin parts and require a reference to and item view model
                    //nested components in your skins (template files) work natively, but if you have a skin part that requires a model reference you have to wait until ComponentEvent.READY is dispatched
                    this.itemDetail.lotusComponentInstance.asset = this.model;
                    this.itemDetail.lotusComponentInstance.addEventListener(ComponentEvent_1.ComponentEvent.READY, this, 'onItemDetailReady');
                }
                break;
        }
    }
    onItemDetailReady(event) {
        if (this.model) {
            this.itemDetail.lotusComponentInstance.asset = this.model;
        }
    }
    onModelChange(value) {
        super.onModelChange(value);
        if (this.itemDetail) {
            this.itemDetail.lotusComponentInstance.asset = value;
        }
    }
    onDragStart(event) {
        if (event['dataTransfer'] !== null && event['dataTransfer'] !== undefined) {
            event['dataTransfer'].effectAllowed = 'all';
            try {
                event['dataTransfer'].setData('galleryImage', this.model['source']);
            }
            catch (e) {
                event['dataTransfer'].setData('text', this.model['source']); //IE only allows two possible key values, text is the nest options
            }
        }
        else {
            event['originalEvent'].dataTransfer.effectAllowed = 'all';
            try {
                event['originalEvent'].dataTransfer.setData('galleryImage', this.model['source']);
            }
            catch (e) {
                event['originalEvent'].dataTransfer.setData('text', this.model['source']); //IE only allows two possible key values, text is the nest options
            }
        }
    }
    destroy() {
        super.destroy();
        if (this.itemDetail) {
            this.itemDetail.lotusComponentInstance.removeEventListener(ComponentEvent_1.ComponentEvent.READY, this, 'onItemDetailReady');
        }
        this.itemDetail = null;
    }
}
exports.ImageGalleryView = ImageGalleryView;
//# sourceMappingURL=ImageGalleryView.js.map