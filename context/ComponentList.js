/**
 * Created by dsmiley on 11/10/14.
 */
Lotus.ComponentList = function(){
    this.instancesByConstructor = {};
    Lavender.ArrayList.prototype.constructor.call(this);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.ArrayList, Lotus.ComponentList);

Lotus.ComponentList.prototype.addToHash = function (object) {
    if( this.instancesByConstructor[ object.constructor ] === null || this.instancesByConstructor[ object.constructor ] === undefined ){
        this.instancesByConstructor[ object.constructor ] = [];
    }
    this.instancesByConstructor[ object.constructor ].push( object );
}

Lotus.ComponentList.prototype.removeItemFromHash = function ( hash, object ) {
    var objects = hash[ object.constructor ];
    if( objects === null || objects === undefined ||  objects.length < 1 ){
        return;
    }
    for(var i = 0; i < objects.length; i++ ){
        if( objects[i] == object ){
            //remove the item from the array
            switch (i) {
                case 0:
                    objects.shift();
                    break;
                case objects.length - 1:
                    objects.pop();
                    break;
                default:
                    var head = objects.slice(0, i);
                    var tail = objects.slice(i + 1);
                    hash[ object.constructor ] = head.concat(tail);
                    break;
            }
            break;
        }
    }
}

//All List classes should override the following methods when a hash is required
Lotus.ComponentList.prototype.addItem = function (object) {
    //ensure the object is valid before proceeding
    var index = Lavender.ArrayList.prototype.addItem.call(this,object);
    //populate hash
    this.addToHash(object);
    return index;
}

Lotus.ComponentList.prototype.clear = function () {
    //clear hash
    Lavender.ArrayList.prototype.clearHash.call(this, this.instancesByConstructor);
    Lavender.ArrayList.prototype.clear.call(this);
}

Lotus.ComponentList.prototype.removeItemAt = function (index) // index must be a number
{
    //clear item from hash
    var object = this.getItemAt( index );
    this.removeItemFromHash.call(this, this.instancesByConstructor, object);
    Lavender.ArrayList.prototype.removeItemAt.call(this,index);
}

Lotus.ComponentList.prototype.insert = function (object, index) {
    //ensure the object is valid before proceeding
    Lavender.ArrayList.prototype.insert.call(this, object, index);
    //populate hash
    this.addToHash(object);
}
//End Lavender.ArrayList Overrides