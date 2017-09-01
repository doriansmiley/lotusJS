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
    console.log('key: ' + key);
    console.log('t.name: ' + t.name);
    console.log('target.constructor.name: ' + target.constructor.name);
    console.log('target.constructor.prototype: ' + target.constructor.prototype);
}
exports.inject = inject;
//# sourceMappingURL=InjectorDecorator.js.map