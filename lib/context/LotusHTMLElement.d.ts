import { IComponent } from "../view/IComponent";
/**
 * Created by dsmiley on 7/26/17.
 */
export declare class LotusHTMLElement extends HTMLElement {
    lotusComponentInstance: IComponent;
    createShadowRoot(): Element;
}
