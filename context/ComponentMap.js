/**
 * Created by dsmiley on 11/10/14.
 */
Lotus.ComponentMap = function(context){
    //add validation that xtag has been loaded
    this.context = context;
    this.componentInstances = new Lotus.ComponentList();
    this.tagInstanceToRequestId = {};
}

Lotus.ComponentMap.prototype.success = function(result){
    var tagInstance = this.tagInstanceToRequestId[result.requestId];
    var div = document.createElement('div');
    div.innerHTML = result.resultObj;
    //get the root template node
    var template = div.querySelector(tagInstance.getAttribute('template-root'));
    //clone the contents
    var clone = document.importNode(template.content, true);
    //select the root component node
    var component = clone.querySelector(tagInstance.getAttribute('component-root'));
    component.lotusComponentInstance = tagInstance.lotusComponentInstance;
    //create a shadow host from the tag instance and append the clone to it
    var host = tagInstance.createShadowRoot();
    host.appendChild(clone);
    //pass along the root component node to the view component
    this.createComponent(component);
}

Lotus.ComponentMap.prototype.fault = function(fault){
    console.log(fault);
    throw new Error('Could not load template. Please check you defined the correct path.');
}

Lotus.ComponentMap.prototype.addComponent = function( tagInstance, functionConstructor ){
    // fired once at the time a component
    // is initially created or parsed
    if( tagInstance.lotusComponentInstance === null || tagInstance.lotusComponentInstance === undefined ){
        tagInstance.lotusComponentInstance  = new functionConstructor();
        this.componentInstances.addItem(tagInstance.lotusComponentInstance);
        //capture any attributes passed in on the tag
        this.addAttributes(tagInstance);
    }
    //if the tag instance defines a scr attribute load the template and set up the shadow DOM
    var src = tagInstance.getAttribute('template-url');
    if( src !== null && src !== undefined ){
        var httpService = new Lavender.XhrHttpService();
        httpService.addResponder(this);
        httpService.send(
            'GET',
            src,
            null,
            'text/html',
            'html',
            true);
        this.tagInstanceToRequestId[httpService.requestId] = tagInstance;
        return;
    }
    this.createComponent(tagInstance);
}

Lotus.ComponentMap.prototype.createComponent = function( tagInstance ){
    tagInstance.lotusComponentInstance.created(tagInstance, this.context);
    //assign skin parts
    //select all elements with a skin part attribute
    //IMPORTANT: Use DOM Native here, will make the map more portable
    if( tagInstance.getAttribute('skin-part') !== null && tagInstance.getAttribute('skin-part') !== undefined ){
        tagInstance.lotusComponentInstance.addSkinPart(tagInstance.getAttribute('skin-part'), tagInstance);
    }
    var skinPartsNodeList = tagInstance.querySelectorAll('[skin-part]');
    for( var i=0; i < skinPartsNodeList.length; i++){
        // iterate over matches
        //call addSkinPart on the component passing skin part attribute value and the element
        tagInstance.lotusComponentInstance.addSkinPart(skinPartsNodeList[i].getAttribute('skin-part'), skinPartsNodeList[i]);
    }
}

Lotus.ComponentMap.prototype.addAttributes = function ( tagInstance ) {
    //tags can define attributes used by the component at runtime. Use the data-attribute- prefix to define attributes
    //IMPORTANT: the prefix is removed and dashes will be replace with camel case to evaluate the attribute value
    //so data-attribute-my-attribute-value will become myAttributeValue and evaluated as such using hasOwnProperty
    for( var i=0; i < tagInstance.attributes.length; i++ ){
        var attribute = tagInstance.attributes[i];
        if( attribute.name.indexOf('data-attribute-') >= 0 ){
            var index = attribute.name.indexOf('data-attribute-') + 15;
            var newProp = attribute.name.substring(index);//remove prefix
            //convert dashes to camel case
            var camelCased = newProp.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
            if( tagInstance.lotusComponentInstance.hasOwnProperty(camelCased) ){
                tagInstance.lotusComponentInstance[camelCased] = attribute.value;
            }
        }
    }
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