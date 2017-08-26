/**
 * Created by dsmiley on 5/11/17.
 */
export declare class ObjectUtils {
    constructor();
    static extend(base: any, sub: any): void;
    static mixin(base: any, sub: any, subInstance: any, overwriteInstanceVariables?: boolean): any;
    static hasFunction(obj: Object, prop: string): boolean;
    static isPropDefined(obj: Object, prop: string): boolean;
}
