/**
 * Created by dsmiley on 8/23/17.
 */
import * as Lavender from 'lavenderjs/lib';
import {SkinPart} from './SkinPart';
import {AbstractCollectionView} from './AbstractCollectionView';

export class AbstractRecordSetCollectionView extends AbstractCollectionView {
    private _navBtnEnabledClass: string;
    private _navBtnDisabledClass: string;
    private _nextBtn: HTMLElement;
    private _pervBtn: HTMLElement;
    private _firstBtn: HTMLElement;
    private _lastBtn: HTMLElement;
    private _recordSet: Lavender.RecordSet;

    get recordSet(): Lavender.RecordSet {
        return this._recordSet;
    }

    set recordSet(value: Lavender.RecordSet) {
        this.removeCollectionEventListeners();// must occur first
        this._recordSet = value;
        this.addCollectionEventListeners();// must occur after line above
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

    protected addCollectionEventListeners(): void{
        // IMPORTANT, do not call super, we don't want to listen for collection change events but instead the events below
        if (this.recordSet !== null && this.recordSet !== undefined) {
            this.recordSet.addEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, this, 'onResultsChange');
            this.binder.bind(this.recordSet, 'pageList', this, 'onPageListChange', null, null, 'pageListChaneHandler');
        }
    }

    protected removeCollectionEventListeners(): void{
        // IMPORTANT, do not call super
        // This method can be called as part of a destroy sequence where the collection is nulled out, so we check for NPE
        if (this.recordSet !== null && this.recordSet !== undefined) {
            // remove old event listeners
            this.recordSet.removeEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, this, 'onResultsChange');
        }
        if (this.binder !== null && this.binder !== undefined) {
            this.binder.unbind('pageListChaneHandler');
        }
    }

    protected onClickHandler(event: Event): void{
        // event.currentTarget always refers to the element the event handler has been attached to as opposed to event.target which identifies the element on which the event occurred.
        switch ((event.currentTarget as HTMLElement).getAttribute('data-skin-part')) {
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

    protected refreshNavButtonDisplay(button: HTMLElement, type: string): void{
        if (button.classList.contains(this.navBtnDisabledClass)) {
            button.classList.remove(this.navBtnDisabledClass)
        }
        if (button.classList.contains(this.navBtnEnabledClass)) {
            button.classList.remove(this.navBtnEnabledClass)
        }
        let classToAdd;
        if (type === 'next') {
            classToAdd = (this.recordSet.selectedPage + 1 > this.recordSet.totalPages) ? this.navBtnDisabledClass : this.navBtnEnabledClass;
        } else {
            classToAdd =  (this.recordSet.selectedPage - 1 < 1) ? this.navBtnDisabledClass : this.navBtnEnabledClass;
        }
        button.classList.add(classToAdd);
    }
    
    protected onResultsChange(event: Lavender.RecordSetEvent): void{
        this.render();
    }

    protected onPageListChange(value: Lavender.IList): void{
        this.render();
    }

    protected initCollection(): void{
        // assign a default collection if it has not already been set
        if (this.recordSet === null || this.recordSet === undefined) {
            this.recordSet = new Lavender.RecordSet();
        }
    }

    public defineSkinParts(): void{
        super.defineSkinParts();
        // set up skin parts
        this.skinParts.addItem(new SkinPart('nextBtn', this, 'nextBtn'));
        this.skinParts.addItem(new SkinPart('pervBtn', this, 'pervBtn'));
        this.skinParts.addItem(new SkinPart('firstBtn', this, 'firstBtn'));
        this.skinParts.addItem(new SkinPart('lastBtn', this, 'lastBtn'));
    }

    public onSkinPartAdded(part: string, element: HTMLElement): void{
        super.onSkinPartAdded(part, element);
        switch (part) {
            // optional container for displaying collection elements
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
        // IMPORTANT: you could defined these classes on a sort of dummy skin part defined within the component, or on one of the buttons
        if (element.getAttribute('data-enabledClass') !== null && element.getAttribute('data-enabledClass') !== undefined) {
            this.navBtnEnabledClass = element.getAttribute('data-enabledClass');
        }
        if (element.getAttribute('data-disabled-class') !== null && element.getAttribute('data-disabled-class') !== undefined) {
            this.navBtnDisabledClass = element.getAttribute('data-disabled-class');
        }
    }

    public render(): void{
        // IMPORTANT: do not call super!
        if (this.itemView === null || this.itemView == undefined) {
            throw Error('data-attribute-item-view must be defined on the tag instance and point to a valid constructor');
        }
        // clear the current view
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
        // populate the new view using the record set's current page
        for (let i = 0; i < this.recordSet.pageList.length; i++) {
            const model = this.recordSet.pageList.getItemAt(i);
            this.addChildView(model);
        }
        this.selectedItem = null;// reset the selected item state
    }

    public destroy(): void{
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