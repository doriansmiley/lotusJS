/**
 * Created by dsmiley on 6/30/17.
 */
import { Point } from './Point';
export declare class Matrix {
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
    static IDENTITY: Matrix;
    static HORIZONTAL_FLIP: Matrix;
    static VERTICAL_FLIP: Matrix;
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
    static rotation(theta: number, aboutPoint?: Point): Matrix;
    static scale(sx: number, sy: number, aboutPoint: Point): Matrix;
    static translation(tx: number, ty: number): Matrix;
    concat(matrix: Matrix): Matrix;
    deltaTransformPoint(point: Point): Point;
    inverse(): Matrix;
    rotate(theta: number, aboutPoint: Point): Matrix;
    scale(sx: number, sy: number, aboutPoint: Point): Matrix;
    transformPoint(point: Point): Point;
    translate(tx: number, ty: number): Matrix;
}
