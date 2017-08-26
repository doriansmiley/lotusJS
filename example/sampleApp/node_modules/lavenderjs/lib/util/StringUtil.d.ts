export declare class StringUtil {
    static substitute(str: string, rest: any[]): string;
    static compressSpaces(str: string): string;
    static trim(str: string): string;
    static isWhitespace(character: string): boolean;
    static convertCharCodesToString(codes: string): String;
    static fixedCharCodeAt(str: string, idx: number): number | false;
}
