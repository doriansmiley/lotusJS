import {Component} from '../../view/functional/AbstractComponent';

// interface definitions
export interface TagDefinition {
    inserted?: (component: Component) => void;
    removed?: (component: Component) => void;
    constructed?: () => void;
    loadData?: () => unknown[] | Promise<unknown[]>;
    template?: HTMLTemplateElement;
    tagName: string;
    tagFunction: () => Component;
    parameters?: unknown;
    templateUrl?: string;
}
// private properties
const componentsByTagName = new Map<string, Array<Component>>();
const tagDefsByTagName = new Map<string, TagDefinition>();

// public function
export const register = async (tagDef: TagDefinition, mode: ShadowRootMode = 'open'): Promise<void> => {
    if (!customElements) {
        throw new Error('Custom elements is not supported by your browser!');
    }
    if (tagDef.templateUrl) {
        const response = await fetch(tagDef.templateUrl);
        const div = document.createElement('div');
        div.innerHTML = await response.text();
        tagDef.template = div.firstChild as HTMLTemplateElement;
        if (!tagDef.template.content) {
            throw (`Failed to create template from\n${div.innerHTML}`);
        }
    }
    tagDefsByTagName.set(tagDef.tagName, tagDef);
    // the SSR engine should expose a data function in the document head
    // which should contain the deserialized data
    // placing the serialized data in the head ensures is parsed before we get here
    // this data should be populated with a nodejs data loading function
    // see our SSR demo for a sample implementation
    // if data has not been retrieved with a node data loader call the loadData method
    if (globalThis[`data-${tagDef.tagName}`] && typeof globalThis[`data-${tagDef.tagName}`] === 'function') {
        console.log('using data loaded from the server');
        globalThis[`data-${tagDef.tagName}`] = window[`data-${tagDef.tagName}`]();
    }
    else if (!globalThis[`data-${tagDef.tagName}`] && tagDef.loadData) {
        console.log('loading data with the tags data loader function');
        globalThis[`data-${tagDef.tagName}`] = await tagDef.loadData();
    }

    const wrapper = class Wrapper extends HTMLElement {
        public component: Component;
        private hydrate = true;

        constructor () {
            // Always call super first in constructor
            super();
            // Create a shadow root if we have not rendered one already server side
            const shadowRoot = this.shadowRoot || this.attachShadow({mode: mode});
            // create our component
            this.component = tagDef.tagFunction();
            if (!componentsByTagName.get(tagDef.tagName)) {
                componentsByTagName.set(tagDef.tagName, []);
            }
            // store the component instances by tag name so an observer can assign mediators
            // for a surrounding application
            componentsByTagName.get(tagDef.tagName).push(this.component);
            // we are not rendering child view currently with a custom element. This is a bug
            // doe some reason when I clone a custom element in addChildView the custom element is dropped
            // so we have to check hydrate && shadowRoot or item views will through an error as shadowRoot is undefined
            this.component.element = shadowRoot.querySelector('[data-component-root="root"]');
            if (!this.component.element) {
                // we have not rendered this component on the server
                this.hydrate = false;
                // if a tag def template is supplied import the node, else use the shadow root.
                // This allows for inline elements.
                const clone = tagDef.template ? document.importNode(tagDef.template.content, true)
                    : document.importNode(this.querySelector('template').content, true);
                const styles = Array.from(clone.childNodes).find((child: Node) => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        return false;
                    }
                    return (child as HTMLElement).tagName.toLowerCase() === 'style';
                });
                // Attach the created elements to the shadow dom if it hasn't been rendered server side
                if (styles) {
                    const style = document.createElement('style');
                    style.textContent = styles.textContent;
                    shadowRoot.appendChild(style);
                }
                // set the element for the component to the newly created clone
                this.component.element = clone.querySelector('[data-component-root="root"]');
                // on the initial page load hydrate is true if the component was pre-rendered server side
                const renderedComponent = this.component.render(globalThis[`data-${tagDef.tagName}`], this.hydrate);
                shadowRoot.appendChild(renderedComponent);
            } else {
                // do not replace the component element, use what's already in the document
                this.component.render(globalThis[`data-${tagDef.tagName}`], this.hydrate);
            }
            console.log(`constructed component: ${tagDef.tagName}`);
            if (tagDef.constructed) {
                tagDef.constructed();
            }
        }

        connectedCallback () {
            console.log(`tag ${tagDef.tagName} inserted`);
            tagDef.inserted(this.component);
        }

        disconnectedCallback () {
            console.log(`tag ${tagDef.tagName} removed`);
            // remove the component instance
            const index = componentsByTagName.get(tagDef.tagName).findIndex((instance) => instance === this.component);
            componentsByTagName.get(tagDef.tagName).splice(index, 1);
            // destroy the component, this removes event listeners etc
            this.component.destroy(true);
            tagDef.removed(this.component);
            tagDef.template = null;
        }
    };
    customElements.define(tagDef.tagName, wrapper);
};

export const getTagDef = (tagName: string): TagDefinition => {
    return tagDefsByTagName.get(tagName);
};

