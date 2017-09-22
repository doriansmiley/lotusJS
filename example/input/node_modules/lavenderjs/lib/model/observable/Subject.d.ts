/**
 * Created by dsmiley on 4/18/17.
 */
import { Binder } from './Binder';
import { IObserver } from "./IObserver";
import { IBindable } from './IBindable';
export declare class Subject implements IBindable {
    protected observerHash: Object;
    protected binder: Binder;
    constructor();
    notify(value: any, chain: string): void;
    addObserver(observer: IObserver): void;
    removeObserver(observer: IObserver): void;
    addProperty(label: string, getter: any, setter: any): void;
    addProperties(p: any): void;
}
