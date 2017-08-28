/**
 * Created by dsmiley on 7/24/17.
 */
import { IContext } from './IContext';
import { IInjector } from './IInjector';
export declare class Injector implements IInjector {
    context: IContext;
    objectMap: Object;
    constructor(context: IContext);
    mapObject(key: string, constructor: Function, useSingleton?: boolean): void;
    mapSingletonInstance(key: string, instance: any): void;
    inject(key: string): Object;
}
