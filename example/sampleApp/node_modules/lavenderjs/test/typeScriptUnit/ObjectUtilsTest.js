'use strict';

/* jasmine specs for controllers go here */
describe('Lavender.ChangeWatcher', function(){

    var binder = new Lavender.Binder();

    it('Testing bind method', function() {
        var base = function(color){
            this.color = color;
        }
        base.prototype.getColor = function(){
            return this.color;
        }

        var mixIn = function(){

        }
        mixIn.prototype.addEventListener = function(type, instance, callback){

        }

        mixIn.prototype.removeEventListener = function(type, instance, callback) {

        }

        var sub = function(text,color){
            this.text = text;
            Object.getPrototypeOf(sub.prototype).constructor.call(this,color);
            Lavender.ObjectUtils.mixin(mixIn, sub, this);
        }

        //IMPORTANT:extension must occur before prototype method declarations
        Lavender.ObjectUtils.extend(base,sub);
        sub.prototype.getText = function(){
            return this.text;
        }


        var subInstance = new sub('test','#ffffff');

        expect(subInstance.text).toBe('test');
        expect(subInstance.color).toBe('#ffffff');
        expect(subInstance.getColor()).toBe('#ffffff');
        expect(subInstance.getText()).toBe('test');
        expect(typeof subInstance.addEventListener).toBe('function');
        expect(typeof subInstance.removeEventListener).toBe('function');
        expect(Lavender.ObjectUtils.hasFunction(subInstance, 'removeEventListener')).toBe(true);
        expect(Lavender.ObjectUtils.isPropDefined(subInstance, 'color')).toBe(true);

    });

});
