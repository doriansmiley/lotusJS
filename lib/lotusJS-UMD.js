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
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
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
var Lavender = __webpack_require__(0);
var SkinPartList_1 = __webpack_require__(20);
var ComponentEvent_1 = __webpack_require__(4);
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
        _this._isValid = false;
        //IMPORTANT: you have to initialize instance attributes that are not defined using accessor methods or they will dropped by the compiler.
        _this.validClass = null;
        _this.invalidClass = null;
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
    Object.defineProperty(AbstractComponent.prototype, "isValid", {
        get: function () {
            return this._isValid;
        },
        set: function (value) {
            this._isValid = value;
            this.notify(value, 'isValid');
            if (this.isValid && this.validClass) {
                this.attachValidationClass(this.validClass, this.invalidClass);
            }
            else if (!this.isValid && this.invalidClass) {
                this.attachValidationClass(this.invalidClass, this.validClass);
            }
        },
        enumerable: true,
        configurable: true
    });
    //stub for override
    AbstractComponent.prototype.attachValidationClass = function (classToAdd, classToRemove) {
    };
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
        this.dispatch(new ComponentEvent_1.ComponentEvent(ComponentEvent_1.ComponentEvent.READY, { target: this }));
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
var AbstractComponent_1 = __webpack_require__(2);
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
            this.onModelChange(val);
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
    AbstractItemView.prototype.onModelChange = function (value) {
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
/* 4 */
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
    ComponentEvent.CLICK = 'click';
    return ComponentEvent;
}(Lavender.AbstractEvent));
exports.ComponentEvent = ComponentEvent;


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
/* 6 */
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
var AbstractComponent_1 = __webpack_require__(2);
var SkinPart_1 = __webpack_require__(1);
var ItemViewEvent_1 = __webpack_require__(5);
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
            //render the view as long as there are items in the collection
            if (value && this.ready) {
                this.render();
            }
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
    AbstractCollectionView.prototype.cloneItemTemplate = function (model) {
        return this.itemTemplate.cloneNode(true);
    };
    //override point for objects that require manipulation of the model
    AbstractCollectionView.prototype.getModel = function (model) {
        return model;
    };
    //override point for objects that require bindings on the model and view. the model param is not always equal to view.model as views sometimes require adapters
    AbstractCollectionView.prototype.setUpViewBindings = function (model, view) {
    };
    AbstractCollectionView.prototype.addChildView = function (model) {
        var view = this.createChildView(model);
        //clone the view
        var clone = this.cloneItemTemplate(model);
        view.model = this.getModel(model);
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
        this.setUpViewBindings(model, view);
        //set the selected item from the model
        //this allows data models to drive the selected item when they are assigned, or a new item added
        if (view.model['selected']) {
            this.onItemSelectedDeselect(new ItemViewEvent_1.ItemViewEvent(ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED, { item: view }));
        }
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
        if (!this.childViews) {
            return;
        }
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
    AbstractCollectionView.prototype.refreshView = function (value) {
        //stub for override
    };
    AbstractCollectionView.prototype.setSelectedItem = function (model) {
        //since this can be used as a bindable end point make sure recursion does not occur
        if (this.selectedItem && this.selectedItem.model == model) {
            return;
        }
        for (var i = 0; i < this.childViews.length; i++) {
            if (this.childViews.getItemAt(i).model == model) {
                //set the selected item
                this.onItemSelectedDeselect(new ItemViewEvent_1.ItemViewEvent(ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED, { item: this.childViews.getItemAt(i) }));
                //refresh the view
                if (this.selectedItem) {
                    this.refreshView(model['value']);
                }
                break;
            }
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
        this.removeAllChildViews();
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
/* 7 */
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
 * Created by dsmiley on 9/26/17.
 */
var Lavender = __webpack_require__(0);
var FileEvent = (function (_super) {
    __extends(FileEvent, _super);
    function FileEvent(type, payload) {
        return _super.call(this, type, payload) || this;
    }
    FileEvent.prototype.clone = function (type, payload) {
        return new FileEvent(this.type, this.payload);
    };
    FileEvent.REMOVE_FILE_FROM_COLLECTION = 'removeFileFromCollection';
    FileEvent.ABORT_FILE_UPLOAD = 'abortFileUpload';
    FileEvent.UPLOAD_FILE = 'uploadFile';
    return FileEvent;
}(Lavender.AbstractEvent));
exports.FileEvent = FileEvent;


/***/ }),
/* 8 */
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
 * Created by dsmiley on 9/21/17.
 */
var Lavender = __webpack_require__(0);
var InputEvent = (function (_super) {
    __extends(InputEvent, _super);
    function InputEvent(type, payload) {
        return _super.call(this, type, payload) || this;
    }
    InputEvent.prototype.clone = function (type, payload) {
        return new InputEvent(this.type, this.payload);
    };
    InputEvent.CHANGE = 'change';
    return InputEvent;
}(Lavender.AbstractEvent));
exports.InputEvent = InputEvent;


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
/**
 * Created by dsmiley on 10/5/17.
 */
var Lavender = __webpack_require__(0);
var InputModel = (function (_super) {
    __extends(InputModel, _super);
    function InputModel(label, value, name, selected, required) {
        if (selected === void 0) { selected = false; }
        if (required === void 0) { required = false; }
        var _this = _super.call(this) || this;
        _this._selected = false;
        _this._required = false;
        _this.label = label;
        _this.value = value;
        _this.name = name;
        _this.selected = selected;
        _this.required = required;
        return _this;
    }
    Object.defineProperty(InputModel.prototype, "nonFormattedValue", {
        get: function () {
            return this._nonFormattedValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputModel.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
            this.notify(value, 'label');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputModel.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._nonFormattedValue = value;
            if (this.format) {
                value = this.format(value);
            }
            this._value = value;
            this.notify(value, 'value');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputModel.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
            this.notify(value, 'name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputModel.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            this.notify(value, 'selected');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputModel.prototype, "required", {
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = value;
            this.notify(value, 'required');
        },
        enumerable: true,
        configurable: true
    });
    return InputModel;
}(Lavender.Subject));
exports.InputModel = InputModel;


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
var Lavender = __webpack_require__(0);
/**
 * Created by dsmiley on 10/10/17.
 */
var AbstractValidator = (function (_super) {
    __extends(AbstractValidator, _super);
    function AbstractValidator() {
        var _this = _super.call(this) || this;
        _this._isValid = false;
        _this._hasWarnings = false;
        return _this;
    }
    Object.defineProperty(AbstractValidator.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        set: function (value) {
            this._errors = value;
            this.notify(value, "errors");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractValidator.prototype, "warnings", {
        get: function () {
            return this._warnings;
        },
        set: function (value) {
            this._warnings = value;
            this.notify(value, "warnings");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractValidator.prototype, "source", {
        get: function () {
            return this._source;
        },
        set: function (value) {
            this._source = value;
            if (this.source !== null && this.source !== undefined) {
                this.init(); //set up initial state
            }
            this.notify(value, "source");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractValidator.prototype, "isValid", {
        get: function () {
            return this._isValid;
        },
        set: function (value) {
            this._isValid = value;
            this.notify(value, "isValid");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractValidator.prototype, "hasWarnings", {
        get: function () {
            return this._hasWarnings;
        },
        set: function (value) {
            this._hasWarnings = value;
            this.notify(value, "hasWarnings");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractValidator.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this.notify(value, "id");
        },
        enumerable: true,
        configurable: true
    });
    AbstractValidator.prototype.getValidationResult = function () {
        return this.errors.length <= 0;
    };
    AbstractValidator.prototype.getValidationWarningsResult = function () {
        return this.warnings.length > 0;
    };
    //stub for override
    AbstractValidator.prototype.getValidationErrors = function () {
        return new Lavender.ArrayList(); //returns ArrayList of SpiSdk.ValidationError instances
    };
    //stub for override
    AbstractValidator.prototype.getValidationWarnings = function () {
        return new Lavender.ArrayList(); //returns ArrayList of SpiSdk.ValidationError instances
    };
    AbstractValidator.prototype.validateOnChange = function (value) {
        this.validate();
    };
    AbstractValidator.prototype.setUpBindings = function () {
    };
    AbstractValidator.prototype.addEventListeners = function () {
    };
    AbstractValidator.prototype.validate = function () {
        this.errors = this.getValidationErrors(); //get all errors and store
        this.warnings = this.getValidationWarnings();
        this.isValid = this.getValidationResult();
        this.hasWarnings = this.getValidationWarningsResult();
        return this.isValid; //returns true or false, to obtain specific errors use this.errors
    };
    AbstractValidator.prototype.init = function () {
        this.addEventListeners();
        this.setUpBindings();
        this.validate();
    };
    AbstractValidator.prototype.destroy = function () {
        this.binder.unbindAll();
        this.binder = null;
        this.source = null;
        this.errors = null;
        this.warnings = null;
    };
    return AbstractValidator;
}(Lavender.Subject));
exports.AbstractValidator = AbstractValidator;


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
 * Created by dsmiley on 10/10/17.
 */
var Lavender = __webpack_require__(0);
var ValidationError = (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(property, errorCode, errorMessage) {
        var _this = _super.call(this) || this;
        _this.property = property;
        _this.errorCode = errorCode;
        _this.errorMessage = errorMessage;
        return _this;
    }
    Object.defineProperty(ValidationError.prototype, "property", {
        get: function () {
            return this._property;
        },
        set: function (value) {
            this._property = value;
            this.notify(value, "property");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationError.prototype, "errorCode", {
        get: function () {
            return this._errorCode;
        },
        set: function (value) {
            this._errorCode = value;
            this.notify(value, "errorCode");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationError.prototype, "errorMessage", {
        get: function () {
            return this._errorMessage;
        },
        set: function (value) {
            this._errorMessage = value;
            this.notify(value, "errorMessage");
        },
        enumerable: true,
        configurable: true
    });
    ValidationError.prototype.destroy = function () {
        this.property = null;
        this.errorCode = null;
        this.errorMessage = null;
    };
    return ValidationError;
}(Lavender.Subject));
exports.ValidationError = ValidationError;


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
var AbstractCollectionView_1 = __webpack_require__(6);
var InputEvent_1 = __webpack_require__(8);
/**
 * Created by dsmiley on 10/5/17.
 */
var AbstractInputCollectionView = (function (_super) {
    __extends(AbstractInputCollectionView, _super);
    function AbstractInputCollectionView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //add the invalid/valid class after validation. This method id typically called as part of a data binding on this.isValid
    AbstractInputCollectionView.prototype.attachValidationClass = function (classToAdd, classToRemove) {
        if (this.collectionContainer) {
            this.collectionContainer.classList.remove(classToRemove);
            this.collectionContainer.classList.add(classToAdd);
        }
    };
    AbstractInputCollectionView.prototype.onItemSelectedDeselect = function (event) {
        var dispatchChange = (this.selectedItem != event.payload['item']);
        _super.prototype.onItemSelectedDeselect.call(this, event);
        //if the selected item has changed dispatch input change event
        if (dispatchChange) {
            this.dispatch(new InputEvent_1.InputEvent(InputEvent_1.InputEvent.CHANGE, { target: this.selectedItem, originalEvent: event }));
        }
    };
    return AbstractInputCollectionView;
}(AbstractCollectionView_1.AbstractCollectionView));
exports.AbstractInputCollectionView = AbstractInputCollectionView;


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
/**
 * Created by dsmiley on 10/5/17.
 */
var AbstractItemView_1 = __webpack_require__(3);
var InputModel_1 = __webpack_require__(9);
var ItemViewEvent_1 = __webpack_require__(5);
var AbstractSelectableFormInput = (function (_super) {
    __extends(AbstractSelectableFormInput, _super);
    function AbstractSelectableFormInput() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AbstractSelectableFormInput.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            this.refreshView(value);
            this.notify(value, 'selected');
            var eventType = (this.selected) ? ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED : ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED;
            //dispatch event to notify view that the layout was selected/or deselected
            this.dispatch(new ItemViewEvent_1.ItemViewEvent(eventType, { item: this }));
        },
        enumerable: true,
        configurable: true
    });
    //stub for override
    AbstractSelectableFormInput.prototype.refreshView = function (selected) {
    };
    //called when anewitemis clickedbythe end user in a collection view
    //this is called to reset the state of the currently selected item
    AbstractSelectableFormInput.prototype.resetState = function () {
        this.selected = false;
    };
    AbstractSelectableFormInput.prototype.onModelChange = function (value) {
        _super.prototype.onModelChange.call(this, value);
        if (value && value instanceof InputModel_1.InputModel) {
            //set initial value
            this.selected = value.selected;
            //set up two way bindings
            this.binder.bind(value, 'selected', this, 'selected');
            this.binder.bind(this, 'selected', value, 'selected');
        }
        else if (value && value['selected']) {
            this.selected = value['selected'];
        }
    };
    return AbstractSelectableFormInput;
}(AbstractItemView_1.AbstractItemView));
exports.AbstractSelectableFormInput = AbstractSelectableFormInput;


/***/ }),
/* 14 */
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
var AbstractItemView_1 = __webpack_require__(3);
var SkinPart_1 = __webpack_require__(1);
var ItemViewEvent_1 = __webpack_require__(5);
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
    AbstractThumbnailView.prototype.getImageURL = function (model) {
        if (model) {
            return model['thumbUrl'];
        }
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
    AbstractThumbnailView.prototype.onImageLoad = function (event) {
        if (!this.thumbnail) {
            return;
        }
        this.thumbnail.onload = null;
        this.setElementDisplay(this.thumbnail, this._thumbnailDisplay);
        this.sizeImage();
    };
    AbstractThumbnailView.prototype.setThumbnailSrc = function (src) {
        if (!this.thumbnail) {
            return;
        }
        this.thumbnail.onload = this.onImageLoad.bind(this);
        this.setElementDisplay(this.thumbnail, 'none');
        this.thumbnail['src'] = src;
    };
    AbstractThumbnailView.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        if (this.thumbnail === null || this.thumbnail === undefined) {
            return;
        }
        this.thumbnail.setAttribute('draggable', (this.allowDrag) ? 'true' : 'false');
        this.thumbnail.addEventListener('click', this.onThumbClick.bind(this));
        this.thumbnail.addEventListener('dragstart', this.onDragStart.bind(this));
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
    AbstractThumbnailView.prototype.onModelChange = function (model) {
        if (model) {
            this.setThumbnailSrc(this.getImageURL(model));
        }
    };
    AbstractThumbnailView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'thumbnail':
                this.binder.bind(this, 'model', this, 'onModelChange');
                this._thumbnailDisplay = this.thumbnail.style.display;
                this.setThumbnailSrc(this.getImageURL());
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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Lavender = __webpack_require__(0);
var ComponentList_1 = __webpack_require__(15);
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
        //transfer data-attribute instance onto the component
        for (var i = 0; i < tagInstance.attributes.length; i++) {
            var attribute = tagInstance.attributes[i];
            if (attribute.name.indexOf('attribute') >= 0) {
                component.setAttribute(attribute.name, attribute.value);
            }
        }
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
    //stub for override in LotusJS-MVW
    ComponentMap.prototype.mapMediators = function (tagInstance) {
    };
    ComponentMap.prototype.addComponent = function (tagInstance, functionConstructor) {
        // fired once at the time a component
        // is initially created or parsed
        if (tagInstance.lotusComponentInstance === null || tagInstance.lotusComponentInstance === undefined) {
            tagInstance.lotusComponentInstance = new functionConstructor();
            this.componentInstances.addItem(tagInstance.lotusComponentInstance);
        }
        //trigger mediator assignment if any
        this.mapMediators(tagInstance);
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
/**
 * Created by dsmiley on 8/23/17.
 */
var Lavender = __webpack_require__(0);
var SkinPart_1 = __webpack_require__(1);
var AbstractCollectionView_1 = __webpack_require__(6);
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
                this.nextBtn.addEventListener('click', this.onClickHandler.bind(this));
                break;
            case 'pervBtn':
                this.pervBtn.addEventListener('click', this.onClickHandler.bind(this));
                break;
            case 'firstBtn':
                this.firstBtn.addEventListener('click', this.onClickHandler.bind(this));
                break;
            case 'lastBtn':
                this.lastBtn.addEventListener('click', this.onClickHandler.bind(this));
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
        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', this.onClickHandler);
        }
        if (this.pervBtn) {
            this.pervBtn.removeEventListener('click', this.onClickHandler);
        }
        if (this.firstBtn) {
            this.firstBtn.removeEventListener('click', this.onClickHandler);
        }
        if (this.lastBtn) {
            this.lastBtn.removeEventListener('click', this.onClickHandler);
        }
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
 * Created by dsmiley on 9/26/17.
 */
var AbstractCollectionView_1 = __webpack_require__(6);
var FileView_1 = __webpack_require__(19);
var SkinPart_1 = __webpack_require__(1);
var FileEvent_1 = __webpack_require__(7);
var FileCollectionView = (function (_super) {
    __extends(FileCollectionView, _super);
    function FileCollectionView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(FileCollectionView.prototype, "fileInput", {
        get: function () {
            return this._fileInput;
        },
        set: function (value) {
            this._fileInput = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileCollectionView.prototype, "selectBtn", {
        get: function () {
            return this._selectBtn;
        },
        set: function (value) {
            this._selectBtn = value;
        },
        enumerable: true,
        configurable: true
    });
    FileCollectionView.prototype.getUploadEvent = function (file) {
        return new FileEvent_1.FileEvent(FileEvent_1.FileEvent.UPLOAD_FILE, { file: file });
    };
    FileCollectionView.prototype.uploadFiles = function (files) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].type.indexOf('image') < 0) {
                continue; //skip file types that are not images
            }
            //iterate over the files and create a new file object and append to the collection
            var file = new FileView_1.File();
            file.type = files[i].type;
            file.name = files[i].name;
            file.size = files[i].size;
            file.fileObj = files[i];
            file.thumbnail = window.URL.createObjectURL(files[i]);
            //add the item to the collection
            this.collection.addItem(file);
            //dispatch event to load the file
            this.dispatch(this.getUploadEvent(file));
        }
    };
    FileCollectionView.prototype.addViewEventListeners = function (view) {
        _super.prototype.addViewEventListeners.call(this, view);
        view.addEventListener(FileEvent_1.FileEvent.REMOVE_FILE_FROM_COLLECTION, this, 'onRemoveAbortFile');
        view.addEventListener(FileEvent_1.FileEvent.ABORT_FILE_UPLOAD, this, 'onRemoveAbortFile');
    };
    FileCollectionView.prototype.removeViewEventListeners = function (view) {
        _super.prototype.removeViewEventListeners.call(this, view);
        view.removeEventListener(FileEvent_1.FileEvent.REMOVE_FILE_FROM_COLLECTION, this, 'onRemoveAbortFile');
        view.removeEventListener(FileEvent_1.FileEvent.ABORT_FILE_UPLOAD, this, 'onRemoveAbortFile');
    };
    FileCollectionView.prototype.onRemoveAbortFile = function (event) {
        this.dispatch(event);
        this.removeChildViewFromModel(event.payload['file']);
    };
    FileCollectionView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts. We use the term itemTemplate as it allows us to include this component as a nested component in a collection view.
        //Choosing another name would require it be wrapped in a itemTemplate skin part
        this.skinParts.addItem(new SkinPart_1.SkinPart('fileInput', this, 'fileInput'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('selectBtn', this, 'selectBtn'));
    };
    FileCollectionView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'fileInput':
                this.fileInput.addEventListener("change", this.onFileInputChange.bind(this));
                break;
            case 'selectBtn':
                this.selectBtn.addEventListener("click", this.onFileBtnClick.bind(this));
                break;
        }
    };
    FileCollectionView.prototype.onFileInputChange = function (event) {
        var files = this.fileInput.files;
        if (!files.length) {
            return;
        }
        else {
            this.uploadFiles(files);
        }
    };
    FileCollectionView.prototype.onFileBtnClick = function (event) {
        if (this.fileInput) {
            this.fileInput.click(); //trigger the open of the file input
        }
        if (this.selectBtn.getAttribute('href') !== null && this.selectBtn.getAttribute('href') !== undefined) {
            event.preventDefault();
        } // prevent navigation to "#" or any other link
    };
    FileCollectionView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.fileInput) {
            this.fileInput.removeEventListener("change", this.onFileInputChange);
            this.fileInput = null;
        }
        if (this.selectBtn) {
            this.selectBtn.removeEventListener("click", this.onFileBtnClick);
            this.selectBtn = null;
        }
    };
    return FileCollectionView;
}(AbstractCollectionView_1.AbstractCollectionView));
exports.FileCollectionView = FileCollectionView;


/***/ }),
/* 19 */
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
 * Created by dsmiley on 9/26/17.
 */
var AbstractItemView_1 = __webpack_require__(3);
var SkinPart_1 = __webpack_require__(1);
var FileEvent_1 = __webpack_require__(7);
var Lavender = __webpack_require__(0);
var File = (function (_super) {
    __extends(File, _super);
    function File() {
        var _this = _super.call(this) || this;
        _this._id = Math.random();
        _this.id = Math.random();
        return _this;
    }
    Object.defineProperty(File.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
            this.notify(value, 'size');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "fileObj", {
        get: function () {
            return this._fileObj;
        },
        set: function (value) {
            this._fileObj = value;
            this.notify(value, 'fileObj');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "percentLoaded", {
        get: function () {
            return this._percentLoaded;
        },
        set: function (value) {
            this._percentLoaded = value;
            this.notify(value, 'percentLoaded');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
            this.notify(value, 'state');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "thumbnail", {
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
    Object.defineProperty(File.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.notify(value, 'type');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
            this.notify(value, 'name');
        },
        enumerable: true,
        configurable: true
    });
    File.PENDING = 'pending'; //unstarted
    File.PROGRESS = 'progress';
    File.LOAD = 'load';
    File.ERROR = 'error';
    File.ABORT = 'abort';
    return File;
}(Lavender.Subject));
exports.File = File;
var FileView = (function (_super) {
    __extends(FileView, _super);
    function FileView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(FileView.prototype, "fileLabel", {
        get: function () {
            return this._fileLabel;
        },
        set: function (value) {
            this._fileLabel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "fileTypeLabel", {
        get: function () {
            return this._fileTypeLabel;
        },
        set: function (value) {
            this._fileTypeLabel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "progressBar", {
        get: function () {
            return this._progressBar;
        },
        set: function (value) {
            this._progressBar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "statusIndicator", {
        get: function () {
            return this._statusIndicator;
        },
        set: function (value) {
            this._statusIndicator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "loadIndicator", {
        get: function () {
            return this._loadIndicator;
        },
        set: function (value) {
            this._loadIndicator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "errorIndicator", {
        get: function () {
            return this._errorIndicator;
        },
        set: function (value) {
            this._errorIndicator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "progressIndicator", {
        get: function () {
            return this._progressIndicator;
        },
        set: function (value) {
            this._progressIndicator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "pendingIndicator", {
        get: function () {
            return this._pendingIndicator;
        },
        set: function (value) {
            this._pendingIndicator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "abortIndicator", {
        get: function () {
            return this._abortIndicator;
        },
        set: function (value) {
            this._abortIndicator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "cancelBtn", {
        get: function () {
            return this._cancelBtn;
        },
        set: function (value) {
            this._cancelBtn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "clearBtn", {
        get: function () {
            return this._clearBtn;
        },
        set: function (value) {
            this._clearBtn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "thumbnail", {
        get: function () {
            return this._thumbnail;
        },
        set: function (value) {
            this._thumbnail = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "cancelBtnDisplay", {
        get: function () {
            return this._cancelBtnDisplay;
        },
        set: function (value) {
            this._cancelBtnDisplay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "clearBtnDisplay", {
        get: function () {
            return this._clearBtnDisplay;
        },
        set: function (value) {
            this._clearBtnDisplay = value;
        },
        enumerable: true,
        configurable: true
    });
    FileView.prototype.setUpBindings = function () {
        if (this.fileLabel !== null && this.fileLabel !== undefined) {
            this.fileLabel.innerHTML = this.model.name;
        }
        if (this.fileTypeLabel !== null && this.fileTypeLabel !== undefined) {
            this.fileTypeLabel.innerHTML = this.model.type;
        }
        if (this.thumbnail !== null && this.thumbnail !== undefined) {
            this.thumbnail.src = this.model.thumbnail;
        }
        this.onStateChange(this.model.state); //set initial state
        this.onPercentChange(this.model.percentLoaded); //set initial percent
        this.binder.bind(this.model, 'state', this, 'onStateChange');
        this.binder.bind(this.model, 'percentLoaded', this, 'onPercentChange');
    };
    FileView.prototype.setStatusIndicator = function (node) {
        if (this.statusIndicator !== null && this.statusIndicator !== undefined) {
            //remove child nodes
            while (this.statusIndicator.firstChild) {
                this.statusIndicator.removeChild(this.statusIndicator.firstChild);
            }
            this.statusIndicator.appendChild(node);
        }
    };
    FileView.prototype.onPercentChange = function (value) {
        if (this.progressBar !== null && this.progressBar !== undefined) {
            //get the max width
            var maxWidth = (this.progressBar.style.hasOwnProperty('maxWidth') && this.progressBar.style.maxWidth.length > 0) ? parseInt(this.progressBar.style.maxWidth) : null;
            //set width based on % value of parent width
            var parentWidth = parseFloat(window.getComputedStyle(this.progressBar.parentNode).width);
            var newWidth = (value / 1) * parentWidth;
            this.progressBar.style.width = (maxWidth !== null && newWidth > maxWidth) ? maxWidth + 'px' : newWidth + 'px';
        }
    };
    FileView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setUpBindings();
    };
    FileView.prototype.onStateChange = function (value) {
        this.setElementDisplay(this.cancelBtn, this.cancelBtnDisplay); //reset display state so button is visible
        this.setElementDisplay(this.clearBtn, 'none'); //hide the clear button during upload
        switch (value) {
            case File.PENDING:
                if (this.pendingIndicator !== null && this.pendingIndicator !== undefined) {
                    this.setStatusIndicator(this.pendingIndicator);
                }
                break;
            case File.PROGRESS:
                if (this.progressIndicator !== null && this.progressIndicator !== undefined) {
                    this.setStatusIndicator(this.progressIndicator);
                }
                break;
            case File.LOAD:
                if (this.loadIndicator !== null && this.loadIndicator !== undefined) {
                    this.setStatusIndicator(this.loadIndicator);
                }
                this.setElementDisplay(this.cancelBtn, 'none'); //not visible by default, stops the upload but does not clear the file from the list
                this.setElementDisplay(this.clearBtn, this.clearBtnDisplay); //visible by default, clears the file from the list
                break;
            case File.ERROR:
                if (this.errorIndicator !== null && this.errorIndicator !== undefined) {
                    this.setStatusIndicator(this.errorIndicator);
                }
                this.setElementDisplay(this.cancelBtn, 'none'); //not visible by default, stops the upload but does not clear the file from the list
                this.setElementDisplay(this.clearBtn, this.clearBtnDisplay); //visible by default, clears the file from the list
                break;
            case File.ABORT:
                if (this.abortIndicator !== null && this.abortIndicator !== undefined) {
                    this.setStatusIndicator(this.abortIndicator);
                }
                this.setElementDisplay(this.cancelBtn, 'none'); //not visible by default, stops the upload but does not clear the file from the list
                this.setElementDisplay(this.clearBtn, this.clearBtnDisplay); //visible by default, clears the file from the list
                break;
        }
    };
    FileView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts. We use the term itemTemplate as it allows us to include this component as a nested component in a collection view.
        //Choosing another name would require it be wrapped in a itemTemplate skin part
        this.skinParts.addItem(new SkinPart_1.SkinPart('thumbnail', this, 'thumbnail'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('clearBtn', this, 'clearBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('cancelBtn', this, 'cancelBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('abortIndicator', this, 'abortIndicator'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('pendingIndicator', this, 'pendingIndicator'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('progressIndicator', this, 'progressIndicator'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('errorIndicator', this, 'errorIndicator'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('loadIndicator', this, 'loadIndicator'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('statusIndicator', this, 'statusIndicator'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('progressBar', this, 'progressBar'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('fileTypeLabel', this, 'fileTypeLabel'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('fileLabel', this, 'fileLabel'));
    };
    FileView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'cancelBtn':
                this.cancelBtnDisplay = this.cancelBtn.style.display; //capture the original display state of the button
                this.cancelBtn.addEventListener('click', this.onCancelBtnClick.bind(this));
                break;
            case 'clearBtn':
                this.clearBtnDisplay = this.clearBtn.style.display; //capture the original display state of the button
                this.clearBtn.addEventListener('click', this.onClearBtnClick.bind(this));
                break;
        }
    };
    FileView.prototype.onClearBtnClick = function (event) {
        this.dispatch(new FileEvent_1.FileEvent(FileEvent_1.FileEvent.REMOVE_FILE_FROM_COLLECTION, { file: this.model }));
    };
    FileView.prototype.onCancelBtnClick = function (event) {
        this.dispatch(new FileEvent_1.FileEvent(FileEvent_1.FileEvent.ABORT_FILE_UPLOAD, { file: this.model }));
    };
    FileView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.clearBtn !== null && this.clearBtn !== undefined) {
            this.clearBtn.removeEventListener('click', this.onClearBtnClick);
        }
        if (this.cancelBtn !== null && this.cancelBtn !== undefined) {
            this.cancelBtn.removeEventListener('click', this.onCancelBtnClick);
        }
        this.fileLabel = null;
        this.progressBar = null;
        this.cancelBtn = null;
        this.clearBtn = null;
        this.statusIndicator = null;
        this.loadIndicator = null;
        this.errorIndicator = null;
        this.progressIndicator = null;
        this.pendingIndicator = null;
        this.abortIndicator = null;
        this.thumbnail = null;
    };
    return FileView;
}(AbstractItemView_1.AbstractItemView));
exports.FileView = FileView;


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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComponentMap_1 = __webpack_require__(16);
/**
 * Created by dsmiley on 7/24/17.
 */
var Context = (function () {
    function Context(config, params) {
        this.config = config;
        //IMPORTANT: must occur first so application event bus is configured
        this.componentMap = new ComponentMap_1.ComponentMap(this); //create factory if we require sub classes one day
        this.startUp();
    }
    Context.prototype.startUp = function () {
        this.mapComponents();
    };
    Context.prototype.mapComponents = function () {
    };
    return Context;
}());
exports.Context = Context;


/***/ }),
/* 22 */
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
 * Created by dsmiley on 7/26/17.
 */
var LotusHTMLElement = (function (_super) {
    __extends(LotusHTMLElement, _super);
    function LotusHTMLElement() {
        return _super.call(this) || this;
    }
    LotusHTMLElement.prototype.createShadowRoot = function () {
        return _super.prototype['createShadowRoot'].call(this);
    };
    LotusHTMLElement.prototype.getComponentInstance = function () {
        return this.lotusComponentInstance;
    };
    return LotusHTMLElement;
}(HTMLDivElement));
exports.LotusHTMLElement = LotusHTMLElement;


/***/ }),
/* 23 */
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
 * Created by dsmiley on 10/10/17.
 */
var Lavender = __webpack_require__(0);
var InputCollectionModel = (function (_super) {
    __extends(InputCollectionModel, _super);
    function InputCollectionModel(type, collection, selectionRequired) {
        if (selectionRequired === void 0) { selectionRequired = false; }
        var _this = _super.call(this) || this;
        _this.selectionRequired = false;
        _this._isValid = false;
        _this.collection = collection;
        _this.selectionRequired = selectionRequired;
        return _this;
    }
    Object.defineProperty(InputCollectionModel.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        set: function (value) {
            this._errors = value;
            this.notify(value, 'errors');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputCollectionModel.prototype, "validators", {
        get: function () {
            return this._validators;
        },
        set: function (value) {
            this._validators = value;
            this.notify(value, 'validators');
            this.setUpBindings();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputCollectionModel.prototype, "isValid", {
        get: function () {
            return this._isValid;
        },
        set: function (value) {
            this._isValid = value;
            this.notify(value, "isValid");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputCollectionModel.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.notify(value, 'type');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputCollectionModel.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (value) {
            this._collection = value;
            this.notify(value, 'collection');
        },
        enumerable: true,
        configurable: true
    });
    InputCollectionModel.prototype.setUpBindings = function () {
        for (var i = 0; i < this.validators.length; i++) {
            this.binder.bind(this.validators.getItemAt(i), 'isValid', this, 'validate');
        }
    };
    InputCollectionModel.prototype.validate = function (value) {
        this.errors = new Lavender.ArrayList();
        for (var i = 0; i < this.validators.length; i++) {
            var validator = this.validators.getItemAt(i);
            if (!validator.validate()) {
                this.errors.addAll(validator.errors.source());
            }
        }
        this.isValid = this.errors.length == 0;
        //return the failed results
        return this.errors;
    };
    InputCollectionModel.prototype.clear = function () {
        //reset all form fields by clearing InputModel values
        for (var i = 0; i < this.collection.length; i++) {
            var item = this.collection.getItemAt(i);
            switch (this.type) {
                case InputCollectionModel.TYPE_INPUT:
                    item.value = '';
                    break;
                case InputCollectionModel.TYPE_FILE:
                    //TODO: fogure out how to reset file collection view using model. Probably need a ne wmodel attribute
                    break;
                case InputCollectionModel.TYPE_RADIO_GROUP:
                case InputCollectionModel.TYPE_LIST:
                    item.selected = false;
                    break;
            }
        }
    };
    InputCollectionModel.prototype.destroy = function () {
        this.binder.unbindAll();
        this.binder = null;
        this.collection = null;
    };
    InputCollectionModel.TYPE_INPUT = 0;
    InputCollectionModel.TYPE_LIST = 1;
    InputCollectionModel.TYPE_RADIO_GROUP = 2;
    InputCollectionModel.TYPE_FILE = 3;
    return InputCollectionModel;
}(Lavender.Subject));
exports.InputCollectionModel = InputCollectionModel;


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
var AbstractValidator_1 = __webpack_require__(10);
var Lavender = __webpack_require__(0);
var ValidationError_1 = __webpack_require__(11);
/**
 * Created by dsmiley on 10/10/17.
 */
var SelectableInputValidator = (function (_super) {
    __extends(SelectableInputValidator, _super);
    function SelectableInputValidator() {
        return _super.call(this) || this;
    }
    SelectableInputValidator.prototype.setUpBindings = function () {
        for (var i = 0; i < this.source.collection.length; i++) {
            //ensure changes in the value trigger validation
            this.binder.bind(this.source.collection.getItemAt(i), 'selected', this, 'validateOnChange');
        }
    };
    //iterate over model objects and ensure all required objects have some text
    SelectableInputValidator.prototype.getValidationErrors = function () {
        var returnList = new Lavender.ArrayList();
        //if the model requires a selection ensure there is one
        if (this.source.selectionRequired) {
            var itemSelected = false;
            var groupName = void 0;
            for (var i = 0; i < this.source.collection.length; i++) {
                groupName = this.source.collection.getItemAt(i).name; //group name is the same for all items
                if (this.source.collection.getItemAt(i).selected) {
                    itemSelected = true;
                    break;
                }
            }
            //at least one item must be selected
            if (!itemSelected) {
                returnList.addItem(new ValidationError_1.ValidationError('selected', 'form.selectionRequired', groupName + ' must have a selection.'));
            }
        }
        return returnList; //returns ArrayList of SpiSdk.ValidationError instances
    };
    return SelectableInputValidator;
}(AbstractValidator_1.AbstractValidator));
exports.SelectableInputValidator = SelectableInputValidator;


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
var AbstractValidator_1 = __webpack_require__(10);
var Lavender = __webpack_require__(0);
var ValidationError_1 = __webpack_require__(11);
/**
 * Created by dsmiley on 10/10/17.
 */
var TextInputValidator = (function (_super) {
    __extends(TextInputValidator, _super);
    function TextInputValidator() {
        return _super.call(this) || this;
    }
    TextInputValidator.prototype.setUpBindings = function () {
        for (var i = 0; i < this.source.collection.length; i++) {
            //ensure changes in the value trigger validation
            this.binder.bind(this.source.collection.getItemAt(i), 'value', this, 'validateOnChange');
        }
    };
    //iterate over model objects and ensure all required objects have some text
    TextInputValidator.prototype.getValidationErrors = function () {
        var returnList = new Lavender.ArrayList();
        for (var i = 0; i < this.source.collection.length; i++) {
            var item = this.source.collection.getItemAt(i);
            if (item.required && (!item.nonFormattedValue || item.nonFormattedValue.length <= 0)) {
                returnList.addItem(new ValidationError_1.ValidationError('required', 'form.required', item.label + ' is required'));
            }
        }
        return returnList; //returns ArrayList of SpiSdk.ValidationError instances
    };
    return TextInputValidator;
}(AbstractValidator_1.AbstractValidator));
exports.TextInputValidator = TextInputValidator;


/***/ }),
/* 26 */
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
var AbstractComponent_1 = __webpack_require__(2);
var SkinPart_1 = __webpack_require__(1);
var ComponentEvent_1 = __webpack_require__(4);
/**
 * Created by dsmiley on 7/26/17.
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Button.prototype, "buttonSkinPart", {
        get: function () {
            return this._buttonSkinPart;
        },
        set: function (value) {
            this._buttonSkinPart = value;
            this.notify(value, 'buttonSkinPart');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.notify(value, 'type');
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.onClick = function (event) {
        console.log('Lotus.Button.prototype.onClick: event is ' + event);
        console.log('Lotus.Button.prototype.onClick: my id is ' + this.id);
        console.log('Lotus.Button.prototype.onClick: this ' + this);
        this.dispatch(new ComponentEvent_1.ComponentEvent(ComponentEvent_1.ComponentEvent.CLICK, { target: this.buttonSkinPart, originalEvent: event }));
    };
    Button.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('button', this, 'buttonSkinPart'));
    };
    Button.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'button':
                //add button event listener or whatever else yo want to do when this skin part is added
                //you could hold until all skin parts are added and then call addEventListeners
                console.log('Lotus.Button.prototype.onSkinPartAdded: part: ' + part);
                console.log('Lotus.Button.prototype.onSkinPartAdded: skinPart: ' + part);
                this.addEventListeners();
                break;
        }
    };
    Button.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        this.buttonSkinPart.addEventListener('click', this.onClick.bind(this));
    };
    Button.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        this.buttonSkinPart.removeEventListener('click', this.onClick);
    };
    Button.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.buttonSkinPart = null;
    };
    return Button;
}(AbstractComponent_1.AbstractComponent));
exports.Button = Button;


/***/ }),
/* 27 */
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
 * Created by dsmiley on 9/27/17.
 */
var FileCollectionView_1 = __webpack_require__(18);
var SkinPart_1 = __webpack_require__(1);
var DragDropFileCollectionView = (function (_super) {
    __extends(DragDropFileCollectionView, _super);
    function DragDropFileCollectionView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(DragDropFileCollectionView.prototype, "dragOverClass", {
        get: function () {
            return this._dragOverClass;
        },
        set: function (value) {
            this._dragOverClass = value;
            this.notify(value, 'dragOverClass');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragDropFileCollectionView.prototype, "dropTarget", {
        get: function () {
            return this._dropTarget;
        },
        set: function (value) {
            this._dropTarget = value;
            this.notify(value, 'dropTarget');
        },
        enumerable: true,
        configurable: true
    });
    DragDropFileCollectionView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        this.skinParts.addItem(new SkinPart_1.SkinPart('dropTarget', this, 'dropTarget'));
    };
    DragDropFileCollectionView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'dropTarget':
                this.dropTarget.addEventListener("drop", this.onDrop.bind(this), false);
                window.addEventListener("drop", this.onPreventDrop.bind(this), false);
                window.addEventListener("dragover", this.onPreventDrop.bind(this), false);
                this.dropTarget.addEventListener("dragover", this.onDragOver.bind(this), false);
                this.dropTarget.addEventListener("dragenter", this.onDragOver.bind(this), false);
                this.dropTarget.addEventListener("dragleave", this.onDragLeave.bind(this), false);
                break;
        }
    };
    DragDropFileCollectionView.prototype.onPreventDrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    DragDropFileCollectionView.prototype.onDrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.dragOverClass !== null && this.dragOverClass !== undefined) {
            this.dropTarget.classList.remove(this.dragOverClass);
        }
        var files = (event.dataTransfer !== null && event.dataTransfer !== undefined) ? event.dataTransfer.files : event['originalEvent'].dataTransfer.files;
        //note: files.hasOwnProperty('length') does not work
        if (files === null || files === undefined || !files.length) {
            return;
        }
        else {
            this.uploadFiles(files);
        }
    };
    DragDropFileCollectionView.prototype.onDragOver = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.dragOverClass !== null && this.dragOverClass !== undefined) {
            this.dropTarget.classList.add(this.dragOverClass);
        }
        if (event.dataTransfer !== null && event.dataTransfer !== undefined && event.dataTransfer.files !== null && event.dataTransfer.files !== undefined) {
            event.dataTransfer.dropEffect = 'copy';
        }
        else if (event['originalEvent'].dataTransfer.files !== null && event['originalEvent'].dataTransfer.files !== undefined) {
            event['originalEvent'].dataTransfer.dropEffect = 'copy';
        }
    };
    DragDropFileCollectionView.prototype.onDragLeave = function (event) {
        if (this.dragOverClass !== null && this.dragOverClass !== undefined) {
            this.dropTarget.classList.remove(this.dragOverClass);
        }
    };
    DragDropFileCollectionView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.dropTarget) {
            this.dropTarget.removeEventListener("drop", this.onDrop);
            this.dropTarget.removeEventListener("dragover", this.onDragOver);
            this.dropTarget.removeEventListener("dragenter", this.onDragOver);
            this.dropTarget.removeEventListener("dragleave", this.onDragLeave);
            window.removeEventListener("drop", this.onPreventDrop, false);
            window.removeEventListener("dragover", this.onPreventDrop, false);
            this.dropTarget = null;
        }
        this.onDrop = null;
        this.onDragOver = null;
        this.dropTarget = null;
    };
    return DragDropFileCollectionView;
}(FileCollectionView_1.FileCollectionView));
exports.DragDropFileCollectionView = DragDropFileCollectionView;


/***/ }),
/* 28 */
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
 * Created by dsmiley on 9/28/17.
 */
var AbstractThumbnailView_1 = __webpack_require__(14);
var SkinPart_1 = __webpack_require__(1);
var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Image.prototype, "loadingSVG", {
        get: function () {
            return this._loadingSVG;
        },
        set: function (value) {
            this._loadingSVG = value;
        },
        enumerable: true,
        configurable: true
    });
    Image.prototype.getImageURL = function (model) {
        if (model) {
            return model['src'];
        }
        if (!this.model) {
            return '';
        }
        return this.model['src'];
    };
    Image.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('loadingSVG', this, 'loadingSVG'));
    };
    Image.prototype.onImageLoad = function (event) {
        _super.prototype.onImageLoad.call(this, event);
        this.setElementDisplay(this.loadingSVG, 'none');
    };
    Image.prototype.setThumbnailSrc = function (src) {
        _super.prototype.setThumbnailSrc.call(this, src);
        this.setElementDisplay(this.loadingSVG, this._loadingSVGStyle);
    };
    Image.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'loadingSVG':
                this._loadingSVGStyle = this.loadingSVG.style.display;
                break;
        }
    };
    Image.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.loadingSVG = null;
    };
    return Image;
}(AbstractThumbnailView_1.AbstractThumbnailView));
exports.Image = Image;


/***/ }),
/* 29 */
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
 * Created by dsmiley on 8/24/17.
 */
var AbstractRecordSetCollectionView_1 = __webpack_require__(17);
var ImageGalleryCollectionView = (function (_super) {
    __extends(ImageGalleryCollectionView, _super);
    function ImageGalleryCollectionView() {
        return _super.call(this) || this;
    }
    return ImageGalleryCollectionView;
}(AbstractRecordSetCollectionView_1.AbstractRecordSetCollectionView));
exports.ImageGalleryCollectionView = ImageGalleryCollectionView;


/***/ }),
/* 30 */
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
var SkinPart_1 = __webpack_require__(1);
var AbstractComponent_1 = __webpack_require__(2);
var ImageGalleryItemDetail = (function (_super) {
    __extends(ImageGalleryItemDetail, _super);
    function ImageGalleryItemDetail() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ImageGalleryItemDetail.prototype, "asset", {
        get: function () {
            return this._asset;
        },
        set: function (value) {
            this._asset = value;
            this.notify(value, 'asset');
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageGalleryItemDetail.prototype, "nameLabel", {
        get: function () {
            return this._nameLabel;
        },
        set: function (value) {
            this._nameLabel = value;
            this.notify(value, 'nameLabel');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageGalleryItemDetail.prototype, "dateCreatedLabel", {
        get: function () {
            return this._dateCreatedLabel;
        },
        set: function (value) {
            this._dateCreatedLabel = value;
            this.notify(value, 'dateCreatedLabel');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageGalleryItemDetail.prototype, "urlLabel", {
        get: function () {
            return this._urlLabel;
        },
        set: function (value) {
            this._urlLabel = value;
            this.notify(value, 'urlLabel');
        },
        enumerable: true,
        configurable: true
    });
    ImageGalleryItemDetail.prototype.render = function () {
        if (this.asset && this.ready) {
            if (this.nameLabel) {
                this.nameLabel.innerHTML = this.asset.objectName;
            }
            if (this.dateCreatedLabel) {
                this.dateCreatedLabel.innerHTML = this.asset.createdDate.toDateString();
            }
            if (this.urlLabel) {
                this.urlLabel.innerHTML = this.asset.url;
            }
        }
    };
    ImageGalleryItemDetail.prototype.defineSkinParts = function () {
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('nameLabel', this, 'nameLabel'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('dateCreatedLabel', this, 'dateCreatedLabel'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('urlLabel', this, 'urlLabel'));
    };
    ImageGalleryItemDetail.prototype.created = function (element) {
        _super.prototype.created.call(this, element);
    };
    ImageGalleryItemDetail.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.asset = null;
        this.nameLabel = null;
        this.dateCreatedLabel = null;
        this.urlLabel = null;
    };
    return ImageGalleryItemDetail;
}(AbstractComponent_1.AbstractComponent));
exports.ImageGalleryItemDetail = ImageGalleryItemDetail;


/***/ }),
/* 31 */
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
 * Created by dsmiley on 8/24/17.
 */
var AbstractThumbnailView_1 = __webpack_require__(14);
var SkinPart_1 = __webpack_require__(1);
var ComponentEvent_1 = __webpack_require__(4);
var ImageGalleryView = (function (_super) {
    __extends(ImageGalleryView, _super);
    function ImageGalleryView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ImageGalleryView.prototype, "itemDetail", {
        get: function () {
            return this._itemDetail;
        },
        set: function (value) {
            this._itemDetail = value;
            this.notify(value, 'itemDetail');
        },
        enumerable: true,
        configurable: true
    });
    ImageGalleryView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('itemDetail', this, 'itemDetail'));
    };
    ImageGalleryView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            //optional container for displaying collection elements
            case 'itemDetail':
                if (this.model) {
                    //this is an example of working with nested components which are skin parts and require a reference to and item view model
                    //nested components in your skins (template files) work natively, but if you have a skin part that requires a model reference you have to wait until ComponentEvent.READY is dispatched
                    this.itemDetail.lotusComponentInstance.asset = this.model;
                    this.itemDetail.lotusComponentInstance.addEventListener(ComponentEvent_1.ComponentEvent.READY, this, 'onItemDetailReady');
                }
                break;
        }
    };
    ImageGalleryView.prototype.onItemDetailReady = function (event) {
        if (this.model) {
            this.itemDetail.lotusComponentInstance.asset = this.model;
        }
    };
    ImageGalleryView.prototype.onModelChange = function (value) {
        _super.prototype.onModelChange.call(this, value);
        if (this.itemDetail) {
            this.itemDetail.lotusComponentInstance.asset = value;
        }
    };
    ImageGalleryView.prototype.onDragStart = function (event) {
        if (event['dataTransfer'] !== null && event['dataTransfer'] !== undefined) {
            event['dataTransfer'].effectAllowed = 'all';
            try {
                event['dataTransfer'].setData('galleryImage', this.model['source']);
            }
            catch (e) {
                event['dataTransfer'].setData('text', this.model['source']); //IE only allows two possible key values, text is the nest options
            }
        }
        else {
            event['originalEvent'].dataTransfer.effectAllowed = 'all';
            try {
                event['originalEvent'].dataTransfer.setData('galleryImage', this.model['source']);
            }
            catch (e) {
                event['originalEvent'].dataTransfer.setData('text', this.model['source']); //IE only allows two possible key values, text is the nest options
            }
        }
    };
    ImageGalleryView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.itemDetail) {
            this.itemDetail.lotusComponentInstance.removeEventListener(ComponentEvent_1.ComponentEvent.READY, this, 'onItemDetailReady');
        }
        this.itemDetail = null;
    };
    return ImageGalleryView;
}(AbstractThumbnailView_1.AbstractThumbnailView));
exports.ImageGalleryView = ImageGalleryView;


/***/ }),
/* 32 */
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
 * Created by dsmiley on 9/21/17.
 */
var AbstractItemView_1 = __webpack_require__(3);
var SkinPart_1 = __webpack_require__(1);
var InputEvent_1 = __webpack_require__(8);
var InputModel_1 = __webpack_require__(9);
var Input = (function (_super) {
    __extends(Input, _super);
    function Input(type) {
        var _this = _super.call(this) || this;
        _this.type = type;
        return _this;
    }
    Object.defineProperty(Input.prototype, "inputSkinPart", {
        get: function () {
            return this._inputSkinPart;
        },
        set: function (value) {
            this._inputSkinPart = value;
            this.notify(value, 'inputSkinPart');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.notify(value, 'type');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            //manually this.inputSkinPart.value if there are no two way bindings
            if (this.inputSkinPart && (!this.model || !(this.model instanceof InputModel_1.InputModel))) {
                this.inputSkinPart.value = value;
            }
            this.notify(value, 'value');
        },
        enumerable: true,
        configurable: true
    });
    //add the invalid/valid class after validation. This method id typically called as part of a data binding on this.isValid
    Input.prototype.attachValidationClass = function (classToAdd, classToRemove) {
        if (this.inputSkinPart) {
            this.inputSkinPart.classList.remove(classToRemove);
            this.inputSkinPart.classList.add(classToAdd);
        }
    };
    //TODO: add invalid classes and bindings to trigger attachment of invlaid styles when model's isValid state changes
    Input.prototype.onModelChange = function (value) {
        _super.prototype.onModelChange.call(this, value);
        if (value instanceof InputModel_1.InputModel) {
            //set initial value
            this.value = value.value;
            //set up two way bindings on model
            this.binder.bind(value, 'value', this, 'value');
            this.binder.bind(this, 'value', value, 'value');
            //set up one way binding for text input
            if (this.inputSkinPart) {
                this.inputSkinPart.value = value.value;
                this.binder.bind(this, 'value', this.inputSkinPart, 'value');
            }
        }
    };
    Input.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts
        this.skinParts.addItem(new SkinPart_1.SkinPart('input', this, 'inputSkinPart'));
    };
    Input.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'input':
                //add event listener or whatever else yo want to do when this skin part is added
                //you could hold until all skin parts are added and then call addEventListeners
                console.log('Lotus.Input.prototype.onSkinPartAdded: part: ' + part);
                this.inputSkinPart.setAttribute('type', this.type);
                this.addEventListeners();
                break;
        }
    };
    Input.prototype.onChange = function (event) {
        console.log('Lotus.Input.prototype.onChange: input value is ' + event.target.value);
        console.log('Lotus.Input.prototype.onChange: my id is ' + this.id);
        this.value = this.inputSkinPart.value;
        this.dispatch(new InputEvent_1.InputEvent(InputEvent_1.InputEvent.CHANGE, { target: this.inputSkinPart, originalEvent: event }));
    };
    Input.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        this.inputSkinPart.addEventListener('change', this.onChange.bind(this));
    };
    Input.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        this.inputSkinPart.removeEventListener('change', this.onChange);
    };
    Input.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.inputSkinPart = null;
    };
    return Input;
}(AbstractItemView_1.AbstractItemView));
exports.Input = Input;


/***/ }),
/* 33 */
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
 * Created by dsmiley on 9/22/17.
 */
var AbstractInputCollectionView_1 = __webpack_require__(12);
var ListCollectionView = (function (_super) {
    __extends(ListCollectionView, _super);
    function ListCollectionView() {
        return _super.call(this) || this;
    }
    ListCollectionView.prototype.onChange = function (event) {
        //get the associated item view for the selected list item
        var itemView = this.childViews.getItemAt(event.target.selectedIndex);
        //html option elements appear to not dispatch,orat leastnot bubblethe click event on list items
        //so we force it here
        itemView.onClick();
    };
    ListCollectionView.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        this.collectionContainer.addEventListener('change', this.onChange.bind(this));
    };
    ListCollectionView.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        this.collectionContainer.removeEventListener('change', this.onChange);
    };
    ListCollectionView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            //required, defines the layout for child views
            case 'collectionContainer':
                this.addEventListeners();
                break;
        }
    };
    ListCollectionView.prototype.refreshView = function (value) {
        if (this.collectionContainer) {
            this.collectionContainer.value = value;
        }
        if (this.selectedItem && !this.selectedItem.element['selected']) {
            this.selectedItem.element['selected'] = true;
        }
    };
    ListCollectionView.prototype.destroy = function () {
        this.removeEventListeners();
        _super.prototype.destroy.call(this);
    };
    return ListCollectionView;
}(AbstractInputCollectionView_1.AbstractInputCollectionView));
exports.ListCollectionView = ListCollectionView;


/***/ }),
/* 34 */
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
 * Created by dsmiley on 9/22/17.
 */
var AbstractSelectableFormInput_1 = __webpack_require__(13);
var SkinPart_1 = __webpack_require__(1);
var ListItemView = (function (_super) {
    __extends(ListItemView, _super);
    function ListItemView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ListItemView.prototype, "option", {
        get: function () {
            return this._option;
        },
        set: function (value) {
            this._option = value;
        },
        enumerable: true,
        configurable: true
    });
    ListItemView.prototype.refreshView = function (selected) {
        if (this.option) {
            this.option.selected = selected;
        }
    };
    ListItemView.prototype.onClick = function (event) {
        this.selected = true;
    };
    ListItemView.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        this.option.addEventListener('click', this.onClick.bind(this));
    };
    ListItemView.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        if (this.option) {
            this.option.removeEventListener('click', this.onClick);
        }
    };
    ListItemView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts. We use the term itemTemplate as it allows us to include this component as a nested component in a collection view.
        //Choosing another name would require it be wrapped in a itemTemplate skin part
        this.skinParts.addItem(new SkinPart_1.SkinPart('itemTemplate', this, 'option'));
    };
    ListItemView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'itemTemplate':
                //set up listitem value and label
                this.option.value = (typeof this.model.value == 'object') ? JSON.stringify(this.model.value) : this.model.value;
                this.option.innerHTML = this.model.label;
                this.option.selected = this.selected;
                if (this.selected) {
                    this.onClick();
                }
                break;
        }
    };
    ListItemView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.option = null;
    };
    return ListItemView;
}(AbstractSelectableFormInput_1.AbstractSelectableFormInput));
exports.ListItemView = ListItemView;


/***/ }),
/* 35 */
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
 * Created by dsmiley on 9/22/17.
 */
var AbstractInputCollectionView_1 = __webpack_require__(12);
var RadioCollectionView = (function (_super) {
    __extends(RadioCollectionView, _super);
    function RadioCollectionView() {
        return _super.call(this) || this;
    }
    RadioCollectionView.prototype.refreshView = function (value) {
        if (this.selectedItem) {
            this.selectedItem.element['checked'] = true;
        }
    };
    return RadioCollectionView;
}(AbstractInputCollectionView_1.AbstractInputCollectionView));
exports.RadioCollectionView = RadioCollectionView;


/***/ }),
/* 36 */
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
 * Created by dsmiley on 9/22/17.
 */
var AbstractSelectableFormInput_1 = __webpack_require__(13);
var SkinPart_1 = __webpack_require__(1);
var RadioItemView = (function (_super) {
    __extends(RadioItemView, _super);
    function RadioItemView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RadioItemView.prototype, "radio", {
        get: function () {
            return this._radio;
        },
        set: function (value) {
            this._radio = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioItemView.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
        },
        enumerable: true,
        configurable: true
    });
    RadioItemView.prototype.onClick = function (event) {
        this.selected = this.radio.checked;
    };
    RadioItemView.prototype.refreshView = function (selected) {
        if (this.radio) {
            this.radio.checked = selected;
        }
    };
    RadioItemView.prototype.addEventListeners = function () {
        _super.prototype.addEventListeners.call(this);
        this.radio.addEventListener('click', this.onClick.bind(this));
    };
    RadioItemView.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        if (this.radio) {
            this.radio.removeEventListener('click', this.onClick);
        }
    };
    RadioItemView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        this.skinParts.addItem(new SkinPart_1.SkinPart('radio', this, 'radio'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('label', this, 'label'));
    };
    RadioItemView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'radio':
                //set up listitem value and label
                this.radio.value = (typeof this.model.value == 'object') ? JSON.stringify(this.model.value) : this.model.value;
                this.radio.name = this.model.name;
                this.radio.checked = this.selected;
                this.addEventListeners();
                break;
            case 'label':
                this.label.innerHTML = this.model.label;
                break;
        }
    };
    RadioItemView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.removeEventListeners();
        this.radio = null;
        this.label = null;
    };
    return RadioItemView;
}(AbstractSelectableFormInput_1.AbstractSelectableFormInput));
exports.RadioItemView = RadioItemView;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(21));
__export(__webpack_require__(15));
__export(__webpack_require__(16));
__export(__webpack_require__(22));
__export(__webpack_require__(4));
__export(__webpack_require__(8));
__export(__webpack_require__(5));
__export(__webpack_require__(7));
__export(__webpack_require__(1));
__export(__webpack_require__(20));
__export(__webpack_require__(2));
__export(__webpack_require__(2));
__export(__webpack_require__(3));
__export(__webpack_require__(6));
__export(__webpack_require__(17));
__export(__webpack_require__(14));
__export(__webpack_require__(13));
__export(__webpack_require__(12));
__export(__webpack_require__(32));
__export(__webpack_require__(26));
__export(__webpack_require__(34));
__export(__webpack_require__(36));
__export(__webpack_require__(29));
__export(__webpack_require__(30));
__export(__webpack_require__(31));
__export(__webpack_require__(33));
__export(__webpack_require__(35));
__export(__webpack_require__(19));
__export(__webpack_require__(18));
__export(__webpack_require__(27));
__export(__webpack_require__(28));
__export(__webpack_require__(9));
__export(__webpack_require__(23));
__export(__webpack_require__(10));
__export(__webpack_require__(11));
__export(__webpack_require__(25));
__export(__webpack_require__(24));


/***/ })
/******/ ]);
});
//# sourceMappingURL=lotusJS-UMD.js.map