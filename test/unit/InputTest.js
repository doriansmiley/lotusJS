/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('Input', function () {

    it('check Input function and values', function (done) {
        var element = document.createElement('div');
        var skinBart = document.createElement('input');
        var context = new Lotus.Context(new Lavender.Config());
        var input = new Lotus.Input('text');
        var handler = {
            onChange:function(event){
                expect(event.type === Lotus.InputEvent.CHANGE).toBe(true);
                expect(event.payload.target.value === 'xxx-test value').toBe(true);
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
        input.addEventListener(Lotus.InputEvent.CHANGE, handler, 'onChange');
        input.format = function(value){
            return 'xxx-' + value;
        }
        input.inputSkinPart.value = 'test value';
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
                expect(event.type === Lotus.InputEvent.CHANGE).toBe(true);
                expect(event.payload.target.value === 'xxx-test value').toBe(true);
                expect(event.payload.target.getAttribute('type') === 'text').toBe(true);
                //test two way binding
                expect(model.value === 'xxx-test value').toBe(true);
                model.value = 'another value';
                expect(event.payload.target.value === 'xxx-another value').toBe(true);
                //end binding tests
                expect(model.value === 'xxx-another value').toBe(true);
                input.removeEventListener(Lotus.InputEvent.CHANGE, handler, 'onChange');
                input.destroy();
                expect(input.inputSkinPart === null).toBe(true);
                done();
            }
        };
        input.created(element, context);
        input.addSkinPart('input', skinBart);
        var model = new Lotus.InputModel();
        model.label = 'test';//String
        model.value = 50;//int
        model.name = 'someName';//String
        model.selected = true;//String
        input.model = model;
        expect(input.inputSkinPart === skinBart).toBe(true);
        input.addEventListener(Lotus.InputEvent.CHANGE, handler, 'onChange');
        input.format = function(value){
            return 'xxx-' + value;
        }
        input.inputSkinPart.value = 'test value';
        //note setting the inputs value in javascript will not trigger an on change event by itself
        //we have to manually dispatch and the change event is triggered after the element is interacted with by the end user
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        input.inputSkinPart.dispatchEvent(evt);
    });
});
