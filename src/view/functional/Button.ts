// TODO consider a factory method to produce empty component objects to pass down the inheritance chain.
// Will likely make life easier since we are using parametric polymorphism, and in our case this means
// we have to pass in the object that contains the method implementations we want to use. This is very similar
// to class based inheritance except for the fact in a class based system this is obfuscated away. In both cases
// the top most override wins. This could likely be a static method attached to the function

import {ComponentEvent, LotusHTMLElement} from '../..';
import {AbstractComponent, Component, mixin} from './AbstractComponent';
import {IEvent} from 'lavenderjs/lib';

export interface ButtonComponent extends Component {
    onClick: (event: Event) => void;
};

// TODO as part of testing verify the the supplied bluePrint !== the returned instance by reference equality check
// also ensure the the supplied element does not equal the returned component.element by reference equality check
export function Button<T extends ButtonComponent> (
    element: LotusHTMLElement,
    bluePrint: T = Button.getTemplate() as T): T {
    // we default bluePrint to Button if you do not want to extend
    // always pass bluePrint down the inheritance chain first! We build the object bottom up.
    // IMPORTANT AbstractComponent will clone the element, so there are no side effects
    const instance: ButtonComponent = AbstractComponent(element, bluePrint);
    const skinPartMap = new Map<string, HTMLElement>();
    // to override methods first store a pointer to the base class method
    const originalOnSkinPartAdded = instance.onSkinPartAdded;
    const originalRemoveEventListeners = instance.removeEventListeners;
    // add overrides, not onSkinPartAdded is required!!
    instance.onSkinPartAdded = (part: string, element: HTMLElement) => {
        // example of how to call super, it's just a reference to the base object method!
        originalOnSkinPartAdded(part, element);
        switch (part) {
            case 'button':
                // add button event listener or whatever else yo want to do when this skin part is added
                // you could hold until all skin parts are added and then call addEventListeners
                console.log(`Lotus.Button.prototype.onSkinPartAdded: part: ${part}`);
                console.log(`Lotus.Button.prototype.onSkinPartAdded: skinPart: ${part}`);
                skinPartMap.set('button', instance.element);
                element.addEventListener('click', instance.onClick);
                break;
        }
    };
    instance.onClick = (event) => {
        console.log(`Lotus.Button.prototype.onClick: event is ${event}`);
        console.log(`Lotus.Button.prototype.onClick: my id is ${instance.id}`);
        // good example of a polymorphism. We want the dispatch to occur on the actual implementation
        instance.dispatch(new ComponentEvent(ComponentEvent.CLICK, {target: instance, originalEvent: event}));
    };
    instance.removeEventListeners = () => {
        // example of how to call super, it's just a reference to the base object method!
        originalRemoveEventListeners();
        if (skinPartMap.get('button')) {
            skinPartMap.get('button').removeEventListener('click', instance.onClick);
        }
    };
    return mixin(bluePrint, instance);
};

// example of a factory method to get the prototype for the object
Button.getTemplate = (): ButtonComponent => {
    return {
        // placeholders for mixins and interfaces, required for the compiler
        handlersByEventName: {},
        addEventListener: (event: string, instance: Record<string, any>, handler: string) => null,
        canListen: (eventType: string, instance: Record<string, any>, handler: string) => null,
        removeEventListener: (event: string, instance: Record<string, any>, handler: string) => null,
        removeAllEventListeners: (instance: Record<string, any>) => null,
        dispatch: (event: IEvent) => null,
        ready: null,
        id: null,
        element: null,
        binder: null,
        destroy: null,
        init: null,
        inserted: null,
        removed: null,
        attributeChanged: null,
        removeEventListeners: null,
        onSkinPartAdded: null,
        getAttributeValue: null,
        onClick: null,
    };
};
