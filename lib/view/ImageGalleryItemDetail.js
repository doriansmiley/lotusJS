"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SkinPart_1 = require("./SkinPart");
const AbstractComponent_1 = require("./AbstractComponent");
class ImageGalleryItemDetail extends AbstractComponent_1.AbstractComponent {
    constructor() {
        super();
    }
    get asset() {
        return this._asset;
    }
    set asset(value) {
        this._asset = value;
        this.notify(value, 'asset');
        this.render();
    }
    get nameLabel() {
        return this._nameLabel;
    }
    set nameLabel(value) {
        this._nameLabel = value;
        this.notify(value, 'nameLabel');
    }
    get dateCreatedLabel() {
        return this._dateCreatedLabel;
    }
    set dateCreatedLabel(value) {
        this._dateCreatedLabel = value;
        this.notify(value, 'dateCreatedLabel');
    }
    get urlLabel() {
        return this._urlLabel;
    }
    set urlLabel(value) {
        this._urlLabel = value;
        this.notify(value, 'urlLabel');
    }
    render() {
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
    }
    defineSkinParts() {
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('nameLabel', this, 'nameLabel'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('dateCreatedLabel', this, 'dateCreatedLabel'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('urlLabel', this, 'urlLabel'));
    }
    created(element) {
        super.created(element);
    }
    destroy() {
        super.destroy();
        this.asset = null;
        this.nameLabel = null;
        this.dateCreatedLabel = null;
        this.urlLabel = null;
    }
}
exports.ImageGalleryItemDetail = ImageGalleryItemDetail;
//# sourceMappingURL=ImageGalleryItemDetail.js.map