/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('Input', function () {

    it('check Input function and values', function (done) {
        var element = document.createElement('div');
        element.setAttribute('data-attribute-valid-class', 'myValidClass');
        element.setAttribute('data-attribute-invalid-class', 'myInvalidClass');
        var skinBart = document.createElement('input');
        var context = new Lotus.Context(new Lavender.Config());
        var input = new Lotus.Input('text');
        var handler = {
            onChange:function(event){
                expect(event.type === Lotus.InputEvent.CHANGE).toBe(true);
                expect(event.payload.target.value === 'test value').toBe(true);
                expect(event.payload.target.getAttribute('type') === 'text').toBe(true);
                input.removeEventListener(Lotus.InputEvent.CHANGE, handler, 'onChange');
                input.destroy();
                expect(input.inputSkinPart === null).toBe(true);
                done();
            }
        };
        input.created(element, context);
        input.addSkinPart('input', skinBart);
        expect(input.inputSkinPart === skinBart).toBe(true);
        expect(input.invalidClass).toBe('myInvalidClass');
        expect(input.validClass).toBe('myValidClass');
        expect(input.inputSkinPart.classList.contains(input.invalidClass)).toBe(false);
        expect(input.inputSkinPart.classList.contains(input.validClass)).toBe(false);
        input.isValid = false;
        expect(input.inputSkinPart.classList.contains(input.invalidClass)).toBe(true);
        expect(input.inputSkinPart.classList.contains(input.validClass)).toBe(false);
        input.isValid = true;
        expect(input.inputSkinPart.classList.contains(input.invalidClass)).toBe(false);
        expect(input.inputSkinPart.classList.contains(input.validClass)).toBe(true);
        input.inputSkinPart.value = 'test value';
        input.addEventListener(Lotus.InputEvent.CHANGE, handler, 'onChange');
        //note setting the inputs value in javascript will not trigger an on change event by itself
        //we have to manually dispatch and the change event is triggered after the element is interacted with by the end user
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        input.inputSkinPart.dispatchEvent(evt);
    });

    it('check Input two way binding using InputModel;', function (done) {
        var element = document.createElement('div');
        var skinBart = document.createElement('input');
        var context = new Lotus.Context(new Lavender.Config());
        var input = new Lotus.Input('text');
        var handler = {
            onChange:function(event){
                input.removeEventListener(Lotus.InputEvent.CHANGE, handler, 'onChange');
                expect(event.type === Lotus.InputEvent.CHANGE).toBe(true);
                expect(model.value === 'xxx-test value').toBe(true);
                expect(input.value === 'xxx-test value').toBe(true);
                expect(input.inputSkinPart.value === 'xxx-test value').toBe(true);
                expect(event.payload.target.getAttribute('type') === 'text').toBe(true);
                //test two way binding
                model.value = 'another value';
                expect(model.value === 'xxx-another value').toBe(true);
                expect(model.value === 'xxx-another value').toBe(true);
                expect(input.value  === 'xxx-another value').toBe(true);
                expect(input.inputSkinPart.value  === 'xxx-another value').toBe(true);
                input.inputSkinPart.value = 'new value';
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                //event callbacks and bindings are executes synchronously
                input.inputSkinPart.dispatchEvent(evt);
                expect(model.value === 'xxx-new value').toBe(true);
                expect(model.value === 'xxx-new value').toBe(true);
                expect(input.value  === 'xxx-new value').toBe(true);
                input.value = 'hello world';
                expect(model.value === 'xxx-hello world').toBe(true);
                expect(model.value === 'xxx-hello world').toBe(true);
                expect(input.value  === 'xxx-hello world').toBe(true);
                //end binding tests
                input.destroy();
                expect(input.inputSkinPart === null).toBe(true);
                expect(input.model === null).toBe(true);
                done();
            }
        };
        input.created(element, context);
        input.addSkinPart('input', skinBart);
        var model = new Lotus.InputModel('some label', 'test value', null, false, true);
        model.format = function(value){
            return 'xxx-' + value;
        }
        model.value = 'test value';//triggers formatting
        input.model = model;
        expect(input.inputSkinPart === skinBart).toBe(true);
        expect(input.invalidClass).toBe(null);
        expect(input.validClass).toBe(null);
        expect(input.inputSkinPart.classList.contains(input.invalidClass)).toBe(false);
        expect(input.inputSkinPart.classList.contains(input.validClass)).toBe(false);
        input.isValid = true;
        expect(input.inputSkinPart.classList.contains(input.invalidClass)).toBe(false);
        expect(input.inputSkinPart.classList.contains(input.validClass)).toBe(false);
        input.addEventListener(Lotus.InputEvent.CHANGE, handler, 'onChange');
        //note setting the inputs value in javascript will not trigger an on change event by itself
        //we have to manually dispatch and the change event is triggered after the element is interacted with by the end user
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        input.inputSkinPart.dispatchEvent(evt);
    });
});
