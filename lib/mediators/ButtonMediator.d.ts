import { AbstractMediator } from "./AbstractMediator";
import { IContext } from "../context/IContext";
import { IComponent } from "../view/IComponent";
import { HttpServiceFactory } from "../factory/HttpServiceFactory";
/**
 * Created by dsmiley on 7/26/17.
 */
export declare class ButtonMediator extends AbstractMediator {
    serviceFactory: HttpServiceFactory;
    constructor(componentInstance: IComponent, context: IContext);
    protected onClick(event: Event): void;
    protected addEventListeners(): void;
    protected removeEventListeners(): void;
    toString(): string;
}
