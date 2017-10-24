lotusJS
=============

[![Join the chat at https://gitter.im/lotusJS/Lobby](https://badges.gitter.im/lotusJS/Lobby.svg)](https://gitter.im/lotusJS/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![](https://data.jsdelivr.com/v1/package/npm/lotusjs-components/badge)](https://www.jsdelivr.com/package/npm/lotusjs-components)
[![npm version](https://badge.fury.io/js/lotusjs-components.svg)](https://badge.fury.io/js/lotusjs-components)

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
context.componentMap.mapComponent('x-lotus-button', Lotus.LotusHTMLElement.prototype, Lotus.Button);
````
Once the component is mapped you can add the custom tag to HTML DOM:
````
<x-lotus-button data-template-url="templates/button.html" data-component-root='[data-skin-part="button"]' data-attribute-type="testButton"></x-lotus-button>
````

Notice the the `data-template-url` attribute. This is a special attribute defined by the framework which triggers the loading and parsing of the file contents.
This can be a relative or absolute path (includes http links) to the html file containing the components `<template>` definition. In this example the contents of that file are as follows:

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
Notice the `data-skin-part` attribute. This is a special attribute used by the framework. It will pass any element containing this attribute to the web component's `onSkinPartAdded` function.
In this example that function does the following:

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
All components using the Lotus framework implement their own `onSkinPartAdded` function and attach behaviors accordingly. This avoids using selectors and allows the component skin to be
totally decoupled from the web component's code. It also allows skins to be developed by designers using a common "data contract" that are the skin parts of the component.
Skins can be developed and offered separately from base components as well. This is a key point of separation between Lotus and other web component frameworks.

To define skin parts for a component you map a skin part name to an attribute of your component as follows:
````
Lotus.Button.prototype.defineSkinParts = function(){
    //set up skin parts
    this.skinParts.addItem(new Lotus.SkinPart('button', this, 'buttonSkinPart'));
}
````
In this example the `button` `data-skin-part` found in the component's `<template>` will be mapped to the `buttonSkinPart` attribute of the `Button` instance.

You can also pass attribute values to your components at runtime using the special `data-attribute-xxx` tage where `data-attribute-` is the required prefix and `xxx` is your component's attribute name.
When the framework evaluates these attributes the prefix is removed and dashes will be replace with camel case to evaluate the attribute value.
So data-attribute-my-data-attribute-value will become myAttributeValue and evaluated using hasOwnProperty on your component instance. For example:
````
<x-lotus-button2 data-attribute-type="testButton" data-template-url="templates/button2.html" data-component-root='[data-skin-part="button"]'></x-lotus-button2>
````
In this example `data-attribute-type` will be evaluated as `myButtonInstance.type = navButton` where `myButtonInstance` is an instance of `Lotus.Button`.

For a complete example that demonstrates the power and flexibility of the Lotus component map and skins see our [examples](https://github.com/doriansmiley/lotusJS/tree/dev/example).

#### Collection and Item views

Creating collection components is made easy with Lotus. You can extend the base Lotus.AbstractCollectionView and Lotus.AbstractRecordSetCollectionView (supports pagination) to create
custom collection components that define item renderers in their skin file. For example:

````
<template>
    <style>
        div[data-skin-part="collectionContainer"]{
            padding: 10px;
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
<div data-source="sampleAPI" data-attribute-item-view="Lotus.ImageGalleryView">

    <!-- record set navigation -->
    <div data-skin-part="navButtonContainer" data-enabled-class="enabled" data-disabled-class="disabled">
        <button data-skin-part="firstBtn" data-enabled-class="enabled" data-disabled-class="disabled">
            <label style="pointer-events:none;"><img src="assets/i_first.png" border="0"/></label>
        </button>


        <button data-skin-part="pervBtn" data-enabled-class="enabled" data-disabled-class="disabled">
            <label style="pointer-events:none;"><img src="assets/i_previous.png" border="0"/></label>
        </button>

        <button data-skin-part="nextBtn" data-enabled-class="enabled" data-disabled-class="disabled">
            <label style="pointer-events:none;"><img src="assets/i_next.png" border="0"/></label>
        </button>

        <button data-skin-part="lastBtn" data-enabled-class="enabled" data-disabled-class="disabled">
            <label style="pointer-events:none;"><img src="assets/i_last.png" border="0"/></label>
        </button>
    </div>

    <div data-skin-part="collectionContainer">

        <!-- Itemrenderer skin -->
        <div data-skin-part="itemTemplate" class="itemRenderer" data-attribute-thumb-width="96" data-attribute-thumb-height="96">
            <div class="thumbnailContainer someClass" data-skin-part="thumbnailContainer" selected-class="selectedThumbContainer">
                <img data-skin-part="thumbnail" selected-class="thumbSelected" draggable="true"/>
                <!-- example of a nested component that is a skin part-->
                <x-lotus-gallery-detail data-skin-part="itemDetail" data-template-url="templates/galleryItemDetail.html" data-component-root='div'></x-lotus-gallery-detail>
            </div>
        </div>

    </div>

</div>
</template>
````
Notice the `data-skin-part="collectionContainer` attribute. This is a special attribute whose value must be set to `collectionContainer`.
This attribute tells the web component where the items are to be inserted. The element which defines the `data-skin-part="itemTemplate"` attribute will be used to render each item in the collection.

The item view component used to render each item in the collection is defined in the `data-attribute-item-view` attribute. In this case that value is set to `Lotus.ImageGalleryView`.
A new instance of `Lotus.ImageGalleryView` is constructed for each item in the collection and a clone of the `itemTemplate` element is passed to the component.

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
In this example the `x-lotus-gallery-detail` component is passed as a skin part, and the `x-lotus-page-number` component is nested stand alone.
Once these tags are added to the DOM they will be mapped to a component instance just like any other.

To see examples of other collection components see our [examples directory](https://github.com/doriansmiley/lotusJS/tree/dev/example).

# Data Binding

Lotus incorporates Lavender's data binding utilities to define bindable end points in your objects, and to set up data bindings.
Before you can bind to a property of an object you have to make sure your object extends `Lavender.Subject` somehwere is its inheritance chain, and you must make sure
to call the object's `notify` method when changes occur. For example:
````
 //start binding source set up. This is a crude example. Most application should use a MVW framework like lotusjs-mwv set create data models and apply bindings using mediators.
        //below we create a source for data binding. Components should always effect an application model instead of acting on the view directly
        //you can then use two way data bindings on the model to keep your components in sync with model. Changes in the model are then resolved by the component.
        var BindingSource = function(){
            Lavender.Subject.prototype.constructor.call(this);
            var _selectedItem;
            var _collection = new Lavender.ArrayList();
            this.addProperties({
                selectedItem: {
                    get: function () {
                        return _selectedItem;
                    },
                    set: function (val) {
                        _selectedItem = val;
                        this.notify(val, "selectedItem");
                    }
                },
                collection: {
                    get: function () {
                        return _collection;
                    },
                    set: function (val) {
                        _collection = val;
                        this.notify(val, "collection");
                    }
                }
            });
            //set up pour collection
            this.collection.addItem({label: 'Sunset 1', value: 'assets/photos/Sunset_2007-1.jpg', src: 'assets/photos/Sunset_2007-1.jpg', selected:true});
            this.collection.addItem({label: 'Sunset 2', value: 'assets/photos/Sunset-socialphy.com_.jpg', src: 'assets/photos/Sunset-socialphy.com_.jpg'});
            this.collection.addItem({label: 'Sunset 3', value: 'assets/photos/sunset-birds1.jpg', src: 'assets/photos/sunset-birds1.jpg'});
            this.collection.addItem({label: 'Full Moon', value: 'assets/photos/FullMoon2010.jpg', src: 'assets/photos/FullMoon2010.jpg'});
            //set the selected item
            this.selectedItem = this.collection.getItemAt(0);

            BindingSource.prototype.setSelectedItemFromCollectionView = function(item){
                if(item && item.model != this.selectedItem ){
                    this.selectedItem = item.model;
                }
            }
        };
````
In this example `BindingSource` defines the bindable end points `selectedItem` and `collection`inside the call to `addProperties`.
The `addProperties` method is defined in the Lavender's binding utilities and incorporated through `BindingSource` extension of `Lavender.Subject`.
Notice the call to `notify`. Lavender's binding utilities are an implementation of the Observer pattern, and the call to `notify` handles notification for all registered observers.

IMPORTANT: `Lotus.SkinPart` and `Lotus.AbstractComponent` already extend `Lavender.Subject`.

Once you define a bindable end point you can bind to it.
````
bindingSource.binder.bind(bindingSource, 'selectedItem', component, 'model');
````
The `binder` property is inherited through `Lavender.Subject` and is an instance of the `Lavender.Binder` object.
Whenever the `bindingSource.selectedItem` property changes `component.model` will be updated with the new value.
In this example the `component.model` attribute is also a bindable end point declared in the same manner, but it does not have to be. It could also be a plain old JavaScript attribute.
If you want to enable two way data binding, for example:
````
bindingSource.binder.bind(bindingSource, 'selectedItem', component, 'model');
bindingSource.binder.bind(component, 'model', bindingSource, 'selectedItem');
````
you have to make sure `component.model` is also a bindable end point.

You can also bind to methods, instance varibales and accessor methods of plain old Javascript objects.
Just remeber if you want an object to be a bindable end point that can notify observers of changes you must extend `Lavender.Subject`
and they must create bindable end points by declaring accessor methods that call `this.notify(value, 'attribute')` where `value` is the new value and `attribute` is the name of the attribute.

IMPORTANT: in order to prevent recursion the Lavender core automatically checks that incoming values of attribute bindings are different than the one currently applied.
````
if (this.instance[this.chainProp] != value) {
    this.instance[this.chainProp] = value;
}
````
However it does not do this if the property in the chain is a function. Be sure if you setup functions as binding callbacks they check that the incoming value is different than the current one.
For example:
````
BindingSource.prototype.setSelectedItemFromCollectionView = function(item){
    if(item && item.model != this.selectedItem ){
        this.selectedItem = item.model;
    }
}
````
This handles cases where attributes are set to a `null` value as part of a `destroy` process, and ensures the value is actually out of sync. This prevents recursion when two way bindings are applied.

For a complete example of two way data binding so our [image component example](https://github.com/doriansmiley/lotusJS/tree/dev/example/image).

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
