lotusJS
=============

Inversion of control framework basaed on x-tag and lavenderJS for developing HTML5 applications using web components. The framework is an adaptation of the MVP pattern in an IOC container, but implements the Lotus web component objects as the presenter (MVWC).

**Seperates presentation from code with web component skins**

Web component skins are html `<template>` elements which define skin parts for a component. For example to create a custon button element using Lotus's built in button component you would do the following:

Map the component:
````
var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
context.componentMap.mapComponent('x-lotus-button', HTMLButtonElement.prototype, Lotus.Button);
````
Component creation in the HTML DOM:
`<x-lotus-button type="navButton" template-url="templates/button.html" component-root='[skin-part="button"]' attribute-type="testButton"></x-lotus-button>`

Notice the the `template-url` attribute. This is a special attribute defined by the framework which triggers the loading and parsing of the file contents. This can be a relative or absolute path (includes http links) to the html file containing the components `<template>` definition. In this example the contents of that file are as follows:

````
<template>
    <style>
        button{
            width:150px;
            height:50px;
            background-color: chartreuse;
            border: solid 1px red;
        }
    </style>
    <button skin-part="button"><label>testButton external</label></button>
</template>
````
Notice the skin-part. This is a special attribute used by the frame work. It will pass any element containing this attribute to the web component's `onSkinPartAdded` function. In this example that function does the following:

````
Lotus.Button.prototype.onSkinPartAdded = function(part, skinPart){
    switch( part ){
        case 'button':
            //add button event listener or whatever else yo want to do when this skin part is added
            //you could hold until all skin parts are added and then call addEventListeners
            console.log('Lotus.Button.prototype.onSkinPartAdded: part: ' + part);
            console.log('Lotus.Button.prototype.onSkinPartAdded: skinPart: ' + skinPart);
            this.addEventListeners();
            break;
    }
}

Lotus.Button.prototype.addEventListeners = function(){
    Lotus.AbstractComponent.prototype.addEventListeners.call(this);
    this.buttonSkinPart.addEventListener('click', this.clickProxy);
}

Lotus.Button.prototype.onClick = function( event ){
    console.log('Lotus.Button.prototype.onClick: event is ' + event);
    console.log('Lotus.Button.prototype.onClick: my id is ' + this.id);
    this.dispatch(new Lavender.AbstractEvent('click', {target:this.buttonSkinPart, originalEvent:event}))
}
````
All components using the Lotus framework implement their own `onSkinPartAdded` function and attach behaviors accordingly. This avoids using selectors and allows the component skin to be totally decoupled from the web component's code. It also allows skins to be developed by designers using a common "data contract" that are the skin parts of the component. Skins can be developed and offered separately from base components as well. This is a key point of seperation from Lotun and other web component frameworks.

**Out of box collection and item views**

Creating collection components is made easy with Lotus. You can extend the base Lotus.AbstractCollectionView and Lotus.AbstractRecordSetCollectionView (supports pagination) to create custom collection components that define item renderers in their skin file. For example:

````
<div id="replaceImageUserUpload" class="spi-row spi-row-align-center imageGallery">

    <!-- record set navigation -->
    <div data-skin-part="navButtonContainer" data-enabled-class="enabled" data-disabled-class="disabled" class="navButtonContainer">
        <button data-skin-part="firstBtn" id="firstBtn" class="spi-button">
            <label style="pointer-events:none;"><i class="fa fa-fast-backward"></i></label>
        </button>


        <button data-skin-part="pervBtn" id="pervBtn" class="spi-button">
            <label style="pointer-events:none;"><i class="fa fa-caret-left" ></i></label>
        </button>

        <button data-skin-part="nextBtn" id="nextBtn" class="spi-button">
            <label style="pointer-events:none;"><i class="fa fa-caret-right"></i></label>
        </button>

        <button data-skin-part="lastBtn" id="lastBtn" class="spi-button">
            <label style="pointer-events:none;"><i class="fa fa-fast-forward"></i></label>
        </button>
    </div>

    <div>
        <select data-skin-part="categoryList"></select>
        <select data-skin-part="propertyList"></select>
    </div>

    <div data-skin-part="collectionContainer" id="collectionContainer">

        <!-- Itemrenderer skin -->
        <div data-skin-part="itemTemplate" class="itemRenderer" data-attribute-thumb-width="100" data-attribute-thumb-height="100">
            <div class="thumbnailContainer someClass" data-skin-part="thumbnailContainer" data-selected-class="imageGallerySelectedImage">
                <img data-skin-part="thumbnail" data-selected-class="thumbSelected" draggable="true"/>
            </div>
        </div>

    </div>


</div>
````
Notice the `data-skin-part="collectionContainer"` attribute. This is a special attribute whose value must be set to `collectionContainer`. This attribute tells the web component where the items are to be inserted. The element which defines the `data-skin-part="itemTemplate"` attribute will be used to render each item in the collection. This element is passed to the collection's item view. For more a complete example see our sample application under the examples directory.