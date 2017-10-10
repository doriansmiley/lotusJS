import { AbstractCollectionView } from "./AbstractCollectionView";
export declare class ListCollectionView extends AbstractCollectionView {
    constructor();
    onChange(event: Event): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    protected refreshView(value: any): void;
    destroy(): void;
}
