"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("lavenderjs/lib");
var lib_2 = require("lavenderjs/lib");
var lib_3 = require("lavenderjs/lib");
var SkinPartList_1 = require("./SkinPartList");
var ComponentEvent_1 = require("../control/events/ComponentEvent");
/**
 * Created by dsmiley on 7/26/17.
 */
var AbstractComponent = (function (_super) {
    __extends(AbstractComponent, _super);
    function AbstractComponent() {
        var _this = _super.call(this) || this;
        _this._ready = false;
        _this._id = Math.random();
        _this._skinParts = new SkinPartList_1.SkinPartList();
        lib_3.ObjectUtils.mixin(lib_2.EventDispatcher, AbstractComponent, _this);
        return _this;
    }
    Object.defineProperty(AbstractComponent.prototype, "element", {
        get: function () {
            return this._element;
        },
        set: function (val) {
            this._element = val;
            if (this._element !== null && this._element !== undefined) {
                this._element.getComponentInstance = this.getComponentInstance.bind(this);
            }
            this.notify(val, 'element');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractComponent.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (val) {
            this._context = val;
            this.notify(val, 'context');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractComponent.prototype, "ready", {
        get: function () {
            return this._ready;
        },
        set: function (val) {
            this._ready = val;
            this.notify(val, 'ready');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractComponent.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            this._id = val;
            this.notify(val, 'id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractComponent.prototype, "skinParts", {
        get: function () {
            return this._skinParts;
        },
        set: function (val) {
            this._skinParts = val;
            this.notify(val, 'skinParts');
        },
        enumerable: true,
        configurable: true
    });
    AbstractComponent.prototype.init = function () {
        this.addAttributes();
        this.defineSkinParts();
        this.addSkinParts();
    };
    AbstractComponent.prototype.addAttributes = function () {
        for (var i = 0; i < this.element.attributes.length; i++) {
            var attribute = this.element.attributes[i];
            if (attribute.name.indexOf('attribute') >= 0) {
                var index = attribute.name.indexOf('attribute') + 10;
                var newProp = attribute.name.substring(index); //remove prefix
                //convert dashes to camel case
                //LEGACY: using the data- prefix should trigger camel case on dash automagically
                var camelCased = newProp.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                var properties = this.getAllPropertyNames(this);
                if (properties.indexOf(camelCased) >= 0) {
                    this[camelCased] = attribute.value;
                }
            }
        }
    };
    AbstractComponent.prototype.getAllPropertyNames = function (obj, iterateSelfBool, iteratePrototypeBool) {
        if (iterateSelfBool === void 0) { iterateSelfBool = true; }
        if (iteratePrototypeBool === void 0) { iteratePrototypeBool = true; }
        var props = [];
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
    };
    AbstractComponent.prototype.addSkinParts = function () {
        if (this.element.getAttribute('data-skin-part') !== null && this.element.getAttribute('data-skin-part') !== undefined) {
            this.addSkinPart(this.element.getAttribute('data-skin-part'), this.element);
        }
        var skinPartsNodeList = this.element.querySelectorAll('[data-skin-part]');
        for (var i = 0; i < skinPartsNodeList.length; i++) {
            // iterate over matches
            //call addSkinPart on the component passing skin part attribute value and the element
            this.addSkinPart(skinPartsNodeList[i].getAttribute('data-skin-part'), skinPartsNodeList[i]);
        }
    };
    AbstractComponent.prototype.addSkinPart = function (part, element) {
        //skip undefined skin parts
        if (this.skinParts.skinPartsByLabel[part] === null || this.skinParts.skinPartsByLabel[part] === undefined) {
            return null;
        }
        //assign the skin part
        this.skinParts.skinPartsByLabel[part].element = element;
        //notify
        this.onSkinPartAdded(part, this.skinParts.skinPartsByLabel[part].element);
    };
    AbstractComponent.prototype.onReady = function () {
        this.ready = true;
        this.dispatch(new ComponentEvent_1.ComponentEvent(ComponentEvent_1.ComponentEvent.READY));
    };
    AbstractComponent.prototype.getComponentInstance = function () {
        return this;
    };
    AbstractComponent.prototype.created = function (element) {
        console.log('AbstractComponent.created called');
        this.element = element;
        this.init();
        this.onReady();
    };
    AbstractComponent.prototype.destroy = function () {
        this.removeEventListeners();
        this.binder.unbindAll();
        this.binder = null;
        this.element = null;
        this.id = null;
    };
    //stub methods below
    AbstractComponent.prototype.defineSkinParts = function () {
    };
    AbstractComponent.prototype.onSkinPartAdded = function (part, element) {
    };
    AbstractComponent.prototype.inserted = function (element) {
        console.log('AbstractComponent.inserted called');
    };
    AbstractComponent.prototype.removed = function (element) {
        console.log('AbstractComponent.removed called');
    };
    AbstractComponent.prototype.attributeChanged = function (element) {
        console.log('AbstractComponent.attributeChanged called');
    };
    AbstractComponent.prototype.addEventListeners = function () {
    };
    AbstractComponent.prototype.removeEventListeners = function () {
    };
    return AbstractComponent;
}(lib_1.Subject));
exports.AbstractComponent = AbstractComponent;
//# sourceMappingURL=AbstractComponent.js.map