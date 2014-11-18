/**
 * Created by dsmiley on 11/10/14.
 */
Lotus.ComponentMap = function(context){
    //add validation that xtag has been loaded
    this.context = context;
    this.componentInstances = new Lotus.ComponentList();
}

Lotus.ComponentMap.prototype.addComponent = function( tagInstance, functionConstructor ){
    // fired once at the time a component
    // is initially created or parsed
    if( tagInstance.lotusComponentInstance === null || tagInstance.lotusComponentInstance === undefined ){
        tagInstance.lotusComponentInstance  = new functionConstructor();
        this.componentInstances.addItem(tagInstance.lotusComponentInstance);
    }
    tagInstance.lotusComponentInstance.created(tagInstance, this.context);
    var componentInstance = tagInstance.lotusComponentInstance;
    //assign skin parts
    //select all elements with a skin part attribute
    //IMPORTANT: Use DOM Native here, will make the map more portable
    xtag.query(tagInstance, '[skin-part]').forEach(function(elem){
        // iterate over matches
        //call addSkinPart on the component passing skin part attribute value and the element
        componentInstance.addSkinPart(elem.getAttribute('skin-part'), elem);
    });
}

Lotus.ComponentMap.prototype.mapComponent = function( tagName, extendsTag, functionConstructor ){
    var instance = this;
    xtag.register(tagName, {
        // extend existing elements
        extends: extendsTag,
        lifecycle:{
            created: function(){
                //IMPORTANT:, use builder patter here and create an add component function
                instance.addComponent(this, functionConstructor);
            },
            inserted: function(){
                // fired each time a component
                // is inserted into the DOM
                this.lotusComponentInstance.inserted(this);
            },
            removed: function(){
                // fired each time an element
                // is removed from DOM
                this.lotusComponentInstance.removed(this);
            },
            attributeChanged: function(){
                // fired when attributes are set
                this.lotusComponentInstance.attributeChanged(this);
            }
        }
    });
}