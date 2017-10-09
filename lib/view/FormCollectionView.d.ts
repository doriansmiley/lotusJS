import { AbstractCollectionView } from "./AbstractCollectionView";
import { AbstractItemView } from "./AbstractItemView";
export declare class FormCollectionView extends AbstractCollectionView {
    protected createChildView(model: Object): AbstractItemView;
}
