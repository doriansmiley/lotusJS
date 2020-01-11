import {LotusHTMLElement} from '../LotusHTMLElement';

export interface TagDefinition {
    created?: Function;
    inserted?: Function;
    removed?: Function;
    attributeChanged?: (attrName: string, oldValue: any, newValue: any) => void;
    base: HTMLElement;
    tagName: string;
    tagFunction: Function;
    parameters?: any;
}

export interface ComponentRegistry {
    register(tagDef: TagDefinition): Promise<LotusHTMLElement>;
}

export function getRegistry (): ComponentRegistry {
    // Object.assign(Object.create(HTMLButtonElement.prototype), {'one': 1, 'a': 'a'})
    /*
    * {
        // extend existing elements
        prototype: prototype,
        lifecycle:lifecycle
    }
    * */
    return {
        async register (tagDef: TagDefinition): Promise<LotusHTMLElement> {
            // TODO: implement
            if (!customElements) {
                throw new Error('Custom elements is not supported by your browser!');
            }
            // all Lotus components are autonomous components (IE they do not extend built in ones)
            // this is mainly due to browser compatibility issues, however you can extend HTML components
            // it you alter the inheritance chain and mixin Lotus base classes
            customElements.define(tagDef.tagName, tagDef.tagFunction);
            // Object.create(Object.assign(Object.create(HTMLButtonElement), {'one': 1, 'a': 'a'}))
            // eslint-disable-next-line no-unused-vars
            const lotusFunctionComposite = Object.assign(Object.create(tagDef.base['prototype']), tagDef.tagFunction(tagDef.parameters));
            // TODO Create factory to wrap a component in a web component class and attach lifecycle hooks
            // TODO: https://github.com/hybridsjs/hybrids/blob/master/src/define.js and https://github.com/hybridsjs/hybrids
            // register the component with the browser's customElements ComponentRegistry
            // Load the skin
            // Create shadow root and assign attributes to cloned node
            // call tagInstance.lotusComponentInstance.created(tagInstance);
            // return the LotusHTMLElement tagInstance to be used downstream by mediator maps etc
            return null;
        }
    };
};
