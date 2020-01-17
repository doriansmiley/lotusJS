import {Binder, UuidUtils, EventDispatcher, IEventDispatcher, IEvent} from 'lavenderjs/lib';
import { List } from 'immutable';
// interfaces
export interface Component extends IEventDispatcher {
    ready: boolean;
    id: string;
    element: HTMLElement;
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
    render<T>(list?: List<T>): HTMLElement;
};
// public functions
export const addProperty = <T>(instance: T, label: string, getter?: () => any, setter?: (v: any) => void, enumerable = true): T => {
    Object.defineProperty(
        instance,
        label,
        {
            get: getter,
            set: setter,
            enumerable: enumerable
        }
    );
    return instance;
};
export const mixin = <T>(target, sub, params = null): T => {
    // IMPORTANT: mixin is designed to function like Object.assign, just respects accessors
    // grab enumerable properties of the target object
    const keys = Object.keys(sub);
    keys.forEach((prop) => {
        const methodDef = Object.getOwnPropertyDescriptor(sub, prop);
        // check if this property uses accessor methods (Object.assign can't do this!)
        if (methodDef && (methodDef.get || methodDef.set)) {
            // yep
            addProperty(target, prop, Object.getOwnPropertyDescriptor(sub, prop).get,
                Object.getOwnPropertyDescriptor(sub, prop).set);
        } else {
            // nope
            target[prop] = sub[prop];
        }
    });
    return target;
};
export const getTemplate = <T extends Component>(): T => {
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
        render: null,
    } as T;
};
export const createComponent = (): Component => {
    const clone = getTemplate();
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
    };
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
    };
    clone.destroy = () => {
        clone.removeEventListeners();
        clone.attributeMap.clear();
        clone.skinPartMap.clear();
        clone.binder.unbindAll();
    };
    clone.render = <T>(list?: List<T>): HTMLElement => {
        // be sure to call removeEventListeners so the old element is garbage collected
        // if you don't remove event listeners the GC will not collect the element
        clone.destroy();
        clone.element = clone.element.cloneNode(true) as HTMLElement;
        clone.addAttributes();
        clone.addSkinParts();
        clone.ready = true;
        return clone.element;
    };
    addProperty(clone,
        'id',
        function () {
            return UuidUtils.generateUUID();
        });
    // TODO create functional event dispatch and replace new EventDispatcher()
    return mixin<Component>(clone, new EventDispatcher());
};
