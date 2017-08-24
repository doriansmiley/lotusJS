import { IContext } from "./IContext";
import { IComponentList } from "./IComponentList";
import { IResult } from 'lavenderjs/lib';
import { IFault } from 'lavenderjs/lib';
import { IXtag } from "../../custom_definitions/xtag";
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
    success(result: IResult): void;
    fault(fault: IFault): void;
    onProgress(progress: number): void;
    addComponent(tagInstance: LotusHTMLElement, functionConstructor: any): void;
    createComponent(tagInstance: LotusHTMLElement): void;
    mapComponent(tagName: string, prototype: HTMLElement, functionConstructor: Function, framework: IXtag): void;
}
