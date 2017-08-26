/**
 * Created by dsmiley on 4/18/17.
 */
import { IEventDispatcher } from '../../control/IEventDispatcher';
import { IBindable } from "../../model/observable/IBindable";
export interface IList extends IEventDispatcher, IBindable {
    allowDuplicates: boolean;
    length: number;
    clone(): IList;
    source(): Array<any>;
    allowInsert(object: any, hash?: Object, key?: string): boolean;
    addItem(object: any, hash?: Object, key?: string): number;
    addAll(items: Array<any>, replaceIndex?: boolean): void;
    getItemAt(index: number): any;
    clear(): void;
    removeItemAt(index: number): void;
    insert(object: any, index: number, suppressChangeEvent: boolean, hash?: Object, key?: string, replaceIndex?: boolean): number;
    changeIndex(fromIndex: number, toIndex: number, suppressChangeEvent?: boolean): void;
    swapIndex(fromIndex: number, toIndex: number, suppressChangeEvent?: boolean): void;
    indexOf(object: any, startIndex?: number): number;
    lastIndexOf(object: any, startIndex?: number): number;
}
