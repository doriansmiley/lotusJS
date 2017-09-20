lotusJS Sample Button Component
=============

This is a pure Javascript example for people not using typescript. The button example shows how to implement the core `Lotus.Button` web component in your applications. The `Lotus` core will eventually include all common HTML input controls as well as a pre built image gallery, data grid, and many other components offered through the component exchange.

This example also demonstrates how component skins can be loaded remotely and mapped to the component instance. This allows component skins to be developed and distributed separately from component code.

There is also and example of event mediation using a custom event mediator. Event mediators are a powerful abstraction layer for your applications. They can be used to trigger application behaviors that are not, and should not be known to your web components.

You can also create your own custom components and use them in your application without using the rest of the framework. Simply create your component subclass and skin then add the following to your html:

````
var context = (function( xtag ){
            var context = new Lotus.Context(new Lavender.Config);
            context.componentMap.mapComponent('x-my-component-tag', HTMLElement.prototype, MyComponentConstructor, xtag);
            return context;
        }( xtag ));
````
Where `x-my-component-tag` is the custom tag name you have chosen, `HTMLElement.prototype` is the actual html element you want to extend, and `MyComponentConstructor` is the constructor function of your component subclass.