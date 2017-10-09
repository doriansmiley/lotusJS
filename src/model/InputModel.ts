/**
 * Created by dsmiley on 10/5/17.
 */
import * as Lavender from 'lavenderjs/lib';

export class InputModel extends Lavender.Subject{
    private _label:string;
    private _value:string;
    private _name:string;
    private _selected:boolean = false;
    private _type:string;
    private _required:boolean = false;

    public format:(value:string) => string;
    public validate:(value:string) => boolean;

    constructor(label?:string, value?:string, name?:string, selected?:boolean){
        super();
        this.label = label;
        this.value = value;
        this.name = name;
        this.selected = selected;
    }

    get label():string {
        return this._label;
    }

    set label(value:string) {
        this._label = value;
        this.notify(value, 'label');
    }

    get value():string {
        return this._value;
    }

    set value(value:string) {
        this._value = value;
        this.notify(value, 'value');
    }

    get name():string {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
        this.notify(value, 'name');
    }

    get selected():boolean {
        return this._selected;
    }

    set selected(value:boolean) {
        this._selected = value;
        this.notify(value, 'selected');
    }

    get type():string {
        return this._type;
    }

    set type(value:string) {
        this._type = value;
        this.notify(value, 'type');
    }

    get required():boolean {
        return this._required;
    }

    set required(value:boolean) {
        this._required = value;
        this.notify(value, 'required');
    }
}