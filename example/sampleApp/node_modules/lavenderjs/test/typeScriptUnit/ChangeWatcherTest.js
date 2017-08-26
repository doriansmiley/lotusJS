'use strict';

/* jasmine specs for controllers go here */
describe('Lavender.ChangeWatcher', function(){

    it('Testing update method', function() {
        var testInstance = {
            _color:null,
            color:function(value,chain){
                this._color = value;
            },
            text:null
        }
        var colorWatcher = new Lavender.ChangeWatcher('color', testInstance, 'color');//hostProp:string, chainInstance:Object, chainPropToWatch:string, isCSS:boolean = false, cssProperty?:string
        var textWatcher = new Lavender.ChangeWatcher('text', testInstance, 'text');//hostProp:string, chainInstance:Object, chainPropToWatch:string, isCSS:boolean = false, cssProperty?:string

        expect(testInstance._color).toBe(null);
        expect(testInstance.text).toBe(null);

        colorWatcher.update('#000000', {});
        textWatcher.update('test');

        expect(testInstance._color).toBe('#000000');
        expect(testInstance.text).toBe('test');
    });

});
