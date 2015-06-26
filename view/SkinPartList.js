/**
 * Created by dsmiley on 11/10/14.
 */
Lotus.SkinPartList = function(){
    this.skinPartsByLabel = {};
    Lavender.ArrayList.prototype.constructor.call(this);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.ArrayList, Lotus.SkinPartList);

Lotus.SkinPartList.prototype.validateItem = function (object) {
    //object must be Lotus.SkinPart Object
    if( object instanceof Lotus.SkinPart === false ){
        throw Error('Lotus.SkinPartList.prototype.addItem: object must be of type Lotus.SkinPart');
    }
}

//All List classes should override the following methods when a hash is required
Lotus.SkinPartList.prototype.addItem = function (object) {
    //ensure the object is valid before proceeding
    var index = Lavender.ArrayList.prototype.addItem.call(this,object);
    //populate hash
    this.skinPartsByLabel[ object.label ] = object;
    return index;
}

Lotus.SkinPartList.prototype.clear = function () {
    //clear hash
    Lavender.ArrayList.prototype.clearHash.call(this, this.skinPartsByLabel);
    Lavender.ArrayList.prototype.clear.call(this);
}

Lotus.SkinPartList.prototype.removeItemAt = function (index) // index must be a number
{
    //clear item from hash
    var skinPart = this.getItemAt( index );
    Lavender.ArrayList.prototype.removeItemFromHash.call(this, this.skinPartsByLabel, skinPart.label);
    Lavender.ArrayList.prototype.removeItemAt.call(this,index);
}

Lotus.SkinPartList.prototype.insert = function (object, index) {
    //ensure the object is valid before proceeding
    Lavender.ArrayList.prototype.insert.call(this, object, index);
    //add item to hash
    this.skinPartsByLabel[ object.label ] = object;
}
//End Lavender.ArrayList Overrides