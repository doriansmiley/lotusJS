import { AbstractMediator } from "./AbstractMediator";
import { IContext } from "../context/IContext";
import { IComponent } from "../view/IComponent";
/**
 * Created by dsmiley on 7/26/17.
 */
export declare class ListMediator extends AbstractMediator {
    constructor(componentInstance: IComponent, context: IContext);
    toString(): string;
}
