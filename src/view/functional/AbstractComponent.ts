import {ContextInterface} from '../..';
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

export function mixin (base, sub, params = null): void {
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
// TODO add factory method to wrap a component in a web component class and attach lifecycle hooks

// interfaces
export interface Component extends IEventDispatcher{
    ready: boolean;
    destroy(): void;
    created(): void;
    inserted(): void;
    removed(): void;
    attributeChanged(): void;
    removeEventListeners(): void;
    addEventListeners(): void;
    onSkinPartAdded(part: string, element: Element): void;
    addAttributes(): void;
    addSkinParts(): void;
};

export function AbstractComponent<T extends Component> (
    element: LotusHTMLElement,
    context: ContextInterface,
    skinPartMap: Map<string, HTMLElement> = new Map<string, HTMLElement>(),
    binder: Binder = new Binder(),
    id: string = UuidUtils.generateUUID(),
    component: T): Component {
    // compose object
    const base: Component = {
        // placeholders for mixins and interfaces, required for the compiler
        handlersByEventName: {},
        addEventListener: (event: string, instance: Record<string, any>, handler: string) => null,
        canListen: (eventType: string, instance: Record<string, any>, handler: string) => null,
        removeEventListener: (event: string, instance: Record<string, any>, handler: string) => null,
        removeAllEventListeners: (instance: Record<string, any>) => null,
        dispatch: (event: IEvent) => null,
        ready: false,
        // end placeholders
        // instance methods are all defined below
        addAttributes: () => {
            // only get enumerable properties
            const properties: Array<string> = Object.keys(component);
            for (let i = 0; i < element.attributes.length; i++) {
                const attribute = element.attributes[i];
                if (attribute.name.indexOf('attribute') >= 0) {
                    const index = attribute.name.indexOf('attribute') + 10;
                    const newProp = attribute.name.substring(index);// remove prefix
                    // convert dashes to camel case
                    const camelCased = newProp.replace(/-([a-z])/g, function (g) {
                        return g[1].toUpperCase();
                    });
                    if (properties.indexOf(camelCased) >= 0) {
                        component[camelCased] = attribute.value;
                    }
                }
            }
        },
        addSkinParts: () => {
            if (element.getAttribute('data-skin-part') !== null && element.getAttribute('data-skin-part') !== undefined) {
                skinPartMap.set(element.getAttribute('data-skin-part'), element);
                component.onSkinPartAdded(element.getAttribute('data-skin-part'), element);
            }
            const skinPartsNodeList = element.querySelectorAll('[data-skin-part]');
            for (let i = 0; i < skinPartsNodeList.length; i++) {
                // iterate over matches
                // call onSkinPartAdded on the component passing skin part attribute value and the element
                skinPartMap.set(element.getAttribute('data-skin-part'), element);
                component.onSkinPartAdded(skinPartsNodeList[i].getAttribute('data-skin-part'), skinPartsNodeList[i]);
            }
        },
        created: () => {
            component.addAttributes();
            component.addSkinParts();
            component.dispatch(new ComponentEvent(ComponentEvent.READY, {target: component}));
        },
        destroy: (): void => {
            component.removeEventListeners();
            skinPartMap.clear();
            binder.unbindAll();
        },
        onSkinPartAdded: (part: string, element: Element) => {
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
        addEventListeners: () => {
            // stub for override in child objects
        }
    };
    // define accessor methods
    addProperty(base,
        'ready',
        function () {
            // once the keys are defined the component is ready for use
            return [...skinPartMap.keys()].length > 0;
        });
    addProperty(base,
        'id',
        function () {
            return id;
        });
    // add event dispatcher methods
    mixin(new EventDispatcher(), base);
    // add base class methods
    mixin(base, component);
    return component;
};
