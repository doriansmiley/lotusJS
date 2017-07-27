/**
 * Created by dsmiley on 7/26/17.
 */
export interface IComponent {
    destroy(): void;
    created(element: HTMLElement): void;
    inserted(element: HTMLElement): void;
    removed(element: HTMLElement): void;
    attributeChanged(element: HTMLElement): void;
}
