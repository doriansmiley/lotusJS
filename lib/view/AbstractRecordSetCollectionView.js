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
 * Created by dsmiley on 8/23/17.
 */
var lib_1 = require("../../node_modules/lavenderjs/lib");
var lib_2 = require("../../node_modules/lavenderjs/lib");
var SkinPart_1 = require("./SkinPart");
var AbstractCollectionView_1 = require("./AbstractCollectionView");
var AbstractRecordSetCollectionView = (function (_super) {
    __extends(AbstractRecordSetCollectionView, _super);
    function AbstractRecordSetCollectionView() {
        var _this = _super.call(this) || this;
        _this.nextBtn = null;
        _this.pervBtn = null;
        _this.firstBtn = null;
        _this.lastBtn = null;
        return _this;
    }
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "recordSet", {
        get: function () {
            return this._recordSet;
        },
        set: function (value) {
            this.removeCollectionEventListeners(); //must occur first
            this._recordSet = value;
            this.addCollectionEventListeners(); //must occur after line above
            this.notify(value, 'recordSet');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "navBtnEnabledClass", {
        get: function () {
            return this._navBtnEnabledClass;
        },
        set: function (value) {
            this._navBtnEnabledClass = value;
            this.notify(value, 'navBtnEnabledClass');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "navBtnDisabledClass", {
        get: function () {
            return this._navBtnDisabledClass;
        },
        set: function (value) {
            this._navBtnDisabledClass = value;
            this.notify(value, 'navBtnDisabledClass');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "nextBtn", {
        get: function () {
            return this._nextBtn;
        },
        set: function (value) {
            this._nextBtn = value;
            this.notify(value, 'nextBtn');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "pervBtn", {
        get: function () {
            return this._pervBtn;
        },
        set: function (value) {
            this._pervBtn = value;
            this.notify(value, 'pervBtn');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "firstBtn", {
        get: function () {
            return this._firstBtn;
        },
        set: function (value) {
            this._firstBtn = value;
            this.notify(value, 'firstBtn');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "lastBtn", {
        get: function () {
            return this._lastBtn;
        },
        set: function (value) {
            this._lastBtn = value;
            this.notify(value, 'lastBtn');
        },
        enumerable: true,
        configurable: true
    });
    AbstractRecordSetCollectionView.prototype.addCollectionEventListeners = function () {
        //IMPORTANT, do not call super, we don't want to listen for collection change events but instead the events below
        if (this.recordSet !== null && this.recordSet !== undefined) {
            this.recordSet.addEventListener(lib_1.RecordSetEvent.RESULTS_CHANGE, this, 'onResultsChange');
            this.binder.bind(this.recordSet, 'pageList', this, 'onPageListChange', null, null, 'pageListChaneHandler');
        }
    };
    AbstractRecordSetCollectionView.prototype.removeCollectionEventListeners = function () {
        //IMPORTANT, do not call super
        //This method can be called as part of a destroy sequence where the collection is nulled out, so we check for NPE
        if (this.recordSet !== null && this.recordSet !== undefined) {
            //remove old event listeners
            this.recordSet.removeEventListener(lib_1.RecordSetEvent.RESULTS_CHANGE, this, 'onResultsChange');
        }
        if (this.binder !== null && this.binder !== undefined) {
            this.binder.unbind('pageListChaneHandler');
        }
    };
    AbstractRecordSetCollectionView.prototype.onClickHandler = function (event) {
        //event.currentTarget always refers to the element the event handler has been attached to as opposed to event.target which identifies the element on which the event occurred.
        switch (event.currentTarget.getAttribute('data-skin-part')) {
            case 'nextBtn':
                if (this.recordSet.selectedPage + 1 > this.recordSet.totalPages) {
                    return;
                }
                this.recordSet.selectedPage += 1;
                break;
            case 'pervBtn':
                if (this.recordSet.selectedPage - 1 < 1) {
                    return;
                }
                this.recordSet.selectedPage -= 1;
                break;
            case 'firstBtn':
                this.recordSet.selectedPage = 1;
                break;
            case 'lastBtn':
                this.recordSet.selectedPage = this.recordSet.totalPages;
                break;
        }
    };
    AbstractRecordSetCollectionView.prototype.refreshNavButtonDisplay = function (button, type) {
        if (button.classList.contains(this.navBtnDisabledClass)) {
            button.classList.remove(this.navBtnDisabledClass);
        }
        if (button.classList.contains(this.navBtnEnabledClass)) {
            button.classList.remove(this.navBtnEnabledClass);
        }
        var classToAdd;
        if (type === 'next') {
            classToAdd = (this.recordSet.selectedPage + 1 > this.recordSet.totalPages) ? this.navBtnDisabledClass : this.navBtnEnabledClass;
        }
        else {
            classToAdd = (this.recordSet.selectedPage - 1 < 1) ? this.navBtnDisabledClass : this.navBtnEnabledClass;
        }
        button.classList.add(classToAdd);
    };
    AbstractRecordSetCollectionView.prototype.onResultsChange = function (event) {
        this.render();
    };
    AbstractRecordSetCollectionView.prototype.onPageListChange = function (value) {
        this.render();
    };
    AbstractRecordSetCollectionView.prototype.initCollection = function () {
        //assign a default collection if it has not already been set
        if (this.recordSet === null || this.recordSet === undefined) {
            this.recordSet = new lib_2.RecordSet();
        }
    };
    AbstractRecordSetCollectionView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('nextBtn', this, 'nextBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('pervBtn', this, 'pervBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('firstBtn', this, 'firstBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('lastBtn', this, 'lastBtn'));
    };
    AbstractRecordSetCollectionView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            //optional container for displaying collection elements
            case 'nextBtn':
                this.nextBtn.addEventListener('click', this.onClickHandler);
                break;
            case 'pervBtn':
                this.pervBtn.addEventListener('click', this.onClickHandler);
                break;
            case 'firstBtn':
                this.firstBtn.addEventListener('click', this.onClickHandler);
                break;
            case 'lastBtn':
                this.lastBtn.addEventListener('click', this.onClickHandler);
                break;
        }
        //IMPORTANT: you could defined these classes on a sort of dummy skin part defined within the component, or on one of the buttons
        if (element.getAttribute('data-enabledClass') !== null && element.getAttribute('data-enabledClass') !== undefined) {
            this.navBtnEnabledClass = element.getAttribute('data-enabledClass');
        }
        if (element.getAttribute('data-disabled-class') !== null && element.getAttribute('data-disabled-class') !== undefined) {
            this.navBtnDisabledClass = element.getAttribute('data-disabled-class');
        }
    };
    AbstractRecordSetCollectionView.prototype.render = function () {
        //IMPORTANT: do not call super!
        if (this.itemView === null || this.itemView == undefined) {
            throw Error('data-attribute-item-view must be defined on the tag instance and point to a valid constructor');
        }
        //clear the current view
        this.removeAllChildViews();
        if (this.nextBtn) {
            this.refreshNavButtonDisplay(this.nextBtn, 'next');
        }
        if (this.pervBtn) {
            this.refreshNavButtonDisplay(this.pervBtn, 'prev');
        }
        if (this.firstBtn) {
            this.refreshNavButtonDisplay(this.firstBtn, 'prev');
        }
        if (this.lastBtn) {
            this.refreshNavButtonDisplay(this.lastBtn, 'next');
        }
        if (this.recordSet.pageList === null || this.recordSet.pageList === undefined) {
            return;
        }
        //populate the new view using the record set's current page
        for (var i = 0; i < this.recordSet.pageList.length; i++) {
            var model = this.recordSet.pageList.getItemAt(i);
            this.addChildView(model);
        }
        this.selectedItem = null; //reset the selected item state
    };
    AbstractRecordSetCollectionView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.recordSet.destroy();
        this.navBtnEnabledClass = null;
        this.navBtnDisabledClass = null;
        this.nextBtn = null;
        this.pervBtn = null;
        this.firstBtn = null;
        this.lastBtn = null;
        this.recordSet = null;
    };
    return AbstractRecordSetCollectionView;
}(AbstractCollectionView_1.AbstractCollectionView));
exports.AbstractRecordSetCollectionView = AbstractRecordSetCollectionView;
//# sourceMappingURL=AbstractRecordSetCollectionView.js.map