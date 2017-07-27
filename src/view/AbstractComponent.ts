import {IComponent} from "./IComponent";
/**
 * Created by dsmiley on 7/26/17.
 */
export class AbstractComponent implements IComponent{

    constructor(){

    }

    public destroy():void{
        console.log('AbstractComponent.destroy called');
    }
    public created(element:HTMLElement):void{
        console.log('AbstractComponent.created called');
    }

    public inserted(element:HTMLElement):void{
        console.log('AbstractComponent.inserted called');
    }

    public removed(element:HTMLElement):void{
        console.log('AbstractComponent.removed called');
    }
    
    public attributeChanged(element:HTMLElement):void{
        console.log('AbstractComponent.attributeChanged called');
    }
}