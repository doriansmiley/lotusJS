"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 7/26/17.
 */
class LotusHTMLElement extends HTMLDivElement {
    constructor() {
        super();
    }
    createShadowRoot() {
        return super['createShadowRoot']();
    }
    getComponentInstance() {
        return this.lotusComponentInstance;
    }
}
exports.LotusHTMLElement = LotusHTMLElement;
//# sourceMappingURL=LotusHTMLElement.js.map