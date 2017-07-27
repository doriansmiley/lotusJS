"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentMap_1 = require("./ComponentMap");
var CommandMap_1 = require("./CommandMap");
var Injector_1 = require("./Injector");
var MediatorMap_1 = require("./MediatorMap");
var EventDispatcherFactory_1 = require("../factory/EventDispatcherFactory");
/**
 * Created by dsmiley on 7/24/17.
 */
var Context = (function () {
    function Context(config, params) {
        this.config = config;
        //IMPORTANT: must occur first so application event bus is configured
        this.eventDispatcher = EventDispatcherFactory_1.EventDispatcherFactory.getInstance().getEventDispatcher();
        this.componentMap = new ComponentMap_1.ComponentMap(this); //create factory if we require sub classes one day
        this.commandMap = new CommandMap_1.CommandMap(this); //create factory if we require sub classes one day
        this.injector = new Injector_1.Injector(this); //create factory if we require sub classes one day
        this.mediatorMap = new MediatorMap_1.MediatorMap(this);
        this.startUp();
    }
    Context.prototype.startUp = function () {
    };
    Context.prototype.mapComponents = function () {
    };
    Context.prototype.mapCommands = function () {
    };
    Context.prototype.mapObjects = function () {
    };
    Context.prototype.mapMediators = function () {
    };
    return Context;
}());
exports.Context = Context;
//# sourceMappingURL=Context.js.map