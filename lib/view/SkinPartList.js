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
 * Created by dsmiley on 8/1/17.
 */
var lib_1 = require("lavenderjs/lib");
var SkinPartList = (function (_super) {
    __extends(SkinPartList, _super);
    function SkinPartList(source, allowDuplicates) {
        if (allowDuplicates === void 0) { allowDuplicates = true; }
        var _this = _super.call(this, source, allowDuplicates) || this;
        _this.skinPartsByLabel = {};
        return _this;
    }
    SkinPartList.prototype.addItem = function (object, hash, key) {
        //ensure the object is valid before proceeding
        var index = _super.prototype.addItem.call(this, object, hash, key);
        //populate hash
        this.skinPartsByLabel[object.label] = object;
        return index;
    };
    SkinPartList.prototype.clear = function () {
        _super.prototype.clearHash.call(this, this.skinPartsByLabel);
        _super.prototype.clear.call(this);
    };
    SkinPartList.prototype.removeItemAt = function (index) {
        var skinPart = this.getItemAt(index);
        _super.prototype.removeItemFromHash.call(this, this.skinPartsByLabel, skinPart.label);
        _super.prototype.removeItemAt.call(this, index);
    };
    SkinPartList.prototype.insert = function (object, index, suppressChangeEvent, hash, key, replaceIndex) {
        if (suppressChangeEvent === void 0) { suppressChangeEvent = false; }
        if (replaceIndex === void 0) { replaceIndex = false; }
        //ensure the object is valid before proceeding
        var returnValue = _super.prototype.insert.call(this, object, index, suppressChangeEvent, hash, key, replaceIndex);
        //populate hash
        this.skinPartsByLabel[object.label] = object;
        return returnValue;
    };
    return SkinPartList;
}(lib_1.ArrayList));
exports.SkinPartList = SkinPartList;
//# sourceMappingURL=SkinPartList.js.map