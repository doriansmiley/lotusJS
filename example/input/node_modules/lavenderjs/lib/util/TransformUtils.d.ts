import { Geometry } from './Geometry';
import { Point } from './Point';
export declare type originalState = {
    width: number;
    height: number;
    rotation: number;
    top: number;
    left: number;
};
export declare class TransformUtils {
    static calculateMovement(originalState: originalState, delta: {
        x: number;
        y: number;
    }): any;
    static calculateResizeAroundAnchorPoint(originalState: originalState, sizeDelta: {
        width: number;
        height: number;
    }, anchorPos: Point, proportionalResizer: any): {
        geometry: Geometry;
    };
    static calculateRotate(originalState: originalState, deltaAngle: number): {
        rotation: number;
    };
    static getPosAfterResizeAroundAnchorPoint(originalState: originalState, sizeAfterTransform: {
        width: number;
        height: number;
    }, anchorPos: Point): {
        left: number;
        top: number;
    };
    static getDefaultAnchorPos(): Point;
    static applyConstraints(originalState: originalState, currentState: any, stateAfterTransform: any, anchorPos: Point, constraints: any): void;
    static applyTransform(obj: any, stateAfterTransform: any): void;
}
