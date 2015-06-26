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
        element.setAttribute('attribute-id', '1234');
        element.innerHTML = '<div skin-part="testProperty">' +
            '</div>';
        component.created(element);
        expect(component.element === element).toBe(true);
        expect(component.id === '1234').toBe(true);
        expect(component.skinParts.skinPartsByLabel['testProperty'].element === element.firstChild ).toBe(true);
    });
});
