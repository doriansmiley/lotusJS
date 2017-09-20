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
 * Created by dsmiley on 8/24/17.
 */
var AbstractThumbnailView_1 = require("./AbstractThumbnailView");
var SkinPart_1 = require("./SkinPart");
var ComponentEvent_1 = require("../control/events/ComponentEvent");
var ImageGalleryView = (function (_super) {
    __extends(ImageGalleryView, _super);
    function ImageGalleryView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ImageGalleryView.prototype, "itemDetail", {
        get: function () {
            return this._itemDetail;
        },
        set: function (value) {
            this._itemDetail = value;
            this.notify(value, 'itemDetail');
        },
        enumerable: true,
        configurable: true
    });
    ImageGalleryView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('itemDetail', this, 'itemDetail'));
    };
    ImageGalleryView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
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
    };
    ImageGalleryView.prototype.onItemDetailReady = function (event) {
        if (this.model) {
            this.itemDetail.lotusComponentInstance.asset = this.model;
        }
    };
    ImageGalleryView.prototype.onModelChange = function (value) {
        _super.prototype.onModelChange.call(this, value);
        if (this.itemDetail) {
            this.itemDetail.lotusComponentInstance.asset = value;
        }
    };
    ImageGalleryView.prototype.onDragStart = function (event) {
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
    };
    ImageGalleryView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.itemDetail) {
            this.itemDetail.lotusComponentInstance.removeEventListener(ComponentEvent_1.ComponentEvent.READY, this, 'onItemDetailReady');
        }
        this.itemDetail = null;
    };
    return ImageGalleryView;
}(AbstractThumbnailView_1.AbstractThumbnailView));
exports.ImageGalleryView = ImageGalleryView;
//# sourceMappingURL=ImageGalleryView.js.map