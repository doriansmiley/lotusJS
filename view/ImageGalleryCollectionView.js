/**
 * Created by dsmiley on 8/15/15.
 */
Lotus.ImageGalleryCollectionView = function () {
    Lotus.AbstractRecordSetCollectionView.prototype.constructor.call(this);

}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractRecordSetCollectionView, Lotus.ImageGalleryCollectionView);