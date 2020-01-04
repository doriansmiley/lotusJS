import {Binder, UuidUtils} from 'lavenderjs/lib';

// TODO consider a factory method to produce empty component objects to pass down the inheritance chain.
// Will likely make life easier since we are using parametric polymorphism, and in our case this means
// we have to pass in the object that contains the method implementations we want to use. This is very similar
// to class based inheritance except for the fact in a class based system this is obfuscated away. In both cases
// the top most override wins. This could likely be a static method attached to the function

import {ComponentEvent, ContextInterface, LotusHTMLElement} from '../..';
import {AbstractComponent, Component} from './AbstractComponent';

export interface ButtonComponent  extends Component{
    buttonSkinPart: HTMLElement;
    onClick: (event: Event) => void;
};

export function Button<T extends ButtonComponent>  (
    element: LotusHTMLElement,
    context: ContextInterface,
    skinPartMap: Map<string, HTMLElement> = new Map<string, HTMLElement>(),
    binder: Binder = new Binder(),
    id: string = UuidUtils.generateUUID(),
    component: T): ButtonComponent {
    // compose component from other components, in this case just AbstractComponent
    const base: Component = AbstractComponent(element, context, skinPartMap, binder, id, component);
    // add overrides, not onSkinPartAdded is required!!
    component.onSkinPartAdded = (part: string, element: Element) => {
        base.onSkinPartAdded(part, element);
        switch (part) {
            case 'button':
                // add button event listener or whatever else yo want to do when this skin part is added
                // you could hold until all skin parts are added and then call addEventListeners
                console.log(`Lotus.Button.prototype.onSkinPartAdded: part: ${part}`);
                console.log(`Lotus.Button.prototype.onSkinPartAdded: skinPart: ${part}`);
                component.addEventListeners();
                break;
        }
    };
    component.onClick = (event) =>{
        console.log(`Lotus.Button.prototype.onClick: event is ${event}`);
        console.log(`Lotus.Button.prototype.onClick: my id is ${id}`);
        component.dispatch(new ComponentEvent(ComponentEvent.CLICK, {target: component, originalEvent: event}));
    };
    component.addEventListeners = () => {
        base.addEventListeners();
        component.buttonSkinPart.addEventListener('click', component.onClick);
    };
    component.removeEventListeners = () => {
        base.removeEventListeners();
        component.buttonSkinPart.removeEventListener('click', component.onClick);
    };
    // mixins, call mixin on any other objects you want to include in this component
    return component;
};

// example of a factory method to get the prototype for the object
Button.getTemplate = (): ButtonComponent => {
    return {
        // placeholders for mixins and interfaces, required for the compiler
        handlersByEventName: null,
        addEventListener: null,
        canListen: null,
        removeEventListener: null,
        removeAllEventListeners: null,
        dispatch: null,
        ready: false,
        // end placeholders
        // instance methods are all defined below
        addAttributes: null,
        addSkinParts: null,
        created: null,
        destroy: null,
        onSkinPartAdded: null,
        inserted: null,
        removed: null,
        attributeChanged:  null,
        removeEventListeners: null,
        addEventListeners: null,
        buttonSkinPart: null,
        onClick: null
    };
};
