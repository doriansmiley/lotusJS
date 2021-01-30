import {Component} from '../../view/functional/AbstractComponent';

// interface definitions
export interface TagDefinition {
    inserted?: (component: Component) => void;
    removed?: (component: Component) => void;
    constructed?: (isSsr: boolean) => void;
    template?: HTMLTemplateElement;
    tagName: string;
    tagFunction: () => Component;
    parameters?: any;
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
    } else if (!tagDef.template) {
        throw ('templateUrl or template must defined. They can not both be blank.');
    };
    tagDefsByTagName.set(tagDef.tagName, tagDef);
    const wrapper = class Wrapper extends HTMLElement {
        public component: Component;

        constructor () {
            // Always call super first in constructor
            super();
            const shadowRoot = document.querySelector(tagDef.tagName)?.shadowRoot;
            const isSsr = !!document.querySelector(tagDef.tagName)?.shadowRoot;
            // constructed has to be called before the component is inserted
            if (tagDef.constructed) {
                tagDef.constructed(isSsr);
            }
            // Create a shadow root
            const shadow = shadowRoot || this.attachShadow({mode: mode});
            // create our component
            const component: Component = tagDef.tagFunction();
            // TODO if SSR see if we can skip this step for ssr, this takes time to perform
            const clone = document.importNode(tagDef.template.content, true);
            component.element = isSsr ? shadowRoot.querySelector('[data-component-root="root"]') : clone.querySelector('[data-component-root="root"]');
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const styles = [...tagDef.template.content.childNodes].find((child: Node) => {
                if (child.nodeType === Node.TEXT_NODE) {
                    return false;
                }
                return (child as HTMLElement).tagName.toLowerCase() === 'style';
            });
            if (!componentsByTagName.get(tagDef.tagName)) {
                componentsByTagName.set(tagDef.tagName, []);
            }
            // store the component instances by tag name so an observer can assign mediators
            // for a surrounding application
            componentsByTagName.get(tagDef.tagName).push(component);
            const renderedComponent = component.render([], isSsr);
            // TODO add lifecycle hooks
            // Attach the created elements to the shadow dom if it hasn't been rendered server side
            if (!isSsr && styles) {
                const style = document.createElement('style');
                style.textContent = styles.textContent;
                shadow.appendChild(style);
            }
            shadow.appendChild(renderedComponent);
            this.component = component;
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

