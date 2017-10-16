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
var AbstractThumbnailView_1 = require("./AbstractThumbnailView");
var SkinPart_1 = require("./SkinPart");
var FileEvent_1 = require("../control/events/FileEvent");
var Lavender = require("lavenderjs/lib");
var File = (function (_super) {
    __extends(File, _super);
    function File() {
        var _this = _super.call(this) || this;
        _this._id = Math.random();
        _this.id = Math.random();
        return _this;
    }
    Object.defineProperty(File.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
            this.notify(value, 'size');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "fileObj", {
        get: function () {
            return this._fileObj;
        },
        set: function (value) {
            this._fileObj = value;
            this.notify(value, 'fileObj');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "percentLoaded", {
        get: function () {
            return this._percentLoaded;
        },
        set: function (value) {
            this._percentLoaded = value;
            this.notify(value, 'percentLoaded');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
            this.notify(value, 'state');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "thumbnail", {
        get: function () {
            return this._thumbnail;
        },
        set: function (value) {
            this._thumbnail = value;
            this.notify(value, 'thumbnail');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.notify(value, 'type');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
            this.notify(value, 'name');
        },
        enumerable: true,
        configurable: true
    });
    File.PENDING = 'pending'; //unstarted
    File.PROGRESS = 'progress';
    File.LOAD = 'load';
    File.ERROR = 'error';
    File.ABORT = 'abort';
    return File;
}(Lavender.Subject));
exports.File = File;
var FileView = (function (_super) {
    __extends(FileView, _super);
    function FileView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(FileView.prototype, "fileLabel", {
        get: function () {
            return this._fileLabel;
        },
        set: function (value) {
            this._fileLabel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "fileTypeLabel", {
        get: function () {
            return this._fileTypeLabel;
        },
        set: function (value) {
            this._fileTypeLabel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "progressBar", {
        get: function () {
            return this._progressBar;
        },
        set: function (value) {
            this._progressBar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "statusIndicator", {
        get: function () {
            return this._statusIndicator;
        },
        set: function (value) {
            this._statusIndicator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "loadIndicator", {
        get: function () {
            return this._loadIndicator;
        },
        set: function (value) {
            this._loadIndicator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "errorIndicator", {
        get: function () {
            return this._errorIndicator;
        },
        set: function (value) {
            this._errorIndicator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "progressIndicator", {
        get: function () {
            return this._progressIndicator;
        },
        set: function (value) {
            this._progressIndicator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "pendingIndicator", {
        get: function () {
            return this._pendingIndicator;
        },
        set: function (value) {
            this._pendingIndicator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "abortIndicator", {
        get: function () {
            return this._abortIndicator;
        },
        set: function (value) {
            this._abortIndicator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "cancelBtn", {
        get: function () {
            return this._cancelBtn;
        },
        set: function (value) {
            this._cancelBtn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "clearBtn", {
        get: function () {
            return this._clearBtn;
        },
        set: function (value) {
            this._clearBtn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "cancelBtnDisplay", {
        get: function () {
            return this._cancelBtnDisplay;
        },
        set: function (value) {
            this._cancelBtnDisplay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileView.prototype, "clearBtnDisplay", {
        get: function () {
            return this._clearBtnDisplay;
        },
        set: function (value) {
            this._clearBtnDisplay = value;
        },
        enumerable: true,
        configurable: true
    });
    FileView.prototype.setUpBindings = function () {
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
    };
    FileView.prototype.setStatusIndicator = function (node) {
        if (this.statusIndicator !== null && this.statusIndicator !== undefined) {
            //remove child nodes
            while (this.statusIndicator.firstChild) {
                this.statusIndicator.removeChild(this.statusIndicator.firstChild);
            }
            this.statusIndicator.appendChild(node);
        }
    };
    FileView.prototype.onPercentChange = function (value) {
        if (this.progressBar !== null && this.progressBar !== undefined) {
            //get the max width
            var maxWidth = (this.progressBar.style.hasOwnProperty('maxWidth') && this.progressBar.style.maxWidth.length > 0) ? parseInt(this.progressBar.style.maxWidth) : null;
            //set width based on % value of parent width
            var parentWidth = parseFloat(window.getComputedStyle(this.progressBar.parentNode).width);
            var newWidth = (value / 1) * parentWidth;
            this.progressBar.style.width = (maxWidth !== null && newWidth > maxWidth) ? maxWidth + 'px' : newWidth + 'px';
        }
    };
    FileView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setUpBindings();
    };
    FileView.prototype.onStateChange = function (value) {
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
    };
    FileView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
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
    };
    FileView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
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
    };
    FileView.prototype.onClearBtnClick = function (event) {
        this.dispatch(new FileEvent_1.FileEvent(FileEvent_1.FileEvent.REMOVE_FILE_FROM_COLLECTION, { file: this.model }));
    };
    FileView.prototype.onCancelBtnClick = function (event) {
        this.dispatch(new FileEvent_1.FileEvent(FileEvent_1.FileEvent.ABORT_FILE_UPLOAD, { file: this.model }));
    };
    FileView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
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
    };
    return FileView;
}(AbstractThumbnailView_1.AbstractThumbnailView));
exports.FileView = FileView;
//# sourceMappingURL=FileView.js.map