/**
 * Created by dsmiley on 7/26/17.
 */
import { IContext } from './IContext';
import { IComponent } from '../view/IComponent';
export interface IMediatorMap {
    readonly tagConstructorMap: Object;
    readonly mediatorInstanceMap: Object;
    context: IContext;
    add(tagName: string, mediatorConstructor: Function, useSingleton: boolean): void;
    remove(tagName: string, mediatorConstructor: Function): string;
    apply(tagName: string, componentInstance: IComponent): void;
    hasMediatorMap(tagName: string, mediatorConstructor: Function): boolean;
}
