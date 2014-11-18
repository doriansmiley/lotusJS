/**
 * Created by dsmiley on 3/3/14.
 */
Lotus.CommandMap = function( eventDispatcher ){
    this.eventFunctionMap = {};
    this.instanceMap = {};
    this.eventDispatcher = eventDispatcher;
}

Lotus.CommandMap.prototype.addCommand = function( eventType, handler, functionName, useSingleton ){
    if( useSingleton === null || useSingleton === undefined ){
        useSingleton = false;
    }
    if( functionName === null || functionName === undefined ){
        functionName = 'execute';
    }
    if( this.eventFunctionMap[eventType] === null || this.eventFunctionMap[eventType] === undefined ){
        this.eventFunctionMap[eventType] = [];
    }

    if( this.hasCommandMap( eventType, handler, functionName ) ){
        return;//don't add the handler/function twice
    }

    this.eventFunctionMap[eventType].push({eventType:eventType, handler:handler, functionName:functionName, useSingleton:useSingleton});

    if( useSingleton ){
        if( this.instanceMap[eventType] === null ||  this.instanceMap[eventType] === undefined ){
            this.instanceMap[eventType] = {};
        }
        if( this.instanceMap[eventType][handler] === null ||  this.instanceMap[eventType][handler] === undefined ){
            this.instanceMap[eventType][handler] = new handler();
        }
    }
    if( !this.eventDispatcher.canListen(eventType, this, 'routeEventToCommand') ){
        this.eventDispatcher.addEventListener(eventType, this, 'routeEventToCommand');
    }
}

Lotus.CommandMap.prototype.hasCommandMap = function( eventType, handler, functionName ){
    var hasCommand = false;
    if( this.eventFunctionMap[eventType] !== null && this.eventFunctionMap[eventType] !== undefined ){
        var mapArray = this.eventFunctionMap[eventType];
        for( var itemIndex = 0; itemIndex < mapArray.length; itemIndex++){
            var item = mapArray[ itemIndex ];
            if( item.handler == handler && item.functionName == functionName ){
                hasCommand = true;
                break;
            }
        }
    }
    return hasCommand;
}

Lotus.CommandMap.prototype.removeCommand = function( eventType, handler ){
    if( this.eventFunctionMap[eventType] !== null && this.eventFunctionMap[eventType] !== undefined ){
        var mapArray = this.eventFunctionMap[eventType];
        for( var itemIndex = mapArray.length - 1; itemIndex >= 0; itemIndex--){
            var item = mapArray[ itemIndex ];
            if( item.handler == handler ){
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
        if( this.eventFunctionMap[eventType].length <= 0 ){
            this.eventDispatcher.removeEventListener(eventType, this, 'routeEventToCommand');
            delete this.eventFunctionMap[eventType];
        }
    }
}

Lotus.CommandMap.prototype.removeAllCommands = function(){
    this.eventFunctionMap = {};
    this.instanceMap = {};
    this.eventDispatcher.removeAllEventListeners(this);
}

Lotus.CommandMap.prototype.routeEventToCommand = function( event ){
    if( this.eventFunctionMap[event.type] !== null && this.eventFunctionMap[event.type] !== undefined ){
        var mapArray = this.eventFunctionMap[event.type];
        for( var itemIndex = 0; itemIndex < mapArray.length; itemIndex++){
            var item = mapArray[ itemIndex ];
            if( item.useSingleton ){
                this.instanceMap[item.event.type][item.handler][item.functionName]();
            }else{
                var instance;
                if( typeof item.handler === 'object' ){
                    instance = item.handler;
                }else{
                    instance = new item.handler(event);
                }
                instance[item.functionName](event);
            }
        }
    }
}