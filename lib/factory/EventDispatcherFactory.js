"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("lavenderjs/lib");
/**
 * Created by dsmiley on 7/27/17.
 */
var EventDispatcherFactory = (function () {
    function EventDispatcherFactory() {
        if (EventDispatcherFactory.INSTANCE != null) {
            throw ('EventDispatcherFactory.INSTANCE: Singleton class has already been instantiated');
        }
        else {
            //perform any required object set up
        }
    }
    EventDispatcherFactory.getInstance = function () {
        if (EventDispatcherFactory.INSTANCE == null) {
            EventDispatcherFactory.INSTANCE = new EventDispatcherFactory();
        }
        return EventDispatcherFactory.INSTANCE;
    };
    EventDispatcherFactory.prototype.getEventDispatcher = function (eventDispatcherCode) {
        if (eventDispatcherCode === void 0) { eventDispatcherCode = 'EventDispatcher'; }
        var dispatcher;
        //config.daoCode defaults to jquery
        switch (eventDispatcherCode) {
            case "EventDispatcher":
            default:
                dispatcher = new lib_1.EventDispatcher();
        }
        return dispatcher;
    };
    EventDispatcherFactory.INSTANCE = null;
    return EventDispatcherFactory;
}());
exports.EventDispatcherFactory = EventDispatcherFactory;
//# sourceMappingURL=EventDispatcherFactory.js.map