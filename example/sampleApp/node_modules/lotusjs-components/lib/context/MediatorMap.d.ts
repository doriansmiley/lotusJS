import { IMediatorMap } from "./IMediatorMap";
import { IContext } from "./IContext";
import { IComponent } from "../view/IComponent";
/**
 * Created by dsmiley on 7/26/17.
 */
export declare class MediatorMap implements IMediatorMap {
    protected _tagConstructorMap: Object;
    protected _mediatorInstanceMap: Object;
    context: IContext;
    constructor(context: IContext);
    readonly tagConstructorMap: Object;
    readonly mediatorInstanceMap: Object;
    add(tagName: string, mediatorConstructor: Function, useSingleton?: boolean): void;
    remove(tagName: string, mediatorConstructor: Function): string;
    apply(tagName: string, componentInstance: IComponent): void;
    hasMediatorMap(tagName: string, mediatorConstructor: Function): boolean;
}
