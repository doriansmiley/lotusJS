/**
 * Created by dsmiley on 9/15/16.
 */
Lotus.AbstractMediator = function (componentInstance, context) {
    var _id = Lavender.UuidUtils.generateUUID();
    var _componentInstance = componentInstance;
    var _context = context;
    // Define our getters and setters
    this.addProperties({
            id: {
                get: function () {
                    return _id;
                },
                set: function (val) {
                    _id = val;
                    this.Notify(val, 'id');
                }
            },
            context: {
                get: function () {
                    return _context;
                },
                set: function (val) {
                    _context = val;
                    this.Notify(val, 'context');
                }
            },
            componentInstance: {
                get: function () {
                    return _componentInstance;
                },
                set: function (val) {
                    _componentInstance = val;
                    this.Notify(val, 'componentInstance');
                }
            }
        }
    );
    Lavender.Subject.prototype.constructor.call(this);
    this.init();
}
/************* Inherit from AbstractEventDispatcher for event dispatching *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lotus.AbstractMediator);

Lotus.AbstractMediator.prototype.init = function () {
    this.addEventListeners();
    this.setUpBindings();
}

//stub for override
Lotus.AbstractMediator.prototype.addEventListeners = function () {

}
//stub for override
Lotus.AbstractMediator.prototype.setUpBindings = function () {

}
//stub for override
Lotus.AbstractMediator.prototype.removeEventListeners = function () {

}

Lotus.AbstractMediator.prototype.removeBindings = function () {
    this.binder.unbindAll();
}

//IMPORTANT: we must override toString so the hashes in mediator map work properly
//read: http://stackoverflow.com/questions/194846/is-there-any-kind-of-hash-code-function-in-javascript
Lotus.AbstractMediator.prototype.toString = function () {
    return this.id;
}

Lotus.AbstractMediator.prototype.destroy = function () {
    this.removeEventListeners();
    this.removeBindings();
    this.id = null;
    this.componentInstance = null;
}