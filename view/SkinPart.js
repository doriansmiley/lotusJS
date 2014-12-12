/**
 * Created by dsmiley on 11/10/14.
 */
Lotus.SkinPart = function( label, instance, attribute ){
    if( label === null || label === undefined ){
        throw new Error('Lotus.SkinPart.prototype.constructor: label is required')
    }
    var _label = label;
    var _attribute = attribute;
    var _instance = instance;
    // Define our getters and setters
    this.addProperties({
            label: {
                get: function() {
                    return _label;
                }
            },
            element: {
                get: function() {
                    return _instance[_attribute];
                },
                set: function(val) {
                    _instance[_attribute] = val;
                    this.Notify( val, 'element' );
                }
            }
        }
    );
    Lavender.Subject.prototype.constructor.call(this);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lotus.SkinPart);