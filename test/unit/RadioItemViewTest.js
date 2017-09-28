/**
 * Created by dsmiley on 8/19/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('RadioItemView Test', function() {

    it('should test default RadioItemView functions', function() {

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
        component.destroy();
        expect( component.element === null ).toBe( true );
        expect( component.model === null ).toBe( true );
        expect( component.radio === null ).toBe( true );
        expect( component.label === null ).toBe( true );
        expect( component.id ).toBe( null );
    });

});
