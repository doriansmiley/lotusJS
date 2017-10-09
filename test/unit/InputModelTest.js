'use strict';

/* jasmine specs for controllers go here */
describe('FileTest', function() {

  describe('Lotus.InputModel', function(){

    it('should test default InputModel values', function() {
        var model = new Lotus.InputModel();
        model.label = 'test';//String
        model.value = 50;//int
        model.name = 'someName';//String
        model.selected = true;//String
        model.required = true;
        model.format = function(value){
            return 'xxx-' + value;
        }
        model.validate = function(value){
            return value.indexOf('xxx-') >= 0;
        }
        expect(model.label).toBe('test');
        expect(model.value).toBe(50);
        expect(model.name).toBe('someName');
        expect(model.selected).toBe(true);
        expect(model.required).toBe(true);
        model.value = model.format(model.value);
        expect(model.value).toBe('xxx-50');
        expect(model.validate(model.value)).toBe(true);
    });

  });
});
