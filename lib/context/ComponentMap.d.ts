import { IContext } from "./IContext";
import { IComponentList } from "./IComponentList";
import * as Lavender from 'lavenderjs/lib';
import { IXtag } from "./xtag";
import { IComponentMap } from "./IComponentMap";
import { LotusHTMLElement } from "./LotusHTMLElement";
/**
 * Created by dsmiley on 7/25/17.
 */
export declare class ComponentMap implements IComponentMap {
    context: IContext;
    componentInstances: IComponentList;
    tagInstanceToRequestId: Object;
    constructor(context: IContext);
    success(result: Lavender.IResult): void;
    fault(fault: Lavender.IFault): void;
    onProgress(progress: number): void;
    protected mapMediators(tagInstance: LotusHTMLElement): void;
    addComponent(tagInstance: LotusHTMLElement, functionConstructor: any): void;
    createComponent(tagInstance: LotusHTMLElement): void;
    mapComponent(tagName: string, prototype: HTMLElement, functionConstructor: Function, framework: IXtag): void;
}
