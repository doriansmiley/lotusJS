/**
 * Created by dsmiley on 7/27/17.
 */
export interface ISerializeFactory{
    getServiceResultParser(parserCode:string):Object;
    getServiceExporter(exporterCode:string):Object;

}