import {IComponent} from "../view/IComponent";
/**
 * Created by dsmiley on 7/26/17.
 */
export class LotusHTMLElement extends HTMLDivElement{
    public lotusComponentInstance: IComponent;

    constructor(){
        super();
    }

    public createShadowRoot(): Element{
        return super['createShadowRoot']();
    }

    public getComponentInstance(): IComponent{
        return this.lotusComponentInstance;
    }
}