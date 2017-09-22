import { Point } from './Point';
export declare type containerParams = {
    width: number;
    height: number;
    rotation: number;
    top: number;
    left: number;
};
export declare type pathArray = Point[];
export declare class PathUtils {
    static parsePathFromString(strPath: string): Array<Object>;
    static isPoint(obj: object): boolean;
    static convertPathToString(arrPath: pathArray): string;
    static movePath(arrPath: pathArray, dx: number, dy: number, updateSource?: boolean): pathArray;
    static scalePath(arrPath: pathArray, scaleX: number, scaleY: number, aroundPoint: Point, updateSource?: boolean): pathArray;
    static rotatePath(arrPath: pathArray, aroundPoint: Point, degAngle: number, updateSource?: boolean): pathArray;
    static convertPathFromLocalToGlobal(arrPath: pathArray, containerParams: containerParams): pathArray;
    static convertPathFromGlobalToLocal(arrPath: pathArray, containerParams: containerParams): pathArray;
}
export declare class PathParser {
    private arrPath;
    private i;
    command: string | Point;
    previousCommand: string | Point;
    start: Point;
    control: Point;
    current: Point;
    constructor(arrPath: pathArray);
    isEnd(): boolean;
    isCommandOrEnd(): boolean;
    isRelativeCommand(): boolean;
    getToken(): Point;
    nextCommand(): void;
    getPoint(): Point;
    getAsControlPoint(): Point;
    getAsCurrentPoint(): Point;
    getReflectedControlPoint(): Point;
    makeAbsolute(p: Point): Point;
}
