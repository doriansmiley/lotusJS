import {ContextInterface} from "./ContextInterface";
import {ComponentListInterface} from "./ComponentListInterface";
import * as Lavender from 'lavenderjs/lib';
import {IXtag} from "./xtag";
import {LotusHTMLElement} from "./LotusHTMLElement";

/**
 * Created by dsmiley on 7/26/17.
 */
export interface ComponentMapInterface extends Lavender.IResponder {
    context: ContextInterface;
    componentInstances: ComponentListInterface;
    tagInstanceToRequestId: Record<string, any>;

    addComponent(tagInstance: LotusHTMLElement, functionConstructor): void;

    createComponent(tagInstance: LotusHTMLElement): void;

    mapComponent(tagName: string, prototype: HTMLElement, functionConstructor: Function, framework: IXtag): void;
}
