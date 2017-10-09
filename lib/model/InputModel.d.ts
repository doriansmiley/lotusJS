/**
 * Created by dsmiley on 10/5/17.
 */
import * as Lavender from 'lavenderjs/lib';
export declare class InputModel extends Lavender.Subject {
    private _label;
    private _value;
    private _name;
    private _selected;
    private _type;
    private _required;
    format: (value: string) => string;
    validate: (value: string) => boolean;
    constructor(label?: string, value?: string, name?: string, selected?: boolean);
    label: string;
    value: string;
    name: string;
    selected: boolean;
    type: string;
    required: boolean;
}
