import {IContext} from "./IContext";
import {IComponentList} from "./IComponentList";
import {IResult} from 'lavenderjs/lib';
import {IFault} from 'lavenderjs/lib';
import {XhrHttpService} from 'lavenderjs/lib';
import {IXtag, IDefinition, ILifecycle} from "../../custom_definitions/xtag";
import {IComponentMap} from "./IComponentMap";
import {ComponentList} from "./ComponentList";
import {LotusHTMLElement} from "./LotusHTMLElement";

declare var xtag:IXtag;

/**
 * Created by dsmiley on 7/25/17.
 */
export class ComponentMap implements IComponentMap{
    public context:IContext;
    public componentInstances:IComponentList;
    public tagInstanceToRequestId:Object;

    constructor(context:IContext){
        this.context = context;
        this.componentInstances = new ComponentList();
        this.tagInstanceToRequestId = {};
    }
    
    public success(result:IResult):void{
        let tagInstance:LotusHTMLElement = this.tagInstanceToRequestId[result.requestId];
        let div:HTMLDivElement = document.createElement('div');
        div.innerHTML = result.resultObj as string;
        //clone the contents
        let clone:DocumentFragment = document.importNode((div.childNodes[0] as HTMLTemplateElement).content, true) as DocumentFragment;
        //select the root component node
        let component:LotusHTMLElement = clone.querySelector(tagInstance.getAttribute('data-component-root')) as LotusHTMLElement;
        component.lotusComponentInstance = tagInstance.lotusComponentInstance;
        //create a shadow host from the tag instance and append the clone to it
        let host:Element = tagInstance.createShadowRoot();
        host.appendChild(clone);
        //pass along the root component node to the view component
        this.createComponent(component);
        //Scope styles to the tag. This appends the tag's nodeName to all styles to simulate DOM encapsulation, however it will not shield the shadowDOM from selectors in the lightDOM. This is not possible with pollyfills at this time.
        //Note window.WebComponents is added by bower web components core. shimStyling is used by polyfills
        if( window['WebComponents'] && window['WebComponents'].ShadowCSS ){
            window['WebComponents'].ShadowCSS.shimStyling(host,tagInstance.nodeName);
        }
    }

    public fault(fault:IFault):void{
        console.log(fault);
        throw new Error('Could not load template. Please check you defined the correct path.');
    }

    public onProgress(progress:number):void{

    }

    public addComponent(tagInstance:LotusHTMLElement, functionConstructor):void{
        // fired once at the time a component
        // is initially created or parsed
        if( tagInstance.lotusComponentInstance === null || tagInstance.lotusComponentInstance === undefined ){
            tagInstance.lotusComponentInstance  = new functionConstructor();
            this.componentInstances.addItem(tagInstance.lotusComponentInstance);
        }
        //trigger mediator assignment if any
        this.context.mediatorMap.apply(tagInstance.tagName.toLowerCase(), tagInstance.lotusComponentInstance);
        //if the tag instance defines a scr attribute load the template and set up the shadow DOM
        let src:string = tagInstance.getAttribute('data-template-url');
        if( src !== null && src !== undefined ){
            let httpService = new XhrHttpService();
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

    public createComponent(tagInstance:LotusHTMLElement):void{
        tagInstance.lotusComponentInstance.created(tagInstance);
    }

    public mapComponent(tagName:string, prototype:HTMLElement, functionConstructor:Function, framework:IXtag):void{
        if(!framework){
            framework = xtag;
        }
        let componentMap:IComponentMap = this;
        let lifecycle:ILifecycle = {
            created: function(){
                //IMPORTANT:, use builder patter here and create an add component function
                componentMap.addComponent(this as LotusHTMLElement, functionConstructor);
            },
            inserted: function(){
                // fired each time a component
                // is inserted into the DOM
                (this as LotusHTMLElement).lotusComponentInstance.inserted(this as LotusHTMLElement);
            },
            removed: function(){
                // fired each time an element
                // is removed from DOM
                (this as LotusHTMLElement).lotusComponentInstance.removed(this as LotusHTMLElement);
            },
            attributeChanged: function(attrName: string, oldValue: any, newValue: any){
                // fired when attributes are set
                (this as LotusHTMLElement).lotusComponentInstance.attributeChanged(this as LotusHTMLElement);
            }
        } as ILifecycle;
        let definition:IDefinition = {
            // extend existing elements
            prototype: prototype,
            lifecycle:lifecycle
        } as IDefinition;
        framework.register(tagName, definition);
    }
}