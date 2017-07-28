import { ISerializeFactory } from "./ISerializeFactory";
/**
 * Created by dsmiley on 7/27/17.
 */
export declare class SerializeFactory implements ISerializeFactory {
    private static INSTANCE;
    constructor();
    static getInstance(): ISerializeFactory;
    getServiceResultParser(parserCode: string): Object;
    getServiceExporter(exporterCode: string): Object;
}
