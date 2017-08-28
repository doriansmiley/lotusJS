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