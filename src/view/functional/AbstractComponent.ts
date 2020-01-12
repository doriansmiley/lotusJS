import {Binder, UuidUtils, EventDispatcher, IEventDispatcher, IEvent} from 'lavenderjs/lib';
// interfaces
export interface LotusHTMLInterface extends HTMLDivElement {
    lotusComponentInstance: Component;
    createShadowRoot (): Element;
    getComponentInstance (): Component;
}
export interface Component extends IEventDispatcher {
    ready: boolean;
    id: string;
    element: LotusHTMLInterface;
    binder: Binder;
    destroy(): void;
    init(): void;
    inserted (): void;
    removed (): void;
    attributeChanged (): void;
    removeEventListeners (): void;
    onSkinPartAdded(part: string): void;
    attributeMap: Map<string, any>;
    skinPartMap: Map<string, Element>;
    addAttributes(): void;
    addSkinParts(): void;
};
// public functions
export const addProperty = <T>(instance: T, label: string, getter?: () => any, setter?: (v: any) => void, enumerable = true): T => {
    const clone: T = mixin(instance, {});
    Object.defineProperty(
        clone,
        label,
        {
            get: getter,
            set: setter,
            enumerable: enumerable
        }
    );
    return clone;
};
export const mixin = <T>(base, sub, params = null): T => {
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
export const getTemplate = (): Component => {
    return {
        // placeholders for mixins and interfaces, required for the compiler
        handlersByEventName: {},
        addEventListener: (event: string, instance: Record<string, any>, handler: string) => null,
        canListen: (eventType: string, instance: Record<string, any>, handler: string) => null,
        removeEventListener: (event: string, instance: Record<string, any>, handler: string) => null,
        removeAllEventListeners: (instance: Record<string, any>) => null,
        dispatch: (event: IEvent) => null,
        ready: false,
        id: UuidUtils.generateUUID(),
        binder: new Binder(),
        element: null,
        destroy: null,
        init: null,
        inserted: null,
        removed: null,
        attributeChanged: null,
        removeEventListeners: null,
        onSkinPartAdded: null,
        attributeMap: new Map<string, any>(),
        skinPartMap: new Map<string, Element>(),
        addAttributes: null,
        addSkinParts: null,
    };
};
export const createComponent = (): Component => {
    let clone = getTemplate();
    clone.addSkinParts = () => {
        if (clone.element.getAttribute('data-skin-part') !== null
            && clone.element.getAttribute('data-skin-part') !== undefined) {
            clone.skinPartMap.set('button', clone.element);
            clone.onSkinPartAdded(clone.element.getAttribute('data-skin-part'),);
        }
        const skinPartsNodeList = clone.element.querySelectorAll('[data-skin-part]');
        for (let i = 0; i < skinPartsNodeList.length; i++) {
            clone.skinPartMap.set('button', skinPartsNodeList[i]);
            clone.onSkinPartAdded(skinPartsNodeList[i].getAttribute('data-skin-part'));
        }
    }
    clone.addAttributes = () => {
        // only get enumerable properties
        const properties: Array<string> = Object.keys(clone);
        for (let i = 0; i < clone.element.attributes.length; i++) {
            const attribute = clone.element.attributes[i];
            if (attribute.name.indexOf('attribute') >= 0) {
                const index = attribute.name.indexOf('attribute') + 10;
                const newProp = attribute.name.substring(index);// remove prefix
                // convert dashes to camel case
                const camelCased = newProp.replace(/-([a-z])/g, function (g) {
                    return g[1].toUpperCase();
                });
                if (properties.indexOf(camelCased) >= 0) {
                    clone.attributeMap.set(clone[camelCased], attribute.value);
                }
            }
        }
    }
    clone.destroy = () => {
        clone.removeEventListeners();
        clone.attributeMap.clear();
        clone.skinPartMap.clear();
        clone.binder.unbindAll();
    };
    // define accessor methods, below are read only properties
    clone = addProperty(clone,
        'ready',
        function () {
            // this method is called we are good to go
            return true;
        });
    clone = addProperty(clone,
        'id',
        function () {
            return UuidUtils.generateUUID();
        });
    mixin(new EventDispatcher(), clone);
    return clone;
};
