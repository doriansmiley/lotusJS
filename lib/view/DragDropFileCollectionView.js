"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 9/27/17.
 */
const FileCollectionView_1 = require("./FileCollectionView");
const SkinPart_1 = require("./SkinPart");
class DragDropFileCollectionView extends FileCollectionView_1.FileCollectionView {
    constructor() {
        super();
    }
    get dragOverClass() {
        return this._dragOverClass;
    }
    set dragOverClass(value) {
        this._dragOverClass = value;
        this.notify(value, 'dragOverClass');
    }
    get dropTarget() {
        return this._dropTarget;
    }
    set dropTarget(value) {
        this._dropTarget = value;
        this.notify(value, 'dropTarget');
    }
    defineSkinParts() {
        super.defineSkinParts();
        this.skinParts.addItem(new SkinPart_1.SkinPart('dropTarget', this, 'dropTarget'));
    }
    onSkinPartAdded(part, element) {
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'dropTarget':
                this.dropTarget.addEventListener("drop", this.onDrop.bind(this), false);
                window.addEventListener("drop", this.onPreventDrop.bind(this), false);
                window.addEventListener("dragover", this.onPreventDrop.bind(this), false);
                this.dropTarget.addEventListener("dragover", this.onDragOver.bind(this), false);
                this.dropTarget.addEventListener("dragenter", this.onDragOver.bind(this), false);
                this.dropTarget.addEventListener("dragleave", this.onDragLeave.bind(this), false);
                break;
        }
    }
    onPreventDrop(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.dragOverClass !== null && this.dragOverClass !== undefined) {
            this.dropTarget.classList.remove(this.dragOverClass);
        }
        let files = (event.dataTransfer !== null && event.dataTransfer !== undefined) ? event.dataTransfer.files : event['originalEvent'].dataTransfer.files;
        //note: files.hasOwnProperty('length') does not work
        if (files === null || files === undefined || !files.length) {
            return;
        }
        else {
            this.uploadFiles(files);
        }
    }
    onDragOver(event) {
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
    }
    onDragLeave(event) {
        if (this.dragOverClass !== null && this.dragOverClass !== undefined) {
            this.dropTarget.classList.remove(this.dragOverClass);
        }
    }
    destroy() {
        super.destroy();
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
    }
}
exports.DragDropFileCollectionView = DragDropFileCollectionView;
//# sourceMappingURL=DragDropFileCollectionView.js.map