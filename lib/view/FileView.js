"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/26/17.
 */
const AbstractThumbnailView_1 = require("./AbstractThumbnailView");
const SkinPart_1 = require("./SkinPart");
const FileEvent_1 = require("../control/events/FileEvent");
const Lavender = require("lavenderjs/lib");
class File extends Lavender.Subject {
    constructor() {
        super();
        this._id = Math.random();
        this.id = Math.random();
    }
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
        this.notify(value, 'size');
    }
    get fileObj() {
        return this._fileObj;
    }
    set fileObj(value) {
        this._fileObj = value;
        this.notify(value, 'fileObj');
    }
    get percentLoaded() {
        return this._percentLoaded;
    }
    set percentLoaded(value) {
        this._percentLoaded = value;
        this.notify(value, 'percentLoaded');
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
        this.notify(value, 'state');
    }
    get thumbnail() {
        return this._thumbnail;
    }
    set thumbnail(value) {
        this._thumbnail = value;
        this.notify(value, 'thumbnail');
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
        this.notify(value, 'type');
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
        this.notify(value, 'name');
    }
}
File.PENDING = 'pending'; //unstarted
File.PROGRESS = 'progress';
File.LOAD = 'load';
File.ERROR = 'error';
File.ABORT = 'abort';
exports.File = File;
class FileView extends AbstractThumbnailView_1.AbstractThumbnailView {
    constructor() {
        super();
    }
    get fileLabel() {
        return this._fileLabel;
    }
    set fileLabel(value) {
        this._fileLabel = value;
    }
    get fileTypeLabel() {
        return this._fileTypeLabel;
    }
    set fileTypeLabel(value) {
        this._fileTypeLabel = value;
    }
    get progressBar() {
        return this._progressBar;
    }
    set progressBar(value) {
        this._progressBar = value;
    }
    get statusIndicator() {
        return this._statusIndicator;
    }
    set statusIndicator(value) {
        this._statusIndicator = value;
    }
    get loadIndicator() {
        return this._loadIndicator;
    }
    set loadIndicator(value) {
        this._loadIndicator = value;
    }
    get errorIndicator() {
        return this._errorIndicator;
    }
    set errorIndicator(value) {
        this._errorIndicator = value;
    }
    get progressIndicator() {
        return this._progressIndicator;
    }
    set progressIndicator(value) {
        this._progressIndicator = value;
    }
    get pendingIndicator() {
        return this._pendingIndicator;
    }
    set pendingIndicator(value) {
        this._pendingIndicator = value;
    }
    get abortIndicator() {
        return this._abortIndicator;
    }
    set abortIndicator(value) {
        this._abortIndicator = value;
    }
    get cancelBtn() {
        return this._cancelBtn;
    }
    set cancelBtn(value) {
        this._cancelBtn = value;
    }
    get clearBtn() {
        return this._clearBtn;
    }
    set clearBtn(value) {
        this._clearBtn = value;
    }
    get cancelBtnDisplay() {
        return this._cancelBtnDisplay;
    }
    set cancelBtnDisplay(value) {
        this._cancelBtnDisplay = value;
    }
    get clearBtnDisplay() {
        return this._clearBtnDisplay;
    }
    set clearBtnDisplay(value) {
        this._clearBtnDisplay = value;
    }
    setUpBindings() {
        if (this.fileLabel !== null && this.fileLabel !== undefined) {
            this.fileLabel.innerHTML = this.model.name;
        }
        if (this.fileTypeLabel !== null && this.fileTypeLabel !== undefined) {
            this.fileTypeLabel.innerHTML = this.model.type;
        }
        if (this.thumbnail !== null && this.thumbnail !== undefined) {
            this.thumbnail.src = this.model.thumbnail;
        }
        this.onStateChange(this.model.state); //set initial state
        this.onPercentChange(this.model.percentLoaded); //set initial percent
        this.binder.bind(this.model, 'state', this, 'onStateChange');
        this.binder.bind(this.model, 'percentLoaded', this, 'onPercentChange');
    }
    setStatusIndicator(node) {
        if (this.statusIndicator !== null && this.statusIndicator !== undefined) {
            //remove child nodes
            while (this.statusIndicator.firstChild) {
                this.statusIndicator.removeChild(this.statusIndicator.firstChild);
            }
            this.statusIndicator.appendChild(node);
        }
    }
    onPercentChange(value) {
        if (this.progressBar !== null && this.progressBar !== undefined) {
            //get the max width
            let maxWidth = (this.progressBar.style.hasOwnProperty('maxWidth') && this.progressBar.style.maxWidth.length > 0) ? parseInt(this.progressBar.style.maxWidth) : null;
            //set width based on % value of parent width
            let parentWidth = parseFloat(window.getComputedStyle(this.progressBar.parentNode).width);
            let newWidth = (value / 1) * parentWidth;
            this.progressBar.style.width = (maxWidth !== null && newWidth > maxWidth) ? maxWidth + 'px' : newWidth + 'px';
        }
    }
    init() {
        super.init();
        this.setUpBindings();
    }
    onStateChange(value) {
        this.setElementDisplay(this.cancelBtn, this.cancelBtnDisplay); //reset display state so button is visible
        this.setElementDisplay(this.clearBtn, 'none'); //hide the clear button during upload
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
                this.setElementDisplay(this.cancelBtn, 'none'); //not visible by default, stops the upload but does not clear the file from the list
                this.setElementDisplay(this.clearBtn, this.clearBtnDisplay); //visible by default, clears the file from the list
                break;
            case File.ERROR:
                if (this.errorIndicator !== null && this.errorIndicator !== undefined) {
                    this.setStatusIndicator(this.errorIndicator);
                }
                this.setElementDisplay(this.cancelBtn, 'none'); //not visible by default, stops the upload but does not clear the file from the list
                this.setElementDisplay(this.clearBtn, this.clearBtnDisplay); //visible by default, clears the file from the list
                break;
            case File.ABORT:
                if (this.abortIndicator !== null && this.abortIndicator !== undefined) {
                    this.setStatusIndicator(this.abortIndicator);
                }
                this.setElementDisplay(this.cancelBtn, 'none'); //not visible by default, stops the upload but does not clear the file from the list
                this.setElementDisplay(this.clearBtn, this.clearBtnDisplay); //visible by default, clears the file from the list
                break;
        }
    }
    defineSkinParts() {
        super.defineSkinParts();
        //set up skin parts. We use the term itemTemplate as it allows us to include this component as a nested component in a collection view.
        //Choosing another name would require it be wrapped in a itemTemplate skin part
        this.skinParts.addItem(new SkinPart_1.SkinPart('thumbnail', this, 'thumbnail'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('clearBtn', this, 'clearBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('cancelBtn', this, 'cancelBtn'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('abortIndicator', this, 'abortIndicator'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('pendingIndicator', this, 'pendingIndicator'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('progressIndicator', this, 'progressIndicator'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('errorIndicator', this, 'errorIndicator'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('loadIndicator', this, 'loadIndicator'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('statusIndicator', this, 'statusIndicator'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('progressBar', this, 'progressBar'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('fileTypeLabel', this, 'fileTypeLabel'));
        this.skinParts.addItem(new SkinPart_1.SkinPart('fileLabel', this, 'fileLabel'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'cancelBtn':
                this.cancelBtnDisplay = this.cancelBtn.style.display; //capture the original display state of the button
                this.cancelBtn.addEventListener('click', this.onCancelBtnClick.bind(this));
                break;
            case 'clearBtn':
                this.clearBtnDisplay = this.clearBtn.style.display; //capture the original display state of the button
                this.clearBtn.addEventListener('click', this.onClearBtnClick.bind(this));
                break;
        }
    }
    onClearBtnClick(event) {
        this.dispatch(new FileEvent_1.FileEvent(FileEvent_1.FileEvent.REMOVE_FILE_FROM_COLLECTION, { file: this.model }));
    }
    onCancelBtnClick(event) {
        this.dispatch(new FileEvent_1.FileEvent(FileEvent_1.FileEvent.ABORT_FILE_UPLOAD, { file: this.model }));
    }
    destroy() {
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
exports.FileView = FileView;
//# sourceMappingURL=FileView.js.map