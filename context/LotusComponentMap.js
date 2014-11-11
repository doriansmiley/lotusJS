/**
 * Created by dsmiley on 11/10/14.
 */
Lotus.ComponentMap = function(){
    //add validation that xtag has been loaded
    this.componentInstances = new Lotus.LotusComponentList();
}

Lotus.ComponentMap.prototype.mapComponent = function( tagName, extendsTag, functionConstructor ){
    xtag.register(tagName, {
        // extend existing elements
        extends: extendsTag,
        lifecycle:{
            created: function(){
                // fired once at the time a component
                // is initially created or parsed
                if( this.lotusComponentInstance === null || this.lotusComponentInstance === undefined ){
                    this.lotusComponentInstance  = new functionConstructor();
                    this.componentInstances.addItem(this.lotusComponentInstance);
                }
                this.lotusComponentInstance.created(this);
                var componentInstance = this.lotusComponentInstance;
                //assign skin parts
                //select all elements with a skin part attribute
                xtag.query(this, '[skin-part]').forEach(function(elem){
                    // iterate over matches
                    //call addSkinPart on the component passing skin part attribute value and the element
                    componentInstance.addSkinPart(elem.getAttribute('skin-part'), elem);
                });
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