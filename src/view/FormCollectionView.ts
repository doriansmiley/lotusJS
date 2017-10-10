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
import {InputModel} from "../model/InputModel";
import {InputCollectionModel} from "../model/InputCollectionModel";
import {RadioCollectionView} from "./RadioCollectionView";
import {FileCollectionView} from "./FileCollectionView";

export class FormCollectionView extends AbstractCollectionView{

    public static INPUT:number = 0;
    public static VALIDATION_ERROR:number = 1;
    public static SUBMIT:number = 2;
    public static ERROR:number = 2;

    private _state:number = 0;//determines what state the form shows
    private _validationWarning:HTMLElement;
    private _validationWarningDisplay:string;
    private _inputState:HTMLElement;
    private _inputStateDisplay:string;
    private _submitState:HTMLElement;
    private _submitStateDisplay:string;
    private _errorState:HTMLElement;
    private _errorStateDisplay:string;
    private _input:HTMLElement;
    private _list:HTMLElement;
    private _radioGroup:HTMLElement;
    private _file:HTMLElement;
    private _errorMessage:string;//error message to display when in error state
    private _error:HTMLElement;//HTML element used to display error message
    private _submit:HTMLElement;
    private _clear:HTMLElement;
    private _back:HTMLElement;

    public inputItemView:string;
    public listItemView:string;
    public radioGroupItemView:string;
    public fileItemView:string;
    public invalidClass:string;//class to assign to invalid form fields
    public validClass:string;//class to assign to valid form fields

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

    get errorMessage():string {
        return this._errorMessage;
    }

    set errorMessage(value:string) {
        this._errorMessage = value;
        this.notify(value, 'errorMessage');
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

//grab the appropriate function based on the model object type and skin part definitions
    protected createChildView(model:Object):AbstractItemView{
        //TODO: switch case on type and add the appropriate corresponding Lotus input control.
        let evalClass = eval(this.itemView);
        return new evalClass();
    }

    //create the appropriate item template based on model type and skin part deinitions
    protected cloneItemTemplate(model):LotusHTMLElement{
        // clone the appropriate item template (input, radio group, list, file) based on model.type. there is a skins part corresponding to each type
        return this.itemTemplate.cloneNode(true) as LotusHTMLElement;
    }

    protected onSubmit(event:Event):void{
        //TODO: onSubmit bindings trigger validation by iterating each item in this.collection, then each item in this.collection[i].collection calling this.collection[i].collection[y].validate.
        //TODO: Once you create the InputCollectionModel we could probably store references to each item in this.collection[i].collection so we don't need to two loops here
        // If all fields valid then set state=submit, else submit=validation errors.
        //only the external application can trigger state error which results from a service error
        //if all items in the model are
    }

    protected onClear(event:Event):void{
        //clear the form by iterating model and setting appropriate values. We need to a way to clear selection for Lists and radio groups
        for(var i=0; i<this.collection.length; i++){
            (this.collection.getItemAt(i) as InputCollectionModel).clear();
        }
    }

    protected onBack(event:Event):void{
        //reset state to input
        this.state = FormCollectionView.INPUT;
    }

    //stubs for override in subclasses. If you require notifications when a form element has focus etc you can dispatch them in your callbacks assigned here
    protected addViewEventListeners(view:AbstractItemView):void{
        super.addViewEventListeners(view);
    }

    //stub for override, remove your custom view cllbacks here
    protected removeViewEventListeners(view:AbstractItemView):void{
        super.removeViewEventListeners(view);
    }

    protected resolveState(state:number, oldState):void{
        switch(oldState){
            case FormCollectionView.INPUT:
                this.inputState.style.display = 'none';
                break;
            case FormCollectionView.VALIDATION_ERROR:
                this.validationWarning.style.display = 'none';
                break;
            case FormCollectionView.SUBMIT:
                this.submitState.style.display = 'none';
                break;
            case FormCollectionView.ERROR:
                this.errorState.style.display = 'none';
                break;
        }
        switch(state){
            case FormCollectionView.INPUT:
                this.inputState.style.display = this._inputStateDisplay;
                break;
            case FormCollectionView.VALIDATION_ERROR:
                this.validationWarning.style.display = this._validationWarningDisplay;
                break;
            case FormCollectionView.SUBMIT:
                this.submitState.style.display = this._submitStateDisplay;
                break;
            case FormCollectionView.ERROR:
                this.errorState.style.display = this._errorStateDisplay;
                break;
        }
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

        }
    }

    public destroy():void{
        super.destroy();
        //TODO clear all references
    }
}