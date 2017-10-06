/**
 * Created by dsmiley on 10/5/17.
 */
import { AbstractItemView } from "./AbstractItemView";
export declare abstract class AbstractSelectableFormInput extends AbstractItemView {
    private _selected;
    constructor();
    selected: boolean;
    protected refreshView(selected: boolean): void;
    resetState(): void;
    onModelChange(value: Object): void;
}
