import { AbstractCollectionView } from "./AbstractCollectionView";
import { ItemViewEvent } from "../control/events/ItemViewEvent";
import { InputCollectionModel } from "../model/form/InputCollectionModel";
/**
 * Created by dsmiley on 10/5/17.
 */
export declare abstract class AbstractInputCollectionView extends AbstractCollectionView {
    private _model;
    model: InputCollectionModel;
    attachValidationClass(classToAdd: string, classToRemove: string): void;
    protected onItemSelectedDeselect(event: ItemViewEvent): void;
}
