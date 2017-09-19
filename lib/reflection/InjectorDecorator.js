"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 8/30/17.
 */
require("reflect-metadata");
function inject(target, key) {
    //set target[key] equal to a new instance of the mapped constructor of target's type
    var t = Reflect.getMetadata('design:type', target, key);
    if (!t) {
        // Needed to support react native inheritance
        t = Reflect.getMetadata('design:type', target.constructor, key);
    }
    if (!target['resolveInjections']) {
        target['resolveInjections'] = new Array();
    }
    target['resolveInjections'].push({ property: key, type: t });
    //console.log('key: ' + key);
    //console.log('t.name: ' + t.name);
    //console.log('target.constructor.name: ' + target.constructor.name);
    //console.log('target.constructor.prototype: ' + target.constructor.prototype);
}
exports.inject = inject;
function injectable(target) {
    // the new constructor behaviour
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Object.getPrototypeOf(this.constructor.prototype).constructor.apply(this, args);
        console.log("injectable constructor called, attempting to resolve injections: " + this.constructor.prototype);
        if (this.resolveInjections) {
            console.log("injections found!!!!: ");
            //TODO: move this method to a decorator that sets up this.resolveInjections as an accessor and adds this functionality to the constructor
            this.resolveInjections.forEach(function (value, index) {
                var instance = this.context.injector.inject(value.type);
                if (instance) {
                    this[value.property] = instance;
                }
            }.bind(this));
        }
        return this;
    };
    // copy prototype so intanceof operator still works
    f.prototype = target.prototype;
    return f;
}
exports.injectable = injectable;
function bindable(target, key) {
    // property value
    var _val = target[key];
    //define the private property:
    target['_' + key] = _val;
    if (!target['notify']) {
        console.log('notify is undefined. please extend Lavender.Subject.');
        return;
    }
    //get the property descriptor
    var descriptor = Object.getOwnPropertyDescriptor(target, key);
    if (!descriptor) {
        console.log('Object.getOwnPropertyDescriptor returned null.');
    }
    // property getter
    var getter = function () {
        var returnValue = this['_' + key];
        if (descriptor && descriptor.get) {
            //call the old getter
            returnValue = descriptor.get();
        }
        console.log('Get: ${key} => ${returnValue}');
        return returnValue;
    };
    // property setter
    var setter = function (newVal) {
        console.log('Set: ${key} => ${newVal}');
        if (descriptor && descriptor.set) {
            //call the old getter
            descriptor.set(newVal);
        }
        else {
            this['_' + key] = newVal;
        }
        this['notify'](newVal, key);
    };
    // Delete property.
    if (delete target[key]) {
        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}
exports.bindable = bindable;
//# sourceMappingURL=InjectorDecorator.js.map