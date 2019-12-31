/**
 * Created by dsmiley on 9/26/17.
 */
import {AbstractThumbnailView} from './AbstractThumbnailView';
import {SkinPart} from './SkinPart';
import {FileEvent} from '../control/events/FileEvent';
import * as Lavender from 'lavenderjs/lib';

export class File extends Lavender.Subject {

    public static  PENDING = 'pending';//unstarted
    public static PROGRESS = 'progress';
    public static LOAD = 'load';
    public static ERROR = 'error';
    public static ABORT = 'abort';

    private _percentLoaded: number;
    private _state: string;
    private _thumbnail: string;
    private _type: string;
    private _name: string;
    private _fileObj: any;
    private _size: number;
    private _id: number = Math.random();

    public id: number = Math.random();

    constructor() {
        super();
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
        this.notify(value, 'size');
    }

    get fileObj(): any {
        return this._fileObj;
    }

    set fileObj(value: any) {
        this._fileObj = value;
        this.notify(value, 'fileObj');
    }

    get percentLoaded(): number {
        return this._percentLoaded;
    }

    set percentLoaded(value: number) {
        this._percentLoaded = value;
        this.notify(value, 'percentLoaded');
    }

    get state(): string {
        return this._state;
    }

    set state(value: string) {
        this._state = value;
        this.notify(value, 'state');
    }

    get thumbnail(): string {
        return this._thumbnail;
    }

    set thumbnail(value: string) {
        this._thumbnail = value;
        this.notify(value, 'thumbnail');
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
        this.notify(value, 'type');
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
        this.notify(value, 'name');
    }

}

export class FileView extends AbstractThumbnailView {

    constructor() {
        super();
    }

    private _fileLabel: HTMLLabelElement;
    private _fileTypeLabel: HTMLLabelElement;
    private _progressBar: HTMLElement;
    private _statusIndicator: HTMLElement;
    private _loadIndicator: HTMLElement;
    private _errorIndicator: HTMLElement;
    private _progressIndicator: HTMLElement;
    private _pendingIndicator: HTMLElement;
    private _abortIndicator: HTMLElement;
    private _cancelBtn: HTMLButtonElement;
    private _clearBtn: HTMLButtonElement;
    private _cancelBtnDisplay: string;//css style for active button state
    private _clearBtnDisplay: string;//css style for active button state


    get fileLabel(): HTMLLabelElement {
        return this._fileLabel;
    }

    set fileLabel(value: HTMLLabelElement) {
        this._fileLabel = value;
    }

    get fileTypeLabel(): HTMLLabelElement {
        return this._fileTypeLabel;
    }

    set fileTypeLabel(value: HTMLLabelElement) {
        this._fileTypeLabel = value;
    }

    get progressBar(): HTMLElement {
        return this._progressBar;
    }

    set progressBar(value: HTMLElement) {
        this._progressBar = value;
    }

    get statusIndicator(): HTMLElement {
        return this._statusIndicator;
    }

    set statusIndicator(value: HTMLElement) {
        this._statusIndicator = value;
    }

    get loadIndicator(): HTMLElement {
        return this._loadIndicator;
    }

    set loadIndicator(value: HTMLElement) {
        this._loadIndicator = value;
    }

    get errorIndicator(): HTMLElement {
        return this._errorIndicator;
    }

    set errorIndicator(value: HTMLElement) {
        this._errorIndicator = value;
    }

    get progressIndicator(): HTMLElement {
        return this._progressIndicator;
    }

    set progressIndicator(value: HTMLElement) {
        this._progressIndicator = value;
    }

    get pendingIndicator(): HTMLElement {
        return this._pendingIndicator;
    }

    set pendingIndicator(value: HTMLElement) {
        this._pendingIndicator = value;
    }

    get abortIndicator(): HTMLElement {
        return this._abortIndicator;
    }

    set abortIndicator(value: HTMLElement) {
        this._abortIndicator = value;
    }

    get cancelBtn(): HTMLButtonElement {
        return this._cancelBtn;
    }

    set cancelBtn(value: HTMLButtonElement) {
        this._cancelBtn = value;
    }

    get clearBtn(): HTMLButtonElement {
        return this._clearBtn;
    }

    set clearBtn(value: HTMLButtonElement) {
        this._clearBtn = value;
    }

    get cancelBtnDisplay(): string {
        return this._cancelBtnDisplay;
    }

    set cancelBtnDisplay(value: string) {
        this._cancelBtnDisplay = value;
    }

    get clearBtnDisplay(): string {
        return this._clearBtnDisplay;
    }

    set clearBtnDisplay(value: string) {
        this._clearBtnDisplay = value;
    }

    protected setUpBindings(): void{
        if (this.fileLabel !== null && this.fileLabel !== undefined) {
            this.fileLabel.innerHTML = (this.model as File).name;
        }
        if (this.fileTypeLabel !== null && this.fileTypeLabel !== undefined) {
            this.fileTypeLabel.innerHTML = (this.model as File).type;
        }
        if (this.thumbnail !== null && this.thumbnail !== undefined) {
            this.thumbnail.src = (this.model as File).thumbnail;
        }
        this.onStateChange((this.model as File).state);//set initial state
        this.onPercentChange((this.model as File).percentLoaded);//set initial percent
        this.binder.bind((this.model as File), 'state', this, 'onStateChange');
        this.binder.bind((this.model as File), 'percentLoaded', this, 'onPercentChange');
    }

    protected setStatusIndicator(node: HTMLElement): void{
        if (this.statusIndicator !== null && this.statusIndicator !== undefined) {
            //remove child nodes
            while (this.statusIndicator.firstChild) {
                this.statusIndicator.removeChild(this.statusIndicator.firstChild);
            }
            this.statusIndicator.appendChild(node);
        }
    }

    protected onPercentChange(value: number): void{
        if (this.progressBar !== null && this.progressBar !== undefined) {
            //get the max width
            const maxWidth: number = (this.progressBar.style.hasOwnProperty('maxWidth') && this.progressBar.style.maxWidth.length > 0) ? parseInt(this.progressBar.style.maxWidth) : null;
            //set width based on % value of parent width
            const parentWidth = parseFloat(window.getComputedStyle(this.progressBar.parentNode as HTMLElement).width);
            const newWidth: number = (value/1) * parentWidth;
            this.progressBar.style.width = (maxWidth !== null && newWidth > maxWidth) ? `${maxWidth}px` : `${newWidth}px`;
        }
    }

    public init(): void{
        super.init();
        this.setUpBindings();
    }

    public onStateChange(value: string): void{
        this.setElementDisplay(this.cancelBtn, this.cancelBtnDisplay);//reset display state so button is visible
        this.setElementDisplay(this.clearBtn, 'none');//hide the clear button during upload
        switch (value) {
            case File.PENDING:
                if (this.pendingIndicator !== null && this.pendingIndicator !== undefined) {
                    this.setStatusIndicator(this.pendingIndicator);
                }
                break;
            case File.PROGRESS:
                if (this.progressIndicator !== null && this.progressIndicator !== undefined) {
                    this.setStatusIndicator(this.progressIndicator);
                }
                break;
            case File.LOAD:
                if (this.loadIndicator !== null && this.loadIndicator !== undefined) {
                    this.setStatusIndicator(this.loadIndicator);
                }
                this.setElementDisplay(this.cancelBtn, 'none');//not visible by default, stops the upload but does not clear the file from the list
                this.setElementDisplay(this.clearBtn, this.clearBtnDisplay);//visible by default, clears the file from the list
                break;
            case File.ERROR:
                if (this.errorIndicator !== null && this.errorIndicator !== undefined) {
                    this.setStatusIndicator(this.errorIndicator);
                }
                this.setElementDisplay(this.cancelBtn, 'none');//not visible by default, stops the upload but does not clear the file from the list
                this.setElementDisplay(this.clearBtn, this.clearBtnDisplay);//visible by default, clears the file from the list
                break;
            case File.ABORT:
                if (this.abortIndicator !== null && this.abortIndicator !== undefined) {
                    this.setStatusIndicator(this.abortIndicator);
                }
                this.setElementDisplay(this.cancelBtn, 'none');//not visible by default, stops the upload but does not clear the file from the list
                this.setElementDisplay(this.clearBtn, this.clearBtnDisplay);//visible by default, clears the file from the list
                break;
        }
    }

    public defineSkinParts(): void{
        super.defineSkinParts();
        //set up skin parts. We use the term itemTemplate as it allows us to include this component as a nested component in a collection view.
        //Choosing another name would require it be wrapped in a itemTemplate skin part
        this.skinParts.addItem(new SkinPart('thumbnail', this, 'thumbnail'));
        this.skinParts.addItem(new SkinPart('clearBtn', this, 'clearBtn'));
        this.skinParts.addItem(new SkinPart('cancelBtn', this, 'cancelBtn'));
        this.skinParts.addItem(new SkinPart('abortIndicator', this, 'abortIndicator'));
        this.skinParts.addItem(new SkinPart('pendingIndicator', this, 'pendingIndicator'));
        this.skinParts.addItem(new SkinPart('progressIndicator', this, 'progressIndicator'));
        this.skinParts.addItem(new SkinPart('errorIndicator', this, 'errorIndicator'));
        this.skinParts.addItem(new SkinPart('loadIndicator', this, 'loadIndicator'));
        this.skinParts.addItem(new SkinPart('statusIndicator', this, 'statusIndicator'));
        this.skinParts.addItem(new SkinPart('progressBar', this, 'progressBar'));
        this.skinParts.addItem(new SkinPart('fileTypeLabel', this, 'fileTypeLabel'));
        this.skinParts.addItem(new SkinPart('fileLabel', this, 'fileLabel'));
    }

    public onSkinPartAdded(part: string, element: HTMLElement): void{
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'cancelBtn':
                this.cancelBtnDisplay = this.cancelBtn.style.display;//capture the original display state of the button
                this.cancelBtn.addEventListener('click', this.onCancelBtnClick.bind(this));
                break;
            case 'clearBtn':
                this.clearBtnDisplay = this.clearBtn.style.display;//capture the original display state of the button
                this.clearBtn.addEventListener('click', this.onClearBtnClick.bind(this));
                break;
        }
    }

    public onClearBtnClick(event: Event): void{
        this.dispatch(new FileEvent(FileEvent.REMOVE_FILE_FROM_COLLECTION, {file:this.model}));
    }

    public onCancelBtnClick(event: Event): void{
        this.dispatch(new FileEvent(FileEvent.ABORT_FILE_UPLOAD, {file:this.model}));
    }

    public destroy(): void{
        super.destroy();
        if (this.clearBtn !== null && this.clearBtn !== undefined) {
            this.clearBtn.removeEventListener('click', this.onClearBtnClick);
        }
        if (this.cancelBtn !== null && this.cancelBtn !== undefined) {
            this.cancelBtn.removeEventListener('click', this.onCancelBtnClick);
        }
        this.fileLabel = null;
        this.progressBar = null;
        this.cancelBtn = null;
        this.clearBtn = null;
        this.statusIndicator = null;
        this.loadIndicator = null;
        this.errorIndicator = null;
        this.progressIndicator = null;
        this.pendingIndicator = null;
        this.abortIndicator = null;
        this.thumbnail = null;
    }
}
