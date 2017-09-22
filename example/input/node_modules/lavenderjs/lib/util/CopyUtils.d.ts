/**
 * Created by dsmiley on 6/30/17.
 */
export declare class CopyUtils {
    static copyInheredValues(child: Object, parent: Object): void;
    static overwriteValues(child: Object, parent: Object, excludeObjects?: Object): void;
    static concatObjects(objects: Array<Object>): Object;
    static copyProperties(target: Object, source: Object): void;
}
