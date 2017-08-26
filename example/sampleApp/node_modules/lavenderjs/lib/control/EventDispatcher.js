"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Listener = (function () {
    function Listener(handler, instance) {
        this.handler = handler;
        this.instance = instance;
    }
    return Listener;
}());
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.handlersByEventName = {};
    }
    ;
    EventDispatcher.prototype.addEventListener = function (event, instance, handler) {
        if (this.handlersByEventName[event] === null || this.handlersByEventName[event] === undefined) {
            this.handlersByEventName[event] = [];
        }
        this.handlersByEventName[event].push(new Listener(handler, instance));
    };
    EventDispatcher.prototype.canListen = function (eventType, instance, handler) {
        var canListen = false;
        if (this.handlersByEventName[eventType] !== null && this.handlersByEventName[eventType] !== undefined) {
            for (var handlerIndex = 0; handlerIndex < this.handlersByEventName[eventType].length; handlerIndex++) {
                var handlerFunctionName = this.handlersByEventName[eventType][handlerIndex].handler;
                var objectInstance = this.handlersByEventName[eventType][handlerIndex].instance;
                if (handlerFunctionName == handler && objectInstance == instance) {
                    canListen = true;
                    break;
                }
            }
        }
        return canListen;
    };
    EventDispatcher.prototype.removeEventListener = function (event, instance, handler) {
        if (this.handlersByEventName[event] === null || this.handlersByEventName[event] === undefined) {
            return;
        }
        for (var handlerIndex = 0; handlerIndex < this.handlersByEventName[event].length; handlerIndex++) {
            if (this.handlersByEventName[event][handlerIndex].instance == instance && this.handlersByEventName[event][handlerIndex].handler == handler) {
                var itemToRemove = this.handlersByEventName[event][handlerIndex];
                switch (handlerIndex) {
                    case 0:
                        this.handlersByEventName[event].shift();
                        break;
                    case this.handlersByEventName[event].length - 1:
                        this.handlersByEventName[event].pop();
                        break;
                    default:
                        var head = this.handlersByEventName[event].slice(0, handlerIndex);
                        var tail = this.handlersByEventName[event].slice(handlerIndex + 1);
                        this.handlersByEventName[event] = head.concat(tail);
                        break;
                }
                //there can be only one item matching event, instance, handler so we return here
                return itemToRemove;
            }
        }
    };
    EventDispatcher.prototype.removeAllEventListeners = function (instance) {
        for (var event_1 in this.handlersByEventName) {
            for (var handlerIndex = this.handlersByEventName[event_1].length - 1; handlerIndex >= 0; handlerIndex--) {
                if (this.handlersByEventName[event_1][handlerIndex].instance == instance) {
                    this.removeEventListener(event_1, instance, this.handlersByEventName[event_1][handlerIndex].handler);
                }
            }
        }
    };
    EventDispatcher.prototype.dispatch = function (event) {
        if (this.handlersByEventName[event.type] === null || this.handlersByEventName[event.type] === undefined) {
            return;
        }
        // We need to make a copy of event handles before dispatching.
        // If the handler removes itself from the event queue during dispatching, it triggers removeEventListener, which
        // changes the array and this messes up the entire dispatch process (some handlers are never called).
        var dispatchToList = this.handlersByEventName[event.type].slice();
        var len = dispatchToList.length;
        for (var handlerIndex = 0; handlerIndex < len; ++handlerIndex) {
            var handlerFunctionName = dispatchToList[handlerIndex].handler;
            var instance = dispatchToList[handlerIndex].instance;
            instance[handlerFunctionName](event);
        }
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;
//# sourceMappingURL=EventDispatcher.js.map