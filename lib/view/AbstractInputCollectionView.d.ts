import { AbstractCollectionView } from "./AbstractCollectionView";
import { ItemViewEvent } from "../control/events/ItemViewEvent";
/**
 * Created by dsmiley on 10/5/17.
 */
export declare abstract class AbstractInputCollectionView extends AbstractCollectionView {
    protected onItemSelectedDeselect(event: ItemViewEvent): void;
}
