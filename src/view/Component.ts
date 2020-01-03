/**
 * Created by dsmiley on 7/26/17.
 */
import * as Lavender from 'lavenderjs/lib';

export interface Component extends Lavender.IEventDispatcher{
    ready: boolean;
    destroy(): void;
    created(element: HTMLElement): void;
    inserted(element: HTMLElement): void;
    removed(element: HTMLElement): void;
    attributeChanged(element: HTMLElement): void;
    removeEventListeners(): void;
    addEventListeners(): void;
    onSkinPartAdded (part: string, element: Element): void;
}
