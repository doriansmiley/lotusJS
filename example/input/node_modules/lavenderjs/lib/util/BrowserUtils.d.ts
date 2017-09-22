/**
 * Created by dsmiley on 5/18/17.
 */
export declare class BrowserInfo {
    browser: string;
    version: string;
    constructor(browser?: string, version?: string);
}
export declare class BrowserUtils {
    static uaMatch(ua: string): BrowserInfo;
    static getBrowser(): BrowserInfo;
}
