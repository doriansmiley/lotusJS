'use strict';

/* jasmine specs for controllers go here */
describe('Lavender.Subject', function(){

    it('Testing methods', function() {
        var testInstance = {
            _color:null,
            color:function(value,chain){
                this._color = value;
            },
            text:null
        }

        var subject = new Lavender.Subject()
        var colorWatcher = new Lavender.ChangeWatcher('color', testInstance, 'color');//hostProp:string, chainInstance:Object, chainPropToWatch:string, isCSS:boolean = false, cssProperty?:string
        var textWatcher = new Lavender.ChangeWatcher('text', testInstance, 'text');//hostProp:string, chainInstance:Object, chainPropToWatch:string, isCSS:boolean = false, cssProperty?:string

        subject.addObserver(colorWatcher);
        subject.addObserver(textWatcher);

        expect(testInstance._color).toBe(null);
        expect(testInstance._color).toBe(null);
        expect(subject.observerHash['color'].length).toBe(1);
        expect(subject.observerHash['text'].length).toBe(1);
        expect(subject.observerHash['color'][0]).toBe(colorWatcher);
        expect(subject.observerHash['text'][0]).toBe(textWatcher);

        subject.notify('#000000', 'color');
        subject.notify('test', 'text');

        expect(testInstance._color).toBe('#000000');
        expect(testInstance.text).toBe('test');

        subject.removeObserver(colorWatcher);
        subject.removeObserver(textWatcher);

        expect(subject.observerHash['color'].length).toBe(0);
        expect(subject.observerHash['text'].length).toBe(0);
    });

});
