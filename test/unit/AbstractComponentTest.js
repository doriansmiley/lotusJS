/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AbstractComponentTest', function () {

    it('check AbstractComponent function and values', function () {
        var component = new Lotus.AbstractComponent();
        component.testProperty = null;
        var skinPart = new Lotus.SkinPart('testProperty', component, 'testProperty');
        component.skinParts.addItem(skinPart);
        var element = document.createElement('div');
        element.setAttribute('data-attribute-id', '1234');
        element.setAttribute('data-attribute-valid-class', 'myValidClass');
        element.setAttribute('data-attribute-invalid-class', 'myInvalidClass');
        element.innerHTML = '<div data-skin-part="testProperty">' +
            '</div>';
        component.created(element);
        expect(component.element === element).toBe(true);
        expect(component.ready).toBe(true);
        expect(component.id > 0).toBe(true);
        expect(component.invalidClass).toBe('myInvalidClass');
        expect(component.validClass).toBe('myValidClass');
        expect(component.skinParts.skinPartsByLabel['testProperty'].element === element.firstChild ).toBe(true);
    });
});
