/**
 * Created by dsmiley on 8/19/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('RadioItemView Test', function() {

    it('should test default RadioItemView functions', function(done) {
        var handler = {
            onChange:function(event){
                component.removeEventListener(Lotus.ItemViewEvent.ITEM_SELECTED, handler, 'onChange');
                expect(event.type === Lotus.ItemViewEvent.ITEM_SELECTED).toBe(true);
                expect(component.radio.selected).toBe(true);
                expect(component.selected).toBe(true);
                component.destroy();
                expect( component.element === null ).toBe( true );
                expect( component.model === null ).toBe( true );
                expect( component.radio === null ).toBe( true );
                expect( component.label === null ).toBe( true );
                expect( component.id ).toBe( null );
                done();
            }
        };
        var component = new Lotus.RadioItemView();
        var element = document.createElement('div');
        var radio = document.createElement('input');
        radio.setAttribute('data-skin-part', 'radio');
        radio.setAttribute('type', 'radio');
        var label = document.createElement('label');
        label.setAttribute('data-skin-part', 'label');
        element.appendChild(radio);
        element.appendChild(label);
        document.body.appendChild(element);
        component.element = element;
        component.id = '1234';
        var listItemModel = {selected:true, value:{field1:1234,field2:'test'}, label:'Test Label 1', name:'testGroup'};
        //IMPORTANT: the model is always set before  created is called
        component.model = listItemModel;
        component.created(element);
        expect( component.element === element ).toBe( true );
        expect( component.model === listItemModel ).toBe( true );
        expect( component.id ).toBe( '1234' );
        expect( component.radio === radio).toBe( true );
        expect( component.label === label).toBe( true );
        expect( JSON.parse(component.radio.getAttribute('value')).field1 === 1234).toBe( true );
        expect( JSON.parse(component.radio.getAttribute('value')).field2 === 'test').toBe( true );
        expect( component.radio.getAttribute('name') === 'testGroup').toBe( true );
        expect( component.radio.checked).toBe( true );
        expect( component.label.innerHTML === listItemModel.label).toBe( true );
        //test callbackss
        component.addEventListener(Lotus.ItemViewEvent.ITEM_SELECTED , handler, 'onChange');
        component.radio.selected = true;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, true);
        component.onClick(evt);
    });

    it('should test RadioItemView binding functions', function(done) {
        var handler = {
            onChange:function(event){
                component.removeEventListener(Lotus.ItemViewEvent.ITEM_SELECTED, handler, 'onChange');
                expect(event.type === Lotus.ItemViewEvent.ITEM_SELECTED).toBe(true);
                expect( component.radio.checked).toBe( true );
                expect( component.selected ).toBe( true );
                expect( model.selected ).toBe( true );
                component.destroy();
                expect( component.element === null ).toBe( true );
                expect( component.model === null ).toBe( true );
                expect( component.radio === null ).toBe( true );
                expect( component.label === null ).toBe( true );
                expect( component.id ).toBe( null );
                done();
            }
        };
        var component = new Lotus.RadioItemView();
        var element = document.createElement('div');
        var radio = document.createElement('input');
        radio.setAttribute('data-skin-part', 'radio');
        radio.setAttribute('type', 'radio');
        var label = document.createElement('label');
        label.setAttribute('data-skin-part', 'label');
        element.appendChild(radio);
        element.appendChild(label);
        document.body.appendChild(element);
        component.element = element;
        component.id = '1234';
        var model = new Lotus.InputModel();
        model.label = 'test';
        model.value = {field1:1234,field2:'test'};
        model.name = 'someName';
        model.selected = false;
        component.model = model;
        component.created(element);
        expect( component.element === element ).toBe( true );
        expect( component.model === model ).toBe( true );
        expect( component.id ).toBe( '1234' );
        expect( component.radio === radio).toBe( true );
        expect( component.label === label).toBe( true );
        expect( JSON.parse(component.radio.getAttribute('value')).field1 === 1234).toBe( true );
        expect( JSON.parse(component.radio.getAttribute('value')).field2 === 'test').toBe( true );
        expect( component.radio.getAttribute('name') === 'someName').toBe( true );
        expect( component.radio.checked).toBe( false );
        expect( component.label.innerHTML === model.label).toBe( true );
        //test bindings
        model.selected = true;
        expect( component.radio.checked).toBe( true );
        expect( component.selected ).toBe( true );
        component.selected = false;
        expect( component.radio.checked).toBe( false );
        expect( model.selected ).toBe( false );
        //test callbackss
        component.addEventListener(Lotus.ItemViewEvent.ITEM_SELECTED , handler, 'onChange');
        component.radio.checked = true;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, true);
        component.onClick(evt);
    });

});
