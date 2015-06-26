/**
 * Created by dsmiley on 6/26/15.
 */
SampleApp.ImageGalleryModel = function() {
    var _imageAssets = new Lavender.ArrayList();

    Lavender.Subject.prototype.constructor.call(this);

    this.addProperties({
        imageAssets: {
            get: function () {
                return _imageAssets;
            },
            set: function (val) {
                _imageAssets = val;
                this.Notify(val, "imageAssets");
            }
        }
    });
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, SampleApp.ImageGalleryModel);