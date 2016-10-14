lotusJS
=============

LoutsJS is a framework basaed on x-tag and lavenderJS for developing HTML5 applications using web components. The framework is an adaptation of the MVP pattern in an IOC container, but implements web components in the presentation layer replacing the need for a templating engine (MVWC).

###Model View Presenter Framework that supports Web Components!

- [Web Component View](#web-component-view)
- [Dependency Injection](#pookie)
- [Central Event Bus](#pookie)
- [Command Map](#pookie)
- [Model](#pookie)
- [Service Locator](#pookie)
- [Serialization](#pookie)
- [Sand Boxed Context](#pookie)

###Web Component View

Lotus uses a web component map based on x-tag to allow you to create custom tags that encapsulate abstract functionality such as data grids, lists, buttons, image galleries, and more. Further, views can be mediated to provide application level event mediation, data binding, and virtually any other behavior that is specific to the surrounding application.

To map a component you simply create a context and call the `mapComponent` method passing your custom tag name, the prototype for the component (optional), and the constructor function of your view component. For example:
````
var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
context.componentMap.mapComponent('x-lotus-button', HTMLButtonElement.prototype, Lotus.Button);
````
Once the component is mapped you can add the custom tag to HTML DOM:
````
<x-lotus-button type="navButton" template-url="templates/button.html" component-root='[skin-part="button"]' attribute-type="testButton"></x-lotus-button>
````

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
Notice the `skin-part` attribute. This is a special attribute used by the frame work. It will pass any element containing this attribute to the web component's `onSkinPartAdded` function. In this example that function does the following:

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
In this example the `button` `skin-part` found in the component's `<template>` will be mapped to the attributes `buttonSkinPart` of the `Button` instance.

For a complete example that demostrates the power and flexibility of the Lotus component map and skins see our [button example](https://github.com/doriansmiley/lotusJS/tree/dev/example/button).

#####Collection and Item views

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
Notice the `data-skin-part="collectionContainer"` attribute. This is a special attribute whose value must be set to `collectionContainer`. This attribute tells the web component where the items are to be inserted. The element which defines the `data-skin-part="itemTemplate"` attribute will be used to render each item in the collection. This element is passed to the collection's item view. For a complete example see our sample application under the examples directory.

###Create custom components built on Lotus and offer them through the component exchange

TODO

###Inversion of Control Container

Lotus ships with a build in injector. In your application's context you can define objects for injection as follows:

````
SampleApp.Context = function (model, params) {
    this.model = model;
    Lotus.Context.prototype.constructor.call(this, this,model.config, params);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.Context, SampleApp.Context);

SampleApp.Context.prototype.mapComponents = function(){
    //sample
    //this.componentMap.mapComponent('x-lotus-button', HTMLButtonElement.prototype, Lotus.Button);
}

SampleApp.Context.prototype.mapCommands = function(){
    //sample
    //this.commandMap.addCommand( 'testEvent1', Lotus.SampleCommand );
    // you can optionally pass functionName and useSingleton
    //functionName defaults to 'execute'
    //if useSingleton is true only a single instance of the command will be executed when the events is dispatched, use this options with extreme caution
    //this.commandMap.addCommand( 'testEvent1', Lotus.SampleCommand, 'myFunction', true )
}

SampleApp.Context.prototype.mapObjects = function(){
    //map objects for construction
    this.injector.mapObject(SampleApp.HTTP_SERVICE_KEY, SampleApp.HttpServiceFactory.getInstance().getHttpServiceForInjection(this.config));
    //Map singletons
    this.injector.mapSingletonInstance(SampleApp.SERVICE_RESULT_PARSER_KEY, SampleApp.SerializeFactory.getInstance().getServiceResultParser(this.config));
    this.injector.mapSingletonInstance(SampleApp.SERIALIZE_FACTORY_KEY, SampleApp.SerializeFactory.getInstance());
    this.injector.mapSingletonInstance(SampleApp.APP_SERVICES, new SampleApp.SampleService(this.config));
    this.injector.mapSingletonInstance(SampleApp.EVENT_DISPATCHER_KEY, Lotus.EventDispatcherFactory.getInstance().getEventDispatcher( this.config ));
    this.injector.mapSingletonInstance(SampleApp.MODEL_KEY, this.model);
}

SampleApp.Context.prototype.mapMediators = function(){

}

SampleApp.IMAGE_ASSETS_PARSER_KEY = 'imageAssetsParser';
SampleApp.HTTP_SERVICE_KEY = 'xhr';
SampleApp.APP_SERVICES = 'appServices';
SampleApp.SERVICE_RESULT_PARSER_KEY = 'serviceResultParser';
SampleApp.SERIALIZE_FACTORY_KEY = 'serializeFactoryKey';
SampleApp.EVENT_DISPATCHER_KEY = 'eventDispatcher';
SampleApp.MODEL_KEY = 'images';
````

Note you can map objects that will be created by the IOC container using `mapObject` or map to a singleton using `mapSingletonInstance`. You can still use factories to set up your injections. This is useful when you want to be able to change injections without effecting application code using a config file.

To inject objects you use the context's injector as follows:

````
SampleApp.resources.injector.inject(SampleApp.HTTP_SERVICE_KEY)
````

Where `SampleApp.resources` is defined as follows:

````
//global namespace for app
SampleApp = function(){

}

SampleApp.init = function(){
    SampleApp.resources = new SampleApp.Context(SampleApp.Model());
}
````

###Light Weight

Both the Lotus (32kb) and Lavander (51kb) frameworks total only 83 kb combined. That's a lot of power in a small pacakge.
