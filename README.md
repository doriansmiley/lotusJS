lotusJS
=============

LotusJS is a framework based on x-tag and lavenderJS for developing HTML5 applications using web components.

# A web component framework that separates presentation from code!

- [npm Package Manager](#npm-package-manager)
- [Typescript Source](#typescript-source)
- [Web Component View](#web-component-view)
- [Data Binding](#data-binding)
- [Sand Boxed Context](#sand-boxed-context)
- [Examples](#examples)
- [MVW Framework Extension](#mvw-framework)

# npm Package Manager

The lotus module is distributed through npm and can be added to your project using `npm install lotusjs-components`. For more check us out on npm.

# Typescript Source

The lotus core is built using Typescript which enables us to fully implement common OOP patterns and controls within our codebase. You can also use lotus as a typescript module if you are already working in Typescript as well. Sample application coming soon!

# Web Component View

Lotus uses a web component map based on x-tag to allow you to create custom tags that encapsulate abstract functionality such as data grids, lists, buttons, image galleries, and more. Further, views can be mediated to provide application level event mediation, data binding, and virtually any other behavior that is specific to the surrounding application.

You can use the built in Lotus components or create your own custom components. To create a custom component you extend `Lotus.AbstractComponent` or an existing subclass. Then override at a minimum the following methods: `defineSkinParts`, `onSkinPartAdded` and `destroy`.

To map a component to a custom tag you simply create a context and call the `mapComponent` method passing your custom tag name, the prototype for the component (optional), and the constructor function of your view component. For example:
````
var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
context.componentMap.mapComponent('x-lotus-button', HTMLButtonElement.prototype, Lotus.Button);
````
Once the component is mapped you can add the custom tag to HTML DOM:
````
<x-lotus-button data-template-url="templates/button.html" data-component-root='[data-skin-part="button"]' data-attribute-type="testButton"></x-lotus-button>
````

Notice the the `data-template-url` attribute. This is a special attribute defined by the framework which triggers the loading and parsing of the file contents. This can be a relative or absolute path (includes http links) to the html file containing the components `<template>` definition. In this example the contents of that file are as follows:

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
    <button data-skin-part="button"><label>testButton external</label></button>
</template>
````
Notice the `data-skin-part` attribute. This is a special attribute used by the framework. It will pass any element containing this attribute to the web component's `onSkinPartAdded` function. In this example that function does the following:

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
...
````
All components using the Lotus framework implement their own `onSkinPartAdded` function and attach behaviors accordingly. This avoids using selectors and allows the component skin to be totally decoupled from the web component's code. It also allows skins to be developed by designers using a common "data contract" that are the skin parts of the component. Skins can be developed and offered separately from base components as well. This is a key point of separation between Lotus and other web component frameworks.

To define skin parts for a component you map a skin part name to an attribute of your component as follows:
````
Lotus.Button.prototype.defineSkinParts = function(){
    //set up skin parts
    this.skinParts.addItem(new Lotus.SkinPart('button', this, 'buttonSkinPart'));
}
````
In this example the `button` `data-skin-part` found in the component's `<template>` will be mapped to the `buttonSkinPart` attribute of the `Button` instance.

You can also pass attribute values to your components at runtime using the special `data-attribute-xxx` tage where `data-attribute-` is the required prefix and `xxx` is your component's attribute name. When the framework evaluates these attributes the prefix is removed and dashes will be replace with camel case to evaluate the attribute value. So data-attribute-my-data-attribute-value will become myAttributeValue and evaluated using hasOwnProperty on your component instance. For example:
````
<x-lotus-button2 data-attribute-type="testButton" data-template-url="templates/button2.html" data-component-root='[data-skin-part="button"]'></x-lotus-button2>
````
In this example `data-attribute-type` will be evaluated as `myButtonInstance.type = navButton` where `myButtonInstance` is an instance of `Lotus.Button`.

For a complete example that demonstrates the power and flexibility of the Lotus component map and skins see our [button example](https://github.com/doriansmiley/lotusJS/tree/dev/example/button).

#### Collection and Item views

Creating collection components is made easy with Lotus. You can extend the base Lotus.AbstractCollectionView and Lotus.AbstractRecordSetCollectionView (supports pagination) to create custom collection components that define item renderers in their skin file. For example:

````
<template>
    <style>
        div{
            border: solid 1px black;
        }
        button {
            border-radius: 4px;
            min-height: 28px;
            cursor: pointer;
        }
        /* ***************************************************************************************************** */
        /* Default interaction css */
        /* ***************************************************************************************************** */
        .enabled {
            opacity: 1;
            pointer-events: auto;
        }
        .disabled {
            opacity: 0.5;
            pointer-events: none;
        }
    </style>
<div id="replaceImageUserUpload" data-attribute-item-view="SampleApp.ImageGalleryView" class="spi-row spi-row-align-center imageGallery">
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
            <div class="thumbnailContainer someClass" data-skin-part="thumbnailContainer" selected-class="imageGallerySelectedImage">
                <img data-skin-part="thumbnail" selected-class="thumbSelected" draggable="true"/>
            </div>
        </div>
    </div>
</div>
</template>
````
Notice the `data-skin-part="collectionContainer` attribute. This is a special attribute whose value must be set to `collectionContainer`. This attribute tells the web component where the items are to be inserted. The element which defines the `data-skin-part="itemTemplate"` attribute will be used to render each item in the collection. This element is passed to the collection's item view.

The item view component used to render each item in the collection is defined in the `data-attribute-item-view` attribute. At this point in time the attribute must be defined on the top level element of the component's `<template>`. In the example above each item in the collection will create a new instance of `SampleApp.ImageGalleryView`. 

#### Nested components

You can also nest web components within component skins. For example:

````
<div data-skin-part="collectionContainer" id="collectionContainer">

        <!-- Item renderer skin -->
        <div data-skin-part="itemTemplate" class="itemRenderer" data-attribute-thumb-width="96" data-attribute-thumb-height="96">
            <div class="thumbnailContainer someClass" data-skin-part="thumbnailContainer" selected-class="selectedThumbContainer">
                <img data-skin-part="thumbnail" selected-class="thumbSelected" draggable="true"/>
                <!-- example of a nested component that is a skin part-->
                <x-lotus-gallery-detail data-skin-part="itemDetail" data-template-url="templates/galleryItemDetail.html" data-component-root='div'></x-lotus-gallery-detail>
            </div>
        </div>

    </div>
    <!-- example of a nested component -->
    <x-lotus-page-number data-template-url="templates/pageNumberDisplay.html" data-source="sampleAPI" data-component-root='div'></x-lotus-page-number>
````
In this example the `x-lotus-gallery-detail` component is passed as a skin part, and the `x-lotus-page-number` component is nested stand alone. Once these tags are added to the DOM they will be mapped to a component instance just like any other.

For a complete example see our [sample application under the examples directory](https://github.com/doriansmiley/lotusJS-MWV/tree/master/example/sampleApp).

# Data Binding

Lotus incorporates Lavender's data binding utilities into it's mediator base class `Lotus.AbstractMediator`. While you are free to implement data binding in any layer of your application, you are encouraged to encapsulate data binding in your mediators. This ensures your web components remain properly encapsulated and reusable, and delegates data binding operations to a single layer within your application.

In order to notify observers of changes you must define the bindable end point. For example:
````
Lavender.RecordSet = function (timeToLive, listFunction) {
    //Define private vars
    ...full code omitted
    var _pageList = new listFunction();
    // Define our getters and setters
    this.addProperties({
            pageList: {
            get: function () {
                return _pageList;
            },
            set: function (val) {
                _pageList = val;
                this.notify(val, "pageList");
                this.dispatch(new Lavender.RecordSetEvent(Lavender.RecordSetEvent.PAGE_LIST_CHANGE));
            }
        },
            ... full code omitted
        }
    );
    Lavender.Subject.prototype.constructor.call(this);
}
/************* Inherit from Lotus.AbstractComponent for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lavender.RecordSet);
````
In this example `Lavender.RecordSet` defines the bindable end point `pageList` inside the call to `addProperties`. The `addProperties` method is defined in the Lavender's binding utilities and incorporated through `Lavender.RecordSet` extension of `Lavender.Subject`. Notice the call to `Notify`. Lavender's binding utilities are an implementation of the Observer pattern, and the call to `Notify` handles notification for all registered observers. 

IMPORTANT: `Lotus.AbstractMediator`, `Lotus.SkinPart` and `Lotus.AbstractComponent` already extend `Lavender.Subject`.

Once you define a bindable end point you can bind to it. For example in `SampleApp.ImageGalleryItemDetailMediator.prototype.init` the record set's `pageList` property is bound to the `onPageListChange` of the mediator"
````
this.binder.bind(model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel], 'pageList', this , 'onPageListChange');
````
Whenever the `model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel].pageList` property changes `onPageListChange` is called. The source for `onPageListChange` is below.
````
SampleApp.ImageGalleryItemDetailMediator.prototype.onPageListChange = function (value) {
    if(!value){
        return;
    }
    this.componentInstance.asset = value.getItemAt(0);
}
````
You do not have to create the instance assigned to `this.binder`. It is instantiated in the `Lotus.AbstractMediator` constructor.

IMPORTANT: You can also bind to methods, instance varibales and accessor methods of plain old Javascript objects. Just remeber if you want an object to be a bindable end point that can notify observers of changes you must extend `Lavender.Subject` and they must create bindable end points in calls to `this.addProperties` in the object's constructor. `Lotus.AbstractMediator`, `Lotus.SkinPart` and `Lotus.AbstractComponent` already extend `Lavender.Subject`.

If you want to create an instance of `Lavender.Binder` for use elsewhere in your application simply call `myVar = new Lavender.Binder();`.

# Sand Boxed Context

All application services are sand boxed to the application's context. This allows for distributing your applications as  reusable modules. Simply minify your application, include it in your project, and instantiate the context.

TODO: module example

# Light Weight

Lotus is only 6497 bytes when gzipped, and Lavander is only 10363 bytes when gzipped. That's a lot of power in a small package.

# Examples
For an example of how easy it is to start building custom components using LotusJS see our [sample button under the examples directory](https://github.com/doriansmiley/lotusJS/tree/dev/example/button).

# MVW Framework

The Lotus team has also created a complete MVW (Model View Whatever) framework that includes command mapping, dependency injection, inversion of control, decorators, and more. If you want to build more than just reusable web components with Lotus check it out at [LotusJS-MVW](https://github.com/doriansmiley/lotusJS-MWV/tree/master/).


# Create custom components built on Lotus and offer them through the component exchange

TODO

# Create custom skins and offer them through the component exchange

TODO
