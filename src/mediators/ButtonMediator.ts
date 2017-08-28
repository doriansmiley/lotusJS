import {AbstractMediator} from "./AbstractMediator";
import {IContext} from "../context/IContext";
import {IComponent} from "../view/IComponent";
/**
 * Created by dsmiley on 7/26/17.
 */
export class ButtonMediator extends AbstractMediator{
    constructor(componentInstance:IComponent, context:IContext){
        super(componentInstance,context);
    }

    protected onClick(event:Event):void{
        console.log('Im the button mediator, I can handle the component click and dispatch an application event.')
    }

    protected addEventListeners():void{
        super.addEventListeners();
        this.componentInstance.addEventListener('click', this, 'onClick');
    }

    protected removeEventListeners():void{
        super.removeEventListeners();
        this.componentInstance.removeEventListener('click', this, 'onClick');
    }

    public toString():string{
        return 'Lotus.ButtonMediator';
    }
}