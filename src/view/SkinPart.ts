/**
 * Created by dsmiley on 8/1/17.
 */
import {Subject} from 'lavenderjs/lib';
import {AbstractComponent} from "./AbstractComponent";

export class SkinPart extends Subject{

    private _label:string;
    private _attribute:string;
    private _instance:AbstractComponent;

    constructor(label:string, instance:AbstractComponent, attribute:string){
        super();
        this._label = label;
        this._instance = instance;
        this._attribute = attribute;
    }

    get label():string{
        return this._label;
    }

    get element():HTMLElement{
        return this._instance[this._attribute] as HTMLElement;
    }
    set element(val:HTMLElement){
        this._instance[this._attribute] = val;
        this.notify( val, 'element' );
    }
}