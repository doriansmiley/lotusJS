import {IComponent} from "../view/IComponent";
/**
 * Created by dsmiley on 7/26/17.
 */
export class LotusHTMLElement extends HTMLElement{
    public lotusComponentInstance:IComponent;

    public createShadowRoot():Element{
        return null;
    }
}