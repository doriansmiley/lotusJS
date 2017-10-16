/**
 * Created by dsmiley on 9/26/17.
 */
import { AbstractThumbnailView } from "./AbstractThumbnailView";
import * as Lavender from 'lavenderjs/lib';
export declare class File extends Lavender.Subject {
    static PENDING: string;
    static PROGRESS: string;
    static LOAD: string;
    static ERROR: string;
    static ABORT: string;
    private _percentLoaded;
    private _state;
    private _thumbnail;
    private _type;
    private _name;
    private _fileObj;
    private _size;
    private _id;
    id: number;
    constructor();
    size: number;
    fileObj: any;
    percentLoaded: number;
    state: string;
    thumbnail: string;
    type: string;
    name: string;
}
export declare class FileView extends AbstractThumbnailView {
    constructor();
    private _fileLabel;
    private _fileTypeLabel;
    private _progressBar;
    private _statusIndicator;
    private _loadIndicator;
    private _errorIndicator;
    private _progressIndicator;
    private _pendingIndicator;
    private _abortIndicator;
    private _cancelBtn;
    private _clearBtn;
    private _cancelBtnDisplay;
    private _clearBtnDisplay;
    fileLabel: HTMLLabelElement;
    fileTypeLabel: HTMLLabelElement;
    progressBar: HTMLElement;
    statusIndicator: HTMLElement;
    loadIndicator: HTMLElement;
    errorIndicator: HTMLElement;
    progressIndicator: HTMLElement;
    pendingIndicator: HTMLElement;
    abortIndicator: HTMLElement;
    cancelBtn: HTMLButtonElement;
    clearBtn: HTMLButtonElement;
    cancelBtnDisplay: string;
    clearBtnDisplay: string;
    protected setUpBindings(): void;
    protected setStatusIndicator(node: HTMLElement): void;
    protected onPercentChange(value: number): void;
    init(): void;
    onStateChange(value: string): void;
    defineSkinParts(): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    onClearBtnClick(event: Event): void;
    onCancelBtnClick(event: Event): void;
    destroy(): void;
}
