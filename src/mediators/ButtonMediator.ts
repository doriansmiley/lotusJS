import {AbstractMediator} from "./AbstractMediator";
import {IContext} from "../context/IContext";
import {IComponent} from "../view/IComponent";
import {inject} from "../reflection/InjectorDecorator";
import {HttpServiceFactory} from "../factory/HttpServiceFactory";
/**
 * Created by dsmiley on 7/26/17.
 */

export class ButtonMediator extends AbstractMediator{

    constructor(componentInstance:IComponent, context:IContext){
        console.log('ButtonMediator constructor called')
        super(componentInstance,context);
    }

    protected onClick(event:Event):void{
        console.log('Im the button mediator, I can handle the component click and dispatch an application event.');
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