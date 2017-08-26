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
var ImageGalleryView = (function (_super) {
    __extends(ImageGalleryView, _super);
    function ImageGalleryView() {
        return _super.call(this) || this;
    }
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
    return ImageGalleryView;
}(AbstractThumbnailView_1.AbstractThumbnailView));
exports.ImageGalleryView = ImageGalleryView;
//# sourceMappingURL=ImageGalleryView.js.map