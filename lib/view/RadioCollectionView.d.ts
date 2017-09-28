/**
 * Created by dsmiley on 9/22/17.
 */
import { ItemViewEvent } from "../control/events/ItemViewEvent";
import { AbstractCollectionView } from "./AbstractCollectionView";
export declare class RadioCollectionView extends AbstractCollectionView {
    constructor();
    protected onItemSelectedDeselect(event: ItemViewEvent): void;
}
