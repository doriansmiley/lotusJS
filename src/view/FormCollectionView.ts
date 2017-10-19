/**
 * Created by dsmiley on 10/9/17.
 */
import {AbstractCollectionView} from "./AbstractCollectionView";
import {AbstractItemView} from "./AbstractItemView";
import {LotusHTMLElement} from "../context/LotusHTMLElement";
import {SkinPart} from "./SkinPart";
import {InputCollectionModel} from "../model/form/InputCollectionModel";
import * as Lavender from 'lavenderjs/lib';
import {ValidationError} from "../model/form/validation/ValidationError";

export class FormCollectionView extends AbstractCollectionView{

    public static INPUT:number = 0;
    public static VALIDATION_ERROR:number = 1;
    public static SUBMIT:number = 2;
    public static ERROR:number = 2;

    protected _state:number = 0;//determines what state the form shows
    protected _validationWarning:HTMLElement;
    protected _validationWarningDisplay:string;
    protected _inputState:HTMLElement;
    protected _inputStateDisplay:string;
    protected _submitState:HTMLElement;
    protected _submitStateDisplay:string;
    protected _errorState:HTMLElement;
    protected _errorStateDisplay:string;
    protected _error:HTMLElement;//HTML element used to display error message
    protected _errorDisplay:string;
    protected _submit:HTMLElement;
    protected _clear:HTMLElement;
    protected _back:HTMLElement;
    
    constructor(){
        super();
    }


    get submit():HTMLElement {
        return this._submit;
    }

    set submit(value:HTMLElement) {
        this._submit = value;
        this.notify(value, 'submit');
    }

    get clear():HTMLElement {
        return this._clear;
    }

    set clear(value:HTMLElement) {
        this._clear = value;
        this.notify(value, 'clear');
    }

    get back():HTMLElement {
        return this._back;
    }

    set back(value:HTMLElement) {
        this._back = value;
        this.notify(value, 'back');
    }

    get error():HTMLElement {
        return this._error;
    }

    set error(value:HTMLElement) {
        this._error = value;
        this.notify(value, 'error');
    }

    get state():number {
        return this._state;
    }

    set state(value:number) {
        //set new state, this must occure first
        this.resolveState(value, this.state);
        this._state = value;
        this.notify(value, 'state');
    }

    get validationWarning():HTMLElement {
        return this._validationWarning;
    }

    set validationWarning(value:HTMLElement) {
        this._validationWarning = value;
        this.notify(value, 'validationWarning');
    }

    get inputState():HTMLElement {
        return this._inputState;
    }

    set inputState(value:HTMLElement) {
        this._inputState = value;
        this.notify(value, 'inputState');
    }

    get submitState():HTMLElement {
        return this._submitState;
    }

    set submitState(value:HTMLElement) {
        this._submitState = value;
        this.notify(value, 'submitState');
    }

    get errorState():HTMLElement {
        return this._errorState;
    }

    set errorState(value:HTMLElement) {
        this._errorState = value;
        this.notify(value, 'errorState');
    }

    protected clearErrors():void{
        if(this.error){
            while (this.error.firstChild) {
                this.error.removeChild(this.error.firstChild);
            }
        }
    }

    protected addErrors(errors:Lavender.ArrayList):void{
        if(this.error){
            for(let i=0; i<errors.length; i++){
                let error:ValidationError = errors.getItemAt(i) as ValidationError;
                let message:HTMLElement = document.createElement('p');
                let node:Node = document.createTextNode(error.errorMessage);
                message.appendChild(node);
                this.error.appendChild(message)
            }
        }
    }

    protected onSubmit(event:Event):void{
        //clear old errors
        this.clearErrors();
        //check that all instances of InputCollectionModel are valid
        let errors:Lavender.ArrayList = new Lavender.ArrayList();
        for(let i=0; i<this.collection.length; i++){
            if(!(this.collection.getItemAt(i) as InputCollectionModel).isValid){
                errors.addAll((this.collection.getItemAt(i) as InputCollectionModel).errors.source());
            }
        }
        //display any validation errors
        if(errors.length > 0){
            this.addErrors(errors);
            if(this.validationWarning){
                this.validationWarning.style.display = this._validationWarningDisplay;
            }
            if(this.error){
                this.error.style.display = this._errorDisplay;
            }
        }else{
            this.state = FormCollectionView.SUBMIT;
            if(this.validationWarning){
                this.validationWarning.style.display = 'none';
            }
            if(this.error){
                this.error.style.display = 'none';
            }
        }
    }

    protected onClear(event:Event):void{
        //clear the form by iterating model and setting appropriate values. We need to a way to clear selection for Lists and radio groups
        for(let i=0; i<this.collection.length; i++){
            (this.collection.getItemAt(i) as InputCollectionModel).clear();
        }
        this.state = FormCollectionView.INPUT;
    }

    protected onBack(event:Event):void{
        this.state = FormCollectionView.INPUT;
    }

    protected resolveState(state:number, oldState, errors?:Lavender.ArrayList):void{
        switch(oldState){
            case FormCollectionView.INPUT:
                if(this.inputState && state != FormCollectionView.VALIDATION_ERROR){
                    this.inputState.style.display = 'none';
                }
                break;
            case FormCollectionView.SUBMIT:
                if(this.submitState){
                    this.submitState.style.display = 'none';
                }
                break;
            case FormCollectionView.ERROR:
                if(this.errorState){
                    this.errorState.style.display = 'none';
                }
                break;
        }
        switch(state){
            case FormCollectionView.INPUT:
                if(this.inputState){
                    this.inputState.style.display = this._inputStateDisplay;
                }
                break;
            case FormCollectionView.SUBMIT:
                if(this.submitState){
                    this.submitState.style.display = this._submitStateDisplay;
                }
                break;
            case FormCollectionView.ERROR:
                if(this.errorState){
                    this.errorState.style.display = this._errorStateDisplay;
                }
                break;
        }
    }

    public onError(error:Error):void{
        //only the external application can trigger state error which results from a service error
    }

    public onReady():void{
        super.onReady()
        //set the default state
        this.resolveState(FormCollectionView.INPUT, null);
    }

    //define required skin parts
    public defineSkinParts():void{
        super.defineSkinParts();
        this.skinParts.addItem(new SkinPart('validationWarning', this, 'validationWarning'));
        this.skinParts.addItem(new SkinPart('inputState', this, 'inputState'));
        this.skinParts.addItem(new SkinPart('submitState', this, 'submitState'));
        this.skinParts.addItem(new SkinPart('errorState', this, 'errorState'));
        this.skinParts.addItem(new SkinPart('error', this, 'error'));
        this.skinParts.addItem(new SkinPart('submit', this, 'submit'));
        this.skinParts.addItem(new SkinPart('clear', this, 'clear'));
        this.skinParts.addItem(new SkinPart('back', this, 'back'));
    }

    //set up event handlers and bindings
    public onSkinPartAdded(part:string, element:HTMLElement):void{
        //attach event listeners for submit and clear buttons
        super.onSkinPartAdded(part, element );
        switch(part){
            case 'back':
                this.back.addEventListener('click', this.onBack.bind(this));
                break;
            case 'clear':
                this.clear.addEventListener('click', this.onClear.bind(this));
                break;
            case 'submit':
                this.submit.addEventListener('click', this.onSubmit.bind(this));
                break;
            case 'validationWarning':
                this._validationWarningDisplay = this.validationWarning.style.display;
                this.validationWarning.style.display = 'none';
                break;
            case 'inputState':
                this._inputStateDisplay = this.inputState.style.display;
                this.inputState.style.display = 'none';
                break;
            case 'submitState':
                this._submitStateDisplay = this.submitState.style.display;
                this.submitState.style.display = 'none';
                break;
            case 'errorState':
                this._errorStateDisplay = this.errorState.style.display;
                this.errorState.style.display = 'none';
                break;
            case 'error':
                this._errorDisplay = this.error.style.display;
                this.error.style.display = 'none';
                break;

        }
    }

    public destroy():void{
        super.destroy();
        //TODO clear all references
    }
}