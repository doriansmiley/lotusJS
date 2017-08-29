lotusJS
=============

LoutsJS is a framework based on x-tag and lavenderJS for developing HTML5 applications using web components.

# A MVW Framework that supports Web Components!

- [Web Component View](#web-component-view)
- [Dependency Injection](#dependency-injection)
- [Central Event Bus](#central-event-bus)
- [Command Map](#command-map)
- [View Mediators](#view-mediators)
- [Data Binding](#data-binding)
- [Sand Boxed Context](#sand-boxed-context)
- [Examples](#examples)

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

For a complete example see our [sample application under the examples directory](https://github.com/doriansmiley/lotusJS/tree/dev/example/sampleApp).

# Dependency Injection

Lotus ships with a build in injector. In your application's context you can define objects for injection as follows:

````
SampleApp.Context = function (model, params) {
    this.model = model;
    Lotus.Context.prototype.constructor.call(this, this,model.config, params);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lotus.Context, SampleApp.Context);

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
...
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
# Central Event Bus

Lotus includes a central event bus to handle dispatching application level events, and registering listeners for this events. This central event bus should not be confused with, or used in, your Lotus web components. Web components extend `Lavender.AbstractEventDispatcher` and can dispatch events directly by calling their `dispatch` method. 

The event bus is located on the applications context and can by defined for dependency injection as follows:
````
this.injector.mapSingletonInstance(SampleApp.EVENT_DISPATCHER_KEY, Lotus.EventDispatcherFactory.getInstance().getEventDispatcher( this.config ));    
````
You can then access the event bus as follows:
````
SampleApp.resources.injector.inject(SampleApp.EVENT_DISPATCHER_KEY);
````
To add an event listener you call its `addEventDispatcher` method:
````
var eventBus = SampleApp.resources.injector.inject(SampleApp.EVENT_DISPATCHER_KEY);
eventBus.addEventListener('eventType', this, 'myEventHandler');
````
Where `eventType` is the event that will be dispatched, `this` is a reference to the instance adding the listener, and `myEventHandler` is an instance method of the instance adding the listener (`this`).

To remove an event listener you call its `removeEventListener` method:
````
var eventBus = SampleApp.resources.injector.inject(SampleApp.EVENT_DISPATCHER_KEY);
eventBus.removeEventListener('eventType', this, 'myEventHandler');
````
To see if the event bus can listen call its `canListen` method:
````
var eventBus = SampleApp.resources.injector.inject(SampleApp.EVENT_DISPATCHER_KEY);
eventBus.canListen('eventType', this, 'myEventHandler');
````
To dispatch and event on the event bus:
````
var eventBus = SampleApp.resources.injector.inject(SampleApp.EVENT_DISPATCHER_KEY);
eventBus.dispatch(new Lavender.AbstractEvent('testEvent1', {data:myData}));
````
Where `testEvent1` is the event type and `{data:myData}` is data that will be added to the event payload and can be accessed using `event.payload.data`. You can define any object structure you like for the event payload for example `{myData:myData, moreData:moreData}` which can be accessed using `event.payload.myData` and `event.payload.moreData`. 

While this example uses `Lavender.AbstractEvent` you should never dispatch this event object. Instead extend `Lavender.AbstractEvent` and create your own custom event objects. For example:
````
SampleApp.AppEvent = function( eventType, payload ){
    if( eventType == SampleApp.AppEvent.ITEM_SELECTED && ( payload.item === null || payload.item === undefined ) ){
        throw  new Error('SampleApp.AppEvent payload.item is required');
    }
    Lavender.AbstractEvent.prototype.constructor.call(this, eventType, payload);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend( Lavender.AbstractEvent, SampleApp.AppEvent );

SampleApp.AppEvent.prototype.clone = function(){
    return new SampleApp.AppEvent( this.type, this.payload)
}

SampleApp.AppEvent.LOAD_IMAGES = 'smpLoadImages';
SampleApp.AppEvent.IMAGES_LOADED = 'smpImagesLoaded';
````

# Command Map

Lotus includes a command map that maps both fresh instances and singleton instance of a command to an event dispatched by the central event bus. Below is an example of how to map a command:
````
SampleApp.Context.prototype.mapCommands = function(){
    //triggers loading of images
    this.commandMap.addCommand( Lavender.RecordSetEvent.LOAD_PAGE_DATA, SampleApp.LoadImageAssetsCommand );
    // you can optionally pass functionName and useSingleton
    //functionName defaults to 'execute'
    //if useSingleton is true only a single instance of the command will be executed when the events is dispatched, use this options with extreme caution
    //this.commandMap.addCommand( 'testEvent1', Lotus.SampleCommand, 'myFunction', true )
}
````
In this example the function to execute defaults to `execute`. But as the comments explain you can pass the function name as an optional argument. For example:
````
this.commandMap.addCommand( Lavender.RecordSetEvent.LOAD_PAGE_DATA, SampleApp.LoadImageAssetsCommand, 'myFunction' );
````
In this example the `myFunction` instance method will be called passing the event object. And to register `SampleApp.LoadImageAssetsCommand` as a singleton calling `myFunction` you simply add:
````
this.commandMap.addCommand( Lavender.RecordSetEvent.LOAD_PAGE_DATA, SampleApp.LoadImageAssetsCommand, 'myFunction', true );
````
Lotus ships with `Lotus.AbstractCommand` which is a useful base class if you do not intend to create your own command implementation. Commands do not need to extend `Lotus.AbstractCommand`, but it is recommended you do so as it will reduce the amount of redundant code in your application, and allow commands to be easily reused in other applications. For a complete example of implementing a subclass of `Lotus.AbstractCommand` see the `SampleApp.LoadImageAssetsCommand` implementation that's part of our [sample application under the examples directory](https://github.com/doriansmiley/lotusJS/tree/dev/example/sampleApp).

# View Mediators

View mediation is an important part of MVP frameworks that enables essentially dumb views to participate in the surrounding application without knowing or caring about their involvement. In most implementations this includes things like binding your application's model data to instance attributes of your view, and delegating events dispatched by your view to the central event bus. To map a mediator to a component in Lotus you do the following in your application's context:
````
SampleApp.Context.prototype.mapMediators = function(){
    this.mediatorMap.add('x-lotus-image-gallery',SampleApp.ImageGalleryMediator);
    //you can optionally add a singleton instance using the following form
    //context.mediatorMap.add('x-lotus-image-gallery',SampleApp.ImageGalleryMediator,true);
}
````
In this example all instances of the `x-lotus-image-gallery` custom tag found in the DOM will be mapped to an instance of `SampleApp.ImageGalleryMediator`. If you want to use a singleton instance you simply supply `true` as the optional third parameter:
````
context.mediatorMap.add('x-lotus-image-gallery',SampleApp.ImageGalleryMediator,true);
````
All mediators must extend `Lotus.AbstractMediator` and the MUST OVERRIDE `Lotus.AbstractMediator.toString` returning the name of the constructor function. For example below is the `toString` override found in `SampleApp.ImageGalleryMediator`:
````
SampleApp.ImageGalleryMediator.toString = function(){
    return 'SampleApp.ImageGalleryMediator';
}
````
Mediators should also implement the `init` method. The `init` method is called once the tag is processed by x-tag and the Lotus component map. This ensures your component instance is completely constructed and its `element` property defined before your mediator set up code is triggered. Below is the init method from `SampleApp.ImageGalleryMediator`
````
SampleApp.ImageGalleryMediator.prototype.init = function () {
    Lotus.AbstractMediator.prototype.init.call(this);
    var recordSetLabel = this.componentInstance.element.getAttribute('source');//note the attribute recordset should be set on the element identified as your component root in your template file (templates/imageGallery.html)
    var model = this.context.injector.inject(SampleApp.MODEL_KEY);
    if( model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel] === null || model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel] === undefined ){
        //create the record set for the source if it's not already defined
        model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel] = new Lavender.RecordSet(null, Lavender.ArrayList);
        model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel].createdOn = new Date();
        model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel].id = Lavender.UuidUtils.generateUUID();
        model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel].recordsPerPage = model.config.galleryItemsPerPage;
        model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel].results.allowDuplicates = true;
        model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel].source = recordSetLabel;
    }

    this.componentInstance.collection = model.recordsetModel.recordSets.recordSetsBySource[recordSetLabel];
    this.componentInstance.collection.addEventListener(Lavender.RecordSetEvent.LOAD_PAGE_DATA, this, 'onLoadPageData');
    this.componentInstance.collection.selectedPage = 1;//will trigger data load
}
````
Be sure you call `Lotus.AbstractMediator.prototype.init.call(this);` as the first call in your `init` method. In this example the component creates a recordset object in the model and assigns it to the component. The component uses this collections as its data provider for constructing collection items. 

Mediators are critical to ensuring your view components remain abstract and properly encapsulated so they can be reused across many applications. You are heavily encouraged to use them.

For a complete example of how to implement view mediators soo our [sample application under the examples directory](https://github.com/doriansmiley/lotusJS/tree/dev/example/sampleApp) and our [button example](https://github.com/doriansmiley/lotusJS/tree/dev/example/button).

# Data Binding

Lotus incorporates Lavender's data binding utilities into it's mediator base class `Lotus.AbstractMediator`. While you are free to implement data binding in any layer of your application, you are encouraged to encapsulate data binding in your mediators. This ensures your web components remain properly encapsulated and reusable, and delegates data binding operations to a single layer within your application.

In order to notify observers of changes you must define the bindable end point. This is always done using the `addProperties` method in the your components constructor. For example:
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
                this.Notify(val, "pageList");
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

Both the Lotus (32kb) and Lavander (51kb) frameworks total only 83 kb combined. That's a lot of power in a small package.

# Examples
For a complete example of how to implement Lotus in an application using the IOC container see our [sample application under the examples directory](https://github.com/doriansmiley/lotusJS/tree/dev/example/sampleApp). For an example of how to just use our web component frameowrk see our [button example](https://github.com/doriansmiley/lotusJS/tree/dev/example/button).

# Create custom components built on Lotus and offer them through the component exchange

TODO

# Create custom skins and offer them through the component exchange

TODO
