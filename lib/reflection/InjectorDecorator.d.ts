/**
 * Created by dsmiley on 8/30/17.
 */
import 'reflect-metadata';
export declare type injectionResolver = {
    property: string;
    type: Function;
};
export declare function inject(target: any, key: string): void;
export declare function injectable(target: any): any;
export declare function bindable(target: any, key: string): void;
