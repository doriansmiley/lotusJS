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
 * Created by dsmiley on 9/27/17.
 */
var FileCollectionView_1 = require("./FileCollectionView");
var SkinPart_1 = require("./SkinPart");
var DragDropFileCollectionView = (function (_super) {
    __extends(DragDropFileCollectionView, _super);
    function DragDropFileCollectionView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(DragDropFileCollectionView.prototype, "dragOverClass", {
        get: function () {
            return this._dragOverClass;
        },
        set: function (value) {
            this._dragOverClass = value;
            this.notify(value, 'dragOverClass');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragDropFileCollectionView.prototype, "dropTarget", {
        get: function () {
            return this._dropTarget;
        },
        set: function (value) {
            this._dropTarget = value;
            this.notify(value, 'dropTarget');
        },
        enumerable: true,
        configurable: true
    });
    DragDropFileCollectionView.prototype.defineSkinParts = function () {
        _super.prototype.defineSkinParts.call(this);
        this.skinParts.addItem(new SkinPart_1.SkinPart('dropTarget', this, 'dropTarget'));
    };
    DragDropFileCollectionView.prototype.onSkinPartAdded = function (part, element) {
        _super.prototype.onSkinPartAdded.call(this, part, element);
        switch (part) {
            case 'dropTarget':
                this.dropTarget = element;
                this.dropTarget.addEventListener("drop", this.onDrop.bind(this), false);
                window.addEventListener("drop", this.onPreventDrop.bind(this), false);
                window.addEventListener("dragover", this.onPreventDrop.bind(this), false);
                this.dropTarget.addEventListener("dragover", this.onDragOver.bind(this), false);
                this.dropTarget.addEventListener("dragenter", this.onDragOver.bind(this), false);
                this.dropTarget.addEventListener("dragleave", this.onDragLeave.bind(this), false);
                break;
        }
    };
    DragDropFileCollectionView.prototype.onPreventDrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    DragDropFileCollectionView.prototype.onDrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.dragOverClass !== null && this.dragOverClass !== undefined) {
            this.dropTarget.classList.remove(this.dragOverClass);
        }
        var files = (event.dataTransfer !== null && event.dataTransfer !== undefined) ? event.dataTransfer.files : event['originalEvent'].dataTransfer.files;
        //note: files.hasOwnProperty('length') does not work
        if (files === null || files === undefined || !files.length) {
            return;
        }
        else {
            this.uploadFiles(files);
        }
    };
    DragDropFileCollectionView.prototype.onDragOver = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.dragOverClass !== null && this.dragOverClass !== undefined) {
            this.dropTarget.classList.add(this.dragOverClass);
        }
        if (event.dataTransfer !== null && event.dataTransfer !== undefined && event.dataTransfer.files !== null && event.dataTransfer.files !== undefined) {
            event.dataTransfer.dropEffect = 'copy';
        }
        else if (event['originalEvent'].dataTransfer.files !== null && event['originalEvent'].dataTransfer.files !== undefined) {
            event['originalEvent'].dataTransfer.dropEffect = 'copy';
        }
    };
    DragDropFileCollectionView.prototype.onDragLeave = function (event) {
        if (this.dragOverClass !== null && this.dragOverClass !== undefined) {
            this.dropTarget.classList.remove(this.dragOverClass);
        }
    };
    DragDropFileCollectionView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.dropTarget) {
            this.dropTarget.removeEventListener("drop", this.onDrop);
            this.dropTarget.removeEventListener("dragover", this.onDragOver);
            this.dropTarget.removeEventListener("dragenter", this.onDragOver);
            this.dropTarget.removeEventListener("dragleave", this.onDragLeave);
            window.removeEventListener("drop", this.onPreventDrop, false);
            window.removeEventListener("dragover", this.onPreventDrop, false);
            this.dropTarget = null;
        }
        this.onDrop = null;
        this.onDragOver = null;
        this.dropTarget = null;
    };
    return DragDropFileCollectionView;
}(FileCollectionView_1.FileCollectionView));
exports.DragDropFileCollectionView = DragDropFileCollectionView;
//# sourceMappingURL=DragDropFileCollectionView.js.map