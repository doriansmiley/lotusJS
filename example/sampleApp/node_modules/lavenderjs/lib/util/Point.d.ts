/**
 * Created by dsmiley on 6/30/17.
 */
export declare class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    static distance(p1: Point, p2: Point): number;
    static direction(p1: Point, p2: Point): number;
    equal(other: Point): boolean;
    add(other: Point): Point;
    subtract(other: Point): Point;
    scale(scalar: number): Point;
    magnitude(): number;
}
