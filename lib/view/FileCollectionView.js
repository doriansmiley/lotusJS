"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/26/17.
 */
const AbstractCollectionView_1 = require("./AbstractCollectionView");
const FileView_1 = require("./FileView");
const SkinPart_1 = require("./SkinPart");
const FileEvent_1 = require("../control/events/FileEvent");
class FileCollectionView extends AbstractCollectionView_1.AbstractCollectionView {
    constructor() {
        super();
    }
    get fileInput() {
        return this._fileInput;
    }
    set fileInput(value) {
        this._fileInput = value;
    }
    get selectBtn() {
        return this._selectBtn;
    }
    set selectBtn(value) {
        this._selectBtn = value;
    }
    getUploadEvent(file) {
        return new FileEvent_1.FileEvent(FileEvent_1.FileEvent.UPLOAD_FILE, { file: file });
    }
    uploadFiles(files) {
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.indexOf('image') < 0) {
                continue; //skip file types that are not images
            }
            //iterate over the files and create a new file object and append to the collection
            let file = new FileView_1.File();
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
    addViewEventListeners(view) {
        super.addViewEventListeners(view);
        view.addEventListener(FileEvent_1.FileEvent.REMOVE_FILE_FROM_COLLECTION, this, 'onRemoveAbortFile');
        view.addEventListener(FileEvent_1.FileEvent.ABORT_FILE_UPLOAD, this, 'onRemoveAbortFile');
    }
    removeViewEventListeners(view) {
        super.removeViewEventListeners(view);
        view.removeEventListener(FileEvent_1.FileEvent.REMOVE_FILE_FROM_COLLECTION, this, 'onRemoveAbortFile');
        view.removeEventListener(FileEvent_1.FileEvent.ABORT_FILE_UPLOAD, this, 'onRemoveAbortFile');
    }
    onRemoveAbortFile(event) {
        this.dispatch(event);
        this.removeChildViewFromModel(event.payload['file']);
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts. We use the term itemTemplate as it allows us to include this component as a nested component in a collection view.
        //Choosing another name would require it be wrapped in a itemTemplate skin part
        this.skinParts.addItem(new SkinPart_1.SkinPart('fileInput', this, 'fileInput'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('selectBtn', this, 'selectBtn'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'fileInput':
                this.fileInput.addEventListener("change", this.onFileInputChange.bind(this));
                break;
            case 'selectBtn':
                this.selectBtn.addEventListener("click", this.onFileBtnClick.bind(this));
                break;
        }
    }
    onFileInputChange(event) {
        let files = this.fileInput.files;
        if (!files.length) {
            return;
        }
        else {
            this.uploadFiles(files);
        }
    }
    onFileBtnClick(event) {
        if (this.fileInput) {
            this.fileInput.click(); //trigger the open of the file input
        }
        if (this.selectBtn.getAttribute('href') !== null && this.selectBtn.getAttribute('href') !== undefined) {
            event.preventDefault();
        } // prevent navigation to "#" or any other link
    }
    destroy() {
        super.destroy();
        if (this.fileInput) {
            this.fileInput.removeEventListener("change", this.onFileInputChange);
            this.fileInput = null;
        }
        if (this.selectBtn) {
            this.selectBtn.removeEventListener("click", this.onFileBtnClick);
            this.selectBtn = null;
        }
    }
}
exports.FileCollectionView = FileCollectionView;
//# sourceMappingURL=FileCollectionView.js.map