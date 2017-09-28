lotusJS
=============

LotusJS is a framework based on xTag and lavenderJS for developing HTML5 applications using web components.

# A web component framework that separates presentation from code!

- [Another Framework! Why should I care](#why-should-i-care)
- [Is anybody using this?](#is-anybody-using-this)
- [npm Package Manager](#npm-package-manager)
- [Typescript Source](#typescript-source)
- [Skinable Web Components](#skinable-web-components)
- [Data Binding](#data-binding)
- [Examples](#examples)
- [MVW Framework Compatible](#mvw-framework)

# Why should I care

LotusJS allows you to put your design and programming teams on completely independent tracks. You can even have programming and design teams from different organizations working on the same component in parallel. At Silicon Publishing we have been using lotusJS to successfully offload component skins to our client's in house design teams. This has saved countless developer hours, and made it easier for our clients to get the exact look and feel they want.

Another reason to love lotusJS is that it delivers the good of HTML imports without the bad. Component skins are external HTML template files. This means designers are free to work with static HTML in their native tools without any dependency on the framework itself. However all javascript code are ES modules managed though npm. This avoids many of the problems related to tree shaking and other issues when component code is imported through HTML imports.

And finally you should care about LotusJS because it will make it easy for you to make your own web components and distribute them. In short if you build a killer component you can sell it, have designers all over the world create skins for it, and hopefully make you a bunch of money!

# Is anybody using this

Yes! Silicon Publishing has been using the LotusJS component model for years in its HTML5 Silicon Designer product (similar to Canva). Companies like Printing.com, AmazingMail, Jackprints, and St. Jude have been using LotusJS with a worldwide user base and are realizing the benefits of a decoupled component skins. You should too!

# npm Package Manager

The lotus module is distributed through npm and can be added to your project using `npm install lotusjs-components`. For more check us out on npm.

# Typescript Source

The lotus core is built using Typescript which enables us to fully implement common OOP patterns and controls within our codebase. You can also use lotus as a typescript module if you are already working in Typescript as well.

# Skinable Web Components

Lotus uses a web component map based on xTag to allow you to create custom tags that encapsulate abstract functionality such as data grids, lists, buttons, image galleries, video players, and more.
Lotus ships with the following built in web components and skins:

- Button
- Input (supports all HTML input types such as text, radio, checkbox, etc)
- Radio Group
- Select List
- Image Gallery
- File Upload
- Drag and Drop File Upload
- Data Driven Form

You can use the built in Lotus components or create your own custom components.
To create a custom component you extend `Lotus.AbstractComponent` or an existing subclass.
Then override at a minimum the following methods: `defineSkinParts`, `onSkinPartAdded` and `destroy`.

To map a component to a custom tag you simply create a context and call the `mapComponent` method passing your custom tag name, the prototype for the component (optional),
and the constructor function of your view component. For example:
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

For a complete example that demonstrates the power and flexibility of the Lotus component map and skins see our [examples](https://github.com/doriansmiley/lotusJS/tree/dev/example).

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

For a working example of this component example see our [sample application](https://github.com/doriansmiley/lotusJS-MWV/tree/master/example/sampleApp) which is part of lotusJS-MWV.
To see examples of other collection components see our [examples directory](https://github.com/doriansmiley/lotusJS/tree/dev/example).

# Data Binding

Lotus incorporates Lavender's data binding utilities to define bindable end points in your objects, and to set up data bindings. Before you can bind to a property of an object you have to make sure your object extends `Lavender.Subject` somehwere is its inheritance chain, and you must make sure to call the object's `notify` method when changes occur. For example:
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
In this example `Lavender.RecordSet` defines the bindable end point `pageList` inside the call to `addProperties`. The `addProperties` method is defined in the Lavender's binding utilities and incorporated through `Lavender.RecordSet` extension of `Lavender.Subject`. Notice the call to `notify`. Lavender's binding utilities are an implementation of the Observer pattern, and the call to `notify` handles notification for all registered observers.

IMPORTANT: `Lotus.SkinPart` and `Lotus.AbstractComponent` already extend `Lavender.Subject`.

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

IMPORTANT: You can also bind to methods, instance varibales and accessor methods of plain old Javascript objects. Just remeber if you want an object to be a bindable end point that can notify observers of changes you must extend `Lavender.Subject` and they must create bindable end points in calls to `this.addProperties` in the object's constructor. `Lotus.SkinPart` and `Lotus.AbstractComponent` already extend `Lavender.Subject`.

If you want to create an instance of `Lavender.Binder` for use elsewhere in your application simply call `myVar = new Lavender.Binder();`.

# Light Weight

Lotus is only 6497 bytes when gzipped, and Lavander is only 10363 bytes when gzipped. That's a lot of power in a small package.

# Examples
For an example of how easy it is to start building custom components using LotusJS see our [examples directory](https://github.com/doriansmiley/lotusJS/tree/dev/example).
There are numerous examples of the core components complete with documentation and code samples.

# MVW Framework

The Lotus team has also created a complete MVW (Model View Whatever) framework that includes command mapping, view mediation, dependency injection, decorators, and more.
If you want to build more than just reusable web components with Lotus check it out at [LotusJS-MVW](https://www.npmjs.com/package/lotusjs-mvw).
Or use your favorite framework of choice and drop in custom elements powered by LotusJS!


# Create custom components built on Lotus and offer them through the component exchange

TODO

# Create custom skins and offer them through the component exchange

TODO
