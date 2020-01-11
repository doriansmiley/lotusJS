import {LotusHTMLElement} from '../..';
import {ComponentEvent} from '../..';
import {Binder, UuidUtils, EventDispatcher, IEvent, IEventDispatcher} from 'lavenderjs/lib';

// utils
export function addProperty (instance: object, label: string, getter?: () => any, setter?: (v: any) => void, enumerable = true): void {
    Object.defineProperty(
        instance,
        label,
        {
            get: getter,
            set: setter,
            enumerable: enumerable
        }
    );
};

export function mixin<T> (base, sub, params = null): T {
    // grab enumerable properties of the base object
    const keys = Object.keys(base);
    keys.forEach((prop) => {
        const baseAccessors = Object.getOwnPropertyDescriptor(base, prop);
        // if the value of the property is not defined or empty on sub assign the base definition
        if (!sub.hasOwnProperty(prop) || !sub[prop]) {
            // check if this property uses accessor methods (Object.assign can't do this!)
            if (baseAccessors && (baseAccessors.get || baseAccessors.set)) {
                // yep
                addProperty(sub, prop, Object.getOwnPropertyDescriptor(base, prop).get,
                    Object.getOwnPropertyDescriptor(base, prop).set);
            } else {
                // nope
                sub[prop] = base[prop];
            }
        }
    });
    return sub;
};

// interfaces
export interface Component extends IEventDispatcher {
    ready: boolean;
    id: string;
    element: LotusHTMLElement;
    binder: Binder;
    destroy(): void;
    init(): void;
    inserted (): void;
    removed (): void;
    attributeChanged (): void;
    removeEventListeners (): void;
    onSkinPartAdded (part: string, element: HTMLElement): void;
    getAttributeValue(key: string): any;
};
// the use of generics allows us to create a type of static polymorphism
// TODO: Component state should be mutable and private. Application should be able to call
//  a set data method on the component to establish or reset intitial state. Further the component
//  data model is unoque to the component. The application must implement adapters to feed the component data.
//  After the intial state of the application is parsed into the component model and supplied by the mediator
//  the component will dispatch state change events in response to user interaction. It's up to application mediators to
//  transform those events into application behaviors that update applications state.
//  This sort of flips MVC on its head. The model is now an immutable state store.
//  The view doesn't directly update in response to changes in the state store. Instead the state store is updated
//  in response to changes in the component's internal state resulting from user interaction. In response to state store
//  changes mediators can either re-render components or call a specific method on the component. But at no point does the
//  component itself respond to changes in the state store. This allows components to be 100% reusable in all applications.
//  Components encapsulate the undifferentiated heavy lifting of the component behaviors (for example an image gallery or video player)
//  not the behavior of your application. By keeping the state store immutable the application layer is much easier to test,
//  and features like undo/redo, application state serialization and hydration, etc become much easier to reason about and test.
//  But components have their own encapsulated state and that state should be mutable.
export function AbstractComponent<T extends Component> (
    element: LotusHTMLElement,
    bluePrint: T): T {
    // IMPORTANT: component is the execution context, similar to this
    // it's passed down from the top of the composition chain as a parameter
    // private properties
    const attributeMap = new Map<string, any>();
    // private methods
    const addAttributes = <T extends Component>(component: T) => {
        // only get enumerable properties
        const properties: Array<string> = Object.keys(component);
        for (let i = 0; i < component.element.attributes.length; i++) {
            const attribute = component.element.attributes[i];
            if (attribute.name.indexOf('attribute') >= 0) {
                const index = attribute.name.indexOf('attribute') + 10;
                const newProp = attribute.name.substring(index);// remove prefix
                // convert dashes to camel case
                const camelCased = newProp.replace(/-([a-z])/g, function (g) {
                    return g[1].toUpperCase();
                });
                if (properties.indexOf(camelCased) >= 0) {
                    attributeMap.set(component[camelCased], attribute.value);
                }
            }
        }
    };
    const addSkinParts = <T extends Component>(component: T) => {
        if (component.element.getAttribute('data-skin-part') !== null
            && component.element.getAttribute('data-skin-part') !== undefined) {
            component.onSkinPartAdded(component.element.getAttribute('data-skin-part'),
                component.element);
        }
        const skinPartsNodeList = component.element.querySelectorAll('[data-skin-part]');
        for (let i = 0; i < skinPartsNodeList.length; i++) {
            component.onSkinPartAdded(skinPartsNodeList[i].getAttribute('data-skin-part'),
                skinPartsNodeList[i] as HTMLElement);
        }
    };
    const instance: Component = {
        // placeholders for mixins and interfaces, required for the compiler
        handlersByEventName: {},
        addEventListener: (event: string, instance: Record<string, any>, handler: string) => null,
        canListen: (eventType: string, instance: Record<string, any>, handler: string) => null,
        removeEventListener: (event: string, instance: Record<string, any>, handler: string) => null,
        removeAllEventListeners: (instance: Record<string, any>) => null,
        dispatch: (event: IEvent) => null,
        ready: false,
        id: null,
        binder: new Binder(),
        // we do not want to create side effects in the DOM, so we clone the node ref
        // it up to the caller to attach the element when ready
        element: element.cloneNode(true) as LotusHTMLElement,
        getAttributeValue: (key: string) => {
            return attributeMap.get(key);
        },
        // end placeholders
        // instance methods are all defined below
        init:() => {
            addAttributes(instance);
            addSkinParts(instance);
            // we deffer execution of the dispatch until the next render cycle to allow the caller
            // time to receive the new reference and assign event handlers
            setTimeout(() => {
                instance.dispatch(new ComponentEvent(ComponentEvent.READY, {target: instance}));
            }, 1);
            // define accessor methods, below are read only properties
            addProperty(instance,
                'ready',
                function () {
                    // this method is called we are good to go
                    return true;
                });
            addProperty(instance,
                'id',
                function () {
                    return UuidUtils.generateUUID();
                });
        },
        destroy: () => {
            instance.removeEventListeners();
            instance.element = null;
            instance.binder.unbindAll();
            instance.binder = null;
        },
        onSkinPartAdded: () => {
            // stub for override in child objects
        },
        inserted: () => {
            // stub for override in child objects
        },
        removed: () => {
            // stub for override in child objects
        },
        attributeChanged: () => {
            // stub for override in child objects
        },
        removeEventListeners: () => {
            // stub for override in child objects
        },
    };
    // add event dispatcher methods
    // TODO make a functional event dispatcher
    mixin(new EventDispatcher(), instance);
    // we intentionally flip bluePrint and instance here
    // bluePrint is the prototype of the full inheritance chain
    // at this stage all it's attributes are null. We want all the base class methods
    // to be first in then build up as we traverse the inheritance chain
    // further this prevents side effects as bluePrint is unaffected by this call
    return mixin(bluePrint, instance);
};
