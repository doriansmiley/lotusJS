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
    var template = div.querySelector(tagInstance.getAttribute('template-root'));
    var clone = document.importNode(template.content, true);
    var component = clone.querySelector(tagInstance.getAttribute('component-root'));
    component.lotusComponentInstance = tagInstance.lotusComponentInstance;
    var host = tagInstance.createShadowRoot();
    host.appendChild(clone);
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