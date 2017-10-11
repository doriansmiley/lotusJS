import {IValidator} from "./IValidator";
import * as Lavender from 'lavenderjs/lib';
import {InputCollectionModel} from "../InputCollectionModel";
/**
 * Created by dsmiley on 10/10/17.
 */

export class AbstractValidator extends Lavender.Subject implements IValidator{

    private _errors:Lavender.ArrayList;
    private _warnings:Lavender.ArrayList;
    private _source:InputCollectionModel;
    private _isValid:boolean = false;
    private _hasWarnings:boolean = false;
    private _id:string;

    constructor(){
        super();
    }

    get errors():Lavender.ArrayList {
        return this._errors;
    }

    set errors(value:Lavender.ArrayList) {
        this._errors = value;
        this.notify(value, "errors");
    }

    get warnings():Lavender.ArrayList {
        return this._warnings;
    }

    set warnings(value:Lavender.ArrayList) {
        this._warnings = value;
        this.notify(value, "warnings");
    }

    get source():InputCollectionModel {
        return this._source;
    }

    set source(value:InputCollectionModel) {
        this._source = value;
        if( this.source !== null && this.source !== undefined ){
            this.init();//set up initial state
        }
        this.notify(value, "source");
    }

    get isValid():boolean {
        return this._isValid;
    }

    set isValid(value:boolean) {
        this._isValid = value;
        this.notify(value, "isValid");
    }

    get hasWarnings():boolean {
        return this._hasWarnings;
    }

    set hasWarnings(value:boolean) {
        this._hasWarnings = value;
        this.notify(value, "hasWarnings");
    }

    get id():string {
        return this._id;
    }

    set id(value:string) {
        this._id = value;
        this.notify(value, "id");
    }

    protected getValidationResult():boolean{
        return this.errors.length <= 0;
    }

    protected getValidationWarningsResult():boolean{
        return this.warnings.length > 0;
    }

    //stub for override
    protected getValidationErrors():Lavender.ArrayList{
        return new Lavender.ArrayList();//returns ArrayList of SpiSdk.ValidationError instances
    }

    //stub for override
    protected getValidationWarnings():Lavender.ArrayList{
        return new Lavender.ArrayList();//returns ArrayList of SpiSdk.ValidationError instances
    }

    protected validateOnChange(value:string):void{
        this.validate();
    }

    protected setUpBindings():void{

    }

    protected addEventListeners():void{

    }

    public validate():boolean {
        this.errors = this.getValidationErrors();//get all errors and store
        this.warnings = this.getValidationWarnings();
        this.isValid = this.getValidationResult();
        this.hasWarnings = this.getValidationWarningsResult();
        return this.isValid;//returns true or false, to obtain specific errors use this.errors
    }

    public init():void {
        this.addEventListeners();
        this.setUpBindings();
        this.validate();
    }

    public destroy():void {
        this.binder.unbindAll();
        this.binder = null;
        this.source = null;
        this.errors = null;
        this.warnings = null;
    }
}