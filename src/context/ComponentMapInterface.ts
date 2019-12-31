import {IContext} from "./IContext";
import {IComponentList} from "./IComponentList";
import * as Lavender from 'lavenderjs/lib';
import {IXtag} from "./xtag";
import {LotusHTMLElement} from "./LotusHTMLElement";

/**
 * Created by dsmiley on 7/26/17.
 */
export interface ComponentMapInterface extends Lavender.IResponder {
    context: IContext;
    componentInstances: IComponentList;
    tagInstanceToRequestId: Record<string, any>;

    addComponent(tagInstance: LotusHTMLElement, functionConstructor): void;

    createComponent(tagInstance: LotusHTMLElement): void;

    mapComponent(tagName: string, prototype: HTMLElement, functionConstructor: Function, framework: IXtag): void;
}
