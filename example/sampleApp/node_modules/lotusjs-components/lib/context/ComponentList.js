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
var Lavender = require("lavenderjs/lib");
var ComponentList = (function (_super) {
    __extends(ComponentList, _super);
    function ComponentList() {
        var _this = _super.call(this) || this;
        _this.instancesByConstructor = {};
        return _this;
    }
    ComponentList.prototype.addToHash = function (object) {
        if (this.instancesByConstructor[object.constructor] === null || this.instancesByConstructor[object.constructor] === undefined) {
            this.instancesByConstructor[object.constructor] = [];
        }
        this.instancesByConstructor[object.constructor].push(object);
    };
    ComponentList.prototype.removeItemFromHash = function (hash, object) {
        var objects = hash[object.constructor];
        if (objects === null || objects === undefined || objects.length < 1) {
            return;
        }
        for (var i = 0; i < objects.length; i++) {
            if (objects[i] == object) {
                //remove the item from the array
                switch (i) {
                    case 0:
                        objects.shift();
                        break;
                    case objects.length - 1:
                        objects.pop();
                        break;
                    default:
                        var head = objects.slice(0, i);
                        var tail = objects.slice(i + 1);
                        objects = head.concat(tail);
                        break;
                }
                break;
            }
        }
    };
    ComponentList.prototype.addItem = function (object, hash, key) {
        var index = _super.prototype.addItem.call(this, object, hash, key);
        //populate hash
        this.addToHash(object);
        return index;
    };
    ComponentList.prototype.clear = function () {
        _super.prototype.clearHash.call(this, this.instancesByConstructor);
        _super.prototype.clear.call(this);
    };
    ComponentList.prototype.removeItemAt = function (index) {
        var object = this.getItemAt(index);
        this.removeItemFromHash(this.instancesByConstructor, object);
        _super.prototype.removeItemAt.call(this, index);
    };
    ComponentList.prototype.insert = function (object, index, suppressChangeEvent, hash, key, replaceIndex) {
        if (suppressChangeEvent === void 0) { suppressChangeEvent = false; }
        if (replaceIndex === void 0) { replaceIndex = false; }
        var returnValue = _super.prototype.insert.call(this, object, index, suppressChangeEvent, hash, key, replaceIndex);
        this.addToHash(object);
        return returnValue;
    };
    return ComponentList;
}(Lavender.ArrayList));
exports.ComponentList = ComponentList;
//# sourceMappingURL=ComponentList.js.map