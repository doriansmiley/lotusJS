/**
 * Created by dsmiley on 10/18/16.
 */
Lotus.ImageGalleryItemDetail = function () {
    //Define private vars
    var _asset;
    var _nameLabel;
    var _dateCreatedLabel;
    var _urlLabel;
    // Define our getters and setters
    this.addProperties({
            asset: {
                get: function () {
                    return _asset;
                },
                set: function (val) {
                    _asset = val;
                    this.Notify(val, 'asset');
                    this.render();
                }
            },
            nameLabel: {
                get: function () {
                    return _nameLabel;
                },
                set: function (val) {
                    _nameLabel = val;
                    this.Notify(val, 'nameLabel');
                }
            },
            dateCreatedLabel: {
                get: function () {
                    return _dateCreatedLabel;
                },
                set: function (val) {
                    _dateCreatedLabel = val;
                    this.Notify(val, 'dateCreatedLabel');
                }
            },
            urlLabel: {
                get: function () {
                    return _urlLabel;
                },
                set: function (val) {
                    _urlLabel = val;
                    this.Notify(val, 'urlLabel');
                }
            }
        }
    );
    Lotus.AbstractComponent.prototype.constructor.call(this);
}
/************* Inherit from Lotus.AbstractComponent for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractComponent, Lotus.ImageGalleryItemDetail);

Lotus.ImageGalleryItemDetail.prototype.defineSkinParts = function () {
    //set up skin parts
    this.skinParts.addItem(new Lotus.SkinPart('nameLabel', this, 'nameLabel'));
    this.skinParts.addItem(new Lotus.SkinPart('dateCreatedLabel', this, 'dateCreatedLabel'));
    this.skinParts.addItem(new Lotus.SkinPart('urlLabel', this, 'urlLabel'));
}

Lotus.ImageGalleryItemDetail.prototype.created = function (element) {
    console.log('Lotus.ImageGalleryItemDetail.prototype.created');
    Lotus.AbstractComponent.prototype.created.call(this, element);
    this.render();
}

Lotus.ImageGalleryItemDetail.prototype.render = function () {
    if (this.asset && this.ready) {
        if(this.nameLabel){
            this.nameLabel.value = this.asset.objectName;
        }
        if(this.dateCreatedLabel){
            this.dateCreatedLabel.value = this.asset.createdDate.toDateString();
        }
        if(this.urlLabel){
            this.urlLabel.value = this.asset.url;
        }
    }
}

Lotus.ImageGalleryItemDetail.prototype.destroy = function(){
    Lotus.AbstractComponent.prototype.destroy.call(this);
    this.asset = null;
    this.nameLabel = null;
    this.dateCreatedLabel = null;
    this.urlLabel = null;
}