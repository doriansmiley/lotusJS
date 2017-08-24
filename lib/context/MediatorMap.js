"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lavender = require("lavenderjs/lib");
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
//# sourceMappingURL=MediatorMap.js.map