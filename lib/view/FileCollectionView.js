"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/26/17.
 */
var AbstractCollectionView_1 = require("./AbstractCollectionView");
var FileView_1 = require("./FileView");
var SkinPart_1 = require("./SkinPart");
var FileEvent_1 = require("../control/events/FileEvent");
var FileCollectionView = (function (_super) {
    __extends(FileCollectionView, _super);
    function FileCollectionView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(FileCollectionView.prototype, "fileInput", {
        get: function () {
            return this._fileInput;
        },
        set: function (value) {
            this._fileInput = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileCollectionView.prototype, "selectBtn", {
        get: function () {
            return this._selectBtn;
        },
        set: function (value) {
            this._selectBtn = value;
        },
        enumerable: true,
        configurable: true
    });
    FileCollectionView.prototype.getUploadEvent = function (file) {
        return new FileEvent_1.FileEvent(FileEvent_1.FileEvent.UPLOAD_FILE, { file: file });
    };
    FileCollectionView.prototype.uploadFiles = function (files) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].type.indexOf('image') < 0) {
                continue; //skip file types that are not images
            }
            //iterate over the files and create a new file object and append to the collection
            var file = new FileView_1.File();
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
    };
    FileCollectionView.prototype.addViewEventListeners = function (view) {
        _super.prototype.addViewEventListeners.call(this, view);
        view.addEventListener(FileEvent_1.FileEvent.REMOVE_FILE_FROM_COLLECTION, this, 'onRemoveAbortFile');
        view.addEventListener(FileEvent_1.FileEvent.ABORT_FILE_UPLOAD, this, 'onRemoveAbortFile');
    };
    FileCollectionView.prototype.removeViewEventListeners = function (view) {
        _super.prototype.removeViewEventListeners.call(this, view);
        view.removeEventListener(FileEvent_1.FileEvent.REMOVE_FILE_FROM_COLLECTION, this, 'onRemoveAbortFile');
        view.removeEventListener(FileEvent_1.FileEvent.ABORT_FILE_UPLOAD, this, 'onRemoveAbortFile');
    };
    FileCollectionView.prototype.onRemoveAbortFile = function (event) {
        this.dispatch(event);
        this.removeChildViewFromModel(event.payload['file']);
    };
    FileCollectionView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        //set up skin parts. We use the term itemTemplate as it allows us to include this component as a nested component in a collection view.
        //Choosing another name would require it be wrapped in a itemTemplate skin part
        this.skinParts.addItem(new SkinPart_1.SkinPart('fileInput', this, 'fileInput'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('selectBtn', this, 'selectBtn'));
    };
    FileCollectionView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'fileInput':
                this.fileInput = element;
                this.fileInput.addEventListener("change", this.onFileInputChange.bind(this));
                break;
            case 'selectBtn':
                this.selectBtn = element;
                this.selectBtn.addEventListener("click", this.onFileBtnClick.bind(this));
                break;
        }
    };
    FileCollectionView.prototype.onFileInputChange = function (event) {
        var files = this.fileInput.files;
        if (!files.length) {
            return;
        }
        else {
            this.uploadFiles(files);
        }
    };
    FileCollectionView.prototype.onFileBtnClick = function (event) {
        if (this.fileInput) {
            this.fileInput.click(); //trigger the open of the file input
        }
        if (this.selectBtn.getAttribute('href') !== null && this.selectBtn.getAttribute('href') !== undefined) {
            event.preventDefault();
        } // prevent navigation to "#" or any other link
    };
    FileCollectionView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.fileInput) {
            this.fileInput.removeEventListener("change", this.onFileInputChange);
            this.fileInput = null;
        }
        if (this.selectBtn) {
            this.selectBtn.removeEventListener("click", this.onFileBtnClick);
            this.selectBtn = null;
        }
    };
    return FileCollectionView;
}(AbstractCollectionView_1.AbstractCollectionView));
exports.FileCollectionView = FileCollectionView;
//# sourceMappingURL=FileCollectionView.js.map