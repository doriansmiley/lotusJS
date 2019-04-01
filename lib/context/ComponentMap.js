"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lavender = require("lavenderjs/lib");
const ComponentList_1 = require("./ComponentList");
/**
 * Created by dsmiley on 7/25/17.
 */
class ComponentMap {
    constructor(context) {
        this.context = context;
        this.componentInstances = new ComponentList_1.ComponentList();
        this.tagInstanceToRequestId = {};
    }
    success(result) {
        let tagInstance = this.tagInstanceToRequestId[result.requestId];
        let div = document.createElement('div');
        div.innerHTML = result.resultObj;
        //clone the contents
        let clone = document.importNode(div.childNodes[0].content, true);
        //select the root component node
        let component = clone.querySelector(tagInstance.getAttribute('data-component-root'));
        component.lotusComponentInstance = tagInstance.lotusComponentInstance;
        //create a shadow host from the tag instance and append the clone to it
        let host = tagInstance.createShadowRoot();
        host.appendChild(clone);
        //transfer data-attribute instance onto the component
        for (let i = 0; i < tagInstance.attributes.length; i++) {
            let attribute = tagInstance.attributes[i];
            if (attribute.name.indexOf('attribute') >= 0) {
                component.setAttribute(attribute.name, attribute.value);
            }
        }
        //pass along the root component node to the view component
        this.createComponent(component);
        //Scope styles to the tag. This appends the tag's nodeName to all styles to simulate DOM encapsulation, however it will not shield the shadowDOM from selectors in the lightDOM. This is not possible with pollyfills at this time.
        //Note window.WebComponents is added by bower web components core. shimStyling is used by polyfills
        if (window['WebComponents'] && window['WebComponents'].ShadowCSS) {
            window['WebComponents'].ShadowCSS.shimStyling(host, tagInstance.nodeName);
        }
    }
    fault(fault) {
        console.log(fault);
        throw new Error('Could not load template. Please check you defined the correct path.');
    }
    onProgress(progress) {
    }
    //stub for override in LotusJS-MVW
    mapMediators(tagInstance) {
    }
    addComponent(tagInstance, functionConstructor) {
        // fired once at the time a component
        // is initially created or parsed
        if (tagInstance.lotusComponentInstance === null || tagInstance.lotusComponentInstance === undefined) {
            tagInstance.lotusComponentInstance = new functionConstructor();
            this.componentInstances.addItem(tagInstance.lotusComponentInstance);
        }
        //trigger mediator assignment if any
        this.mapMediators(tagInstance);
        //if the tag instance defines a scr attribute load the template and set up the shadow DOM
        let src = tagInstance.getAttribute('data-template-url');
        if (src !== null && src !== undefined) {
            let httpService = new Lavender.XhrHttpService();
            httpService.addResponder(this);
            httpService.send('GET', src, null, 'text/html', 'text', true);
            this.tagInstanceToRequestId[httpService.requestId] = tagInstance;
            return;
        }
        this.createComponent(tagInstance);
    }
    createComponent(tagInstance) {
        tagInstance.lotusComponentInstance.created(tagInstance);
    }
    mapComponent(tagName, prototype, functionConstructor, framework) {
        if (!framework) {
            framework = xtag;
        }
        let componentMap = this;
        let lifecycle = {
            created: function () {
                //IMPORTANT:, use builder patter here and create an add component function
                componentMap.addComponent(this, functionConstructor);
            },
            inserted: function () {
                // fired each time a component
                // is inserted into the DOM
                this.lotusComponentInstance.inserted(this);
            },
            removed: function () {
                // fired each time an element
                // is removed from DOM
                this.lotusComponentInstance.removed(this);
            },
            attributeChanged: function (attrName, oldValue, newValue) {
                // fired when attributes are set
                this.lotusComponentInstance.attributeChanged(this);
            }
        };
        let definition = {
            // extend existing elements
            prototype: prototype,
            lifecycle: lifecycle
        };
        framework.register(tagName, definition);
    }
}
exports.ComponentMap = ComponentMap;
//# sourceMappingURL=ComponentMap.js.map