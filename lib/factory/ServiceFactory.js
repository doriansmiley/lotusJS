"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SampleService_1 = require("../control/service/SampleService");
/**
 * Created by dsmiley on 7/27/17.
 */
var ServiceFactory = (function () {
    function ServiceFactory() {
        if (ServiceFactory.INSTANCE != null) {
            throw ('ServiceFactory.INSTANCE: Singleton class has already been instantiated');
        }
        else {
            //perform any required object set up
        }
    }
    ServiceFactory.getInstance = function () {
        if (ServiceFactory.INSTANCE == null) {
            ServiceFactory.INSTANCE = new ServiceFactory();
        }
        return ServiceFactory.INSTANCE;
    };
    ServiceFactory.prototype.getService = function (config) {
        var service;
        switch (config.serviceCode) {
            default:
                service = new SampleService_1.SampleService(config);
        }
        return service;
    };
    ServiceFactory.INSTANCE = null;
    return ServiceFactory;
}());
exports.ServiceFactory = ServiceFactory;
//# sourceMappingURL=ServiceFactory.js.map