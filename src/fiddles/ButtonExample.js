// public functions
const addProperty = function (instance, label, getter, setter, enumerable = true) {
    Object.defineProperty(instance, label, {
        get: getter,
        set: setter,
        enumerable: enumerable
    });
    return instance;
};
const mixin = function (target, sub, params = null) {
    // IMPORTANT: mixin is designed to function like Object.assign, just respects accessors
    // grab enumerable properties of the target object
    const keys = Object.keys(sub);
    keys.forEach(function (prop) {
        const methodDef = Object.getOwnPropertyDescriptor(sub, prop);
        // check if this property uses accessor methods (Object.assign can't do this!)
        if (methodDef && (methodDef.get || methodDef.set)) {
            // yep
            addProperty(target, prop, Object.getOwnPropertyDescriptor(sub, prop).get, Object.getOwnPropertyDescriptor(sub, prop).set);
        } else {
            // nope
            target[prop] = sub[prop];
        }
    });
    return target;
};
const getTemplate = function () {
    return {
        // placeholders for mixins and interfaces, required for the compiler
        ready: false,
        id: 1234,
        binder: {
            unbindAll: function () {
                // placeholder
            }
        },
        element: null,
        destroy: null,
        init: null,
        inserted: null,
        removed: null,
        attributeChanged: null,
        removeEventListeners: function () {
            // placeholder
        },
        onSkinPartAdded: null,
        attributeMap: new Map(),
        skinPartMap: new Map(),
        addAttributes: null,
        addSkinParts: null,
        render: null
    };
};
const createComponent = function () {
    const clone = getTemplate();
    clone.addSkinParts = function () {
        if (clone.element.getAttribute('data-skin-part') !== null
            && clone.element.getAttribute('data-skin-part') !== undefined) {
            clone.skinPartMap.set('button', clone.element);
            clone.onSkinPartAdded(clone.element.getAttribute('data-skin-part'));
        }
        const skinPartsNodeList = clone.element.querySelectorAll('[data-skin-part]');
        for (let i = 0; i < skinPartsNodeList.length; i++) {
            clone.skinPartMap.set('button', skinPartsNodeList[i]);
            clone.onSkinPartAdded(skinPartsNodeList[i].getAttribute('data-skin-part'));
        }
    };
    clone.addAttributes = function () {
        // only get enumerable properties
        const properties = Object.keys(clone);
        for (let i = 0; i < clone.element.attributes.length; i++) {
            const attribute = clone.element.attributes[i];
            if (attribute.name.indexOf('attribute') >= 0) {
                const index = attribute.name.indexOf('attribute') + 10;
                const newProp = attribute.name.substring(index); // remove prefix
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
    clone.destroy = function () {
        clone.removeEventListeners();
        clone.attributeMap.clear();
        clone.skinPartMap.clear();
        clone.binder.unbindAll();
    };
    clone.render = function (list) {
        // be sure to call removeEventListeners so the old element is garbage collected
        // if you don't remove event listeners the GC will not collect the element
        clone.destroy();
        clone.element = clone.element.cloneNode(true);
        clone.addAttributes();
        clone.addSkinParts();
        clone.ready = true;
        return clone.element;
    };
    addProperty(clone, 'id', function () {
        return 'askdjf234u';
    });
    // TODO create functional event dispatch and replace new EventDispatcher()
    return clone;
};
;
const createButtonComponent = function () {
    const clone = mixin(createComponent(), {
        onClick: null
    });
    clone.onSkinPartAdded = function (part) {
        switch (part) {
            case 'button':
                // add button event listener or whatever else yo want to do when this skin part is added
                // you could hold until all skin parts are added and then call addEventListeners
                console.log(`Lotus.ButtonComponent.prototype.onSkinPartAdded: part:${  part}`);
                clone.skinPartMap.get(part).addEventListener('click', clone.onClick);
                break;
        }
    };
    clone.onClick = function (event) {
        console.log(`Lotus.ButtonComponent.prototype.onClick: my id is${  clone.id}`);
    };
    clone.removeEventListeners = function () {
        if (clone.skinPartMap.get('button')) {
            clone.skinPartMap.get('button').removeEventListener('click', clone.onClick);
        }
    };
    return clone;
};
// document.querySelector('#app').remove();

class LotusButton extends HTMLElement {
    constructor () {
        // Always call super first in constructor
        super();
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});
        // create our component
        const button = createButtonComponent();
        const clone = document.importNode(document.querySelector('#app').content, true);
        button.element = clone.querySelector('[data-component-root="root"]');
        const renderedComponent = button.render();
        // Attach the created elements to the shadow dom
        shadow.appendChild(renderedComponent);
    }
};
// Define the new element
customElements.define('lotus-button', LotusButton);
