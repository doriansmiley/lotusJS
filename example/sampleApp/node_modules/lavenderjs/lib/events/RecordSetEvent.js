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
var RecordSetEvent = (function (_super) {
    __extends(RecordSetEvent, _super);
    function RecordSetEvent(type, payload) {
        return _super.call(this, type, payload) || this;
    }
    RecordSetEvent.prototype.clone = function (type, payload) {
        return new RecordSetEvent(this.type, this.payload);
    };
    RecordSetEvent.TOTALRECORDS_CHANGE = 'totalRecordsChange';
    RecordSetEvent.TOTALPAGES_CHANGE = 'totalPagesChange';
    RecordSetEvent.PAGE_LIST_CHANGE = 'pageListChange';
    RecordSetEvent.RESULTS_CHANGE = 'resultsChange';
    RecordSetEvent.RECORDS_PER_PAGE_CHANGE = 'recordsPerPageChange';
    RecordSetEvent.SELECTED_PAGE_CHANGE = 'selectedPageChange';
    RecordSetEvent.RECORDSETS_CHANGE = 'recordsetChange';
    RecordSetEvent.LOAD_PAGE_DATA = 'loadRecordSetPageData';
    return RecordSetEvent;
}(AbstractEvent_1.AbstractEvent));
exports.RecordSetEvent = RecordSetEvent;
//# sourceMappingURL=RecordSetEvent.js.map