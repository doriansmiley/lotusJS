'use strict';

/* jasmine specs for controllers go here */
describe('Lavender.BindingUtils', function(){

    it('Testing bind method', function() {
        var testInstance = {
            _color:null,
            color:function(value,chain){
                this._color = value;
            },
            text:null
        }
        var host = new Lavender.Subject();

        var colorWatcher = Lavender.BindingUtils.bind(host, 'color', testInstance, 'color');//bind(host:IBindable, hostProp:string, chain:Object, chainProp:string, isCSS?:boolean, cssProperty?:string
        var textWatcher = Lavender.BindingUtils.bind(host, 'text', testInstance, 'text');//bind(host:IBindable, hostProp:string, chain:Object, chainProp:string, isCSS?:boolean, cssProperty?:string

        expect(testInstance._color).toBe(null);
        expect(testInstance.text).toBe(null);

        colorWatcher.update('#000000', {});
        textWatcher.update('test');

        expect(testInstance._color).toBe('#000000');
        expect(testInstance.text).toBe('test');
    });

});
