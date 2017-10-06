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
        expect(model.label).toBe('test');
        expect(model.value).toBe(50);
        expect(model.name).toBe('someName');
        expect(model.selected).toBe(true);
    });

  });
});
