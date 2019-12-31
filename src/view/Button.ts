import {AbstractComponent} from "./AbstractComponent";
import {SkinPart} from "./SkinPart";
import {ComponentEvent} from "../control/events/ComponentEvent";
/**
 * Created by dsmiley on 7/26/17.
 */
export class Button extends AbstractComponent {
    private _buttonSkinPart: HTMLElement;
    private _type: string;

    constructor() {
        super();
    }

    get buttonSkinPart(): HTMLElement {
        return this._buttonSkinPart;
    }

    set buttonSkinPart(value: HTMLElement) {
        this._buttonSkinPart = value;
        this.notify( value, 'buttonSkinPart' );
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
        this.notify( value, 'type' );
    }

    public onClick(event: Event): void{
        console.log('Lotus.Button.prototype.onClick: event is ' + event);
        console.log('Lotus.Button.prototype.onClick: my id is ' + this.id);
        console.log('Lotus.Button.prototype.onClick: this ' + this);
        this.dispatch(new ComponentEvent(ComponentEvent.CLICK, {target:this.buttonSkinPart, originalEvent:event}))
    }

    public defineSkinParts(): void{
        super.defineSkinParts();
        //set up skin parts
        this.skinParts.addItem(new SkinPart('button', this, 'buttonSkinPart'));
    }

    public onSkinPartAdded(part: string, element: HTMLElement): void{
        super.onSkinPartAdded(part, element);
        switch( part ) {
            case 'button':
                //add button event listener or whatever else yo want to do when this skin part is added
                //you could hold until all skin parts are added and then call addEventListeners
                console.log('Lotus.Button.prototype.onSkinPartAdded: part: ' + part);
                console.log('Lotus.Button.prototype.onSkinPartAdded: skinPart: ' + part);
                this.addEventListeners();
                break;
        }
    }

    public addEventListeners(): void{
        super.addEventListeners();
        this.buttonSkinPart.addEventListener('click', this.onClick.bind(this));
    }

    public removeEventListeners(): void{
        super.removeEventListeners();
        this.buttonSkinPart.removeEventListener('click', this.onClick);
    }

    public destroy(): void{
        super.destroy();
        this.buttonSkinPart = null;
    }

}