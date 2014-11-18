/**
 * Created by dsmiley on 11/10/14.
 */
Lotus.AbstractComponent = function(){
    var _element;
    var _context;
    var _id = Math.random();
    var _skinParts = new Lotus.SkinPartList();//ArrayList of Lotus.SkinPart instances
    Lavender.Subject.prototype.constructor.call(this);
    // Define our getters and setters
    this.addProperties({
            element: {
                get: function() {
                    return _element;
                },
                set: function(val) {
                    _element = val;
                    this.Notify( val, 'element' );
                }
            },
            context: {
                get: function() {
                    return _context;
                },
                set: function(val) {
                    _context = val;
                    this.Notify( val, 'context' );
                }
            },
            id: {
                get: function() {
                    return _id;
                },
                set: function(val) {
                    _id = val;
                    this.Notify( val, 'id' );
                }
            },
            skinParts: {
                get: function() {
                    return _skinParts;
                },
                set: function(val) {
                    _skinParts = val;
                    this.Notify( val, 'skinParts' );
                }
            }
        }
    );
    Lavender.ObjectUtils.mixin(Lavender.AbstractEventDispatcher, Lotus.AbstractComponent, this);
    this.init();
    console.log('Lotus.AbstractComponent.prototype.constructor');
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lotus.AbstractComponent);

Lotus.AbstractComponent.prototype.init = function(){
    this.defineSkinParts();
}

Lotus.AbstractComponent.prototype.created = function(element, context){
    console.log('Lotus.AbstractComponent.prototype.created');
    this.element = element;
    this.context = context;
}

Lotus.AbstractComponent.prototype.inserted = function(element){
    console.log('Lotus.AbstractComponent.prototype.inserted');
}

Lotus.AbstractComponent.prototype.removed = function(element){
    console.log('Lotus.AbstractComponent.prototype.removed');
    this.destroy();
}

Lotus.AbstractComponent.prototype.attributeChanged = function(element){
    console.log('Lotus.AbstractComponent.prototype.attributeChanged');
}

//stub for override
Lotus.AbstractComponent.prototype.addSkinPart = function(part, element){
    //assign the skin part
    this.skinParts.skinPartsByLabel[part].element = element;
    //notify
    this.onSkinPartAdded(part, this.skinParts.skinPartsByLabel[part]);
}

//stub for override
Lotus.AbstractComponent.prototype.onSkinPartAdded = function(part, element){

}

//stub for override
Lotus.AbstractComponent.prototype.defineSkinParts = function(){

}

//stub for override
Lotus.AbstractComponent.prototype.addEventListeners = function(){

}

//stub for override
Lotus.AbstractComponent.prototype.removeEventListeners = function(){

}

Lotus.AbstractComponent.prototype.destroy = function(){
    this.removeEventListeners();
    this.binder.unbindAll();
    this.element = null;
    this.context = null;
}