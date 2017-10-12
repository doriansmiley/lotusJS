/**
 * Created by dsmiley on 10/9/17.
 */
import {ItemViewEvent} from "../control/events/ItemViewEvent";
import {InputEvent} from "../control/events/InputEvent";
import {AbstractCollectionView} from "./AbstractCollectionView";
import {AbstractItemView} from "./AbstractItemView";
import {AbstractInputCollectionView} from "./AbstractInputCollectionView";
import {LotusHTMLElement} from "../context/LotusHTMLElement";
import {Input} from "./Input";
import {SkinPart} from "./SkinPart";
import {InputModel} from "../model/form/InputModel";
import {InputCollectionModel} from "../model/form/InputCollectionModel";
import {RadioCollectionView} from "./RadioCollectionView";
import {FileCollectionView} from "./FileCollectionView";
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
    protected _input:HTMLElement;
    protected _list:HTMLElement;
    protected _radioGroup:HTMLElement;
    protected _file:HTMLElement;
    protected _error:HTMLElement;//HTML element used to display error message
    protected _errorDisplay:string;
    protected _submit:HTMLElement;
    protected _clear:HTMLElement;
    protected _back:HTMLElement;

    //IMPORTANT: you have to initialize instance attributes that are not defined using accessor methods or they will dropped by the compiler.
    public inputView:string = null;
    public listView:string = null;
    public radioGroupView:string = null;
    public fileView:string = null;

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

    get input():HTMLElement {
        return this._input;
    }

    set input(value:HTMLElement) {
        this._input = value;
        this.notify(value, 'input');
    }

    get list():HTMLElement {
        return this._list;
    }

    set list(value:HTMLElement) {
        this._list = value;
        this.notify(value, 'list');
    }

    get radioGroup():HTMLElement {
        return this._radioGroup;
    }

    set radioGroup(value:HTMLElement) {
        this._radioGroup = value;
        this.notify(value, 'radioGroup');
    }

    get file():HTMLElement {
        return this._file;
    }

    set file(value:HTMLElement) {
        this._file = value;
        this.notify(value, 'file');
    }

    protected getModel(model):Object{
        //TODO: switch case on type and send back either model.collection.getItemAt(o) or model.collection
        let value:Object = model;
        switch((model as InputCollectionModel).type){
            case InputCollectionModel.TYPE_INPUT:
            case InputCollectionModel.TYPE_FILE:
                value = (model as InputCollectionModel).collection.getItemAt(0);
                break;
            case InputCollectionModel.TYPE_LIST:
            case InputCollectionModel.TYPE_RADIO_GROUP:
                value = (model as InputCollectionModel).collection;
                break;
        }
        return value;
    }

    //grab the appropriate function based on the model object type
    protected createChildView(model:Object):AbstractItemView{
        let evalClass;
        switch((model as InputCollectionModel).type){
            case InputCollectionModel.TYPE_INPUT:
                evalClass = eval(this.inputView);
                break
            case InputCollectionModel.TYPE_FILE:
                evalClass = eval(this.fileView);
                break;
            case InputCollectionModel.TYPE_LIST:
                evalClass = eval(this.listView);
                break;
            case InputCollectionModel.TYPE_RADIO_GROUP:
                evalClass = eval(this.radioGroupView);
                break;
        }
        return new evalClass();
    }

    //create the appropriate item template based on model type and skin part definitions
    protected cloneItemTemplate(model):LotusHTMLElement{
        let node:LotusHTMLElement;
        switch((model as InputCollectionModel).type){
            case InputCollectionModel.TYPE_INPUT:
                node = this.input.cloneNode(true) as LotusHTMLElement;
                break
            case InputCollectionModel.TYPE_FILE:
                node = this.file.cloneNode(true) as LotusHTMLElement;
                break;
            case InputCollectionModel.TYPE_LIST:
                node = this.list.cloneNode(true) as LotusHTMLElement;
                break;
            case InputCollectionModel.TYPE_RADIO_GROUP:
                node = this.radioGroup.cloneNode(true) as LotusHTMLElement;
                break;
        }
        // clone the appropriate item template (input, radio group, list, file) based on model.type. there is a skins part corresponding to each type
        return node;
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
        //check that all instances of InputCollectionModel are valid
        let errors:Lavender.ArrayList = new Lavender.ArrayList();
        for(let i=0; i<this.collection.length; i++){
            if(!(this.collection.getItemAt(i) as InputCollectionModel).isValid){
                errors.addAll((this.collection.getItemAt(i) as InputCollectionModel).errors.source());
            }
        }
        //display any validation errors
        if(errors.length > 0){
            this.resolveState(FormCollectionView.VALIDATION_ERROR, this.state, errors);
        }else{
            this.resolveState(FormCollectionView.SUBMIT, this.state);
        }
    }

    protected onClear(event:Event):void{
        //clear the form by iterating model and setting appropriate values. We need to a way to clear selection for Lists and radio groups
        for(let i=0; i<this.collection.length; i++){
            (this.collection.getItemAt(i) as InputCollectionModel).clear();
        }
        this.resolveState(FormCollectionView.INPUT, this.state);
    }

    protected onBack(event:Event):void{
        this.resolveState(FormCollectionView.INPUT, this.state);
    }

    //override point for objects that require bindings on the model and view. the model param is not always equal to view.model, so we need this method
    protected setUpViewBindings(model:Object, view:AbstractItemView):void{
        //TODO:add bindings for view.model.isValid to view.isValid
        this.binder.bind(model as InputCollectionModel, 'isValid', view, 'isValid');
    }

    protected resolveState(state:number, oldState, errors?:Lavender.ArrayList):void{
        switch(oldState){
            case FormCollectionView.INPUT:
                if(this.inputState){
                    this.inputState.style.display = 'none';
                }
                break;
            case FormCollectionView.VALIDATION_ERROR:
                if(this.validationWarning){
                    this.validationWarning.style.display = 'none';
                }
                if(this.error){
                    this.error.style.display = 'none';
                }
                this.clearErrors();
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
            case FormCollectionView.VALIDATION_ERROR:
                this.addErrors(errors);
                if(this.validationWarning){
                    this.validationWarning.style.display = this._validationWarningDisplay;
                }
                if(this.error){
                    this.error.style.display = this._errorDisplay;
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
        this.resolveState(this.state, null);
    }

    //define required skin parts
    public defineSkinParts():void{
        super.defineSkinParts();
        this.skinParts.addItem(new SkinPart('validationWarning', this, 'validationWarning'));
        this.skinParts.addItem(new SkinPart('inputState', this, 'inputState'));
        this.skinParts.addItem(new SkinPart('submitState', this, 'submitState'));
        this.skinParts.addItem(new SkinPart('errorState', this, 'errorState'));
        this.skinParts.addItem(new SkinPart('input', this, 'input'));
        this.skinParts.addItem(new SkinPart('list', this, 'list'));
        this.skinParts.addItem(new SkinPart('radioGroup', this, 'radioGroup'));
        this.skinParts.addItem(new SkinPart('file', this, 'file'));
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