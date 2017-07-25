(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Lotus", [], factory);
	else if(typeof exports === 'object')
		exports["Lotus"] = factory();
	else
		root["Lotus"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 7/24/17.
 */
var Context = (function () {
    function Context(config, params) {
    }
    return Context;
}());
exports.Context = Context;


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(0));
__export(__webpack_require__(1));


/***/ })
/******/ ]);
});
//# sourceMappingURL=lotusJS-UMD.js.map