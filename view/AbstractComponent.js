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
    console.log('Lotus.AbstractComponent.prototype.constructor');
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lotus.AbstractComponent);

Lotus.AbstractComponent.prototype.init = function(){
    this.defineSkinParts();
    this.addSkinParts();
    this.addAttributes();
}

Lotus.AbstractComponent.prototype.addAttributes = function () {
    for( var i=0; i < this.element.attributes.length; i++ ){
        var attribute = this.element.attributes[i];
        if( attribute.name.indexOf('attribute-') >= 0 ){
            var index = attribute.name.indexOf('attribute-') + 10;
            var newProp = attribute.name.substring(index);//remove prefix
            //convert dashes to camel case
            var camelCased = newProp.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
            if( this.hasOwnProperty(camelCased) ){
                this[camelCased] = attribute.value;
            }
        }
    }
}

Lotus.AbstractComponent.prototype.addSkinParts = function () {
    if( this.element.getAttribute('skin-part') !== null && this.element.getAttribute('skin-part') !== undefined ){
        this.addSkinPart(this.element.getAttribute('skin-part'), this.element);
    }
    var skinPartsNodeList = this.element.querySelectorAll('[skin-part]');
    for (var i = 0; i < skinPartsNodeList.length; i++) {
        // iterate over matches
        //call addSkinPart on the component passing skin part attribute value and the element
        this.addSkinPart(skinPartsNodeList[i].getAttribute('skin-part'), skinPartsNodeList[i]);
    }
}

Lotus.AbstractComponent.prototype.created = function(element, context){
    console.log('Lotus.AbstractComponent.prototype.created');
    this.element = element;
    this.context = context;
    this.init();
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
    //skip undefined skin parts
    if( this.skinParts.skinPartsByLabel[part] === null || this.skinParts.skinPartsByLabel[part] === undefined ){
        return null;
    }
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
    this.id = null;
}