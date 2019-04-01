"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by dsmiley on 8/1/17.
 */
const Lavender = require("lavenderjs/lib");
class SkinPartList extends Lavender.ArrayList {
    constructor(source, allowDuplicates = true) {
        super(source, allowDuplicates);
        this.skinPartsByLabel = {};
    }
    addItem(object, hash, key) {
        //ensure the object is valid before proceeding
        let index = super.addItem(object, hash, key);
        //populate hash
        this.skinPartsByLabel[object.label] = object;
        return index;
    }
    clear() {
        super.clearHash(this.skinPartsByLabel);
        super.clear();
    }
    removeItemAt(index) {
        let skinPart = this.getItemAt(index);
        super.removeItemFromHash(this.skinPartsByLabel, skinPart.label);
        super.removeItemAt(index);
    }
    insert(object, index, suppressChangeEvent = false, hash, key, replaceIndex = false) {
        //ensure the object is valid before proceeding
        let returnValue = super.insert(object, index, suppressChangeEvent, hash, key, replaceIndex);
        //populate hash
        this.skinPartsByLabel[object.label] = object;
        return returnValue;
    }
}
exports.SkinPartList = SkinPartList;
//# sourceMappingURL=SkinPartList.js.map