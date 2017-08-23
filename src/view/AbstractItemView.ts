import {IComponent} from "./IComponent";
import {Subject} from '../../node_modules/lavenderjs/lib';
import {IEventDispatcher} from '../../node_modules/lavenderjs/lib';
import {EventDispatcher} from '../../node_modules/lavenderjs/lib';
import {IEvent} from '../../node_modules/lavenderjs/lib';
import {ObjectUtils} from '../../node_modules/lavenderjs/lib';
import {IContext} from "../context/IContext";
import {SkinPartList} from "./SkinPartList";
import {LotusHTMLElement} from "../context/LotusHTMLElement";
import {ComponentEvent} from "../control/events/ComponentEvent";
import {AbstractComponent} from "./AbstractComponent";
/**
 * Created by dsmiley on 8/4/17.
 */
export abstract class AbstractItemView extends AbstractComponent{

    private _model:Object;

    constructor(){
        super();
    }

    get model():Object {
        return this._model;
    }

    set model(val:Object) {
        this._model = val;
        this.notify(val, 'model');
    }

    public setElementDisplay(element:HTMLElement, display:string):void{
        //at some points in the items lifecycle element could be null, se we require this check
        if( element !== null && element !== undefined ){
            element.style.display = display;
        }
    }

    //stub for override
    public resetState():void{

    }

    public destroy():void{
        super.destroy();
        this.model = null;
    }
}