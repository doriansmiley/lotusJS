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
var Subject_1 = require("../observable/Subject");
var ObjectUtils_1 = require("../../util/ObjectUtils");
var EventDispatcher_1 = require("../../control/EventDispatcher");
var CollectionEvent_1 = require("../../events/CollectionEvent");
var ArrayList = (function (_super) {
    __extends(ArrayList, _super);
    function ArrayList(source, allowDuplicates) {
        if (allowDuplicates === void 0) { allowDuplicates = true; }
        var _this = _super.call(this) || this;
        _this.aList = (source) ? source : [];
        _this.allowDuplicates = allowDuplicates;
        ObjectUtils_1.ObjectUtils.mixin(EventDispatcher_1.EventDispatcher, ArrayList, _this);
        return _this;
    }
    Object.defineProperty(ArrayList.prototype, "length", {
        get: function () {
            return this.aList.length;
        },
        enumerable: true,
        configurable: true
    });
    ArrayList.prototype.clone = function () {
        return new ArrayList(this.aList.slice());
    };
    ArrayList.prototype.source = function () {
        return this.aList;
    };
    ArrayList.prototype.allowInsert = function (object, hash, key) {
        var returnValue = true;
        if (!this.allowDuplicates) {
            if (hash !== null && hash !== undefined && key !== null && key !== undefined && object.hasOwnProperty(key) && object[key] !== null && object[key] !== undefined && hash[object[key]] !== null && hash[object[key]] !== undefined) {
                returnValue = false; //the item is a duplicate based on the hash. sometimes we receive newly deserialized objects which makes a lookup based on equality a no go. Instead we look up the object in a hash based on some key
            }
            else if (this.aList.indexOf(object) >= 0) {
                returnValue = false; //the item is a duplicate based on equality comparison
            }
        }
        return returnValue;
    };
    ArrayList.prototype.addItem = function (object, hash, key) {
        if (!this.allowInsert(object, hash, key)) {
            //replace the existing item with the new item
            return;
        }
        //Object are placed at the end of the array
        var index = this.aList.push(object);
        this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, { type: 'add', item: object }));
        return index;
    };
    ArrayList.prototype.addAll = function (items, replaceIndex) {
        //add all items to the collection
        for (var i = 0; i < items.length; i++) {
            if (items[i].hasOwnProperty('addItemAt') && !isNaN(items[i].addItemAt)) {
                //object:any, index:number, suppressChangeEvent:boolean=false, hash?:Object, key?:string, replaceIndex:boolean=false
                this.insert(items[i].item, items[i].addItemAt, true, null, null, replaceIndex);
            }
            else {
                this.addItem(items[i]);
            }
        }
        this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, { type: 'addAll', items: items }));
    };
    ArrayList.prototype.getItemAt = function (index) {
        if (index > -1 && index < this.aList.length)
            return this.aList[index];
        else
            return undefined; //Out of bound array, return undefined
    };
    ArrayList.prototype.clear = function () {
        this.aList = [];
        this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, { type: 'removeAll' }));
    };
    ArrayList.prototype.clearHash = function (hash) {
        for (var prop in hash) {
            hash[prop] = null;
            delete hash[prop];
        }
    };
    ArrayList.prototype.removeItemFromHash = function (hash, key) {
        hash[key] = null;
        delete hash[key];
    };
    ArrayList.prototype.removeItemAt = function (index) {
        var m_count = this.aList.length;
        var item = this.getItemAt(index);
        if (m_count > 0 && index > -1 && index < this.aList.length) {
            switch (index) {
                case 0:
                    this.aList.shift();
                    break;
                case m_count - 1:
                    this.aList.pop();
                    break;
                default:
                    var head = this.aList.slice(0, index);
                    var tail = this.aList.slice(index + 1);
                    this.aList = head.concat(tail);
                    break;
            }
        }
        this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, { type: 'remove', item: item }));
    };
    ArrayList.prototype.insert = function (object, index, suppressChangeEvent, hash, key, replaceIndex) {
        if (suppressChangeEvent === void 0) { suppressChangeEvent = false; }
        if (replaceIndex === void 0) { replaceIndex = false; }
        if (!this.allowInsert(object, hash, key)) {
            return;
        }
        var m_count = this.aList.length;
        var m_returnValue = -1;
        if (index > -1) {
            switch (index) {
                case 0:
                    this.aList.unshift(object);
                    m_returnValue = 0;
                    break;
                case m_count:
                    this.aList.push(object);
                    m_returnValue = m_count;
                    break;
                default:
                    if (index > m_count) {
                        for (var i = 0; i < index - m_count; i++) {
                            this.aList.push(null);
                        }
                    }
                    var head = this.aList.slice(0, index);
                    var tailIndex = (replaceIndex) ? index + 1 : index; //if we are to replace the current index in the array use index +1 which should drop the old item from the array
                    var tail = this.aList.slice(tailIndex);
                    tail.unshift(object);
                    this.aList = head.concat(tail);
                    m_returnValue = index;
                    break;
            }
        }
        if (!suppressChangeEvent) {
            this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, { type: 'add', item: object }));
        }
        return m_returnValue;
    };
    ArrayList.prototype.changeIndex = function (fromIndex, toIndex, suppressChangeEvent) {
        var object = this.aList[fromIndex];
        this.aList.splice(toIndex, 0, this.aList.splice(fromIndex, 1)[0]);
        if (!suppressChangeEvent) {
            this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE_ORDER, { type: 'change', item: object, fromIndex: fromIndex, toIndex: toIndex }));
        }
    };
    ArrayList.prototype.swapIndex = function (fromIndex, toIndex, suppressChangeEvent) {
        var object = this.aList[fromIndex];
        this.aList[toIndex] = this.aList.splice(fromIndex, 1, this.aList[toIndex])[0];
        if (!suppressChangeEvent) {
            this.dispatch(new CollectionEvent_1.CollectionEvent(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE_ORDER, { type: 'swap', item: object, fromIndex: fromIndex, toIndex: toIndex }));
        }
    };
    ArrayList.prototype.indexOf = function (object, startIndex) {
        if (startIndex === null || startIndex === undefined) {
            startIndex = 0;
        }
        var m_count = this.aList.length;
        var m_returnValue = -1;
        if (startIndex > -1 && startIndex < m_count) {
            var i = startIndex;
            while (i < m_count) {
                if (this.aList[i] == object) {
                    m_returnValue = i;
                    break;
                }
                i++;
            }
        }
        return m_returnValue;
    };
    ArrayList.prototype.lastIndexOf = function (object, startIndex) {
        var m_count = this.aList.length;
        var m_returnValue = -1;
        if (startIndex > -1 && startIndex < m_count) {
            var i = m_count - 1;
            while (i >= startIndex) {
                if (this.aList[i] == object) {
                    m_returnValue = i;
                    break;
                }
                i--;
            }
        }
        return m_returnValue;
    };
    return ArrayList;
}(Subject_1.Subject));
exports.ArrayList = ArrayList;
//# sourceMappingURL=ArrayList.js.map