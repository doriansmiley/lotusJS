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
var AbstractEvent_1 = require("./AbstractEvent");
var CollectionEvent = (function (_super) {
    __extends(CollectionEvent, _super);
    function CollectionEvent(type, payload) {
        return _super.call(this, type, payload) || this;
    }
    CollectionEvent.prototype.clone = function (type, payload) {
        return new CollectionEvent(this.type, this.payload);
    };
    CollectionEvent.COLLECTION_CHANGE = 'collectionChange';
    CollectionEvent.COLLECTION_CHANGE_ORDER = 'collectionChangeOrder';
    return CollectionEvent;
}(AbstractEvent_1.AbstractEvent));
exports.CollectionEvent = CollectionEvent;
//# sourceMappingURL=CollectionEvent.js.map