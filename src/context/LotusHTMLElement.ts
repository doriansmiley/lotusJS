import {Component} from '../view/Component';
/**
 * Created by dsmiley on 7/26/17.
 */
export class LotusHTMLElement extends HTMLDivElement {
    public lotusComponentInstance: Component;

    constructor() {
        super();
    }

    public createShadowRoot(): Element {
        return super['createShadowRoot']();
    }

    public getComponentInstance(): Component {
        return this.lotusComponentInstance;
    }
}
