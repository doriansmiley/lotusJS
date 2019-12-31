/**
 * Created by dsmiley on 9/22/17.
 */
import {AbstractSelectableFormInput} from './AbstractSelectableFormInput';
import {SkinPart} from './SkinPart';
import {InputModel} from '../model/form/InputModel';

export class ListItemView extends AbstractSelectableFormInput {

    private _option: HTMLOptionElement;

    constructor() {
        super();
    }

    get option(): HTMLOptionElement {
        return this._option;
    }

    set option(value: HTMLOptionElement) {
        this._option = value;
    }

    protected refreshView(selected: boolean): void{
        if (this.option) {
            this.option.selected = selected;
        }
    }

    public onClick(event?: Event): void{
        this.selected = true;
    }

    public addEventListeners(): void{
        super.addEventListeners();
        this.option.addEventListener('click', this.onClick.bind(this));
    }

    public removeEventListeners(): void{
        super.removeEventListeners();
        if (this.option) {
            this.option.removeEventListener('click', this.onClick);
        }
    }

    public defineSkinParts(): void{
        super.defineSkinParts();
        // set up skin parts. We use the term itemTemplate as it allows us to include this component as a nested component in a collection view.
        // Choosing another name would require it be wrapped in a itemTemplate skin part
        this.skinParts.addItem(new SkinPart('itemTemplate', this, 'option'));
    }

    public onSkinPartAdded(part: string, element: HTMLElement): void{
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'itemTemplate':
                // set up listitem value and label
                this.option.value = (typeof (this.model as InputModel).value == 'object') ? JSON.stringify((this.model as InputModel).value) : (this.model as InputModel).value;
                this.option.innerHTML = (this.model as InputModel).label;
                this.option.selected = this.selected;
                if (this.selected) {
                    this.onClick();
                }
                break;
        }
    }

    public destroy(): void{
        super.destroy();
        this.option = null;
    }
}