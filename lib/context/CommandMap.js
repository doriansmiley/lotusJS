"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandMap = (function () {
    function CommandMap(context) {
        //Note: this could be improved by creating read only accessor methods for instanceMap and eventFunctionMap
        this.eventFunctionMap = {};
        this.instanceMap = {};
        this.context = context;
    }
    CommandMap.prototype.addCommand = function (eventType, handler, functionName, useSingleton) {
        if (functionName === void 0) { functionName = 'execute'; }
        if (useSingleton === void 0) { useSingleton = false; }
        if (this.eventFunctionMap[eventType] === null || this.eventFunctionMap[eventType] === undefined) {
            this.eventFunctionMap[eventType] = [];
        }
        if (this.hasCommandMap(eventType, handler, functionName)) {
            return; //don't add the handler/function twice
        }
        this.eventFunctionMap[eventType].push({ eventType: eventType, handler: handler, functionName: functionName, useSingleton: useSingleton });
        if (useSingleton) {
            if (this.instanceMap[eventType] === null || this.instanceMap[eventType] === undefined) {
                this.instanceMap[eventType] = {};
            }
            if (this.instanceMap[eventType][handler] === null || this.instanceMap[eventType][handler] === undefined) {
                this.instanceMap[eventType][handler] = new handler(this.context);
            }
        }
        if (!this.context.eventDispatcher.canListen(eventType, this, 'routeEventToCommand')) {
            this.context.eventDispatcher.addEventListener(eventType, this, 'routeEventToCommand');
        }
    };
    CommandMap.prototype.hasCommandMap = function (eventType, handler, functionName) {
        var hasCommand = false;
        if (this.eventFunctionMap[eventType] !== null && this.eventFunctionMap[eventType] !== undefined) {
            var mapArray = this.eventFunctionMap[eventType];
            for (var itemIndex = 0; itemIndex < mapArray.length; itemIndex++) {
                var item = mapArray[itemIndex];
                if (item.handler == handler && item.functionName == functionName) {
                    hasCommand = true;
                    break;
                }
            }
        }
        return hasCommand;
    };
    CommandMap.prototype.removeCommand = function (eventType, handler) {
        if (this.eventFunctionMap[eventType] !== null && this.eventFunctionMap[eventType] !== undefined) {
            var mapArray = this.eventFunctionMap[eventType];
            for (var itemIndex = mapArray.length - 1; itemIndex >= 0; itemIndex--) {
                var item = mapArray[itemIndex];
                if (item.handler == handler) {
                    //remove the item form the array
                    switch (itemIndex) {
                        case 0:
                            mapArray.shift();
                            break;
                        case mapArray.length - 1:
                            mapArray.pop();
                            break;
                        default:
                            var head = mapArray.slice(0, itemIndex);
                            var tail = mapArray.slice(itemIndex + 1);
                            mapArray = head.concat(tail);
                            break;
                    }
                }
            }
            if (this.eventFunctionMap[eventType].length <= 0) {
                this.context.eventDispatcher.removeEventListener(eventType, this, 'routeEventToCommand');
                delete this.eventFunctionMap[eventType];
            }
        }
    };
    CommandMap.prototype.removeAllCommands = function () {
        this.eventFunctionMap = {};
        this.instanceMap = {};
        this.context.eventDispatcher.removeAllEventListeners(this);
    };
    CommandMap.prototype.routeEventToCommand = function (event) {
        if (this.eventFunctionMap[event.type] !== null && this.eventFunctionMap[event.type] !== undefined) {
            var mapArray = this.eventFunctionMap[event.type];
            for (var itemIndex = 0; itemIndex < mapArray.length; itemIndex++) {
                var item = mapArray[itemIndex];
                if (item.useSingleton) {
                    this.instanceMap[item.event.type][item.handler][item.functionName]();
                }
                else {
                    var instance;
                    if (typeof item.handler === 'object') {
                        instance = item.handler;
                    }
                    else {
                        //IMPORTANT: only constructor function will get the context! This is by design as it's assumed preconstructed objects have all required dependencies
                        instance = new item.handler(this.context);
                    }
                    instance[item.functionName](event);
                }
            }
        }
    };
    return CommandMap;
}());
exports.CommandMap = CommandMap;
//# sourceMappingURL=CommandMap.js.map