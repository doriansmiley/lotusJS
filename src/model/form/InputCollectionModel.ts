/**
 * Created by dsmiley on 10/10/17.
 */
import * as Lavender from 'lavenderjs/lib';
import {InputModel} from "./InputModel";
import {IValidator} from "./validation/IValidator";

export class InputCollectionModel extends Lavender.Subject{
    public static TYPE_INPUT:number = 0;
    public static TYPE_LIST:number = 1;
    public static TYPE_RADIO_GROUP:number = 2;
    public static TYPE_FILE:number =3;

    public selectionRequired:boolean = false;

    private _type:number;
    private _collection:Lavender.ArrayList;
    private _isValid:boolean = false;
    private _validators:Lavender.ArrayList;
    private _errors:Lavender.ArrayList;

    constructor(type:number, collection:Lavender.ArrayList, selectionRequired:boolean = false){
        super();
        this.type = type;
        this.collection = collection;
        this.selectionRequired = selectionRequired;
    }


    get errors():Lavender.ArrayList {
        return this._errors;
    }

    set errors(value:Lavender.ArrayList) {
        this._errors = value;
        this.notify(value, 'errors');
    }

    get validators():Lavender.ArrayList {
        return this._validators;
    }

    set validators(value:Lavender.ArrayList) {
        this._validators = value;
        this.notify(value, 'validators');
        this.setUpBindings();
    }

    get isValid():boolean {
        return this._isValid;
    }

    set isValid(value:boolean) {
        this._isValid = value;
        this.notify(value, "isValid");
    }

    get type():number {
        return this._type;
    }

    set type(value:number) {
        this._type = value;
        this.notify(value, 'type');
    }

    get collection():Lavender.ArrayList {
        return this._collection;
    }

    set collection(value:Lavender.ArrayList) {
        this._collection = value;
        this.notify(value, 'collection');
    }

    public setUpBindings():void{
        for(let i=0; i<this.validators.length; i++){
            this.binder.bind(this.validators.getItemAt(i), 'isValid', this, 'validate');
        }
    }

    public validate(value?:boolean):Lavender.ArrayList{
        this.errors = new Lavender.ArrayList();
        for(let i=0; i<this.validators.length; i++){
            let validator:IValidator = (this.validators.getItemAt(i) as IValidator);
            if(!validator.validate()){
                this.errors.addAll(validator.errors.source());
            }
        }
        this.isValid = this.errors.length == 0;
        //return the failed results
        return this.errors;
    }

    public clear():void{
        //reset all form fields by clearing InputModel values
        for(let i=0; i<this.collection.length; i++){
            let item:InputModel = this.collection.getItemAt(i) as InputModel;
            switch(this.type){
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

    public destroy():void{
        this.binder.unbindAll();
        this.binder = null;
        this.collection = null;

    }
}