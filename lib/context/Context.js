"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentMap_1 = require("./ComponentMap");
/**
 * Created by dsmiley on 7/24/17.
 */
class Context {
    constructor(config, params) {
        this.config = config;
        //IMPORTANT: must occur first so application event bus is configured
        this.componentMap = new ComponentMap_1.ComponentMap(this); //create factory if we require sub classes one day
        this.startUp();
    }
    startUp() {
        this.mapComponents();
    }
    mapComponents() {
    }
}
exports.Context = Context;
//# sourceMappingURL=Context.js.map