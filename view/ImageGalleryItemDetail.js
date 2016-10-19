/**
 * Created by dsmiley on 10/18/16.
 */
Lotus.ImageGalleryItemDetail = function(){
    //Define private vars
    var _item;
    var _label;
    // Define our getters and setters
    this.addProperties({
        item: {
                get: function() {
                    return _item;
                },
                set: function(val) {
                    _item = val;
                    this.Notify( val, 'item' );
                }
            },
        label: {
                get: function() {
                    return _label;
                },
                set: function(val) {
                    _label = val;
                    this.Notify( val, 'label' );
                }
            }
        }
    );
    Lotus.AbstractComponent.prototype.constructor.call(this);
}
/************* Inherit from Lotus.AbstractComponent for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractComponent, Lotus.ImageGalleryItemDetail);

Lotus.ImageGalleryItemDetail.prototype.defineSkinParts = function(){
    //set up skin parts
    this.skinParts.addItem(new Lotus.SkinPart('label', this, 'label'));
}

Lotus.ImageGalleryItemDetail.prototype.created = function(element){
    console.log('Lotus.ImageGalleryItemDetail.prototype.created');
    Lotus.AbstractComponent.prototype.created.call(this,element);
}

//stub for override
Lotus.ImageGalleryItemDetail.prototype.onSkinPartAdded = function(part, skinPart){
    switch( part ){
        case 'button':
            //add button event listener or whatever else yo want to do when this skin part is added
            //you could hold until all skin parts are added and then call addEventListeners
            console.log('Lotus.ImageGalleryItemDetail.prototype.onSkinPartAdded: part: ' + part);
            console.log('Lotus.ImageGalleryItemDetail.prototype.onSkinPartAdded: skinPart: ' + skinPart);
            this.addEventListeners();
            break;
    }
}