import {ISerializeFactory} from "./ISerializeFactory";
/**
 * Created by dsmiley on 7/27/17.
 */
export class SerializeFactory implements ISerializeFactory{
    private static INSTANCE:ISerializeFactory = null;

    constructor(){
        if (SerializeFactory.INSTANCE != null ) {
            throw( 'SerializeFactory.INSTANCE: Singleton class has already been instantiated' );
        } else {
            //perform any required object set up
        }
    }

    public static getInstance():ISerializeFactory{
        if (SerializeFactory.INSTANCE == null) {
            SerializeFactory.INSTANCE = new SerializeFactory();
        }
        return SerializeFactory.INSTANCE;
    }

    /*
     * Stub for override, this method is just an example of how this factory can be used
     * */
    public getServiceResultParser(parserCode:string):Object{
        let parser;
        switch( parserCode ){
            case 'local':
            case 'remote':
            default:
                parser = {};
                break;
        }
        return parser;
    }

    /*
     * Stub for override, this method is just an example of how this factory can be used
     * */
    public getServiceExporter(exporterCode:string):Object{
        let exporter;
        //we resuse parserCode which should really probably be called serializationCode
        switch( exporterCode ){
            case 'local':
            case 'remote':
            default:
                exporter = {};
                break;
        }
        return exporter;
    }
}