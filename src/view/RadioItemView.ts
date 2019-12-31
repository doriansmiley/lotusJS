/**
 * Created by dsmiley on 9/22/17.
 */
import {AbstractSelectableFormInput} from './AbstractSelectableFormInput';
import {SkinPart} from './SkinPart';
import {ItemViewEvent} from '../control/events/ItemViewEvent';
import {InputModel} from '../model/form/InputModel';

export class RadioItemView extends AbstractSelectableFormInput {

    private _radio: HTMLInputElement;
    private _label: HTMLLabelElement;

    constructor() {
        super();
    }

    get radio(): HTMLInputElement {
        return this._radio;
    }

    set radio(value: HTMLInputElement) {
        this._radio = value;
    }

    get label(): HTMLLabelElement {
        return this._label;
    }

    set label(value: HTMLLabelElement) {
        this._label = value;
    }

    public onClick(event: Event): void {
        this.selected = this.radio.checked;
    }

    protected refreshView(selected: boolean): void {
        if (this.radio) {
            this.radio.checked = selected;
        }
    }

    public addEventListeners(): void {
        super.addEventListeners();
        this.radio.addEventListener('click', this.onClick.bind(this));
    }

    public removeEventListeners(): void {
        super.removeEventListeners();
        if (this.radio) {
            this.radio.removeEventListener('click', this.onClick);
        }
    }

    public defineSkinParts(): void {
        super.defineSkinParts();
        this.skinParts.addItem(new SkinPart('radio', this, 'radio'));
        this.skinParts.addItem(new SkinPart('label', this, 'label'));
    }

    public onSkinPartAdded(part: string, element: HTMLElement): void {
        super.onSkinPartAdded(part, element);
        switch (part) {
            case 'radio':
                //set up listitem value and label
                this.radio.value = (typeof (this.model as InputModel).value == 'object') ? JSON.stringify((this.model as InputModel).value) : (this.model as InputModel).value;
                this.radio.name = (this.model as InputModel).name;
                this.radio.checked = this.selected;
                this.addEventListeners();
                break;
            case 'label':
                this.label.innerHTML = (this.model as InputModel).label;
                break;
        }
    }

    public destroy(): void {
        super.destroy();
        this.removeEventListeners();
        this.radio = null;
        this.label = null;
    }
}
