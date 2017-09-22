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
 * Created by dsmiley on 5/17/17.
 */
var ArrayList_1 = require("../list/ArrayList");
var RecordSetList = (function (_super) {
    __extends(RecordSetList, _super);
    function RecordSetList(source, allowDuplicates) {
        if (allowDuplicates === void 0) { allowDuplicates = true; }
        var _this = _super.call(this, source, allowDuplicates) || this;
        _this.recordSetsBySource = {};
        _this.recordSetsById = {};
        return _this;
    }
    RecordSetList.prototype.addItem = function (item, hash, key) {
        this.recordSetsById[item.id] = item;
        this.recordSetsBySource[item.source] = item;
        return _super.prototype.addItem.call(this, item, hash, key);
    };
    RecordSetList.prototype.clear = function () {
        this.clearHash(this.recordSetsById);
        this.clearHash(this.recordSetsBySource);
        _super.prototype.clear.call(this);
    };
    RecordSetList.prototype.removeItemAt = function (index) {
        var recordSet = this.getItemAt(index);
        this.removeItemFromHash(this.recordSetsById, recordSet.id);
        this.removeItemFromHash(this.recordSetsBySource, recordSet.source);
        _super.prototype.removeItemAt.call(this, index);
    };
    RecordSetList.prototype.insert = function (object, index, suppressChangeEvent, hash, key, replaceIndex) {
        if (suppressChangeEvent === void 0) { suppressChangeEvent = false; }
        if (replaceIndex === void 0) { replaceIndex = false; }
        //add item to hash
        this.recordSetsById[object.id] = object;
        this.recordSetsBySource[object.source] = object;
        return _super.prototype.insert.call(this, object, index, suppressChangeEvent, hash, key, replaceIndex);
    };
    return RecordSetList;
}(ArrayList_1.ArrayList));
exports.RecordSetList = RecordSetList;
//# sourceMappingURL=RecordSetList.js.map