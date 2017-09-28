/**
 * Created by dsmiley on 9/28/17.
 */
import { AbstractThumbnailView } from "./AbstractThumbnailView";
export declare class Image extends AbstractThumbnailView {
    private _loadingSVG;
    private _loadingSVGStyle;
    loadingSVG: HTMLElement;
    protected getImageURL(model?: Object): string;
    defineSkinParts(): void;
    protected onImageLoad(event: Event): void;
    protected setThumbnailSrc(src: string): void;
    onSkinPartAdded(part: string, element: HTMLElement): void;
    destroy(): void;
}
