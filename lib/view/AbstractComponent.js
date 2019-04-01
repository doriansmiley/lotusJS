"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lavender = require("lavenderjs/lib");
const SkinPartList_1 = require("./SkinPartList");
const ComponentEvent_1 = require("../control/events/ComponentEvent");
/**
 * Created by dsmiley on 7/26/17.
 */
class AbstractComponent extends Lavender.Subject {
    constructor() {
        super();
        this._ready = false;
        this._id = Math.random();
        this._skinParts = new SkinPartList_1.SkinPartList();
        this._isValid = false;
        //IMPORTANT: you have to initialize instance attributes that are not defined using accessor methods or they will dropped by the compiler.
        this.validClass = null;
        this.invalidClass = null;
        Lavender.ObjectUtils.mixin(Lavender.EventDispatcher, AbstractComponent, this);
    }
    get element() {
        return this._element;
    }
    set element(val) {
        this._element = val;
        if (this._element !== null && this._element !== undefined) {
            this._element.getComponentInstance = this.getComponentInstance.bind(this);
        }
        this.notify(val, 'element');
    }
    get context() {
        return this._context;
    }
    set context(val) {
        this._context = val;
        this.notify(val, 'context');
    }
    get ready() {
        return this._ready;
    }
    set ready(val) {
        this._ready = val;
        this.notify(val, 'ready');
    }
    get id() {
        return this._id;
    }
    set id(val) {
        this._id = val;
        this.notify(val, 'id');
    }
    get skinParts() {
        return this._skinParts;
    }
    set skinParts(val) {
        this._skinParts = val;
        this.notify(val, 'skinParts');
    }
    get isValid() {
        return this._isValid;
    }
    set isValid(value) {
        this._isValid = value;
        this.notify(value, 'isValid');
        if (this.isValid && this.validClass) {
            this.attachValidationClass(this.validClass, this.invalidClass);
        }
        else if (!this.isValid && this.invalidClass) {
            this.attachValidationClass(this.invalidClass, this.validClass);
        }
    }
    //stub for override
    attachValidationClass(classToAdd, classToRemove) {
    }
    init() {
        this.addAttributes();
        this.defineSkinParts();
        this.addSkinParts();
    }
    addAttributes() {
        for (let i = 0; i < this.element.attributes.length; i++) {
            let attribute = this.element.attributes[i];
            if (attribute.name.indexOf('attribute') >= 0) {
                let index = attribute.name.indexOf('attribute') + 10;
                let newProp = attribute.name.substring(index); //remove prefix
                //convert dashes to camel case
                //LEGACY: using the data- prefix should trigger camel case on dash automagically
                let camelCased = newProp.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                let properties = this.getAllPropertyNames(this);
                if (properties.indexOf(camelCased) >= 0) {
                    this[camelCased] = attribute.value;
                }
            }
        }
    }
    getAllPropertyNames(obj, iterateSelfBool = true, iteratePrototypeBool = true) {
        let props = [];
        do {
            if (iterateSelfBool) {
                Object.getOwnPropertyNames(obj).forEach(function (prop) {
                    if (props.indexOf(prop) === -1) {
                        props.push(prop);
                    }
                });
            }
            if (!iteratePrototypeBool) {
                break;
            }
            iterateSelfBool = true;
        } while (obj = Object.getPrototypeOf(obj));
        return props;
    }
    addSkinParts() {
        if (this.element.getAttribute('data-skin-part') !== null && this.element.getAttribute('data-skin-part') !== undefined) {
            this.addSkinPart(this.element.getAttribute('data-skin-part'), this.element);
        }
        let skinPartsNodeList = this.element.querySelectorAll('[data-skin-part]');
        for (let i = 0; i < skinPartsNodeList.length; i++) {
            // iterate over matches
            //call addSkinPart on the component passing skin part attribute value and the element
            this.addSkinPart(skinPartsNodeList[i].getAttribute('data-skin-part'), skinPartsNodeList[i]);
        }
    }
    addSkinPart(part, element) {
        //skip undefined skin parts
        if (this.skinParts.skinPartsByLabel[part] === null || this.skinParts.skinPartsByLabel[part] === undefined) {
            return null;
        }
        //assign the skin part
        this.skinParts.skinPartsByLabel[part].element = element;
        //notify
        this.onSkinPartAdded(part, this.skinParts.skinPartsByLabel[part].element);
    }
    onReady() {
        this.ready = true;
        this.dispatch(new ComponentEvent_1.ComponentEvent(ComponentEvent_1.ComponentEvent.READY, { target: this }));
    }
    getComponentInstance() {
        return this;
    }
    created(element) {
        console.log('AbstractComponent.created called');
        this.element = element;
        this.init();
        this.onReady();
    }
    destroy() {
        this.removeEventListeners();
        this.binder.unbindAll();
        this.binder = null;
        this.element = null;
        this.id = null;
    }
    //stub methods below
    defineSkinParts() {
    }
    onSkinPartAdded(part, element) {
    }
    inserted(element) {
        console.log('AbstractComponent.inserted called');
    }
    removed(element) {
        console.log('AbstractComponent.removed called');
    }
    attributeChanged(element) {
        console.log('AbstractComponent.attributeChanged called');
    }
    addEventListeners() {
    }
    removeEventListeners() {
    }
}
exports.AbstractComponent = AbstractComponent;
//# sourceMappingURL=AbstractComponent.js.map