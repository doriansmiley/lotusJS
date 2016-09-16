/**
 * Created by dsmiley on 8/18/15.
 */
SampleApp.ImageGalleryView = function () {
    Lotus.AbstractThumbnailView.prototype.constructor.call(this);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractThumbnailView, SampleApp.ImageGalleryView);

SampleApp.ImageGalleryView.prototype.onDragStart = function ( event ) {
    if( event.dataTransfer !== null && event.dataTransfer !== undefined ){
        event.dataTransfer.effectAllowed = 'all';
        try{
            event.dataTransfer.setData('galleryImage', this.model.asset.source);
        }catch(e){
            event.dataTransfer.setData('text', this.model.asset.source);//IE only allows two possible key values, text is the nest options
        }
    }else{
        event.originalEvent.dataTransfer.effectAllowed = 'all';
        try{
            event.originalEvent.dataTransfer.setData('galleryImage', this.model.asset.source);
        }catch(e){
            event.originalEvent.dataTransfer.setData('text', this.model.asset.source);//IE only allows two possible key values, text is the nest options
        }
    }
}