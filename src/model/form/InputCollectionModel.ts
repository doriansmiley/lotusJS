/**
 * Created by dsmiley on 10/10/17.
 */
import * as Lavender from 'lavenderjs/lib';
import {InputModel} from './InputModel';
import {Validator} from './validation/Validator';

export class InputCollectionModel extends Lavender.Subject {
    public static TYPE_INPUT = 0;
    public static TYPE_LIST = 1;
    public static TYPE_RADIO_GROUP = 2;
    public static TYPE_FILE =3;

    public selectionRequired = false;

    private _type: number;
    private _collection: Lavender.ArrayList;
    private _isValid = false;
    private _validators: Lavender.ArrayList;
    private _errors: Lavender.ArrayList;
    private _label: string;

    constructor(type: number, collection: Lavender.ArrayList, selectionRequired = false, validators: Lavender.ArrayList = new Lavender.ArrayList()) {
        super();
        this.type = type;
        this.collection = collection;
        this.selectionRequired = selectionRequired;
        this.validators = validators;
        this.setUpBindings();
    }


    get label(): string {
        return this._label;
    }

    set label(value: string) {
        this._label = value;
        this.notify(value, 'label');
    }

    get errors(): Lavender.ArrayList {
        return this._errors;
    }

    set errors(value: Lavender.ArrayList) {
        this._errors = value;
        this.notify(value, 'errors');
    }

    get validators(): Lavender.ArrayList {
        return this._validators;
    }

    set validators(value: Lavender.ArrayList) {
        this._validators = value;
        this.notify(value, 'validators');
        this.setUpBindings();
        this.addEventListeners();
    }

    get isValid(): boolean {
        return this._isValid;
    }

    set isValid(value: boolean) {
        this._isValid = value;
        this.notify(value, 'isValid');
    }

    get type(): number {
        return this._type;
    }

    set type(value: number) {
        this._type = value;
        this.notify(value, 'type');
    }

    get collection(): Lavender.ArrayList {
        return this._collection;
    }

    set collection(value: Lavender.ArrayList) {
        this._collection = value;
        this.notify(value, 'collection');
    }

    protected addEventListeners(): void{
        if (!this.validators) {
            return;
        }
        this.validators.addEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'setUpBindings');
    }

    protected removeEventListeners(): void{
        if (!this.validators) {
            return;
        }
        if (this.validators) {
            this.validators.addEventListener(Lavender.CollectionEvent.COLLECTION_CHANGE, this, 'setUpBindings');
        }
    }

    public setUpBindings(): void{
        if (!this.binder || !this.validators) {
            return;
        }
        this.binder.unbindAll();
        for (let i=0; i<this.validators.length; i++) {
            this.binder.bind(this.validators.getItemAt(i), 'isValid', this, 'validate');
        }
        this.validate();
    }

    public validate(value?: boolean): Lavender.ArrayList {
        this.errors = new Lavender.ArrayList();
        for (let i=0; i<this.validators.length; i++) {
            const validator: Validator = (this.validators.getItemAt(i) as Validator);
            if (!validator.isValid) {
                this.errors.addAll(validator.errors.source());
            }
        }
        this.isValid = this.errors.length == 0;
        //return the failed results
        return this.errors;
    }

    public clear(): void{
        //reset all form fields by clearing InputModel values
        for (let i=0; i<this.collection.length; i++) {
            const item: InputModel = this.collection.getItemAt(i) as InputModel;
            switch (this.type) {
                case InputCollectionModel.TYPE_INPUT:
                    item.value = '';
                    break;
                case InputCollectionModel.TYPE_FILE:
                    //TODO: fogure out how to reset file collection view using model. Probably need a ne wmodel attribute
                    break;
                case InputCollectionModel.TYPE_RADIO_GROUP:
                case InputCollectionModel.TYPE_LIST:
                    item.selected = false
                    break;
            }
        }
    }

    public destroy(): void{
        if (this.binder) {
            this.binder.unbindAll();
        }
        this.removeEventListeners();
        this.binder = null;
        this.collection = null;
        this.validators = null;
        this.errors = null;

    }
}
