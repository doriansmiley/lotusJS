/**
 * Created by dsmiley on 9/22/17.
 */
import {AbstractInputCollectionView} from './AbstractInputCollectionView';
import {AbstractItemView} from './AbstractItemView';
import {ListItemView} from './ListItemView';
import {InputCollectionModel} from '../model/form/InputCollectionModel';
import {SkinPart} from './SkinPart';

export class ListCollectionView extends AbstractInputCollectionView {

    private _prompt: HTMLOptionElement;

    constructor() {
        super();
    }


    get prompt(): HTMLOptionElement {
        return this._prompt;
    }

    set prompt(value: HTMLOptionElement) {
        this._prompt = value;
        this.notify(value, 'prompt');
    }

    public onChange(event: Event): void{
        // account for the existence of the prompt which adds an additional list item! this offset the index in this.childViews which does not include the prompt.
        const index = (this.prompt) ? (event.target as HTMLSelectElement).selectedIndex - 1 : (event.target as HTMLSelectElement).selectedIndex;
        if (index < 0) {
            return;// prompt is selected
        }
        // get the associated item view for the selected list item
        const itemView: ListItemView = this.childViews.getItemAt(index);
        // html option elements appear to not dispatch,or at least not bubble the click event on list items
        // so we force it here
        itemView.onClick();
    }

    public addEventListeners(): void{
        super.addEventListeners();
        this.collectionContainer.addEventListener('change', this.onChange.bind(this));
    }

    public removeEventListeners(): void{
        super.removeEventListeners();
        this.collectionContainer.removeEventListener('change', this.onChange);
    }

    protected addPrompt(): void{
        if (this.prompt && this.model && this.model.label) {
            this.prompt.innerHTML = this.model.label;
        }
    }

    protected addCollectionEventListeners(): void{
        super.addCollectionEventListeners();
        this.addPrompt();
    }

    public defineSkinParts(): void{
        super.defineSkinParts();
        // set up skin parts
        this.skinParts.addItem(new SkinPart('prompt', this, 'prompt'));
    }

    public onSkinPartAdded(part: string, element: HTMLElement): void{
        super.onSkinPartAdded(part, element);
        switch (part) {
            // required, defines the layout for child views
            case 'collectionContainer':
                this.addEventListeners();
                break;
            case 'prompt':
                this.addPrompt();
                break;

        }
    }

    protected refreshView(value: any): void{
        if (this.collectionContainer) {
            (this.collectionContainer as HTMLSelectElement).value = value;
        }
        if (this.selectedItem && !this.selectedItem.element['selected']) {
            this.selectedItem.element['selected'] = true;
        }
    }

    public destroy(): void{
        this.removeEventListeners();
        super.destroy();
        this.prompt = null;
    }
}