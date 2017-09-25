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
var AbstractItemView_1 = require("./AbstractItemView");
var SkinPart_1 = require("./SkinPart");
var ListItemView = (function (_super) {
    __extends(ListItemView, _super);
    function ListItemView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ListItemView.prototype, "option", {
        get: function () {
            return this._option;
        },
        set: function (value) {
            this._option = value;
        },
        enumerable: true,
        configurable: true
    });
    ListItemView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts. We use the term itemTemplate as it allows us to include this component as a nested component in a collection view.
        //Choosing another name would require it be wrapped in a itemTemplate skin part
        this.skinParts.addItem(new SkinPart_1.SkinPart('itemTemplate', this, 'option'));
    };
    ListItemView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'itemTemplate':
                //set up listitem value and label
                this.option.value = (typeof this.model.value == 'object') ? JSON.stringify(this.model.value) : this.model.value;
                this.option.innerHTML = this.model.label;
                break;
        }
    };
    ListItemView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.option = null;
    };
    return ListItemView;
}(AbstractItemView_1.AbstractItemView));
exports.ListItemView = ListItemView;
//# sourceMappingURL=ListItemView.js.map