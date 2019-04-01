"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/28/17.
 */
const AbstractThumbnailView_1 = require("./AbstractThumbnailView");
const SkinPart_1 = require("./SkinPart");
class Image extends AbstractThumbnailView_1.AbstractThumbnailView {
    get loadingSVG() {
        return this._loadingSVG;
    }
    set loadingSVG(value) {
        this._loadingSVG = value;
    }
    getImageURL(model) {
        if (model) {
            return model['src'];
        }
        if (!this.model) {
            return '';
        }
        return this.model['src'];
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('loadingSVG', this, 'loadingSVG'));
    }
    onImageLoad(event) {
        super.onImageLoad(event);
        this.setElementDisplay(this.loadingSVG, 'none');
    }
    setThumbnailSrc(src) {
        super.setThumbnailSrc(src);
        this.setElementDisplay(this.loadingSVG, this._loadingSVGStyle);
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'loadingSVG':
                this._loadingSVGStyle = this.loadingSVG.style.display;
                break;
        }
    }
    destroy() {
        super.destroy();
        this.loadingSVG = null;
    }
}
exports.Image = Image;
//# sourceMappingURL=Image.js.map