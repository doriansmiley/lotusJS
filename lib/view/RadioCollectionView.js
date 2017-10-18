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
 * Created by dsmiley on 9/22/17.
 */
var AbstractInputCollectionView_1 = require("./AbstractInputCollectionView");
var SkinPart_1 = require("./SkinPart");
var RadioCollectionView = (function (_super) {
    __extends(RadioCollectionView, _super);
    function RadioCollectionView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RadioCollectionView.prototype, "legend", {
        get: function () {
            return this._legend;
        },
        set: function (value) {
            this._legend = value;
            this.notify(value, 'legend');
        },
        enumerable: true,
        configurable: true
    });
    RadioCollectionView.prototype.refreshView = function (value) {
        if (this.selectedItem) {
            this.selectedItem.element['checked'] = true;
        }
    };
    RadioCollectionView.prototype.addCollectionEventListeners = function () {
        _super.prototype.addCollectionEventListeners.call(this);
        this.setLegend();
    };
    RadioCollectionView.prototype.setLegend = function () {
        if (this.legend && this.model && this.model.label) {
            this.legend.innerHTML = this.model.label;
        }
    };
    RadioCollectionView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('legend', this, 'legend'));
    };
    RadioCollectionView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'label': {
                this.setLegend();
                break;
            }
        }
    };
    RadioCollectionView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.legend = null;
    };
    return RadioCollectionView;
}(AbstractInputCollectionView_1.AbstractInputCollectionView));
exports.RadioCollectionView = RadioCollectionView;
//# sourceMappingURL=RadioCollectionView.js.map