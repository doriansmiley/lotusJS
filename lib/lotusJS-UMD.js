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
var SkinPartList_1 = __webpack_require__(13);
var ComponentEvent_1 = __webpack_require__(5);
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
 * Created by dsmiley on 8/4/17.
 */
var Lavender = __webpack_require__(0);
var AbstractComponent_1 = __webpack_require__(2);
var SkinPart_1 = __webpack_require__(1);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Lavender = __webpack_require__(0);
var ComponentList_1 = __webpack_require__(8);
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
    return FileEvent;
}(Lavender.AbstractEvent));
exports.FileEvent = FileEvent;


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
 * Created by dsmiley on 8/23/17.
 */
var Lavender = __webpack_require__(0);
var SkinPart_1 = __webpack_require__(1);
var AbstractCollectionView_1 = __webpack_require__(7);
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
 * Created by dsmiley on 8/23/17.
 */
var Lavender = __webpack_require__(0);
var AbstractItemView_1 = __webpack_require__(4);
var SkinPart_1 = __webpack_require__(1);
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComponentMap_1 = __webpack_require__(9);
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
/**
 * Created by dsmiley on 7/26/17.
 */
var LotusHTMLElement = (function (_super) {
    __extends(LotusHTMLElement, _super);
    function LotusHTMLElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LotusHTMLElement.prototype.createShadowRoot = function () {
        return null;
    };
    LotusHTMLElement.prototype.getComponentInstance = function () {
        return this.lotusComponentInstance;
    };
    return LotusHTMLElement;
}(HTMLElement));
exports.LotusHTMLElement = LotusHTMLElement;


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
var AbstractComponent_1 = __webpack_require__(2);
var SkinPart_1 = __webpack_require__(1);
var ComponentEvent_1 = __webpack_require__(5);
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
 * Created by dsmiley on 9/26/17.
 */
var AbstractItemView_1 = __webpack_require__(4);
var SkinPart_1 = __webpack_require__(1);
var FileEvent_1 = __webpack_require__(10);
var Lavender = __webpack_require__(0);
var File = (function (_super) {
    __extends(File, _super);
    function File() {
        return _super.call(this) || this;
    }
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
            case 'fileLabel':
                this.fileLabel = element;
                break;
            case 'fileTypeLabel':
                this.fileTypeLabel = element;
                break;
            case 'progressBar':
                this.progressBar = element;
                break;
            case 'cancelBtn':
                this.cancelBtn = element;
                this.cancelBtnDisplay = this.cancelBtn.style.display; //capture the original display state of the button
                this.cancelBtn.addEventListener('click', this.onCancelBtnClick.bind(this));
                break;
            case 'clearBtn':
                this.clearBtn = element;
                this.clearBtnDisplay = this.clearBtn.style.display; //capture the original display state of the button
                this.clearBtn.addEventListener('click', this.onClearBtnClick.bind(this));
                break;
            case 'statusIndicator':
                this.statusIndicator = element;
                break;
            case 'loadIndicator':
                this.loadIndicator = element;
                break;
            case 'errorIndicator':
                this.errorIndicator = element;
                break;
            case 'progressIndicator':
                this.progressIndicator = element;
                break;
            case 'pendingIndicator':
                this.pendingIndicator = element;
                break;
            case 'abortIndicator':
                this.abortIndicator = element;
                break;
            case 'thumbnail':
                this.thumbnail = element;
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
 * Created by dsmiley on 8/24/17.
 */
var AbstractRecordSetCollectionView_1 = __webpack_require__(11);
var ImageGalleryCollectionView = (function (_super) {
    __extends(ImageGalleryCollectionView, _super);
    function ImageGalleryCollectionView() {
        return _super.call(this) || this;
    }
    return ImageGalleryCollectionView;
}(AbstractRecordSetCollectionView_1.AbstractRecordSetCollectionView));
exports.ImageGalleryCollectionView = ImageGalleryCollectionView;


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
 * Created by dsmiley on 8/24/17.
 */
var AbstractThumbnailView_1 = __webpack_require__(12);
var SkinPart_1 = __webpack_require__(1);
var ComponentEvent_1 = __webpack_require__(5);
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
/* 21 */
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
var AbstractComponent_1 = __webpack_require__(2);
var SkinPart_1 = __webpack_require__(1);
var InputEvent_1 = __webpack_require__(6);
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
}(AbstractComponent_1.AbstractComponent));
exports.Input = Input;


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
var ItemViewEvent_1 = __webpack_require__(3);
var InputEvent_1 = __webpack_require__(6);
var AbstractCollectionView_1 = __webpack_require__(7);
var ListCollectionView = (function (_super) {
    __extends(ListCollectionView, _super);
    function ListCollectionView() {
        return _super.call(this) || this;
    }
    ListCollectionView.prototype.onChange = function (event) {
        //get the associated item view for the selected list item
        var itemView = this.childViews.getItemAt(event.target.selectedIndex);
        console.log('Lotus.List.prototype.onChange: input value is ' + itemView.element['value']);
        console.log('Lotus.List.prototype.onChange: my id is ' + this.id);
        //set selected item view
        this.dispatch(new InputEvent_1.InputEvent(InputEvent_1.InputEvent.CHANGE, { target: this.collectionContainer, originalEvent: event }));
        //set the selected item
        this.onItemSelectedDeselect(new ItemViewEvent_1.ItemViewEvent(ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED, { item: itemView }));
        console.log('Lotus.List.prototype.onChange: selected item is ' + itemView);
    };
    //(event.target as HTMLSelectElement).options[(event.target as HTMLSelectElement).selectedIndex].value
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
    ListCollectionView.prototype.destroy = function () {
        this.removeEventListeners();
        _super.prototype.destroy.call(this);
    };
    return ListCollectionView;
}(AbstractCollectionView_1.AbstractCollectionView));
exports.ListCollectionView = ListCollectionView;


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
 * Created by dsmiley on 9/22/17.
 */
var AbstractItemView_1 = __webpack_require__(4);
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
                break;
        }
    };
    ListItemView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.option = null;
    };
    return ListItemView;
}(AbstractItemView_1.AbstractItemView));
exports.ListItemView = ListItemView;


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
var InputEvent_1 = __webpack_require__(6);
var AbstractCollectionView_1 = __webpack_require__(7);
var RadioCollectionView = (function (_super) {
    __extends(RadioCollectionView, _super);
    function RadioCollectionView() {
        return _super.call(this) || this;
    }
    RadioCollectionView.prototype.onItemSelectedDeselect = function (event) {
        var dispatchChange = (this.selectedItem != event.payload['item']);
        _super.prototype.onItemSelectedDeselect.call(this, event);
        //if the selected item has changed dispatch input change event
        if (dispatchChange) {
            this.dispatch(new InputEvent_1.InputEvent(InputEvent_1.InputEvent.CHANGE, { target: this.selectedItem, originalEvent: event }));
        }
    };
    return RadioCollectionView;
}(AbstractCollectionView_1.AbstractCollectionView));
exports.RadioCollectionView = RadioCollectionView;


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
 * Created by dsmiley on 9/22/17.
 */
var AbstractItemView_1 = __webpack_require__(4);
var SkinPart_1 = __webpack_require__(1);
var ItemViewEvent_1 = __webpack_require__(3);
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
        var eventType = (this.radio.checked) ? ItemViewEvent_1.ItemViewEvent.ITEM_SELECTED : ItemViewEvent_1.ItemViewEvent.ITEM_DESELECTED;
        //dispatch event to notify view that the layout was selected/or deselected
        this.dispatch(new ItemViewEvent_1.ItemViewEvent(eventType, { item: this }));
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
                this.radio.checked = (this.model.hasOwnProperty('selected')) ? this.model.selected : false;
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
}(AbstractItemView_1.AbstractItemView));
exports.RadioItemView = RadioItemView;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(14));
__export(__webpack_require__(8));
__export(__webpack_require__(9));
__export(__webpack_require__(15));
__export(__webpack_require__(5));
__export(__webpack_require__(6));
__export(__webpack_require__(3));
__export(__webpack_require__(10));
__export(__webpack_require__(1));
__export(__webpack_require__(13));
__export(__webpack_require__(2));
__export(__webpack_require__(2));
__export(__webpack_require__(4));
__export(__webpack_require__(7));
__export(__webpack_require__(11));
__export(__webpack_require__(12));
__export(__webpack_require__(21));
__export(__webpack_require__(16));
__export(__webpack_require__(23));
__export(__webpack_require__(25));
__export(__webpack_require__(18));
__export(__webpack_require__(19));
__export(__webpack_require__(20));
__export(__webpack_require__(22));
__export(__webpack_require__(24));
__export(__webpack_require__(17));


/***/ })
/******/ ]);
});
//# sourceMappingURL=lotusJS-UMD.js.map