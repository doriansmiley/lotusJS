/**
 * Created by dsmiley on 8/23/17.
 */
import * as Lavender from 'lavenderjs/lib';
import { AbstractCollectionView } from "./AbstractCollectionView";
export declare class AbstractRecordSetCollectionView extends AbstractCollectionView {
    private _navBtnEnabledClass;
    private _navBtnDisabledClass;
    private _nextBtn;
    private _pervBtn;
    private _firstBtn;
    private _lastBtn;
    private _recordSet;
    recordSet: Lavender.RecordSet;
    navBtnEnabledClass: string;
    navBtnDisabledClass: string;
    nextBtn: HTMLElement;
    pervBtn: HTMLElement;
    firstBtn: HTMLElement;
    lastBtn: HTMLElement;
    constructor();
    protected addCollectionEventListeners(): void;
    protected removeCollectionEventListeners(): void;
    protected onClickHandler(event: Event): void;
    protected refreshNavButtonDisplay(button: HTMLElement, type: String): void;
    protected onResultsChange(event: Lavender.RecordSetEvent): void;
    protected onPageListChange(value: Lavender.IList): void;
    protected initCollection(): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    render(): void;
    destroy(): void;
}
