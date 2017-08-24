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
 * Created by dsmiley on 8/23/17.
 */
var Lavender = require("lavenderjs/lib");
var AbstractItemView_1 = require("./AbstractItemView");
var SkinPart_1 = require("./SkinPart");
var ItemViewEvent_1 = require("../control/events/ItemViewEvent");
var AbstractThumbnailView = (function (_super) {
    __extends(AbstractThumbnailView, _super);
    function AbstractThumbnailView() {
        var _this = _super.call(this) || this;
        _this._allowDrag = true;
        return _this;
    }
    Object.defineProperty(AbstractThumbnailView.prototype, "thumbWidth", {
        get: function () {
            return this._thumbWidth;
        },
        set: function (value) {
            this._thumbWidth = value;
            this.notify(value, 'thumbWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractThumbnailView.prototype, "thumbHeight", {
        get: function () {
            return this._thumbHeight;
        },
        set: function (value) {
            this._thumbHeight = value;
            this.notify(value, 'thumbHeight');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractThumbnailView.prototype, "thumbnail", {
        get: function () {
            return this._thumbnail;
        },
        set: function (value) {
            this._thumbnail = value;
            this.notify(value, 'thumbnail');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractThumbnailView.prototype, "thumbnailContainer", {
        get: function () {
            return this._thumbnailContainer;
        },
        set: function (value) {
            this._thumbnailContainer = value;
            this.notify(value, 'thumbnailContainer');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractThumbnailView.prototype, "allowDrag", {
        get: function () {
            return this._allowDrag;
        },
        set: function (value) {
            this._allowDrag = value;
            this.notify(value, 'allowDrag');
        },
        enumerable: true,
        configurable: true
    });
    AbstractThumbnailView.prototype.setUpBindings = function () {
        this.binder.bind(this, 'model', this, 'onModelChange');
    };
    AbstractThumbnailView.prototype.sizeImage = function () {
        if (this.thumbnail === null || this.thumbnail === undefined) {
            return;
        }
        var defaultSize = this.getDefaultSize();
        var containerSize = this.getContainerSize();
        var scale = Lavender.ResizeUtils.getScaleToFit(defaultSize, containerSize);
        var width = defaultSize['width'] * scale;
        var height = defaultSize['height'] * scale;
        //console.log("width/height "+width+"/"+height)
        this.thumbnail.setAttribute('width', width + 'px');
        this.thumbnail.setAttribute('height', height + 'px');
        this.thumbnail.style.maxWidth = containerSize.width + 'px';
        this.thumbnail.style.maxHeight = containerSize.height + 'px';
    };
    AbstractThumbnailView.prototype.onThumbClick = function (event) {
        this.resetState();
    };
    //stub for override
    AbstractThumbnailView.prototype.onDragStart = function (event) {
    };
    AbstractThumbnailView.prototype.getImageURL = function () {
        return this.model['thumbUrl'];
    };
    AbstractThumbnailView.prototype.getDefaultSize = function () {
        return { width: parseInt(this.thumbnail.getAttribute('width')), height: parseInt(this.thumbnail.getAttribute('height')) };
    };
    AbstractThumbnailView.prototype.getContainerSize = function () {
        var returnObj = (this.thumbnailContainer !== null && this.thumbnailContainer !== undefined) ? { width: parseInt(window.getComputedStyle(this.thumbnailContainer).width), height: parseInt(window.getComputedStyle(this.thumbnailContainer).height) } : { width: NaN, height: NaN };
        //if the container has a defined width and height set in the tempalte use that instead of our defaults
        if (!isNaN(parseInt(this.thumbWidth)) && !isNaN(parseInt(this.thumbWidth))) {
            returnObj = { width: parseInt(this.thumbWidth), height: parseInt(this.thumbHeight) };
        }
        return returnObj;
    };
    AbstractThumbnailView.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        if (this.thumbnail === null || this.thumbnail === undefined) {
            return;
        }
        this.thumbnail.setAttribute('draggable', (this.allowDrag) ? 'true' : 'false');
        this.thumbnail.addEventListener('click', this.onThumbClick);
        this.thumbnail.addEventListener('dragstart', this.onDragStart);
    };
    AbstractThumbnailView.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        if (this.thumbnail === null || this.thumbnail === undefined) {
            return;
        }
        this.thumbnail.removeEventListener('click', this.onThumbClick);
        this.thumbnail.removeEventListener('dragstart', this.onDragStart);
    };
    AbstractThumbnailView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('thumbnail', this, 'thumbnail'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('thumbnailContainer', this, 'thumbnailContainer'));
    };
    AbstractThumbnailView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'thumbnail':
                this._thumbnailDisplay = this.thumbnail.style.display;
                this.thumbnail.onload = function (event) {
                    if (!this.thumbnail) {
                        return;
                    }
                    this.thumbnail.onload = null;
                    this.thumbnail.style.display = this._thumbnailDisplay;
                    this.sizeImage();
                }.bind(this);
                this.thumbnail.style.display = 'none';
                this.thumbnail['src'] = this.getImageURL();
                this.addEventListeners();
                break;
            case 'thumbnailContainer':
                this._thumbnailSelectedClass = this.thumbnailContainer.getAttribute('selected-class');
                break;
        }
    };
    AbstractThumbnailView.prototype.resetState = function () {
        this.thumbnailContainer.classList.toggle(this._thumbnailSelectedClass);
        var eventType = (this.thumbnailContainer.classList.contains(this._thumbnailSelectedClass)) ? ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED : ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED;
        //dispatch event to notify view that the layout was selected/or deselected
        this.dispatch(new ItemViewEvent_1.ItemViewEvent(eventType, { item: this }));
    };
    AbstractThumbnailView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.removeEventListeners();
        this.thumbnail = null;
        this.thumbnailContainer = null;
        this._thumbnailSelectedClass = null;
    };
    return AbstractThumbnailView;
}(AbstractItemView_1.AbstractItemView));
exports.AbstractThumbnailView = AbstractThumbnailView;
//# sourceMappingURL=AbstractThumbnailView.js.map