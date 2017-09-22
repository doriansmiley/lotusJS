/**
 * Created by dsmiley on 5/18/17.
 */
export declare class ColorUtils {
    static rgb2hex(rgb: string): string;
    static hexToRgb(hex: string): string;
    static hexToRgbA(hex: string): string;
    static hexToRgbArray(hex: string): Array<number>;
    static rgbToHsl(r: number, g: number, b: number): Array<number>;
    static rgbToHsv(r: number, g: number, b: number): Array<number>;
}
