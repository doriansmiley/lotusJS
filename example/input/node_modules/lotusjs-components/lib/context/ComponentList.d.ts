/**
 * Created by dsmiley on 7/25/17.
 */
import { IComponentList } from './IComponentList';
import * as Lavender from 'lavenderjs/lib';
export declare class ComponentList extends Lavender.ArrayList implements IComponentList {
    instancesByConstructor: Object;
    constructor();
    protected addToHash(object: any): void;
    protected removeItemFromHash(hash: Object, object: any): void;
    addItem(object: Object, hash?: Object, key?: string): number;
    clear(): void;
    removeItemAt(index: number): void;
    insert(object: any, index: number, suppressChangeEvent?: boolean, hash?: Object, key?: string, replaceIndex?: boolean): number;
}
