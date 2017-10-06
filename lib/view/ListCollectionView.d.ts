/**
 * Created by dsmiley on 9/22/17.
 */
import { AbstractInputCollectionView } from "./AbstractInputCollectionView";
export declare class ListCollectionView extends AbstractInputCollectionView {
    constructor();
    onSkinPartAdded(part: string, element: HTMLElement): void;
    protected refreshView(value: any): void;
    destroy(): void;
}
