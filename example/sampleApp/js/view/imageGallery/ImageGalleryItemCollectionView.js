/**
 * Created by dsmiley on 5/20/15.
 */
SampleApp.ImageGalleryItemCollectionView = function () {
    Lotus.AbstractRecordSetCollectionView.prototype.constructor.call(this);

}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractRecordSetCollectionView, SampleApp.ImageGalleryItemCollectionView);

SampleApp.ImageGalleryItemCollectionView.prototype.onItemSelectedDeselect = function( event ){
    //remove the selected item class from the previously selected layout. 
    //The resetState method is a method that belongs to the ImageGalleryItemView object. The is here to simply show an example of how to override methods in AbstractRecordSetCollectionView
    if( this.selectedItem !== null && this.selectedItem !== undefined && event.payload.item !== this.selectedItem ){
        this.selectedItem.resetState();
    }
    //now call super which resets the selected item
    Lotus.AbstractRecordSetCollectionView.prototype.onItemSelectedDeselect.call(this, event)

    this.collection.results.selectedImage= ( this.selectedItem !== null ) ? this.selectedItem.model : null;
}
