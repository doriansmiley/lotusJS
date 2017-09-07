/**
 * Created by dsmiley on 8/30/17.
 */
import 'reflect-metadata';
import * as Lavender from 'lavenderjs/lib';

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

export function injectable(target:any){
    // the new constructor behaviour
    var f : any = function (...args) {
        Object.getPrototypeOf(this.constructor.prototype).constructor.apply(this, args);
        console.log("injectable constructor called, attempting to resolve injections: " + this.constructor.prototype);
        if(this.resolveInjections){
            console.log("injections found!!!!: ");
            //TODO: move this method to a decorator that sets up this.resolveInjections as an accessor and adds this functionality to the contructor
            this.resolveInjections.forEach(function(value:injectionResolver, index:number){
                var instance:any = this.context.injector.inject(value.type);
                if(instance){
                    this[value.property] = instance;
                }
            }.bind(this));
        }
        return this;
    }

    // copy prototype so intanceof operator still works
    f.prototype = target.prototype;

    return f;
}