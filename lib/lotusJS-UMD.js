(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Lavender"));
	else if(typeof define === 'function' && define.amd)
		define("Lotus", ["Lavender"], factory);
	else if(typeof exports === 'object')
		exports["Lotus"] = factory(require("Lavender"));
	else
		root["Lotus"] = factory(root["Lavender"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
var Lavender = __webpack_require__(0);
var SkinPartList_1 = __webpack_require__(18);
var ComponentEvent_1 = __webpack_require__(12);
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
        Lavender.ObjectUtils.mixin(Lavender.EventDispatcher, AbstractComponent, _this);
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
}(Lavender.Subject));
exports.AbstractComponent = AbstractComponent;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Created by dsmiley on 8/1/17.
 */
var Lavender = __webpack_require__(0);
var SkinPart = (function (_super) {
    __extends(SkinPart, _super);
    function SkinPart(label, instance, attribute) {
        var _this = _super.call(this) || this;
        _this._label = label;
        _this._instance = instance;
        _this._attribute = attribute;
        return _this;
    }
    Object.defineProperty(SkinPart.prototype, "label", {
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkinPart.prototype, "element", {
        get: function () {
            return this._instance[this._attribute];
        },
        set: function (val) {
            this._instance[this._attribute] = val;
            this.notify(val, 'element');
        },
        enumerable: true,
        configurable: true
    });
    return SkinPart;
}(Lavender.Subject));
exports.SkinPart = SkinPart;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Created by dsmiley on 7/31/17.
 */
var Lavender = __webpack_require__(0);
var ItemViewEvent = (function (_super) {
    __extends(ItemViewEvent, _super);
    function ItemViewEvent(type, payload) {
        var _this = _super.call(this, type, payload) || this;
        if (type == ItemViewEvent.ITEM_SELECTED && (!payload.hasOwnProperty('item') || payload['item'] === null || payload['item'] === undefined)) {
            throw new Error('Lotus.ItemViewEvent payload.item is required');
        }
        return _this;
    }
    ItemViewEvent.prototype.clone = function (type, payload) {
        return new ItemViewEvent(this.type, this.payload);
    };
    ItemViewEvent.ITEM_SELECTED = 'itemViewItemSelected';
    ItemViewEvent.ITEM_DESELECTED = 'itemViewItemDeselected';
    ItemViewEvent.REMOVE_ITEM = 'itemViewRemoveItem';
    return ItemViewEvent;
}(Lavender.AbstractEvent));
exports.ItemViewEvent = ItemViewEvent;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommandMap = (function () {
    function CommandMap(context) {
        //Note: this could be improved by creating read only accessor methods for instanceMap and eventFunctionMap
        this.eventFunctionMap = {};
        this.instanceMap = {};
        this.context = context;
    }
    CommandMap.prototype.addCommand = function (eventType, handler, functionName, useSingleton) {
        if (functionName === void 0) { functionName = 'execute'; }
        if (useSingleton === void 0) { useSingleton = false; }
        if (this.eventFunctionMap[eventType] === null || this.eventFunctionMap[eventType] === undefined) {
            this.eventFunctionMap[eventType] = [];
        }
        if (this.hasCommandMap(eventType, handler, functionName)) {
            return; //don't add the handler/function twice
        }
        this.eventFunctionMap[eventType].push({ eventType: eventType, handler: handler, functionName: functionName, useSingleton: useSingleton });
        if (useSingleton) {
            if (this.instanceMap[eventType] === null || this.instanceMap[eventType] === undefined) {
                this.instanceMap[eventType] = {};
            }
            if (this.instanceMap[eventType][handler] === null || this.instanceMap[eventType][handler] === undefined) {
                this.instanceMap[eventType][handler] = new handler(this.context);
            }
        }
        if (!this.context.eventDispatcher.canListen(eventType, this, 'routeEventToCommand')) {
            this.context.eventDispatcher.addEventListener(eventType, this, 'routeEventToCommand');
        }
    };
    CommandMap.prototype.hasCommandMap = function (eventType, handler, functionName) {
        var hasCommand = false;
        if (this.eventFunctionMap[eventType] !== null && this.eventFunctionMap[eventType] !== undefined) {
            var mapArray = this.eventFunctionMap[eventType];
            for (var itemIndex = 0; itemIndex < mapArray.length; itemIndex++) {
                var item = mapArray[itemIndex];
                if (item.handler == handler && item.functionName == functionName) {
                    hasCommand = true;
                    break;
                }
            }
        }
        return hasCommand;
    };
    CommandMap.prototype.removeCommand = function (eventType, handler) {
        if (this.eventFunctionMap[eventType] !== null && this.eventFunctionMap[eventType] !== undefined) {
            var mapArray = this.eventFunctionMap[eventType];
            for (var itemIndex = mapArray.length - 1; itemIndex >= 0; itemIndex--) {
                var item = mapArray[itemIndex];
                if (item.handler == handler) {
                    //remove the item form the array
                    switch (itemIndex) {
                        case 0:
                            mapArray.shift();
                            break;
                        case mapArray.length - 1:
                            mapArray.pop();
                            break;
                        default:
                            var head = mapArray.slice(0, itemIndex);
                            var tail = mapArray.slice(itemIndex + 1);
                            mapArray = head.concat(tail);
                            break;
                    }
                }
            }
            if (this.eventFunctionMap[eventType].length <= 0) {
                this.context.eventDispatcher.removeEventListener(eventType, this, 'routeEventToCommand');
                delete this.eventFunctionMap[eventType];
            }
        }
    };
    CommandMap.prototype.removeAllCommands = function () {
        this.eventFunctionMap = {};
        this.instanceMap = {};
        this.context.eventDispatcher.removeAllEventListeners(this);
    };
    CommandMap.prototype.routeEventToCommand = function (event) {
        if (this.eventFunctionMap[event.type] !== null && this.eventFunctionMap[event.type] !== undefined) {
            var mapArray = this.eventFunctionMap[event.type];
            for (var itemIndex = 0; itemIndex < mapArray.length; itemIndex++) {
                var item = mapArray[itemIndex];
                if (item.useSingleton) {
                    this.instanceMap[item.event.type][item.handler][item.functionName]();
                }
                else {
                    var instance = void 0;
                    if (typeof item.handler === 'object') {
                        instance = item.handler;
                    }
                    else {
                        //IMPORTANT: only constructor function will get the context! This is by design as it's assumed preconstructed objects have all required dependencies
                        instance = new item.handler(this.context);
                    }
                    instance[item.functionName](event);
                }
            }
        }
    };
    return CommandMap;
}());
exports.CommandMap = CommandMap;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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
var Lavender = __webpack_require__(0);
var ComponentList = (function (_super) {
    __extends(ComponentList, _super);
    function ComponentList() {
        var _this = _super.call(this) || this;
        _this.instancesByConstructor = {};
        return _this;
    }
    ComponentList.prototype.addToHash = function (object) {
        if (this.instancesByConstructor[object.constructor] === null || this.instancesByConstructor[object.constructor] === undefined) {
            this.instancesByConstructor[object.constructor] = [];
        }
        this.instancesByConstructor[object.constructor].push(object);
    };
    ComponentList.prototype.removeItemFromHash = function (hash, object) {
        var objects = hash[object.constructor];
        if (objects === null || objects === undefined || objects.length < 1) {
            return;
        }
        for (var i = 0; i < objects.length; i++) {
            if (objects[i] == object) {
                //remove the item from the array
                switch (i) {
                    case 0:
                        objects.shift();
                        break;
                    case objects.length - 1:
                        objects.pop();
                        break;
                    default:
                        var head = objects.slice(0, i);
                        var tail = objects.slice(i + 1);
                        objects = head.concat(tail);
                        break;
                }
                break;
            }
        }
    };
    ComponentList.prototype.addItem = function (object, hash, key) {
        var index = _super.prototype.addItem.call(this, object, hash, key);
        //populate hash
        this.addToHash(object);
        return index;
    };
    ComponentList.prototype.clear = function () {
        _super.prototype.clearHash.call(this, this.instancesByConstructor);
        _super.prototype.clear.call(this);
    };
    ComponentList.prototype.removeItemAt = function (index) {
        var object = this.getItemAt(index);
        this.removeItemFromHash(this.instancesByConstructor, object);
        _super.prototype.removeItemAt.call(this, index);
    };
    ComponentList.prototype.insert = function (object, index, suppressChangeEvent, hash, key, replaceIndex) {
        if (suppressChangeEvent === void 0) { suppressChangeEvent = false; }
        if (replaceIndex === void 0) { replaceIndex = false; }
        var returnValue = _super.prototype.insert.call(this, object, index, suppressChangeEvent, hash, key, replaceIndex);
        this.addToHash(object);
        return returnValue;
    };
    return ComponentList;
}(Lavender.ArrayList));
exports.ComponentList = ComponentList;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Lavender = __webpack_require__(0);
var ComponentList_1 = __webpack_require__(5);
/**
 * Created by dsmiley on 7/25/17.
 */
var ComponentMap = (function () {
    function ComponentMap(context) {
        this.context = context;
        this.componentInstances = new ComponentList_1.ComponentList();
        this.tagInstanceToRequestId = {};
    }
    ComponentMap.prototype.success = function (result) {
        var tagInstance = this.tagInstanceToRequestId[result.requestId];
        var div = document.createElement('div');
        div.innerHTML = result.resultObj;
        //clone the contents
        var clone = document.importNode(div.childNodes[0].content, true);
        //select the root component node
        var component = clone.querySelector(tagInstance.getAttribute('data-component-root'));
        component.lotusComponentInstance = tagInstance.lotusComponentInstance;
        //create a shadow host from the tag instance and append the clone to it
        var host = tagInstance.createShadowRoot();
        host.appendChild(clone);
        //pass along the root component node to the view component
        this.createComponent(component);
        //Scope styles to the tag. This appends the tag's nodeName to all styles to simulate DOM encapsulation, however it will not shield the shadowDOM from selectors in the lightDOM. This is not possible with pollyfills at this time.
        //Note window.WebComponents is added by bower web components core. shimStyling is used by polyfills
        if (window['WebComponents'] && window['WebComponents'].ShadowCSS) {
            window['WebComponents'].ShadowCSS.shimStyling(host, tagInstance.nodeName);
        }
    };
    ComponentMap.prototype.fault = function (fault) {
        console.log(fault);
        throw new Error('Could not load template. Please check you defined the correct path.');
    };
    ComponentMap.prototype.onProgress = function (progress) {
    };
    ComponentMap.prototype.addComponent = function (tagInstance, functionConstructor) {
        // fired once at the time a component
        // is initially created or parsed
        if (tagInstance.lotusComponentInstance === null || tagInstance.lotusComponentInstance === undefined) {
            tagInstance.lotusComponentInstance = new functionConstructor();
            this.componentInstances.addItem(tagInstance.lotusComponentInstance);
        }
        //trigger mediator assignment if any
        this.context.mediatorMap.apply(tagInstance.tagName.toLowerCase(), tagInstance.lotusComponentInstance);
        //if the tag instance defines a scr attribute load the template and set up the shadow DOM
        var src = tagInstance.getAttribute('data-template-url');
        if (src !== null && src !== undefined) {
            var httpService = new Lavender.XhrHttpService();
            httpService.addResponder(this);
            httpService.send('GET', src, null, 'text/html', 'text', true);
            this.tagInstanceToRequestId[httpService.requestId] = tagInstance;
            return;
        }
        this.createComponent(tagInstance);
    };
    ComponentMap.prototype.createComponent = function (tagInstance) {
        tagInstance.lotusComponentInstance.created(tagInstance);
    };
    ComponentMap.prototype.mapComponent = function (tagName, prototype, functionConstructor, framework) {
        if (!framework) {
            framework = xtag;
        }
        var componentMap = this;
        var lifecycle = {
            created: function () {
                //IMPORTANT:, use builder patter here and create an add component function
                componentMap.addComponent(this, functionConstructor);
            },
            inserted: function () {
                // fired each time a component
                // is inserted into the DOM
                this.lotusComponentInstance.inserted(this);
            },
            removed: function () {
                // fired each time an element
                // is removed from DOM
                this.lotusComponentInstance.removed(this);
            },
            attributeChanged: function (attrName, oldValue, newValue) {
                // fired when attributes are set
                this.lotusComponentInstance.attributeChanged(this);
            }
        };
        var definition = {
            // extend existing elements
            prototype: prototype,
            lifecycle: lifecycle
        };
        framework.register(tagName, definition);
    };
    return ComponentMap;
}());
exports.ComponentMap = ComponentMap;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Injector = (function () {
    function Injector(context) {
        this.context = context;
        this.objectMap = {};
    }
    Injector.prototype.mapObject = function (key, constructor, useSingleton) {
        if (useSingleton === void 0) { useSingleton = false; }
        //instantiate singleton instance upon request is more efficient
        this.objectMap[key] = { constructor: constructor, useSingleton: useSingleton, instance: null };
    };
    Injector.prototype.mapSingletonInstance = function (key, instance) {
        //map injector as sigleton using the supplied instance
        //this method is very useful for mapping objects that are themselves singletons and may have already been constructed
        //prime example is the model wich generally is constructed before injections are defined
        this.objectMap[key] = { constructor: null, useSingleton: true, instance: instance };
    };
    Injector.prototype.inject = function (key) {
        if (this.objectMap[key] !== null && this.objectMap[key] !== undefined) {
            if (this.objectMap[key].useSingleton) {
                if (this.objectMap[key].instance === null) {
                    this.objectMap[key].instance = new this.objectMap[key].constructor();
                }
                return this.objectMap[key].instance;
            }
            else {
                return new this.objectMap[key].constructor();
            }
        }
        throw new Error('Lotus.Injector.prototype.getObject: could not find object for key: ' + key);
    };
    return Injector;
}());
exports.Injector = Injector;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Lavender = __webpack_require__(0);
/**
 * Created by dsmiley on 7/26/17.
 */
var MediatorMap = (function () {
    function MediatorMap(context) {
        //Note: this could be improved by creating read only accessor methods for tagMap and eventFunctionMap
        this._tagConstructorMap = {};
        this._mediatorInstanceMap = {};
        this.context = context;
    }
    Object.defineProperty(MediatorMap.prototype, "tagConstructorMap", {
        get: function () {
            return this._tagConstructorMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediatorMap.prototype, "mediatorInstanceMap", {
        get: function () {
            return this._mediatorInstanceMap;
        },
        enumerable: true,
        configurable: true
    });
    MediatorMap.prototype.add = function (tagName, mediatorConstructor, useSingleton) {
        if (useSingleton === void 0) { useSingleton = false; }
        if (this.hasMediatorMap(tagName, mediatorConstructor)) {
            return; //don't add the mediatorConstructor/function twice
        }
        this.tagConstructorMap[tagName] = { useSingleton: useSingleton, constructor: mediatorConstructor, id: Lavender.UuidUtils.generateUUID(), name: mediatorConstructor.toString() };
    };
    MediatorMap.prototype.remove = function (tagName, mediatorConstructor) {
        if (!this.hasMediatorMap(tagName, mediatorConstructor)) {
            return; //don't add the mediatorConstructor/function twice
        }
        var mapId = this.tagConstructorMap[tagName].id;
        this.tagConstructorMap[tagName] = null;
        delete this.tagConstructorMap[tagName];
        if (this._mediatorInstanceMap[mapId] === null || this._mediatorInstanceMap[mapId] === undefined) {
            return; //mo mediators were applied to this mapping
        }
        //iterate in reverse over all instance and destroy
        for (var i = 0; i < this._mediatorInstanceMap[mapId].length; i++) {
            this._mediatorInstanceMap[mapId][i].destroy();
        }
        //make the array eligible for garbage collection
        this._mediatorInstanceMap[mapId] = null;
        delete this._mediatorInstanceMap[mapId];
        return mapId; //return mapId to help enable better tests
    };
    MediatorMap.prototype.apply = function (tagName, componentInstance) {
        var map = this.tagConstructorMap[tagName];
        if (!map) {
            return; //no mediator found for this tag
        }
        if (this._mediatorInstanceMap[map.id] === null || this._mediatorInstanceMap[map.id] === undefined) {
            this._mediatorInstanceMap[map.id] = [];
        }
        if (map.useSingleton) {
            if (this._mediatorInstanceMap[map.id].length == 0) {
                this._mediatorInstanceMap[map.id].push(new map.constructor(componentInstance, this.context));
            }
        }
        else {
            this._mediatorInstanceMap[map.id].push(new map.constructor(componentInstance, this.context));
        }
    };
    MediatorMap.prototype.hasMediatorMap = function (tagName, mediatorConstructor) {
        return (this.tagConstructorMap.hasOwnProperty(tagName) && this.tagConstructorMap[tagName].name == mediatorConstructor.toString());
    };
    return MediatorMap;
}());
exports.MediatorMap = MediatorMap;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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
var Lavender = __webpack_require__(0);
var ActionSuccessEvent_1 = __webpack_require__(11);
var ActionErrorEvent_1 = __webpack_require__(10);
/**
 * Created by dsmiley on 7/28/17.
 */
var AbstractCommand = (function (_super) {
    __extends(AbstractCommand, _super);
    function AbstractCommand(context) {
        var _this = _super.call(this) || this;
        _this.context = context;
        _this.service = context.injector.inject('service');
        _this.parser = context.injector.inject('parser');
        _this.opModel = context.injector.inject('opModel');
        _this.errorModel = context.injector.inject('errorModel');
        return _this;
    }
    AbstractCommand.prototype.execute = function (event) {
        if (this.service === null || this.service === undefined || this.opModel === null || this.opModel === undefined || this.parser === null || this.parser === undefined) {
            this.executionError();
        }
        this.opModel.asyncOperationComplete = false;
        this.opModel.asyncOperationCount += 1;
        return this.executeServiceMethod();
    };
    //method must return a requestID
    //Override this method in subclasses
    AbstractCommand.prototype.executeServiceMethod = function () {
        return null;
    };
    //Override this method in subclasses
    //it should parse the result and return the resulting Object tree
    AbstractCommand.prototype.parseResponse = function (result) {
        return null;
    };
    AbstractCommand.prototype.dispatchSuccess = function (parsedResult) {
        var doneEvent = new ActionSuccessEvent_1.ActionSuccessEvent(ActionSuccessEvent_1.ActionSuccessEvent.SUCCESS, { result: parsedResult });
        this.dispatch(doneEvent);
    };
    AbstractCommand.prototype.success = function (result) {
        try {
            //result is instance of Lavender.HttpSuccess
            var parsedResult = this.parseResponse(result);
            this.dispatchSuccess(parsedResult);
        }
        catch (e) {
            var errorMessage = this.getErrorMessage() + "\n" + e.message + "\n" + e.stack;
            var errorEvent = new ActionErrorEvent_1.ActionErrorEvent(ActionErrorEvent_1.ActionErrorEvent.ERROR, { message: errorMessage });
            this.dispatch(errorEvent);
            var error = { name: 'error', message: errorMessage };
            this.errorModel.errors.addItem(error);
            this.errorModel.appError = true;
        }
        finally {
            this.opModel.asyncOperationCount -= 1;
            if (this.opModel.asyncOperationCount == 0) {
                this.opModel.asyncOperationComplete = true;
            }
            this.destroy();
        }
    };
    AbstractCommand.prototype.fault = function (fault) {
        //fault is an instance of Lavender.HttpFault
        this.opModel.asyncOperationCount -= 1;
        if (this.opModel.asyncOperationCount == 0) {
            this.opModel.asyncOperationComplete = true;
        }
        var errorMessage = this.getFaultString() + fault.message;
        var errorEvent = new ActionErrorEvent_1.ActionErrorEvent(ActionErrorEvent_1.ActionErrorEvent.ERROR, { message: errorMessage });
        this.dispatch(errorEvent);
        var error = { name: fault.status, message: errorMessage };
        this.errorModel.errors.addItem(error);
        this.errorModel.appError = true;
        this.destroy();
    };
    //Override this method in subclasses
    AbstractCommand.prototype.onProgress = function (progress) {
    };
    //Override this method in subclasses
    AbstractCommand.prototype.getFaultString = function () {
        return null;
    };
    //Override this method in subclasses
    AbstractCommand.prototype.getErrorMessage = function () {
        return null;
    };
    AbstractCommand.prototype.executionError = function () {
        // These properties weren't injected or supplied in the constructor or manually.
        // They are needed so we throw an error.
        var msg = this.getExecErrorString();
        if (this.service === null || this.service === undefined) {
            msg += " service";
        }
        if (this.opModel === null || this.opModel) {
            msg += ", opModel";
        }
        if (this.parser === null || this.parser === undefined) {
            msg += ", parser";
        }
        msg += ".";
        throw new Error(msg);
    };
    //Override this method in subclasses
    AbstractCommand.prototype.getExecErrorString = function () {
        return 'Lavender.AbstractServiceAction.prototype.executionError: the following are required: ';
    };
    AbstractCommand.prototype.destroy = function () {
        if (this.canListen(ActionErrorEvent_1.ActionErrorEvent.ERROR, this, 'onError')) {
            this.removeEventListener(ActionErrorEvent_1.ActionErrorEvent.ERROR, this, 'onError');
        }
        if (this.canListen(ActionSuccessEvent_1.ActionSuccessEvent.SUCCESS, this, 'onSuccess')) {
            this.removeEventListener(ActionSuccessEvent_1.ActionSuccessEvent.SUCCESS, this, 'onSuccess');
        }
        this.context = null;
        this.opModel = null;
        this.service = null;
        this.parser = null;
        this.errorModel = null;
    };
    return AbstractCommand;
}(Lavender.EventDispatcher));
exports.AbstractCommand = AbstractCommand;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Created by dsmiley on 5/18/17.
 */
var Lavender = __webpack_require__(0);
var ActionErrorEvent = (function (_super) {
    __extends(ActionErrorEvent, _super);
    function ActionErrorEvent(type, payload) {
        var _this = _super.call(this, type, payload) || this;
        if (!payload || payload.message === null || payload.message === undefined) {
            throw new Error('Lavender.ActionErrorEvent: payload.message is required');
        }
        return _this;
    }
    ActionErrorEvent.prototype.clone = function (type, payload) {
        return new ActionErrorEvent(this.type, this.payload);
    };
    ActionErrorEvent.ERROR = 'actionError';
    return ActionErrorEvent;
}(Lavender.AbstractEvent));
exports.ActionErrorEvent = ActionErrorEvent;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Created by dsmiley on 5/18/17.
 */
var Lavender = __webpack_require__(0);
var ActionSuccessEvent = (function (_super) {
    __extends(ActionSuccessEvent, _super);
    function ActionSuccessEvent(type, payload) {
        var _this = _super.call(this, type, payload) || this;
        if (payload === null || payload === undefined) {
            throw new Error('Lavender.ActionSuccessEvent: payload is required');
        }
        return _this;
    }
    ActionSuccessEvent.prototype.clone = function (type, payload) {
        return new ActionSuccessEvent(this.type, this.payload);
    };
    ActionSuccessEvent.SUCCESS = 'actionSuccess';
    return ActionSuccessEvent;
}(Lavender.AbstractEvent));
exports.ActionSuccessEvent = ActionSuccessEvent;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Created by dsmiley on 7/31/17.
 */
var Lavender = __webpack_require__(0);
var ComponentEvent = (function (_super) {
    __extends(ComponentEvent, _super);
    function ComponentEvent(type, payload) {
        return _super.call(this, type, payload) || this;
    }
    ComponentEvent.prototype.clone = function (type, payload) {
        return new ComponentEvent(this.type, this.payload);
    };
    ComponentEvent.READY = 'lotusComponentReady';
    return ComponentEvent;
}(Lavender.AbstractEvent));
exports.ComponentEvent = ComponentEvent;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

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
var Lavender = __webpack_require__(0);
var HttpServiceFactory_1 = __webpack_require__(15);
/**
 * Created by dsmiley on 7/27/17.
 * This is a sample asynchronous action used in unit tests. It can be used as a template though for all asynch actions
 */
var SampleService = (function (_super) {
    __extends(SampleService, _super);
    function SampleService(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.serviceMap = (config.hasOwnProperty('serviceMap')) ? config['serviceMap'] :
            {
                'echoJSON': ':3000/echoJSON/key/{0}',
                'localRequest': ':3000/printondemand/1234/photos/{0}'
            };
        return _this;
    }
    SampleService.prototype.getURLWithParams = function (key, args) {
        return (args !== null && args !== undefined) ? Lavender.StringUtil.substitute(this.getURL(key), args) : this.getURL(key);
    };
    SampleService.prototype.getURL = function (key) {
        return this.config.baseUrl + this.serviceMap[key];
    };
    SampleService.prototype.echoJSON = function (jsonKey, key, responder, paramObj, format, contentType, cache) {
        if (paramObj === void 0) { paramObj = {}; }
        if (format === void 0) { format = 'json'; }
        if (contentType === void 0) { contentType = 'application/json'; }
        if (cache === void 0) { cache = false; }
        //this is a sample service method to be used as an example only. You service methods will be dependent on your service API and model objects
        //note the use of the key param. This is a very importnat feature and I highly recommend that whatever service you created implements a similar method
        //don't hard code or otherwise tightly couple the URL creation inside this method. The use of a builder pattern ensures the end point can be changed based on environment
        var url = this.getURLWithParams(key, [jsonKey]);
        return this.sendRequest(true, responder, url, paramObj, format, contentType, cache);
    };
    SampleService.prototype.testRequestUsingIncludedAPI = function (key, responder, format, contentType, cache) {
        if (format === void 0) { format = 'json'; }
        if (contentType === void 0) { contentType = 'application/json'; }
        if (cache === void 0) { cache = false; }
        var url = this.getURLWithParams(key, ['54232fc2-7345-4921-8079']); //hard coded args
        return this.sendRequest(false, responder, url, null, format, contentType, cache);
    };
    SampleService.prototype.sendRequest = function (isPostRequest, responder, url, paramObj, format, contentType, cache) {
        if (paramObj === void 0) { paramObj = {}; }
        if (format === void 0) { format = 'json'; }
        if (contentType === void 0) { contentType = 'application/json'; }
        if (cache === void 0) { cache = false; }
        var params = JSON.stringify(paramObj);
        if (cache === null || cache === undefined) {
            cache = false;
        }
        var httpRequestInstance = HttpServiceFactory_1.HttpServiceFactory.getInstance().getHttpService(this.config.serviceCode);
        httpRequestInstance.addResponder(responder);
        var requestType = (isPostRequest) ? 'POST' : 'GET';
        return httpRequestInstance.send(requestType, url, params, contentType, format, cache);
    };
    return SampleService;
}(Lavender.AbstractHttpService));
exports.SampleService = SampleService;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Lavender = __webpack_require__(0);
/**
 * Created by dsmiley on 7/27/17.
 */
var EventDispatcherFactory = (function () {
    function EventDispatcherFactory() {
        if (EventDispatcherFactory.INSTANCE != null) {
            throw ('EventDispatcherFactory.INSTANCE: Singleton class has already been instantiated');
        }
        else {
            //perform any required object set up
        }
    }
    EventDispatcherFactory.getInstance = function () {
        if (EventDispatcherFactory.INSTANCE == null) {
            EventDispatcherFactory.INSTANCE = new EventDispatcherFactory();
        }
        return EventDispatcherFactory.INSTANCE;
    };
    EventDispatcherFactory.prototype.getEventDispatcher = function (eventDispatcherCode) {
        if (eventDispatcherCode === void 0) { eventDispatcherCode = 'Lavender.EventDispatcher'; }
        var dispatcher;
        //config.daoCode defaults to jquery
        switch (eventDispatcherCode) {
            case "Lavender.EventDispatcher":
            default:
                dispatcher = new Lavender.EventDispatcher();
        }
        return dispatcher;
    };
    EventDispatcherFactory.INSTANCE = null;
    return EventDispatcherFactory;
}());
exports.EventDispatcherFactory = EventDispatcherFactory;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Lavender = __webpack_require__(0);
/**
 * Created by dsmiley on 7/27/17.
 */
var HttpServiceFactory = (function () {
    function HttpServiceFactory() {
        if (HttpServiceFactory.INSTANCE != null) {
            throw ('HttpServiceFactory.INSTANCE: Singleton class has already been instantiated');
        }
        else {
            //perform any required object set up
        }
    }
    HttpServiceFactory.getInstance = function () {
        if (HttpServiceFactory.INSTANCE == null) {
            HttpServiceFactory.INSTANCE = new HttpServiceFactory();
        }
        return HttpServiceFactory.INSTANCE;
    };
    //override this method to return custon IService implementations
    HttpServiceFactory.prototype.getHttpService = function (code) {
        if (code === void 0) { code = 'Lavender.XhrHttpService'; }
        var httpService;
        switch (code) {
            case "Lavender.XhrHttpService":
            default:
                httpService = new Lavender.XhrHttpService();
                break;
        }
        return httpService;
    };
    HttpServiceFactory.INSTANCE = null;
    return HttpServiceFactory;
}());
exports.HttpServiceFactory = HttpServiceFactory;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Created by dsmiley on 8/4/17.
 */
var Lavender = __webpack_require__(0);
var AbstractComponent_1 = __webpack_require__(1);
var SkinPart_1 = __webpack_require__(2);
var ItemViewEvent_1 = __webpack_require__(3);
var AbstractCollectionView = (function (_super) {
    __extends(AbstractCollectionView, _super);
    function AbstractCollectionView() {
        var _this = _super.call(this) || this;
        _this._childViews = new Lavender.ArrayList();
        return _this;
    }
    Object.defineProperty(AbstractCollectionView.prototype, "collectionContainer", {
        get: function () {
            return this._collectionContainer;
        },
        set: function (value) {
            this._collectionContainer = value;
            this.notify(value, 'collectionContainer');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCollectionView.prototype, "itemTemplate", {
        get: function () {
            return this._itemTemplate;
        },
        set: function (value) {
            this._itemTemplate = value;
            this.notify(value, 'itemTemplate');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCollectionView.prototype, "selectedItem", {
        get: function () {
            return this._selectedItem;
        },
        set: function (value) {
            this._selectedItem = value;
            this.notify(value, 'selectedItem');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCollectionView.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (value) {
            this.removeCollectionEventListeners(); //must occur first
            this._collection = value;
            if (value) {
                this.addCollectionEventListeners();
            } //must occur after line above
            this.notify(value, 'collection');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCollectionView.prototype, "childViews", {
        get: function () {
            return this._childViews;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractCollectionView.prototype, "itemView", {
        get: function () {
            return this._itemView;
        },
        set: function (value) {
            this._itemView = value;
            this.notify(value, 'itemView');
        },
        enumerable: true,
        configurable: true
    });
    AbstractCollectionView.prototype.destroyChildViews = function () {
        for (var i = 0; i < this.childViews.length; i++) {
            this.removeChildView(this.childViews.getItemAt(i));
        }
        if (this.collectionContainer !== null && this.collectionContainer !== undefined) {
            while (this.collectionContainer.firstChild) {
                this.collectionContainer.removeChild(this.collectionContainer.firstChild);
            }
        }
        else {
            //remove child nodes
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        }
        this._childViews = null;
    };
    AbstractCollectionView.prototype.addCollectionEventListeners = function () {
        if (this.collection !== null && this.collection !== undefined) {
            this.collection.addEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'onCollectionChange');
        }
    };
    AbstractCollectionView.prototype.removeCollectionEventListeners = function () {
        if (this.collection !== null && this.collection !== undefined) {
            this.collection.removeEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'onCollectionChange');
        }
    };
    AbstractCollectionView.prototype.onCollectionChange = function (event) {
        switch (event.payload['type']) {
            case 'add':
                this.addChildView(event.payload['item']);
                break;
            case 'remove':
                this.removeChildViewFromModel(event.payload['item']);
                break;
            case 'removeAll':
                this.removeAllChildViews();
                break;
        }
    };
    AbstractCollectionView.prototype.createChildView = function (model) {
        var evalClass = eval(this.itemView);
        return new evalClass();
    };
    AbstractCollectionView.prototype.addChildView = function (model) {
        var view = this.createChildView(model);
        //clone the view
        var clone = this.itemTemplate.cloneNode(true);
        view.model = model;
        view.element = clone;
        view.init();
        this.childViews.addItem(view);
        if (this.collectionContainer !== null && this.collectionContainer !== undefined) {
            this.collectionContainer.appendChild(view.element);
        }
        else {
            this.element.appendChild(view.element);
        }
        this.addViewEventListeners(view);
    };
    AbstractCollectionView.prototype.addViewEventListeners = function (view) {
        view.addEventListener(ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED, this, 'onItemSelectedDeselect');
        view.addEventListener(ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED, this, 'onItemSelectedDeselect');
        view.addEventListener(ItemViewEvent_1.ItemViewEvent.REMOVE_ITEM, this, 'onItemRemove');
    };
    AbstractCollectionView.prototype.removeViewEventListeners = function (view) {
        view.removeEventListener(ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED, this, 'onItemSelectedDeselect');
        view.removeEventListener(ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED, this, 'onItemSelectedDeselect');
        view.removeEventListener(ItemViewEvent_1.ItemViewEvent.REMOVE_ITEM, this, 'onItemRemove');
    };
    AbstractCollectionView.prototype.onItemSelectedDeselect = function (event) {
        if (this.selectedItem !== null && this.selectedItem !== undefined && this.selectedItem != event.payload['item']) {
            this.selectedItem.resetState();
        }
        this.selectedItem = (event.type == ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED) ? event.payload['item'] : null;
    };
    AbstractCollectionView.prototype.onItemRemove = function (event) {
        var index = this.collection.indexOf(event.payload['item'].model);
        if (index >= 0) {
            this.collection.removeItemAt(index);
        }
    };
    //IMPORTANT: this is a convience method for manual population only, do not bind it to a collection models collection change event as the add event is also fired
    AbstractCollectionView.prototype.addAllChildViews = function (models) {
        for (var i = 0; i < models.length; i++) {
            this.addChildView(models[i]);
        }
    };
    AbstractCollectionView.prototype.removeAllChildViews = function () {
        for (var i = this.childViews.length - 1; i >= 0; i--) {
            this.removeChildView(this.childViews.getItemAt(i));
        }
    };
    AbstractCollectionView.prototype.removeChildView = function (view) {
        this.removeViewEventListeners(view);
        this.removeElement(view.element);
        view.destroy();
        this.childViews.removeItemAt(this.childViews.indexOf(view));
    };
    AbstractCollectionView.prototype.removeElement = function (element) {
        if (this.collectionContainer !== null && this.collectionContainer !== undefined) {
            this.collectionContainer.removeChild(element);
        }
        else {
            this.element.removeChild(element);
        }
    };
    AbstractCollectionView.prototype.removeChildViewFromModel = function (model) {
        //get the view associated with the model
        for (var i = 0; i < this.childViews.length; i++) {
            if (this.childViews.getItemAt(i).model == model) {
                this.removeChildView(this.childViews.getItemAt(i));
                break;
            }
        }
    };
    AbstractCollectionView.prototype.initCollection = function () {
        //assign a default collection if it has not already been set
        if (this.collection === null || this.collection === undefined) {
            this.collection = this.getCollection();
        }
    };
    AbstractCollectionView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.initCollection();
        this.render();
    };
    AbstractCollectionView.prototype.render = function () {
        if (this.itemView === null || this.itemView == undefined) {
            throw Error('data-attribute-item-view must be defined on the tag instance and point to a valid constructor');
        }
        for (var i = 0; i < this.collection.length; i++) {
            this.addChildView(this.collection.getItemAt(i));
        }
    };
    AbstractCollectionView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('collectionContainer', this, 'collectionContainer'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('itemTemplate', this, 'itemTemplate'));
    };
    AbstractCollectionView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            //required, defines the layout for child views
            case 'itemTemplate':
                element.parentNode.removeChild(element); //remove from the view
                break;
        }
    };
    AbstractCollectionView.prototype.getCollection = function () {
        return new Lavender.ArrayList();
    };
    AbstractCollectionView.prototype.destroy = function () {
        this.destroyChildViews();
        _super.prototype.destroy.call(this);
        this.collection = null;
        this.itemView = null;
        this.collectionContainer = null;
        this.itemTemplate = null;
        this.selectedItem = null;
    };
    return AbstractCollectionView;
}(AbstractComponent_1.AbstractComponent));
exports.AbstractCollectionView = AbstractCollectionView;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

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
var AbstractComponent_1 = __webpack_require__(1);
/**
 * Created by dsmiley on 8/4/17.
 */
var AbstractItemView = (function (_super) {
    __extends(AbstractItemView, _super);
    function AbstractItemView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AbstractItemView.prototype, "model", {
        get: function () {
            return this._model;
        },
        set: function (val) {
            this._model = val;
            this.notify(val, 'model');
        },
        enumerable: true,
        configurable: true
    });
    AbstractItemView.prototype.setElementDisplay = function (element, display) {
        //at some points in the items lifecycle element could be null, se we require this check
        if (element !== null && element !== undefined) {
            element.style.display = display;
        }
    };
    //stub for override
    AbstractItemView.prototype.resetState = function () {
    };
    AbstractItemView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.model = null;
    };
    return AbstractItemView;
}(AbstractComponent_1.AbstractComponent));
exports.AbstractItemView = AbstractItemView;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Created by dsmiley on 8/1/17.
 */
var Lavender = __webpack_require__(0);
var SkinPartList = (function (_super) {
    __extends(SkinPartList, _super);
    function SkinPartList(source, allowDuplicates) {
        if (allowDuplicates === void 0) { allowDuplicates = true; }
        var _this = _super.call(this, source, allowDuplicates) || this;
        _this.skinPartsByLabel = {};
        return _this;
    }
    SkinPartList.prototype.addItem = function (object, hash, key) {
        //ensure the object is valid before proceeding
        var index = _super.prototype.addItem.call(this, object, hash, key);
        //populate hash
        this.skinPartsByLabel[object.label] = object;
        return index;
    };
    SkinPartList.prototype.clear = function () {
        _super.prototype.clearHash.call(this, this.skinPartsByLabel);
        _super.prototype.clear.call(this);
    };
    SkinPartList.prototype.removeItemAt = function (index) {
        var skinPart = this.getItemAt(index);
        _super.prototype.removeItemFromHash.call(this, this.skinPartsByLabel, skinPart.label);
        _super.prototype.removeItemAt.call(this, index);
    };
    SkinPartList.prototype.insert = function (object, index, suppressChangeEvent, hash, key, replaceIndex) {
        if (suppressChangeEvent === void 0) { suppressChangeEvent = false; }
        if (replaceIndex === void 0) { replaceIndex = false; }
        //ensure the object is valid before proceeding
        var returnValue = _super.prototype.insert.call(this, object, index, suppressChangeEvent, hash, key, replaceIndex);
        //populate hash
        this.skinPartsByLabel[object.label] = object;
        return returnValue;
    };
    return SkinPartList;
}(Lavender.ArrayList));
exports.SkinPartList = SkinPartList;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComponentMap_1 = __webpack_require__(6);
var CommandMap_1 = __webpack_require__(4);
var Injector_1 = __webpack_require__(7);
var MediatorMap_1 = __webpack_require__(8);
var EventDispatcherFactory_1 = __webpack_require__(14);
/**
 * Created by dsmiley on 7/24/17.
 */
var Context = (function () {
    function Context(config, params) {
        this.config = config;
        //IMPORTANT: must occur first so application event bus is configured
        this.eventDispatcher = EventDispatcherFactory_1.EventDispatcherFactory.getInstance().getEventDispatcher();
        this.componentMap = new ComponentMap_1.ComponentMap(this); //create factory if we require sub classes one day
        this.commandMap = new CommandMap_1.CommandMap(this); //create factory if we require sub classes one day
        this.injector = new Injector_1.Injector(this); //create factory if we require sub classes one day
        this.mediatorMap = new MediatorMap_1.MediatorMap(this);
        this.startUp();
    }
    Context.prototype.startUp = function () {
    };
    Context.prototype.mapComponents = function () {
    };
    Context.prototype.mapCommands = function () {
    };
    Context.prototype.mapObjects = function () {
    };
    Context.prototype.mapMediators = function () {
    };
    return Context;
}());
exports.Context = Context;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

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
var AbstractCommand_1 = __webpack_require__(9);
/**
 * Created by dsmiley on 7/28/17.
 */
var SampleCommand = (function (_super) {
    __extends(SampleCommand, _super);
    function SampleCommand(context) {
        return _super.call(this, context) || this;
    }
    SampleCommand.prototype.executeServiceMethod = function () {
        //since services will always be injected by the IOC container always user the interface type
        return this.service.testRequestUsingIncludedAPI('localRequest', this);
    };
    SampleCommand.prototype.parseResponse = function (result) {
        //since serilization objects will always be injected by the IOC container always user the interface type
        return this.parser.parse(result); //use this.parser.parse to deserialize results. You'll of course need to implement the parser, our tests just use a generic function that returns the result
        //most commands would also receive a model injection and the command would update it here
    };
    SampleCommand.prototype.getFaultString = function () {
        return 'Lotus.SampleCommand a service request error occured';
    };
    SampleCommand.prototype.getErrorMessage = function () {
        return 'Lotus.SampleCommand an execution error occured ';
    };
    SampleCommand.prototype.getExecErrorString = function () {
        return 'Lotus.SampleCommand the following are required: ';
    };
    return SampleCommand;
}(AbstractCommand_1.AbstractCommand));
exports.SampleCommand = SampleCommand;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 7/27/17.
 */
var SerializeFactory = (function () {
    function SerializeFactory() {
        if (SerializeFactory.INSTANCE != null) {
            throw ('SerializeFactory.INSTANCE: Singleton class has already been instantiated');
        }
        else {
            //perform any required object set up
        }
    }
    SerializeFactory.getInstance = function () {
        if (SerializeFactory.INSTANCE == null) {
            SerializeFactory.INSTANCE = new SerializeFactory();
        }
        return SerializeFactory.INSTANCE;
    };
    /*
     * Stub for override, this method is just an example of how this factory can be used
     * */
    SerializeFactory.prototype.getServiceResultParser = function (parserCode) {
        var parser;
        switch (parserCode) {
            case 'local':
            case 'remote':
            default:
                parser = {};
                break;
        }
        return parser;
    };
    /*
     * Stub for override, this method is just an example of how this factory can be used
     * */
    SerializeFactory.prototype.getServiceExporter = function (exporterCode) {
        var exporter;
        //we resuse parserCode which should really probably be called serializationCode
        switch (exporterCode) {
            case 'local':
            case 'remote':
            default:
                exporter = {};
                break;
        }
        return exporter;
    };
    SerializeFactory.INSTANCE = null;
    return SerializeFactory;
}());
exports.SerializeFactory = SerializeFactory;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SampleService_1 = __webpack_require__(13);
/**
 * Created by dsmiley on 7/27/17.
 */
var ServiceFactory = (function () {
    function ServiceFactory() {
        if (ServiceFactory.INSTANCE != null) {
            throw ('ServiceFactory.INSTANCE: Singleton class has already been instantiated');
        }
        else {
            //perform any required object set up
        }
    }
    ServiceFactory.getInstance = function () {
        if (ServiceFactory.INSTANCE == null) {
            ServiceFactory.INSTANCE = new ServiceFactory();
        }
        return ServiceFactory.INSTANCE;
    };
    ServiceFactory.prototype.getService = function (config) {
        var service;
        switch (config.serviceCode) {
            default:
                service = new SampleService_1.SampleService(config);
        }
        return service;
    };
    ServiceFactory.INSTANCE = null;
    return ServiceFactory;
}());
exports.ServiceFactory = ServiceFactory;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 7/26/17.
 */
var AbstractMediator = (function () {
    function AbstractMediator() {
    }
    AbstractMediator.prototype.destroy = function () {
    };
    return AbstractMediator;
}());
exports.AbstractMediator = AbstractMediator;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Created by dsmiley on 8/23/17.
 */
var Lavender = __webpack_require__(0);
var SkinPart_1 = __webpack_require__(2);
var AbstractCollectionView_1 = __webpack_require__(16);
var AbstractRecordSetCollectionView = (function (_super) {
    __extends(AbstractRecordSetCollectionView, _super);
    function AbstractRecordSetCollectionView() {
        var _this = _super.call(this) || this;
        _this.nextBtn = null;
        _this.pervBtn = null;
        _this.firstBtn = null;
        _this.lastBtn = null;
        return _this;
    }
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "recordSet", {
        get: function () {
            return this._recordSet;
        },
        set: function (value) {
            this.removeCollectionEventListeners(); //must occur first
            this._recordSet = value;
            this.addCollectionEventListeners(); //must occur after line above
            this.notify(value, 'recordSet');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "navBtnEnabledClass", {
        get: function () {
            return this._navBtnEnabledClass;
        },
        set: function (value) {
            this._navBtnEnabledClass = value;
            this.notify(value, 'navBtnEnabledClass');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "navBtnDisabledClass", {
        get: function () {
            return this._navBtnDisabledClass;
        },
        set: function (value) {
            this._navBtnDisabledClass = value;
            this.notify(value, 'navBtnDisabledClass');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "nextBtn", {
        get: function () {
            return this._nextBtn;
        },
        set: function (value) {
            this._nextBtn = value;
            this.notify(value, 'nextBtn');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "pervBtn", {
        get: function () {
            return this._pervBtn;
        },
        set: function (value) {
            this._pervBtn = value;
            this.notify(value, 'pervBtn');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "firstBtn", {
        get: function () {
            return this._firstBtn;
        },
        set: function (value) {
            this._firstBtn = value;
            this.notify(value, 'firstBtn');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractRecordSetCollectionView.prototype, "lastBtn", {
        get: function () {
            return this._lastBtn;
        },
        set: function (value) {
            this._lastBtn = value;
            this.notify(value, 'lastBtn');
        },
        enumerable: true,
        configurable: true
    });
    AbstractRecordSetCollectionView.prototype.addCollectionEventListeners = function () {
        //IMPORTANT, do not call super, we don't want to listen for collection change events but instead the events below
        if (this.recordSet !== null && this.recordSet !== undefined) {
            this.recordSet.addEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, this, 'onResultsChange');
            this.binder.bind(this.recordSet, 'pageList', this, 'onPageListChange', null, null, 'pageListChaneHandler');
        }
    };
    AbstractRecordSetCollectionView.prototype.removeCollectionEventListeners = function () {
        //IMPORTANT, do not call super
        //This method can be called as part of a destroy sequence where the collection is nulled out, so we check for NPE
        if (this.recordSet !== null && this.recordSet !== undefined) {
            //remove old event listeners
            this.recordSet.removeEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, this, 'onResultsChange');
        }
        if (this.binder !== null && this.binder !== undefined) {
            this.binder.unbind('pageListChaneHandler');
        }
    };
    AbstractRecordSetCollectionView.prototype.onClickHandler = function (event) {
        //event.currentTarget always refers to the element the event handler has been attached to as opposed to event.target which identifies the element on which the event occurred.
        switch (event.currentTarget.getAttribute('data-skin-part')) {
            case 'nextBtn':
                if (this.recordSet.selectedPage + 1 > this.recordSet.totalPages) {
                    return;
                }
                this.recordSet.selectedPage += 1;
                break;
            case 'pervBtn':
                if (this.recordSet.selectedPage - 1 < 1) {
                    return;
                }
                this.recordSet.selectedPage -= 1;
                break;
            case 'firstBtn':
                this.recordSet.selectedPage = 1;
                break;
            case 'lastBtn':
                this.recordSet.selectedPage = this.recordSet.totalPages;
                break;
        }
    };
    AbstractRecordSetCollectionView.prototype.refreshNavButtonDisplay = function (button, type) {
        if (button.classList.contains(this.navBtnDisabledClass)) {
            button.classList.remove(this.navBtnDisabledClass);
        }
        if (button.classList.contains(this.navBtnEnabledClass)) {
            button.classList.remove(this.navBtnEnabledClass);
        }
        var classToAdd;
        if (type === 'next') {
            classToAdd = (this.recordSet.selectedPage + 1 > this.recordSet.totalPages) ? this.navBtnDisabledClass : this.navBtnEnabledClass;
        }
        else {
            classToAdd = (this.recordSet.selectedPage - 1 < 1) ? this.navBtnDisabledClass : this.navBtnEnabledClass;
        }
        button.classList.add(classToAdd);
    };
    AbstractRecordSetCollectionView.prototype.onResultsChange = function (event) {
        this.render();
    };
    AbstractRecordSetCollectionView.prototype.onPageListChange = function (value) {
        this.render();
    };
    AbstractRecordSetCollectionView.prototype.initCollection = function () {
        //assign a default collection if it has not already been set
        if (this.recordSet === null || this.recordSet === undefined) {
            this.recordSet = new Lavender.RecordSet();
        }
    };
    AbstractRecordSetCollectionView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('nextBtn', this, 'nextBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('pervBtn', this, 'pervBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('firstBtn', this, 'firstBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('lastBtn', this, 'lastBtn'));
    };
    AbstractRecordSetCollectionView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            //optional container for displaying collection elements
            case 'nextBtn':
                this.nextBtn.addEventListener('click', this.onClickHandler);
                break;
            case 'pervBtn':
                this.pervBtn.addEventListener('click', this.onClickHandler);
                break;
            case 'firstBtn':
                this.firstBtn.addEventListener('click', this.onClickHandler);
                break;
            case 'lastBtn':
                this.lastBtn.addEventListener('click', this.onClickHandler);
                break;
        }
        //IMPORTANT: you could defined these classes on a sort of dummy skin part defined within the component, or on one of the buttons
        if (element.getAttribute('data-enabledClass') !== null && element.getAttribute('data-enabledClass') !== undefined) {
            this.navBtnEnabledClass = element.getAttribute('data-enabledClass');
        }
        if (element.getAttribute('data-disabled-class') !== null && element.getAttribute('data-disabled-class') !== undefined) {
            this.navBtnDisabledClass = element.getAttribute('data-disabled-class');
        }
    };
    AbstractRecordSetCollectionView.prototype.render = function () {
        //IMPORTANT: do not call super!
        if (this.itemView === null || this.itemView == undefined) {
            throw Error('data-attribute-item-view must be defined on the tag instance and point to a valid constructor');
        }
        //clear the current view
        this.removeAllChildViews();
        if (this.nextBtn) {
            this.refreshNavButtonDisplay(this.nextBtn, 'next');
        }
        if (this.pervBtn) {
            this.refreshNavButtonDisplay(this.pervBtn, 'prev');
        }
        if (this.firstBtn) {
            this.refreshNavButtonDisplay(this.firstBtn, 'prev');
        }
        if (this.lastBtn) {
            this.refreshNavButtonDisplay(this.lastBtn, 'next');
        }
        if (this.recordSet.pageList === null || this.recordSet.pageList === undefined) {
            return;
        }
        //populate the new view using the record set's current page
        for (var i = 0; i < this.recordSet.pageList.length; i++) {
            var model = this.recordSet.pageList.getItemAt(i);
            this.addChildView(model);
        }
        this.selectedItem = null; //reset the selected item state
    };
    AbstractRecordSetCollectionView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.recordSet.destroy();
        this.navBtnEnabledClass = null;
        this.navBtnDisabledClass = null;
        this.nextBtn = null;
        this.pervBtn = null;
        this.firstBtn = null;
        this.lastBtn = null;
        this.recordSet = null;
    };
    return AbstractRecordSetCollectionView;
}(AbstractCollectionView_1.AbstractCollectionView));
exports.AbstractRecordSetCollectionView = AbstractRecordSetCollectionView;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Created by dsmiley on 8/23/17.
 */
var Lavender = __webpack_require__(0);
var AbstractItemView_1 = __webpack_require__(17);
var SkinPart_1 = __webpack_require__(2);
var ItemViewEvent_1 = __webpack_require__(3);
var AbstractThumbnailView = (function (_super) {
    __extends(AbstractThumbnailView, _super);
    function AbstractThumbnailView() {
        var _this = _super.call(this) || this;
        _this._allowDrag = true;
        return _this;
    }
    Object.defineProperty(AbstractThumbnailView.prototype, "thumbWidth", {
        get: function () {
            return this._thumbWidth;
        },
        set: function (value) {
            this._thumbWidth = value;
            this.notify(value, 'thumbWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractThumbnailView.prototype, "thumbHeight", {
        get: function () {
            return this._thumbHeight;
        },
        set: function (value) {
            this._thumbHeight = value;
            this.notify(value, 'thumbHeight');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractThumbnailView.prototype, "thumbnail", {
        get: function () {
            return this._thumbnail;
        },
        set: function (value) {
            this._thumbnail = value;
            this.notify(value, 'thumbnail');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractThumbnailView.prototype, "thumbnailContainer", {
        get: function () {
            return this._thumbnailContainer;
        },
        set: function (value) {
            this._thumbnailContainer = value;
            this.notify(value, 'thumbnailContainer');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractThumbnailView.prototype, "allowDrag", {
        get: function () {
            return this._allowDrag;
        },
        set: function (value) {
            this._allowDrag = value;
            this.notify(value, 'allowDrag');
        },
        enumerable: true,
        configurable: true
    });
    AbstractThumbnailView.prototype.setUpBindings = function () {
        this.binder.bind(this, 'model', this, 'onModelChange');
    };
    AbstractThumbnailView.prototype.sizeImage = function () {
        if (this.thumbnail === null || this.thumbnail === undefined) {
            return;
        }
        var defaultSize = this.getDefaultSize();
        var containerSize = this.getContainerSize();
        var scale = Lavender.ResizeUtils.getScaleToFit(defaultSize, containerSize);
        var width = defaultSize['width'] * scale;
        var height = defaultSize['height'] * scale;
        //console.log("width/height "+width+"/"+height)
        this.thumbnail.setAttribute('width', width + 'px');
        this.thumbnail.setAttribute('height', height + 'px');
        this.thumbnail.style.maxWidth = containerSize.width + 'px';
        this.thumbnail.style.maxHeight = containerSize.height + 'px';
    };
    AbstractThumbnailView.prototype.onThumbClick = function (event) {
        this.resetState();
    };
    //stub for override
    AbstractThumbnailView.prototype.onDragStart = function (event) {
    };
    AbstractThumbnailView.prototype.getImageURL = function () {
        return this.model['thumbUrl'];
    };
    AbstractThumbnailView.prototype.getDefaultSize = function () {
        return { width: parseInt(this.thumbnail.getAttribute('width')), height: parseInt(this.thumbnail.getAttribute('height')) };
    };
    AbstractThumbnailView.prototype.getContainerSize = function () {
        var returnObj = (this.thumbnailContainer !== null && this.thumbnailContainer !== undefined) ? { width: parseInt(window.getComputedStyle(this.thumbnailContainer).width), height: parseInt(window.getComputedStyle(this.thumbnailContainer).height) } : { width: NaN, height: NaN };
        //if the container has a defined width and height set in the tempalte use that instead of our defaults
        if (!isNaN(parseInt(this.thumbWidth)) && !isNaN(parseInt(this.thumbWidth))) {
            returnObj = { width: parseInt(this.thumbWidth), height: parseInt(this.thumbHeight) };
        }
        return returnObj;
    };
    AbstractThumbnailView.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        if (this.thumbnail === null || this.thumbnail === undefined) {
            return;
        }
        this.thumbnail.setAttribute('draggable', (this.allowDrag) ? 'true' : 'false');
        this.thumbnail.addEventListener('click', this.onThumbClick);
        this.thumbnail.addEventListener('dragstart', this.onDragStart);
    };
    AbstractThumbnailView.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        if (this.thumbnail === null || this.thumbnail === undefined) {
            return;
        }
        this.thumbnail.removeEventListener('click', this.onThumbClick);
        this.thumbnail.removeEventListener('dragstart', this.onDragStart);
    };
    AbstractThumbnailView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('thumbnail', this, 'thumbnail'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('thumbnailContainer', this, 'thumbnailContainer'));
    };
    AbstractThumbnailView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'thumbnail':
                this._thumbnailDisplay = this.thumbnail.style.display;
                this.thumbnail.onload = function (event) {
                    if (!this.thumbnail) {
                        return;
                    }
                    this.thumbnail.onload = null;
                    this.thumbnail.style.display = this._thumbnailDisplay;
                    this.sizeImage();
                }.bind(this);
                this.thumbnail.style.display = 'none';
                this.thumbnail['src'] = this.getImageURL();
                this.addEventListeners();
                break;
            case 'thumbnailContainer':
                this._thumbnailSelectedClass = this.thumbnailContainer.getAttribute('selected-class');
                break;
        }
    };
    AbstractThumbnailView.prototype.resetState = function () {
        this.thumbnailContainer.classList.toggle(this._thumbnailSelectedClass);
        var eventType = (this.thumbnailContainer.classList.contains(this._thumbnailSelectedClass)) ? ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED : ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED;
        //dispatch event to notify view that the layout was selected/or deselected
        this.dispatch(new ItemViewEvent_1.ItemViewEvent(eventType, { item: this }));
    };
    AbstractThumbnailView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.removeEventListeners();
        this.thumbnail = null;
        this.thumbnailContainer = null;
        this._thumbnailSelectedClass = null;
    };
    return AbstractThumbnailView;
}(AbstractItemView_1.AbstractItemView));
exports.AbstractThumbnailView = AbstractThumbnailView;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(19));
__export(__webpack_require__(7));
__export(__webpack_require__(4));
__export(__webpack_require__(5));
__export(__webpack_require__(8));
__export(__webpack_require__(6));
__export(__webpack_require__(14));
__export(__webpack_require__(21));
__export(__webpack_require__(15));
__export(__webpack_require__(22));
__export(__webpack_require__(13));
__export(__webpack_require__(11));
__export(__webpack_require__(10));
__export(__webpack_require__(12));
__export(__webpack_require__(3));
__export(__webpack_require__(9));
__export(__webpack_require__(20));
__export(__webpack_require__(23));
__export(__webpack_require__(2));
__export(__webpack_require__(18));
__export(__webpack_require__(1));
__export(__webpack_require__(1));
__export(__webpack_require__(17));
__export(__webpack_require__(16));
__export(__webpack_require__(24));
__export(__webpack_require__(25));


/***/ })
/******/ ]);
});
//# sourceMappingURL=lotusJS-UMD.js.map