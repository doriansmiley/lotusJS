import axios from 'axios';
import {Component} from '../../view/functional/AbstractComponent';

export interface TagDefinition {
    created?: Function;
    inserted?: Function;
    removed?: Function;
    attributeChanged?: (attrName: string, oldValue: any, newValue: any) => void;
    template?: HTMLTemplateElement;
    tagName: string;
    tagFunction: () => Component;
    parameters?: any;
    templateUrl?: string;
}

export const register = async (tagDef: TagDefinition): Promise<void> => {
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
        constructor () {
            // Always call super first in constructor
            super();
            // Create a shadow root
            const shadow = this.attachShadow({mode: 'open'});
            // create our component
            const component: Component = tagDef.tagFunction();
            const clone = document.importNode(tagDef.template.content, true);
            component.element = clone.querySelector('[data-component-root="root"]');
            const renderedComponent = component.render();
            // TODO add lifecycle hooks
            // Attach the created elements to the shadow dom
            shadow.appendChild(renderedComponent);
        }
    };
    customElements.define(tagDef.tagName, wrapper);
};
