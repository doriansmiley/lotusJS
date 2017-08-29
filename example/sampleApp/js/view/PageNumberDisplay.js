/**
 * Created by dsmiley on 8/28/17.
 */
SampleApp.PageNumberDisplay = function () {
    var _pageNumberLabel;
    Lotus.AbstractItemView.prototype.constructor.call(this);
    // Define our getters and setters
    this.addProperties({
        pageNumberLabel: {
            get: function () {
                return _pageNumberLabel;
            },
            set: function (val) {
                _pageNumberLabel = val;
                this.notify(val, "pageNumberLabel");
            }
        }
    });
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractItemView, SampleApp.PageNumberDisplay);

SampleApp.PageNumberDisplay.prototype.onModelChange = function(value){
    Lotus.AbstractItemView.prototype.onModelChange.call(this, value);
    if(this.pageNumberLabel){
        this.pageNumberLabel.innerHTML = value;
    }
}

SampleApp.PageNumberDisplay.prototype.defineSkinParts = function(){
    Lotus.AbstractItemView.prototype.defineSkinParts.call(this);
    this.skinParts.addItem(new Lotus.SkinPart('pageNumberLabel', this, 'pageNumberLabel'));
}