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
var SkinPart_1 = require("./SkinPart");
var AbstractComponent_1 = require("./AbstractComponent");
var ImageGalleryItemDetail = (function (_super) {
    __extends(ImageGalleryItemDetail, _super);
    function ImageGalleryItemDetail() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ImageGalleryItemDetail.prototype, "asset", {
        get: function () {
            return this._asset;
        },
        set: function (value) {
            this._asset = value;
            this.notify(value, 'asset');
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageGalleryItemDetail.prototype, "nameLabel", {
        get: function () {
            return this._nameLabel;
        },
        set: function (value) {
            this._nameLabel = value;
            this.notify(value, 'nameLabel');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageGalleryItemDetail.prototype, "dateCreatedLabel", {
        get: function () {
            return this._dateCreatedLabel;
        },
        set: function (value) {
            this._dateCreatedLabel = value;
            this.notify(value, 'dateCreatedLabel');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageGalleryItemDetail.prototype, "urlLabel", {
        get: function () {
            return this._urlLabel;
        },
        set: function (value) {
            this._urlLabel = value;
            this.notify(value, 'urlLabel');
        },
        enumerable: true,
        configurable: true
    });
    ImageGalleryItemDetail.prototype.render = function () {
        if (this.asset && this.ready) {
            if (this.nameLabel) {
                this.nameLabel.innerHTML = this.asset.objectName;
            }
            if (this.dateCreatedLabel) {
                this.dateCreatedLabel.innerHTML = this.asset.createdDate.toDateString();
            }
            if (this.urlLabel) {
                this.urlLabel.innerHTML = this.asset.url;
            }
        }
    };
    ImageGalleryItemDetail.prototype.defineSkinParts = function () {
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('nameLabel', this, 'nameLabel'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('dateCreatedLabel', this, 'dateCreatedLabel'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('urlLabel', this, 'urlLabel'));
    };
    ImageGalleryItemDetail.prototype.created = function (element) {
        _super.prototype.created.call(this, element);
    };
    ImageGalleryItemDetail.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.asset = null;
        this.nameLabel = null;
        this.dateCreatedLabel = null;
        this.urlLabel = null;
    };
    return ImageGalleryItemDetail;
}(AbstractComponent_1.AbstractComponent));
exports.ImageGalleryItemDetail = ImageGalleryItemDetail;
//# sourceMappingURL=ImageGalleryItemDetail.js.map