/**
 * Created by dsmiley on 9/27/17.
 */
import { FileCollectionView } from "./FileCollectionView";
export declare class DragDropFileCollectionView extends FileCollectionView {
    constructor();
    private _dragOverClass;
    private _dropTarget;
    dragOverClass: string;
    dropTarget: HTMLElement;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    onPreventDrop(event: DragEvent): void;
    onDrop(event: DragEvent): void;
    onDragOver(event: DragEvent): void;
    onDragLeave(event: DragEvent): void;
    destroy(): void;
}
