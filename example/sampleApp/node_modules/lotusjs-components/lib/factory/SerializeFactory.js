"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 7/27/17.
 */
var SerializeFactory = (function () {
    function SerializeFactory() {
        if (SerializeFactory.INSTANCE != null) {
            throw ('SerializeFactory.INSTANCE: Singleton class has already been instantiated');
        }
        else {
            //perform any required object set up
        }
    }
    SerializeFactory.getInstance = function () {
        if (SerializeFactory.INSTANCE == null) {
            SerializeFactory.INSTANCE = new SerializeFactory();
        }
        return SerializeFactory.INSTANCE;
    };
    /*
     * Stub for override, this method is just an example of how this factory can be used
     * */
    SerializeFactory.prototype.getServiceResultParser = function (parserCode) {
        var parser;
        switch (parserCode) {
            case 'local':
            case 'remote':
            default:
                parser = {};
                break;
        }
        return parser;
    };
    /*
     * Stub for override, this method is just an example of how this factory can be used
     * */
    SerializeFactory.prototype.getServiceExporter = function (exporterCode) {
        var exporter;
        //we resuse parserCode which should really probably be called serializationCode
        switch (exporterCode) {
            case 'local':
            case 'remote':
            default:
                exporter = {};
                break;
        }
        return exporter;
    };
    SerializeFactory.INSTANCE = null;
    return SerializeFactory;
}());
exports.SerializeFactory = SerializeFactory;
//# sourceMappingURL=SerializeFactory.js.map