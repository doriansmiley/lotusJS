import axios from 'axios';
import {Component} from '../../view/functional/AbstractComponent';

// interface definitions
export interface TagDefinition {
    inserted?: (component: Component) => void;
    removed?: (component: Component) => void;
    template?: HTMLTemplateElement;
    tagName: string;
    tagFunction: () => Component;
    parameters?: any;
    templateUrl?: string;
}
// private properties
const componentsByTagName = new Map<string, Array<Component>>();
// public function
export const register = async (tagDef: TagDefinition, mode: ShadowRootMode = 'open'): Promise<void> => {
    if (!customElements) {
        throw new Error('Custom elements is not supported by your browser!');
    }
    if (tagDef.templateUrl) {
        const response = await axios({
            method: 'GET',
            url: tagDef.templateUrl,
            responseType: 'document'
        });
        const template: HTMLTemplateElement = document.createElement('template');
        template.outerHTML = response.data;
        if (!tagDef.template.content) {
            throw (`Failed to create template from\n${response.data}`);
        }
        tagDef.template = template;
    } else if (!tagDef.template) {
        throw ('templateUrl or template must defined. They can not both be blank.');
    };
    const wrapper = class Wrapper extends HTMLElement {
        public component: Component;

        constructor () {
            // Always call super first in constructor
            super();
            // Create a shadow root
            const shadow = this.attachShadow({mode: mode});
            // create our component
            const component: Component = tagDef.tagFunction();
            const clone = document.importNode(tagDef.template.content, true);
            component.element = clone.querySelector('[data-component-root="root"]');
            if (!componentsByTagName.get(tagDef.tagName)) {
                componentsByTagName.set(tagDef.tagName, []);
            }
            // store the component instances by tag name so an observer can assign mediators
            // for a surrounding application
            componentsByTagName.get(tagDef.tagName).push(component);
            const renderedComponent = component.render();
            // TODO add lifecycle hooks
            // Attach the created elements to the shadow dom
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
        }
    };
    customElements.define(tagDef.tagName, wrapper);
};
// this function is used by the surrounding application to mediate component instances
// generally a mediator map of some kind is created that will iterate over all registered
// tag name, retrieve the component instance for this function, and pass to the registered mediator constructor
// or function. A mediator map calls a function or constructor for every instance of a tag
// found in the DOM.. For example map('lotus-button', createButtonMediator). This map function
// would use getComponents to get all the component instances which it would then iterate over
// and call createButtonMediator(component). This function is also called by collection components
// such as image galleries or data grids. Passing the optional parent param allows collections
// to get all child component instances to assign event listeners etc.
export const getComponents = (tagName: string, parent?: HTMLElement): Array<Component> => {
    return componentsByTagName.get(tagName).filter((component) => (parent) ? parent.contains(component.element) : true);
};

