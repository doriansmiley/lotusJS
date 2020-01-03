/**
 * Created by dsmiley on 9/27/17.
 */
import {FileCollectionView} from './FileCollectionView';
import {SkinPart} from './SkinPart';

export class DragDropFileCollectionView extends FileCollectionView {

    constructor () {
        super();
    }

    private _dragOverClass: string;
    private _dropTarget: HTMLElement;

    get dragOverClass (): string {
        return this._dragOverClass;
    }

    set dragOverClass (value: string) {
        this._dragOverClass = value;
        this.notify(value, 'dragOverClass');
    }

    get dropTarget (): HTMLElement {
        return this._dropTarget;
    }

    set dropTarget (value: HTMLElement) {
        this._dropTarget = value;
        this.notify(value, 'dropTarget');
    }

    public defineSkinParts (): void{
        super.defineSkinParts();
        this.skinParts.addItem(new SkinPart('dropTarget', this, 'dropTarget'));
    }

    public onSkinPartAdded (part: string, element: HTMLElement): void{
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'dropTarget':
                this.dropTarget.addEventListener('drop', this.onDrop.bind(this), false);
                window.addEventListener('drop', this.onPreventDrop.bind(this), false);
                window.addEventListener('dragover', this.onPreventDrop.bind(this), false);
                this.dropTarget.addEventListener('dragover', this.onDragOver.bind(this), false);
                this.dropTarget.addEventListener('dragenter', this.onDragOver.bind(this), false);
                this.dropTarget.addEventListener('dragleave', this.onDragLeave.bind(this), false);
                break;
        }
    }

    public onPreventDrop (event: DragEvent): void{
        event.preventDefault();
        event.stopPropagation();
    }

    public onDrop (event: DragEvent): void{
        event.preventDefault();
        event.stopPropagation();
        if (this.dragOverClass !== null && this.dragOverClass !== undefined) {
            this.dropTarget.classList.remove(this.dragOverClass);
        }
        const files = (event.dataTransfer !== null && event.dataTransfer !== undefined) ? event.dataTransfer.files : event['originalEvent'].dataTransfer.files;
        // note: files.hasOwnProperty('length') does not work
        if (files === null || files === undefined || !files.length) {
            return;
        } else {
            this.uploadFiles(files);
        }
    }

    public onDragOver (event: DragEvent): void{
        event.preventDefault();
        event.stopPropagation();
        if (this.dragOverClass !== null && this.dragOverClass !== undefined) {
            this.dropTarget.classList.add(this.dragOverClass);
        }
        if (event.dataTransfer !== null && event.dataTransfer !== undefined && event.dataTransfer.files !== null && event.dataTransfer.files !== undefined) {
            event.dataTransfer.dropEffect = 'copy';
        } else if (event['originalEvent'].dataTransfer.files !== null && event['originalEvent'].dataTransfer.files !== undefined) {
            event['originalEvent'].dataTransfer.dropEffect = 'copy';
        }
    }

    public onDragLeave (event: DragEvent): void{
        if (this.dragOverClass !== null && this.dragOverClass !== undefined) {
            this.dropTarget.classList.remove(this.dragOverClass);
        }
    }

    public destroy (): void{
        super.destroy();
        if (this.dropTarget) {
            this.dropTarget.removeEventListener('drop', this.onDrop);
            this.dropTarget.removeEventListener('dragover', this.onDragOver);
            this.dropTarget.removeEventListener('dragenter', this.onDragOver);
            this.dropTarget.removeEventListener('dragleave', this.onDragLeave);
            window.removeEventListener('drop', this.onPreventDrop, false);
            window.removeEventListener('dragover', this.onPreventDrop, false);
            this.dropTarget = null;
        }
        this.onDrop = null;
        this.onDragOver = null;
        this.dropTarget = null;
    }
}
