/**
 * Created by dsmiley on 10/5/17.
 */
import * as Lavender from 'lavenderjs/lib';
export declare class InputModel extends Lavender.Subject {
    private _label;
    private _value;
    private _name;
    private _selected;
    private _required;
    format: (value: string) => string;
    isValid: (value: string) => boolean;
    constructor(label?: string, value?: string, name?: string, selected?: boolean, required?: boolean);
    label: string;
    value: string;
    name: string;
    selected: boolean;
    required: boolean;
    validate(): boolean;
}
