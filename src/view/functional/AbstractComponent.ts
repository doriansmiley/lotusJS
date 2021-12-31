// interfaces
export interface ComponentEvent {
    type: string;
    payload: unknown;

    clone (event: ComponentEvent): ComponentEvent;
}

export interface EventDispatcher {
    handlersByEventName: Map<string, Array<Listener>>;

    addEventListener (event: string, instance: unknown, handler: string): void;

    canListen (eventType: string, instance: unknown, handler: string): boolean;

    removeEventListener (event: string, instance: unknown, handler: string): void;

    removeAllEventListeners (instance: unknown): void;

    dispatch (event: ComponentEvent): void;
}

export interface Component extends EventDispatcher {
    ready: boolean;
    id: string;
    element: HTMLElement;
    destroy (removed?: boolean): void;

    init (): void;

    inserted (): void;

    removed (): void;

    attributeChanged (): void;

    removeEventListeners (): void;

    onSkinPartAdded (part: string): void;

    attributeMap: Map<string, unknown>;
    skinPartMap: Map<string, HTMLElement>;

    addAttributes (): void;

    addSkinParts (): void;

    render<T> (list?: Array<T>, hydrate?: boolean): HTMLElement;
}

export interface Listener {
    readonly handler: string;
    readonly instance: unknown;
}
// utils
export const random = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
// enums
export enum Events {
    CLICK = 'lotusComponentClick',
    ITEM_SELECTED = 'lotusItemViewItemSelected',
    ITEM_DESELECTED = 'lotusItemViewItemDeselected',
    REMOVE_ITEM = 'lotusItemViewRemoveItem',
}
// const functions
export const addProperty = <T> (instance: T, label: string, getter?: () => unknown, setter?: (v: unknown) => void, enumerable = true): T => {
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
export const mixin = <T> (target, sub): T => {
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
export const getTemplate = <T extends Component> (): T => {
    return {
        // placeholders for mixins and interfaces, required for the compiler
        handlersByEventName: new Map<string, Array<Listener>>(),
        addEventListener: (event: string, instance: unknown, handler: string) => null,
        canListen: (event: string, instance: unknown, handler: string) => null,
        removeEventListener: (event: string, instance: unknown, handler: string) => null,
        removeEventListeners: () => null,
        removeAllEventListeners: (instance: unknown) => null,
        dispatch: (event: ComponentEvent) => null,
        ready: false,
        id: random(),
        element: null,
        destroy: null,
        init: null,
        inserted: null,
        removed: null,
        attributeChanged: null,
        onSkinPartAdded: (part: string) => null,
        attributeMap: new Map<string, unknown>(),
        skinPartMap: new Map<string, Element>(),
        addAttributes: null,
        addSkinParts: null,
        render: null,
    } as T;
};
export const getComponentEvent = (type: string, payload: unknown): ComponentEvent => {
    return {
        type,
        payload,
        clone: (event) => {
            return {...event};
        }
    };
};
export const createComponent = (): Component => {
    let clone = getTemplate();
    const _id = random();
    clone.addEventListener = (event: string, instance: unknown, handler: string) => {
        if (!clone.handlersByEventName.get(event)) {
            clone.handlersByEventName.set(event, []);
        }
        clone.handlersByEventName.get(event).push({handler, instance});
    };
    clone.canListen = (eventType: string, instance: unknown, handler: string): boolean => {
        let canListen = false;
        if (clone.handlersByEventName.get(eventType)) {
            for (let handlerIndex = 0; handlerIndex < clone.handlersByEventName.get(eventType).length; handlerIndex++) {
                const handlerFunctionName = clone.handlersByEventName.get(eventType)[handlerIndex].handler;
                const objectInstance = clone.handlersByEventName.get(eventType)[handlerIndex].instance;
                if (handlerFunctionName == handler && objectInstance == instance) {
                    canListen = true;
                    break;
                }
            }
        }
        return canListen;
    };
    clone.removeEventListener = (event: string, instance: unknown, handler: string) => {
        if (!clone.handlersByEventName.get(event)) {
            return;
        }
        for (let handlerIndex = 0; handlerIndex < clone.handlersByEventName.get(event).length; handlerIndex++) {
            if (clone.handlersByEventName.get(event)[handlerIndex].instance == instance && clone.handlersByEventName.get(event)[handlerIndex].handler == handler) {
                const itemToRemove = clone.handlersByEventName.get(event)[handlerIndex];
                switch (handlerIndex) {
                    case 0:
                        clone.handlersByEventName.get(event).shift();
                        break;
                    case clone.handlersByEventName.get(event).length - 1:
                        clone.handlersByEventName.get(event).pop();
                        break;
                    default:
                        const head = clone.handlersByEventName.get(event).slice(0, handlerIndex);
                        const tail = clone.handlersByEventName.get(event).slice(handlerIndex + 1);
                        clone.handlersByEventName.set(event, head.concat(tail));
                        break;
                }
                // there can be only one item matching event, instance, handler so we return here
                return itemToRemove;
            }
        }
    };
    clone.removeAllEventListeners = (instance: unknown) => {
        for (const event in clone.handlersByEventName) {
            clone.handlersByEventName.get(event).forEach((listener: Listener) => {
                if (listener.instance == instance) {
                    clone.removeEventListener(event, instance, listener.handler);
                }
            });
        }
    };
    clone.dispatch = (event: ComponentEvent) => {
        if (clone.handlersByEventName.get(event.type) === null || clone.handlersByEventName.get(event.type) === undefined) {
            return;
        }
        // We need to make a copy of event handles before dispatching.
        // If the handler removes itself from the event queue during dispatching, it triggers removeEventListener, which
        // changes the array and this messes up the entire dispatch process (some handlers are never called).
        const dispatchToList = clone.handlersByEventName.get(event.type).slice();
        const len = dispatchToList.length;
        for (let handlerIndex = 0; handlerIndex < len; ++handlerIndex) {
            const handlerFunctionName = (dispatchToList[handlerIndex] as Listener).handler;
            const instance = dispatchToList[handlerIndex].instance;
            // @ts-ignore
            instance[handlerFunctionName](event);
        }
    };
    clone.addSkinParts = () => {
        if (clone.element.getAttribute('data-skin-part') !== null
            && clone.element.getAttribute('data-skin-part') !== undefined) {
            clone.skinPartMap.set(clone.element.getAttribute('data-skin-part'), clone.element);
            clone.onSkinPartAdded(clone.element.getAttribute('data-skin-part'),);
        }
        const skinPartsNodeList = clone.element.querySelectorAll('[data-skin-part]');
        for (let i = 0; i < skinPartsNodeList.length; i++) {
            clone.skinPartMap.set(skinPartsNodeList[i].getAttribute('data-skin-part'), skinPartsNodeList[i] as HTMLElement);
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
    clone.destroy = (removed = false) => {
        if (!clone.ready) {
            return;
        }
        clone.removeEventListeners();
        clone.attributeMap.clear();
        clone.skinPartMap.clear();
        // only make clone eligible for GC if removed from DOM
        if (removed) {
            clone = null;
        }
    };
    clone.render = <T> (list?: Array<T>, hydrate = false): HTMLElement => {
        // be sure to call removeEventListeners so the old element is garbage collected
        // if you don't remove event listeners the GC will not collect the element
        if (!hydrate) {
            clone.destroy();
            clone.element = clone.element.cloneNode(true) as HTMLElement;
        }
        clone.addAttributes();
        clone.addSkinParts();
        clone.ready = true;
        return clone.element;
    };
    addProperty(clone,
        'id',
        function () {
            return _id;
        });
    // TODO create functional event dispatch and replace new EventDispatcher()
    return clone;
};
