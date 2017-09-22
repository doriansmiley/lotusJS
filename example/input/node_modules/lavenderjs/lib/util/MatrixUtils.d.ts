import { Point } from './Point';
import { Matrix } from './Matrix';
export declare class MatrixUtils {
    static rotate(matrix: Matrix, degAngle: number, point: Point): Matrix;
    static matrixToCSS(matrix: Matrix): string;
    static getRotationAngleForElement(element: HTMLElement): number;
    static getRotationAngle(matrix: Matrix): number;
    static getMatrix(cssTransformMatrix: string): Matrix;
}
