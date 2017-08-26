export declare type widthHeightObject = {
    width: number;
    height: number;
};
export declare class ResizeUtils {
    static getScaleToFill(objSize: widthHeightObject, sizeToFill: widthHeightObject): number;
    static getScaleToFit(objSize: widthHeightObject, sizeToFit: widthHeightObject): number;
}
