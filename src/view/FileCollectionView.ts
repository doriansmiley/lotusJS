/**
 * Created by dsmiley on 9/26/17.
 */
import {AbstractCollectionView} from "./AbstractCollectionView";
import {File} from "./FileView";
import {SkinPart} from "./SkinPart";
import {FileEvent} from "../control/events/FileEvent";
import {AbstractItemView} from "./AbstractItemView";

export class FileCollectionView extends AbstractCollectionView{

    constructor(){
        super();
    }

    private _fileInput:HTMLInputElement;
    private _selectBtn:HTMLButtonElement;

    get fileInput():HTMLInputElement {
        return this._fileInput;
    }

    set fileInput(value:HTMLInputElement) {
        this._fileInput = value;
    }

    get selectBtn():HTMLButtonElement {
        return this._selectBtn;
    }

    set selectBtn(value:HTMLButtonElement) {
        this._selectBtn = value;
    }
    
    protected getUploadEvent(file):FileEvent{
        return new FileEvent(FileEvent.UPLOAD_FILE, {file:file});
    }
    
    protected uploadFiles(files:FileList):void{
        for (var i = 0; i < files.length; i++) {
            if(files[i].type.indexOf('image') < 0 ){
                continue;//skip file types that are not images
            }
            //iterate over the files and create a new file object and append to the collection
            var file = new File();
            file.type = files[i].type;
            file.name = files[i].name;
            file.size = files[i].size;
            file.fileObj = files[i];
            file.thumbnail = window.URL.createObjectURL(files[i]);
            //add the item to the collection
            this.collection.addItem(file);
            //dispatch event to load the file
            this.dispatch(this.getUploadEvent(file));
        }
    }

    protected addViewEventListeners(view:AbstractItemView):void{
        super.addViewEventListeners(view);
        view.addEventListener(FileEvent.REMOVE_FILE_FROM_COLLECTION, this, 'onRemoveAbortFile')
        view.addEventListener(FileEvent.ABORT_FILE_UPLOAD, this, 'onRemoveAbortFile')
    }

    protected removeViewEventListeners(view:AbstractItemView):void{
        super.removeViewEventListeners(view);
        view.removeEventListener(FileEvent.REMOVE_FILE_FROM_COLLECTION, this, 'onRemoveAbortFile')
        view.removeEventListener(FileEvent.ABORT_FILE_UPLOAD, this, 'onRemoveAbortFile')
    }

    public onRemoveAbortFile(event:FileEvent):void{
        this.dispatch(event);
        this.removeChildViewFromModel(event.payload['file']);
    }

    public defineSkinParts():void{
        super.defineSkinParts();
        //set up skin parts. We use the term itemTemplate as it allows us to include this component as a nested component in a collection view.
        //Choosing another name would require it be wrapped in a itemTemplate skin part
        this.skinParts.addItem(new SkinPart('fileInput', this, 'fileInput'));
        this.skinParts.addItem(new SkinPart('selectBtn', this, 'selectBtn'));
    }

    public onSkinPartAdded(part:string, element:HTMLElement):void{
        super.onSkinPartAdded(part, element);
        switch(part){
            case 'fileInput':
                this.fileInput = element as HTMLInputElement;
                this.fileInput.addEventListener("change", this.onFileInputChange.bind(this));
                break;
            case 'selectBtn':
                this.selectBtn = element as HTMLInputElement;
                this.selectBtn.addEventListener("click", this.onFileBtnClick.bind(this));
                break;
        }
    }
    
    public onFileInputChange(event:Event):void{
        let files = this.fileInput.files;
        if (!files.length) {
            return;
        } else {
            this.uploadFiles(files);
        }
    }

    public onFileBtnClick(event:Event):void{
        if (this.fileInput) {
            this.fileInput.click();//trigger the open of the file input
        }
        if( this.selectBtn.getAttribute('href') !== null && this.selectBtn.getAttribute('href') !== undefined ){
            event.preventDefault();
        } // prevent navigation to "#" or any other link
    }

    public destroy():void{
        super.destroy();
        if( this.fileInput ){
            this.fileInput.removeEventListener("change", this.onFileInputChange);
            this.fileInput = null;
        }
        if( this.selectBtn ){
            this.selectBtn.removeEventListener("click", this.onFileBtnClick);
            this.selectBtn = null;
        }
    }

}