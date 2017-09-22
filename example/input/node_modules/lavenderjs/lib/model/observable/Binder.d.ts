import { IBindable } from './IBindable';
export declare class Binder {
    private bindingGroups;
    constructor();
    bind(host: IBindable, hostProp: string, chain: Object, chainProp: string, isCSS?: boolean, cssProperty?: string, group?: string): void;
    unbind(group?: string): void;
    unbindAll(): void;
}
