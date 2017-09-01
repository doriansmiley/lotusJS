/**
 * Created by dsmiley on 7/24/17.
 */
import { IContext } from './IContext';
import { IInjector } from './IInjector';
export declare class Injector implements IInjector {
    context: IContext;
    objectMap: Object;
    typeMap: Array<Object>;
    constructor(context: IContext);
    mapObject(key: any, constructor: Function, useSingleton?: boolean): void;
    mapSingletonInstance(key: any, instance: any): void;
    inject(key: any): Object;
}
