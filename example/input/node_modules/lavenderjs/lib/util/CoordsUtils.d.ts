/**
 * Created by dsmiley on 5/19/17.
 */
export declare class CoordsUtils {
    static globalToLocal(container: HTMLElement, pageX: number, pageY: number): Offset;
    static offset(element: HTMLElement): {
        top: number;
        left: number;
    };
    private static getWindow(elem);
    private static isWindow(elem);
}
export declare class Offset {
    top: number;
    left: number;
    constructor(top: any, left: any);
}
