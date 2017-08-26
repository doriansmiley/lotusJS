'use strict';

/* jasmine specs for controllers go here */
describe('Lavender.ChangeWatcher', function(){

    var binder = new Lavender.Binder();

    it('Testing bind method', function() {
        var testInstance = {
            _color:null,
            color:function(value,chain){
                this._color = value;
            },
            text:null
        }
        var host = new Lavender.Subject();
        var binder = new Lavender.Binder();
        
        var colorWatcher = binder.bind(host, 'color', testInstance, 'color', false, null, 'group1');//bind(host:IBindable, hostProp:string, chain:Object, chainProp:string, isCSS?:boolean, cssProperty?:string
        var textWatcher = binder.bind(host, 'text', testInstance, 'text');//bind(host:IBindable, hostProp:string, chain:Object, chainProp:string, isCSS?:boolean, cssProperty?:string

        expect(binder.bindingGroups['group1'] instanceof Array).toBe(true);
        expect(binder.bindingGroups['default'] instanceof Array).toBe(true);
        expect(binder.bindingGroups['group1'].length).toBe(1);
        expect(binder.bindingGroups['default'].length).toBe(1);
        expect(testInstance._color).toBe(null);
        expect(testInstance.text).toBe(null);

        binder.unbind('group1');

        expect(binder.bindingGroups['group1']).toBe(undefined);
        expect(binder.bindingGroups['default'].length).toBe(1);

        binder.unbindAll();

        expect(binder.bindingGroups['group1']).toBe(undefined);
        expect(binder.bindingGroups['default']).toBe(undefined);

    });

});
