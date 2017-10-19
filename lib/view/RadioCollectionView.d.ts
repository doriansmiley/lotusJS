/**
 * Created by dsmiley on 9/22/17.
 */
import { AbstractInputCollectionView } from "./AbstractInputCollectionView";
export declare class RadioCollectionView extends AbstractInputCollectionView {
    private _legend;
    constructor();
    legend: HTMLLegendElement;
    protected refreshView(value: any): void;
    protected addCollectionEventListeners(): void;
    protected setLegend(): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    destroy(): void;
}
