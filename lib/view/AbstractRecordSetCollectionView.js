"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 8/23/17.
 */
const Lavender = require("lavenderjs/lib");
const SkinPart_1 = require("./SkinPart");
const AbstractCollectionView_1 = require("./AbstractCollectionView");
class AbstractRecordSetCollectionView extends AbstractCollectionView_1.AbstractCollectionView {
    get recordSet() {
        return this._recordSet;
    }
    set recordSet(value) {
        this.removeCollectionEventListeners(); //must occur first
        this._recordSet = value;
        this.addCollectionEventListeners(); //must occur after line above
        this.notify(value, 'recordSet');
    }
    get navBtnEnabledClass() {
        return this._navBtnEnabledClass;
    }
    set navBtnEnabledClass(value) {
        this._navBtnEnabledClass = value;
        this.notify(value, 'navBtnEnabledClass');
    }
    get navBtnDisabledClass() {
        return this._navBtnDisabledClass;
    }
    set navBtnDisabledClass(value) {
        this._navBtnDisabledClass = value;
        this.notify(value, 'navBtnDisabledClass');
    }
    get nextBtn() {
        return this._nextBtn;
    }
    set nextBtn(value) {
        this._nextBtn = value;
        this.notify(value, 'nextBtn');
    }
    get pervBtn() {
        return this._pervBtn;
    }
    set pervBtn(value) {
        this._pervBtn = value;
        this.notify(value, 'pervBtn');
    }
    get firstBtn() {
        return this._firstBtn;
    }
    set firstBtn(value) {
        this._firstBtn = value;
        this.notify(value, 'firstBtn');
    }
    get lastBtn() {
        return this._lastBtn;
    }
    set lastBtn(value) {
        this._lastBtn = value;
        this.notify(value, 'lastBtn');
    }
    constructor() {
        super();
        this.nextBtn = null;
        this.pervBtn = null;
        this.firstBtn = null;
        this.lastBtn = null;
    }
    addCollectionEventListeners() {
        //IMPORTANT, do not call super, we don't want to listen for collection change events but instead the events below
        if (this.recordSet !== null && this.recordSet !== undefined) {
            this.recordSet.addEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, this, 'onResultsChange');
            this.binder.bind(this.recordSet, 'pageList', this, 'onPageListChange', null, null, 'pageListChaneHandler');
        }
    }
    removeCollectionEventListeners() {
        //IMPORTANT, do not call super
        //This method can be called as part of a destroy sequence where the collection is nulled out, so we check for NPE
        if (this.recordSet !== null && this.recordSet !== undefined) {
            //remove old event listeners
            this.recordSet.removeEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, this, 'onResultsChange');
        }
        if (this.binder !== null && this.binder !== undefined) {
            this.binder.unbind('pageListChaneHandler');
        }
    }
    onClickHandler(event) {
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
    }
    refreshNavButtonDisplay(button, type) {
        if (button.classList.contains(this.navBtnDisabledClass)) {
            button.classList.remove(this.navBtnDisabledClass);
        }
        if (button.classList.contains(this.navBtnEnabledClass)) {
            button.classList.remove(this.navBtnEnabledClass);
        }
        let classToAdd;
        if (type === 'next') {
            classToAdd = (this.recordSet.selectedPage + 1 > this.recordSet.totalPages) ? this.navBtnDisabledClass : this.navBtnEnabledClass;
        }
        else {
            classToAdd = (this.recordSet.selectedPage - 1 < 1) ? this.navBtnDisabledClass : this.navBtnEnabledClass;
        }
        button.classList.add(classToAdd);
    }
    onResultsChange(event) {
        this.render();
    }
    onPageListChange(value) {
        this.render();
    }
    initCollection() {
        //assign a default collection if it has not already been set
        if (this.recordSet === null || this.recordSet === undefined) {
            this.recordSet = new Lavender.RecordSet();
        }
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('nextBtn', this, 'nextBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('pervBtn', this, 'pervBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('firstBtn', this, 'firstBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('lastBtn', this, 'lastBtn'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            //optional container for displaying collection elements
            case 'nextBtn':
                this.nextBtn.addEventListener('click', this.onClickHandler.bind(this));
                break;
            case 'pervBtn':
                this.pervBtn.addEventListener('click', this.onClickHandler.bind(this));
                break;
            case 'firstBtn':
                this.firstBtn.addEventListener('click', this.onClickHandler.bind(this));
                break;
            case 'lastBtn':
                this.lastBtn.addEventListener('click', this.onClickHandler.bind(this));
                break;
        }
        //IMPORTANT: you could defined these classes on a sort of dummy skin part defined within the component, or on one of the buttons
        if (element.getAttribute('data-enabledClass') !== null && element.getAttribute('data-enabledClass') !== undefined) {
            this.navBtnEnabledClass = element.getAttribute('data-enabledClass');
        }
        if (element.getAttribute('data-disabled-class') !== null && element.getAttribute('data-disabled-class') !== undefined) {
            this.navBtnDisabledClass = element.getAttribute('data-disabled-class');
        }
    }
    render() {
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
        for (let i = 0; i < this.recordSet.pageList.length; i++) {
            let model = this.recordSet.pageList.getItemAt(i);
            this.addChildView(model);
        }
        this.selectedItem = null; //reset the selected item state
    }
    destroy() {
        super.destroy();
        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', this.onClickHandler);
        }
        if (this.pervBtn) {
            this.pervBtn.removeEventListener('click', this.onClickHandler);
        }
        if (this.firstBtn) {
            this.firstBtn.removeEventListener('click', this.onClickHandler);
        }
        if (this.lastBtn) {
            this.lastBtn.removeEventListener('click', this.onClickHandler);
        }
        this.recordSet.destroy();
        this.navBtnEnabledClass = null;
        this.navBtnDisabledClass = null;
        this.nextBtn = null;
        this.pervBtn = null;
        this.firstBtn = null;
        this.lastBtn = null;
        this.recordSet = null;
    }
}
exports.AbstractRecordSetCollectionView = AbstractRecordSetCollectionView;
//# sourceMappingURL=AbstractRecordSetCollectionView.js.map