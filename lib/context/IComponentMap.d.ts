import { IContext } from "./IContext";
import { IComponentList } from "./IComponentList";
import * as Lavender from 'lavenderjs/lib';
import { IXtag } from "../custom_definitions/xtag";
import { LotusHTMLElement } from "./LotusHTMLElement";
/**
 * Created by dsmiley on 7/26/17.
 */
export interface IComponentMap extends Lavender.IResponder {
    context: IContext;
    componentInstances: IComponentList;
    tagInstanceToRequestId: Object;
    addComponent(tagInstance: LotusHTMLElement, functionConstructor: any): void;
    createComponent(tagInstance: LotusHTMLElement): void;
    mapComponent(tagName: string, prototype: HTMLElement, functionConstructor: Function, framework: IXtag): void;
}
