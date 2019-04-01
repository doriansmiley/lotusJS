"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("lavenderjs/lib");
class ComponentList extends lib_1.ArrayList {
    constructor() {
        super();
        this.instancesByConstructor = {};
    }
    addToHash(object) {
        if (this.instancesByConstructor[object.constructor] === null || this.instancesByConstructor[object.constructor] === undefined) {
            this.instancesByConstructor[object.constructor] = [];
        }
        this.instancesByConstructor[object.constructor].push(object);
    }
    removeItemFromHash(hash, object) {
        let objects = hash[object.constructor];
        if (objects === null || objects === undefined || objects.length < 1) {
            return;
        }
        for (let i = 0; i < objects.length; i++) {
            if (objects[i] == object) {
                //remove the item from the array
                switch (i) {
                    case 0:
                        objects.shift();
                        break;
                    case objects.length - 1:
                        objects.pop();
                        break;
                    default:
                        let head = objects.slice(0, i);
                        let tail = objects.slice(i + 1);
                        objects = head.concat(tail);
                        break;
                }
                break;
            }
        }
    }
    addItem(object, hash, key) {
        let index = super.addItem(object, hash, key);
        //populate hash
        this.addToHash(object);
        return index;
    }
    clear() {
        super.clearHash(this.instancesByConstructor);
        super.clear();
    }
    removeItemAt(index) {
        let object = this.getItemAt(index);
        this.removeItemFromHash(this.instancesByConstructor, object);
        super.removeItemAt(index);
    }
    insert(object, index, suppressChangeEvent = false, hash, key, replaceIndex = false) {
        let returnValue = super.insert(object, index, suppressChangeEvent, hash, key, replaceIndex);
        this.addToHash(object);
        return returnValue;
    }
}
exports.ComponentList = ComponentList;
//# sourceMappingURL=ComponentList.js.map