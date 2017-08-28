import {AbstractMediator} from "./AbstractMediator";
import {IContext} from "../context/IContext";
import {IComponent} from "../view/IComponent";
/**
 * Created by dsmiley on 7/26/17.
 */
export class ListMediator extends AbstractMediator{
    constructor(componentInstance:IComponent, context:IContext){
        super(componentInstance,context);
    }

    public toString():string{
        return 'Lotus.ListMediator';
    }
}