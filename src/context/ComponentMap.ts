import {IContext} from "./IContext";
import {IComponentList} from "./IComponentList";
import * as Lavender from 'lavenderjs/lib';
import {IXtag, IDefinition, ILifecycle} from "./xtag";
import {ComponentMapInterface} from "./ComponentMapInterface";
import {ComponentList} from "./ComponentList";
import {LotusHTMLElement} from "./LotusHTMLElement";

declare let xtag: IXtag;

/**
 * Created by dsmiley on 7/25/17.
 */
export class ComponentMap implements ComponentMapInterface {
    public context: IContext;
    public componentInstances: IComponentList;
    public tagInstanceToRequestId: Record<string, LotusHTMLElement>;

    constructor(context: IContext) {
        this.context = context;
        this.componentInstances = new ComponentList();
        this.tagInstanceToRequestId = {};
    }

    public success(result: Lavender.IResult): void {
        const tagInstance: LotusHTMLElement = this.tagInstanceToRequestId[result.requestId];
        const div: HTMLDivElement = document.createElement('div');
        div.innerHTML = result.resultObj as string;
        //clone the contents
        const clone: DocumentFragment = document.importNode((div.childNodes[0] as HTMLTemplateElement).content, true) as DocumentFragment;
        //select the root component node
        const component: LotusHTMLElement = clone.querySelector(tagInstance.getAttribute('data-component-root')) as LotusHTMLElement;
        component.lotusComponentInstance = tagInstance.lotusComponentInstance;
        //create a shadow host from the tag instance and append the clone to it
        const host: Element = tagInstance.createShadowRoot();
        host.appendChild(clone);
        //transfer data-attribute instance onto the component
        for (let i = 0; i < tagInstance.attributes.length; i++) {
            const attribute = tagInstance.attributes[i];
            if (attribute.name.indexOf('attribute') >= 0) {
                component.setAttribute(attribute.name, attribute.value)
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

    public fault(fault: Lavender.IFault): void {
        console.log(fault);
        throw new Error('Could not load template. Please check you defined the correct path.');
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onProgress(progress: number): void {
    }

    //stub for override in LotusJS-MVW
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected mapMediators(tagInstance: LotusHTMLElement): void {

    }

    public addComponent(tagInstance: LotusHTMLElement, functionConstructor): void {
        // fired once at the time a component
        // is initially created or parsed
        if (tagInstance.lotusComponentInstance === null || tagInstance.lotusComponentInstance === undefined) {
            tagInstance.lotusComponentInstance = new functionConstructor();
            this.componentInstances.addItem(tagInstance.lotusComponentInstance);
        }
        //trigger mediator assignment if any
        this.mapMediators(tagInstance)
        //if the tag instance defines a scr attribute load the template and set up the shadow DOM
        const src: string = tagInstance.getAttribute('data-template-url');
        if (src !== null && src !== undefined) {
            const httpService = new Lavender.XhrHttpService();
            httpService.addResponder(this);
            httpService.send(
                'GET',
                src,
                null,
                'text/html',
                'text',
                true);
            this.tagInstanceToRequestId[httpService.requestId] = tagInstance;
            return;
        }
        this.createComponent(tagInstance);
    }

    public createComponent(tagInstance: LotusHTMLElement): void {
        tagInstance.lotusComponentInstance.created(tagInstance);
    }

    public mapComponent(tagName: string, prototype: HTMLElement, functionConstructor: Function, framework: IXtag): void {
        if (!framework) {
            framework = xtag;
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const componentMap: ComponentMapInterface = this;
        const lifecycle: ILifecycle = {
            created: function () {
                //IMPORTANT:, use builder patter here and create an add component function
                componentMap.addComponent(this as LotusHTMLElement, functionConstructor);
            },
            inserted: function () {
                // fired each time a component
                // is inserted into the DOM
                (this as LotusHTMLElement).lotusComponentInstance.inserted(this as LotusHTMLElement);
            },
            removed: function () {
                // fired each time an element
                // is removed from DOM
                (this as LotusHTMLElement).lotusComponentInstance.removed(this as LotusHTMLElement);
            },
            attributeChanged: function (attrName: string, oldValue: any, newValue: any) {
                // fired when attributes are set
                (this as LotusHTMLElement).lotusComponentInstance.attributeChanged(this as LotusHTMLElement);
            }
        } as ILifecycle;
        const definition: IDefinition = {
            // extend existing elements
            prototype: prototype,
            lifecycle: lifecycle
        } as IDefinition;
        framework.register(tagName, definition);
    }
}
