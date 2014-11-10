/**
 * Created by dsmiley on 11/10/14.
 */
Lotus.LotusComponentList = function(){
    this.instancesByConstructor = {};
    Lavender.ArrayList.prototype.constructor.call(this);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.ArrayList, Lotus.LotusComponentList);

//All List classes should override the following methods when a hash is required
Lotus.LotusComponentList.prototype.addItem = function (object) {
    //ensure the object is valid before proceeding
    var index = Lavender.ArrayList.prototype.addItem.call(this,object);
    //populate hash
    this.instancesByConstructor[ object.constructor ] = object;
    return index;
}

Lotus.LotusComponentList.prototype.clear = function () {
    //clear hash
    Lavender.ArrayList.prototype.clearHash.call(this, this.instancesByConstructor);
    Lavender.ArrayList.prototype.clear.call(this);
}

Lotus.LotusComponentList.prototype.removeItemAt = function (index) // index must be a number
{
    //clear item from hash
    var object = this.getItemAt( index );
    Lavender.ArrayList.prototype.removeItemFromHash.call(this, this.instancesByConstructor, object.constructor);
    Lavender.ArrayList.prototype.removeItemAt.call(this,index);
}

Lotus.LotusComponentList.prototype.insert = function (object, index) {
    //ensure the object is valid before proceeding
    Lavender.ArrayList.prototype.insert.call(this, object, index);
    //add item to hash
    this.instancesByConstructor[ object.constructor ] = object;
}
//End Lavender.ArrayList Overrides