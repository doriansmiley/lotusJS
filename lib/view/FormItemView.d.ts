import { AbstractItemView } from "./AbstractItemView";
import { InputCollectionModel } from "../model/form/InputCollectionModel";
import { LotusHTMLElement } from "../context/LotusHTMLElement";
import { ComponentEvent } from "../control/events/ComponentEvent";
/**
 * Created by dsmiley on 10/12/17.
 */
export declare class FormItemView extends AbstractItemView {
    protected _input: LotusHTMLElement;
    protected _list: LotusHTMLElement;
    protected _radioGroup: LotusHTMLElement;
    protected _file: LotusHTMLElement;
    private _activeSkinPart;
    readonly activeSkinPart: AbstractItemView;
    input: LotusHTMLElement;
    list: LotusHTMLElement;
    radioGroup: LotusHTMLElement;
    file: LotusHTMLElement;
    protected removeSkinPart(element: LotusHTMLElement, parent: HTMLElement): void;
    protected setUpSkinParts(): void;
    protected setUpSkinPart(part: AbstractItemView): void;
    protected setComponentModel(value: InputCollectionModel, component: AbstractItemView): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    onItemDetailReady(event: ComponentEvent): void;
    onReady(): void;
    onModelChange(value: any): void;
    destroy(): void;
}
