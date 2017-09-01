/**
 * Created by dsmiley on 8/30/17.
 */
import 'reflect-metadata';
export type injectionResolver = {property:string, type:Function};
export function inject(target:any, key:string){
    //set target[key] equal to a new instance of the mapped constructor of target's type
    let t = Reflect.getMetadata('design:type', target, key);
    if (!t) {
        // Needed to support react native inheritance
        t = Reflect.getMetadata('design:type', target.constructor, key);
    }
    if(!target['resolveInjections']){
        target['resolveInjections'] = new Array<injectionResolver>();
    }
    (target['resolveInjections'] as Array<injectionResolver>).push({property:key, type:t});
    //TODO:see if we can overrite the constructor in target to include the code in AbstractMediator that resolves injections
    console.log('key: ' + key);
    console.log('t.name: ' + t.name);
    console.log('target.constructor.name: ' + target.constructor.name);
    console.log('target.constructor.prototype: ' + target.constructor.prototype);
}