/**
 * Created by dsmiley on 5/11/15.
 */
SampleApp.ImageAsset = function(){
    Lavender.Subject.prototype.constructor.call(this);
    var _id;
    var _url;
    var _thumbUrl;
    var _createdDate;
    var _lastAccessDate;
    var _objectName;

    // Define our getters and setters
    this.addProperties({
        id: {
            get: function () {
                return _id;
            },
            set: function (val) {
                _id = val;
                this.notify(val, "id");
            }
        },
        thumbUrl: {
            get: function () {
                return _thumbUrl;
            },
            set: function (val) {
                _thumbUrl = val;
                this.notify(val, "thumbUrl");
            }
        },
        url: {
            get: function () {
                return _url;
            },
            set: function (val) {
                _url = val;
                this.notify(val, "url");
            }
        },
        createdDate: {
            get: function () {
                return _createdDate;
            },
            set: function (val) {
                _createdDate = new Date(val);
                this.notify(val, "createdDate");
            }
        },
        lastAccessDate: {
            get: function () {
                return _lastAccessDate;
            },
            set: function (val) {
                _lastAccessDate = new Date(val);
                this.notify(val, "lastAccessDate");
            }
        },
        objectName: {
            get: function () {
                return _objectName;
            },
            set: function (val) {
                _objectName = val;
                this.notify(val, "objectName");
            }
        }
    });
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend( Lavender.Subject, SampleApp.ImageAsset );