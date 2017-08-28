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
//# sourceMappingURL=Injector.js.map