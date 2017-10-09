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
var RadioCollectionView = (function (_super) {
    __extends(RadioCollectionView, _super);
    function RadioCollectionView() {
        return _super.call(this) || this;
    }
    RadioCollectionView.prototype.refreshView = function (value) {
        if (this.selectedItem) {
            this.selectedItem.element['checked'] = true;
        }
    };
    return RadioCollectionView;
}(AbstractInputCollectionView_1.AbstractInputCollectionView));
exports.RadioCollectionView = RadioCollectionView;
//# sourceMappingURL=RadioCollectionView.js.map