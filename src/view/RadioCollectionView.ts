/**
 * Created by dsmiley on 9/22/17.
 */
import {AbstractInputCollectionView} from './AbstractInputCollectionView';
import {SkinPart} from './SkinPart';

export class RadioCollectionView extends AbstractInputCollectionView {

    private _legend: HTMLLegendElement;

    constructor () {
        super();
    }


    get legend (): HTMLLegendElement {
        return this._legend;
    }

    set legend (value: HTMLLegendElement) {
        this._legend = value;
        this.notify(value, 'legend');
    }

    protected refreshView (value: any): void{
        if (this.selectedItem) {
            this.selectedItem.element['checked'] = true;
        }
    }

    protected addCollectionEventListeners (): void{
        super.addCollectionEventListeners();
        this.setLegend();
    }

    protected setLegend (): void{
        if (this.legend && this.model && this.model.label) {
            this.legend.innerHTML = this.model.label;
        }
    }

    public defineSkinParts (): void{
        super.defineSkinParts();
        // set up skin parts
        this.skinParts.addItem(new SkinPart('legend', this, 'legend'));
    }

    public onSkinPartAdded (part: string, element: HTMLElement): void{
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'label': {
                this.setLegend();
                break;
            }
        }
    }

    public destroy (): void{
        super.destroy();
        this.legend = null;
    }
}
