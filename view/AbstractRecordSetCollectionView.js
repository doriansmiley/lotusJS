/**
 * Created by dsmiley on 5/20/15.
 */
Lotus.AbstractRecordSetCollectionView = function () {
    var _navBtnEnabledClass;
    var _navBtnDisabledClass;
    Lotus.AbstractCollectionView.prototype.constructor.call(this);
    this.addProperties({
            navBtnEnabledClass: {
                get: function () {
                    return _navBtnEnabledClass;
                },
                set: function (val) {
                    _navBtnEnabledClass = val;
                    this.Notify(val, 'navBtnEnabledClass');
                }
            },
            navBtnDisabledClass: {
                get: function () {
                    return _navBtnDisabledClass;
                },
                set: function (val) {
                    _navBtnDisabledClass = val;
                    this.Notify(val, 'navBtnDisabledClass');
                }
            }
        }
    );
    this.nextBtn = null;
    this.pervBtn = null;
    this.firstBtn = null;
    this.lastBtn = null;
    this.onNavBtnClickProxy = this.onClickHandler.bind(this);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractCollectionView, Lotus.AbstractRecordSetCollectionView);

Lotus.AbstractRecordSetCollectionView.prototype.addCollectionEventListeners = function () {
    //IMPORTANT, do not call super, we don't want to listen for collection change events but instead the events below
    if( this.collection !== null && this.collection !== undefined ){
        this.collection.addEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, this, 'onResultsChange');
        this.binder.bind(this.collection, 'pageList', this, 'onPageListChange', null, null, 'pageListChaneHandler');
    }
}

Lotus.AbstractRecordSetCollectionView.prototype.removeCollectionEventListeners = function () {
    //IMPORTANT, do not call super
    //This method can be called as part of a destory sequence where the collection is nulled out, so we check for NPE
    if( this.collection !== null && this.collection !== undefined ){
        //remove old event listeners
        this.collection.removeEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, this, 'onResultsChange');
    }
    if( this.binder !== null && this.binder !== undefined ){
        this.binder.unbind('pageListChaneHandler');
    }
}

Lotus.AbstractRecordSetCollectionView.prototype.addSkinPart = function (part, element) {
    Lotus.AbstractCollectionView.prototype.addSkinPart.call(this, part, element )
    switch(part){
        //optional container for displaying collection elements
        case 'nextBtn':
            this.nextBtn = element;
            this.nextBtn.addEventListener('click', this.onNavBtnClickProxy);
            break;
        case 'pervBtn':
            this.pervBtn = element;
            this.pervBtn.addEventListener('click', this.onNavBtnClickProxy);
            break;
        case 'firstBtn':
            this.firstBtn = element;
            this.firstBtn.addEventListener('click', this.onNavBtnClickProxy);
            break;
        case 'lastBtn':
            this.lastBtn = element;
            this.lastBtn.addEventListener('click', this.onNavBtnClickProxy);
            break;
    }
    //IMPORTANT: you could defined these classes on a sort of dummy skin part defined within the component, or on one of the buttons
    if( element.getAttribute('enabled-class') !== null && element.getAttribute('enabled-class') !== undefined ){
        this.navBtnEnabledClass = element.getAttribute('enabled-class');
    }
    if( element.getAttribute('disabled-class') !== null && element.getAttribute('disabled-class') !== undefined ){
        this.navBtnDisabledClass = element.getAttribute('disabled-class');
    }
}

Lotus.AbstractRecordSetCollectionView.prototype.onClickHandler = function( event ){
    switch( event.target.getAttribute('skin-part') ){
        case 'nextBtn':
            if( this.collection.selectedPage + 1 > this.collection.totalPages ){
                return;
            }
            this.collection.selectedPage += 1;
            break;
        case 'pervBtn':
            if( this.collection.selectedPage - 1 < 1 ){
                return;
            }
            this.collection.selectedPage -= 1;
            break;
        case 'firstBtn':
            this.collection.selectedPage = 1;
            break;
        case 'lastBtn':
            this.collection.selectedPage = this.collection.totalPages;
            break;
    }
}

Lotus.AbstractRecordSetCollectionView.prototype.render = function () {
    if( this.itemView === null || this.itemView == undefined ){
        throw Error('attribute-item-view must be defined on the tag instance and point to a valid constructor');
    }
    //clear the current view
    this.removeAllChildViews();
    if( this.nextBtn ){
        this.refreshNavButtonDisplay( this.nextBtn, 'next');
    }
    if( this.pervBtn ){
        this.refreshNavButtonDisplay( this.pervBtn, 'prev');
    }
    if( this.firstBtn ){
        this.refreshNavButtonDisplay( this.firstBtn, 'prev');
    }
    if( this.lastBtn ){
        this.refreshNavButtonDisplay( this.lastBtn, 'next');
    }
    if (this.collection.pageList === null || this.collection.pageList === undefined) {
        return;
    }
    //populate the new view using the record set's current page
    for (var i = 0; i < this.collection.pageList.length(); i++) {
        var model = this.collection.pageList.getItemAt(i);
        this.addChildView(model);
    }
    this.selectedItem = null;//reset the selected item state
}

Lotus.AbstractRecordSetCollectionView.prototype.refreshNavButtonDisplay = function( button, type ){
    if(button.classList.contains(this.navBtnDisabledClass)){
        button.classList.remove(this.navBtnDisabledClass)
    }
    if(button.classList.contains(this.navBtnEnabledClass)){
        button.classList.remove(this.navBtnEnabledClass)
    }
    var classToAdd;
    if( type === 'next' ){
        classToAdd = ( this.collection.selectedPage + 1 > this.collection.totalPages ) ? this.navBtnDisabledClass : this.navBtnEnabledClass;
    }else{
        classToAdd =  ( this.collection.selectedPage - 1 < 1 ) ? this.navBtnDisabledClass : this.navBtnEnabledClass;
    }
    button.classList.add(classToAdd);
}

Lotus.AbstractRecordSetCollectionView.prototype.onResultsChange = function (event) {
    this.render();
}

Lotus.AbstractRecordSetCollectionView.prototype.onPageListChange = function (value) {
    this.render();
}

Lotus.AbstractRecordSetCollectionView.prototype.getCollection = function (event) {
    return new Lavender.RecordSet();
}