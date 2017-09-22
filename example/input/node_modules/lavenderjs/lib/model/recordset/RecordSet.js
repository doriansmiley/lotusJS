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
 * Created by dsmiley on 5/12/17.
 */
var Subject_1 = require("../observable/Subject");
var CollectionEvent_1 = require("../../events/CollectionEvent");
var RecordSetEvent_1 = require("../../events/RecordSetEvent");
var ArrayList_1 = require("../list/ArrayList");
var ObjectUtils_1 = require("../../util/ObjectUtils");
var EventDispatcher_1 = require("../../control/EventDispatcher");
var RecordSet = (function (_super) {
    __extends(RecordSet, _super);
    function RecordSet(timeToLive, listFunction) {
        if (timeToLive === void 0) { timeToLive = NaN; }
        if (listFunction === void 0) { listFunction = null; }
        var _this = _super.call(this) || this;
        _this.resultsByPage = {};
        ObjectUtils_1.ObjectUtils.mixin(EventDispatcher_1.EventDispatcher, RecordSet, _this);
        _this._timeToLive = timeToLive;
        _this._results = (listFunction) ? new listFunction() : new ArrayList_1.ArrayList();
        _this._pageList = (listFunction) ? new listFunction() : new ArrayList_1.ArrayList();
        if (!isNaN(_this._timeToLive)) {
            _this._intervalId = setTimeout(function () {
                _this.clear();
            });
        } //func, delay[, param1, param2, ...]
        _this._results.addEventListener(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, _this, 'resultCollectionChanged');
        return _this;
    }
    Object.defineProperty(RecordSet.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            this._id = val;
            this.notify(val, "id");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            if (this._totalRecords != val) {
                this._totalRecords = val;
                this.notify(val, "totalRecords");
                this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.TOTALRECORDS_CHANGE));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "totalPages", {
        get: function () {
            return this._totalPages;
        },
        set: function (val) {
            if (this._totalPages != val) {
                this._totalPages = val;
                this.notify(val, "totalPages");
                this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.TOTALPAGES_CHANGE));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "selectedPage", {
        get: function () {
            return this._selectedPage;
        },
        set: function (val) {
            if (this._selectedPage != val) {
                //IMPORTANT: set the value first so responders to the ImageAssetEvent.GET_IMAGE_ASSETS event know what page we need to load data for
                this._selectedPage = val;
                if (val >= 1 && !this.pageLoaded(val)) {
                    this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.LOAD_PAGE_DATA, { recordSet: this }));
                }
                this.calculatePageList();
                this.notify(val, "selectedPage");
                this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.SELECTED_PAGE_CHANGE));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "recordsPerPage", {
        get: function () {
            return this._recordsPerPage;
        },
        set: function (val) {
            if (this._recordsPerPage != val) {
                this._recordsPerPage = val;
                this.renewState();
                this.notify(val, "recordsPerPage");
                this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.RECORDS_PER_PAGE_CHANGE));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "results", {
        get: function () {
            return this._results;
        },
        set: function (val) {
            if (this._results != val) {
                if (this._results !== null && this._results !== undefined) {
                    this._results.removeEventListener(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, this, 'resultCollectionChanged');
                }
                this._results = val;
                if (this._results !== null && this._results !== undefined) {
                    this.renewState();
                    this.selectedPage = 1;
                    this._results.addEventListener(CollectionEvent_1.CollectionEvent.COLLECTION_CHANGE, this, 'resultCollectionChanged');
                }
                this.notify(val, "results");
                this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.RESULTS_CHANGE));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "createdOn", {
        get: function () {
            return this._createdOn;
        },
        set: function (val) {
            this._createdOn = val;
            this.notify(val, "createdOn");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "pageList", {
        get: function () {
            return this._pageList;
        },
        set: function (val) {
            this._pageList = val;
            this.notify(val, "pageList");
            this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.PAGE_LIST_CHANGE));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "timeToLive", {
        get: function () {
            return this._timeToLive;
        },
        set: function (val) {
            var _this = this;
            this._timeToLive = val;
            if (this._intervalId !== null && this._intervalId !== undefined) {
                this.clearInterval();
                //TODO:have this reload data instead of clearing it
                //set the timeout to _timeToLive. This will clear the recordset at the interval
                //calling this accessor multiple times will reset the timeout preserving the records
                this._intervalId = setTimeout(function () { _this.clear; }, val);
            }
            this.notify(val, "timeToLive");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "source", {
        get: function () {
            return this._source;
        },
        set: function (val) {
            this._source = val;
            this.notify(val, "source");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordSet.prototype, "routeController", {
        get: function () {
            return this._routeController;
        },
        set: function (val) {
            this._routeController = val;
            this.notify(val, "routeController");
        },
        enumerable: true,
        configurable: true
    });
    RecordSet.prototype.clearInterval = function () {
        if (this._intervalId !== null && this._intervalId !== undefined) {
            clearInterval(this._intervalId);
        }
    };
    RecordSet.prototype.clear = function () {
        if (this.results !== undefined && this.results !== null) {
            this.results.clear();
        }
        this.totalRecords = 0;
        this.totalPages = 0;
        this.resultsByPage[this.selectedPage] = new ArrayList_1.ArrayList();
        this.resultsByPage = {};
        this.selectedPage = -1;
        this.renewState();
    };
    RecordSet.prototype.pageLoaded = function (pageNumber) {
        return this.resultsByPage[pageNumber] !== null && this.resultsByPage[pageNumber] !== undefined && (this.resultsByPage[pageNumber].length == this.recordsPerPage || pageNumber == this.totalPages);
    };
    RecordSet.prototype.calculatePageList = function () {
        this.pageList = this.resultsByPage[this.selectedPage];
    };
    RecordSet.prototype.renewState = function () {
        this.totalPages = (Math.ceil(this.totalRecords / this.recordsPerPage));
        //loop through each page
        for (var pageIndex = 1; pageIndex <= this.totalPages; pageIndex++) {
            var first = (pageIndex - 1) * this.recordsPerPage;
            var last = ((first + this.recordsPerPage) > this.totalRecords) ? this.totalRecords : first + this.recordsPerPage;
            var dp = new ArrayList_1.ArrayList();
            if (this.results !== null && this.results !== undefined) {
                for (var i = first; i < last; i++) {
                    //because items can be added to the results in a non sequential manner (ie page 5 can be loaded before page 2) we have to check to make sure the items are loaded
                    if (this.results.getItemAt(i) === null || this.results.getItemAt(i) === undefined) {
                        continue;
                    }
                    dp.addItem(this.results.getItemAt(i));
                }
            }
            //if no items were added do not populate the page data index
            if (dp.length > 0) {
                this.resultsByPage[pageIndex] = dp;
            }
        }
        this.calculatePageList();
        this.dispatch(new RecordSetEvent_1.RecordSetEvent(RecordSetEvent_1.RecordSetEvent.RESULTS_CHANGE));
    };
    RecordSet.prototype.resultCollectionChanged = function (event) {
        this.renewState();
    };
    RecordSet.prototype.destroy = function () {
        this.clearInterval();
        this.results = null;
        this.pageList = null;
        this.resultsByPage = null;
    };
    RecordSet.USER_UPLOAD = 'userUpload';
    RecordSet.FOTOLIA = 'fotolia';
    RecordSet.FACEBOOK = 'facebook';
    return RecordSet;
}(Subject_1.Subject));
exports.RecordSet = RecordSet;
//# sourceMappingURL=RecordSet.js.map