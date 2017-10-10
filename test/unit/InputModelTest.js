'use strict';

/* jasmine specs for controllers go here */
describe('FileTest', function() {

  describe('Lotus.InputModel', function(){

    it('should test default InputModel values', function() {
        var model = new Lotus.InputModel();
        model.format = function(value){
            if(!value){
                return null;
            }
            return 'xxx-' + value;
        }
        model.isValid = function(value){
            if(!this.required){
                return true;
            }
            if(!value){
                return false;
            }
            return value.indexOf('xxx-') >= 0 && value.length > 4;
        }
        model.label = 'test';//String
        model.value = '50';//int
        model.name = 'someName';//String
        model.selected = true;//String
        model.required = true;
        expect(model.label).toBe('test');
        expect(model.value).toBe('xxx-50');
        expect(model.name).toBe('someName');
        expect(model.selected).toBe(true);
        expect(model.required).toBe(true);
        expect(model.validate()).toBe(true);
        model.value = '';
        expect(model.validate()).toBe(false);
        model.value = null;
        expect(model.validate()).toBe(false);
        model.required = false;
        model.value = '';
        expect(model.validate()).toBe(true);
        model.value = null;
        expect(model.validate()).toBe(true);
    });

  });
});
