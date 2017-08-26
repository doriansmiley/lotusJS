/**
 * Created by dsmiley on 4/18/17.
 */
import { IList } from './IList';
import { Subject } from '../observable/Subject';
import { EventDispatcher } from '../../control/EventDispatcher';
import { IEvent } from '../../events/IEvent';
export declare class ArrayList extends Subject implements IList, EventDispatcher {
    private aList;
    allowDuplicates: boolean;
    constructor(source?: Array<any>, allowDuplicates?: boolean);
    handlersByEventName: Object;
    addEventListener: (event: string, instance: Object, handler: string) => void;
    canListen: (eventType: string, instance: Object, handler: string) => boolean;
    removeEventListener: (event: string, instance: Object, handler: string) => void;
    removeAllEventListeners: (instance: Object) => void;
    dispatch: (event: IEvent) => void;
    readonly length: number;
    clone(): IList;
    source(): Array<any>;
    allowInsert(object: any, hash?: Object, key?: string): boolean;
    addItem(object: any, hash?: Object, key?: string): number;
    addAll(items: Array<any>, replaceIndex?: boolean): void;
    getItemAt(index: number): any;
    clear(): void;
    clearHash(hash: Object): void;
    protected removeItemFromHash(hash: Object, key: string): void;
    removeItemAt(index: number): void;
    insert(object: any, index: number, suppressChangeEvent?: boolean, hash?: Object, key?: string, replaceIndex?: boolean): number;
    changeIndex(fromIndex: number, toIndex: number, suppressChangeEvent?: boolean): void;
    swapIndex(fromIndex: number, toIndex: number, suppressChangeEvent?: boolean): void;
    indexOf(object: any, startIndex?: number): number;
    lastIndexOf(object: any, startIndex?: number): number;
}
