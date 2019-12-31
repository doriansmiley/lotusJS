/**
 * Created by dsmiley on 7/25/17.
 */
import {ComponentListInterface} from './ComponentListInterface';
import * as Lavender from 'lavenderjs/lib';

export class ComponentList extends Lavender.ArrayList implements ComponentListInterface {
    public instancesByConstructor: Record<string, any> = {};
    
    constructor() {
        super();
    }
    
    protected addToHash(object: any): void{
        if (this.instancesByConstructor[ object.constructor ] === null || this.instancesByConstructor[ object.constructor ] === undefined) {
            this.instancesByConstructor[ object.constructor ] = [];
        }
        this.instancesByConstructor[ object.constructor ].push(object);
    }
    
    protected removeItemFromHash(hash: Record<string, any>, object: any): void{
        let objects = hash[ object.constructor ];
        if (objects === null || objects === undefined ||  objects.length < 1) {
            return;
        }
        for (let i = 0; i < objects.length; i++) {
            if (objects[i] == object) {
                // remove the item from the array
                switch (i) {
                    case 0:
                        objects.shift();
                        break;
                    case objects.length - 1:
                        objects.pop();
                        break;
                    default:
                        const head = objects.slice(0, i);
                        const tail = objects.slice(i + 1);
                        objects = head.concat(tail);
                        break;
                }
                break;
            }
        }
    }

    public addItem(object: Record<string, any>, hash?: Record<string, any>, key?: string): number {
        const index: number = super.addItem(object,hash,key);
        // populate hash
        this.addToHash(object);
        return index;
    }

    public clear(): void{
        super.clearHash(this.instancesByConstructor);
        super.clear();
    }

    public removeItemAt(index: number): void{
        const object: Record<string, any> = this.getItemAt(index);
        this.removeItemFromHash(this.instancesByConstructor, object);
        super.removeItemAt(index);
    }

    public insert(object: any, index: number, suppressChangeEvent=false, hash?: Record<string, any>, key?: string, replaceIndex=false): number {
        const returnValue: number = super.insert(object,index,suppressChangeEvent,hash,key,replaceIndex);
        this.addToHash(object);
        return returnValue;
    }
}
