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
 * Created by dsmiley on 9/28/17.
 */
var AbstractThumbnailView_1 = require("./AbstractThumbnailView");
var SkinPart_1 = require("./SkinPart");
var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Image.prototype, "loadingSVG", {
        get: function () {
            return this._loadingSVG;
        },
        set: function (value) {
            this._loadingSVG = value;
        },
        enumerable: true,
        configurable: true
    });
    Image.prototype.getImageURL = function (model) {
        if (model) {
            return model['src'];
        }
        if (!this.model) {
            return '';
        }
        return this.model['src'];
    };
    Image.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('loadingSVG', this, 'loadingSVG'));
    };
    Image.prototype.onImageLoad = function (event) {
        _super.prototype.onImageLoad.call(this, event);
        this.setElementDisplay(this.loadingSVG, 'none');
    };
    Image.prototype.setThumbnailSrc = function (src) {
        _super.prototype.setThumbnailSrc.call(this, src);
        this.setElementDisplay(this.loadingSVG, this._loadingSVGStyle);
    };
    Image.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'loadingSVG':
                this._loadingSVGStyle = this.loadingSVG.style.display;
                break;
        }
    };
    Image.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.loadingSVG = null;
    };
    return Image;
}(AbstractThumbnailView_1.AbstractThumbnailView));
exports.Image = Image;
//# sourceMappingURL=Image.js.map