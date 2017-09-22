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
var RecordSetList_1 = require("./RecordSetList");
var ObjectUtils_1 = require("../../util/ObjectUtils");
var EventDispatcher_1 = require("../../control/EventDispatcher");
var Subject_1 = require("../observable/Subject");
var RecordSetEvent_1 = require("../../events/RecordSetEvent");
var RecordSetModel = (function (_super) {
    __extends(RecordSetModel, _super);
    function RecordSetModel() {
        var _this = _super.call(this) || this;
        _this._recordSets = new RecordSetList_1.RecordSetList();
        ObjectUtils_1.ObjectUtils.mixin(EventDispatcher_1.EventDispatcher, RecordSetModel, _this);
        return _this;
    }
    Object.defineProperty(RecordSetModel.prototype, "recordSets", {
        get: function () {
            return this._recordSets;
        },
        set: function (value) {
            this._recordSets = value;
            this.notify(value, "recordSets");
            this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.RECORDSETS_CHANGE));
        },
        enumerable: true,
        configurable: true
    });
    return RecordSetModel;
}(Subject_1.Subject));
exports.RecordSetModel = RecordSetModel;
//# sourceMappingURL=RecordSetModel.js.map