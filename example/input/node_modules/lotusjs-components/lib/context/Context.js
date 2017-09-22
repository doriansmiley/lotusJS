"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentMap_1 = require("./ComponentMap");
/**
 * Created by dsmiley on 7/24/17.
 */
var Context = (function () {
    function Context(config, params) {
        this.config = config;
        //IMPORTANT: must occur first so application event bus is configured
        this.componentMap = new ComponentMap_1.ComponentMap(this); //create factory if we require sub classes one day
        this.startUp();
    }
    Context.prototype.startUp = function () {
        this.mapComponents();
    };
    Context.prototype.mapComponents = function () {
    };
    return Context;
}());
exports.Context = Context;
//# sourceMappingURL=Context.js.map