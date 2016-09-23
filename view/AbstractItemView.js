/**
 * Created by dsmiley on 1/28/15.
 */
Lotus.AbstractItemView = function () {
    var _model;
    Lotus.AbstractComponent.prototype.constructor.call(this);
    // Define our getters and setters
    this.addProperties({
            model: {
                get: function () {
                    return _model;
                },
                set: function (val) {
                    _model = val;
                    this.Notify(val, 'model');
                }
            }
        }
    );
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.AbstractComponent, Lotus.AbstractItemView);

Lotus.AbstractItemView.prototype.destroy = function () {
    Lotus.AbstractComponent.prototype.destroy.call(this);
    this.model = null;

}

Lotus.AbstractItemView.prototype.setElementDisplay = function (element, display) {
    if( element !== null && element !== undefined ){
        element.style.display = display;
    }
}