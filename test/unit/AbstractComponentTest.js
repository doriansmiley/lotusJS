/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AbstractComponentTest', function () {

    it('check AbstractComponent function and values', function () {
        var component = new Lotus.AbstractComponent();
        component.testProperty = null;
        var skinPart = new Lotus.SkinPart('testSkinPart', component, 'testProperty');
        component.skinParts.addItem(skinPart);
        var element = {};
        var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
        component.created(element, context);
        expect(component.element === element).toBe(true);
        expect(component.context === context).toBe(true);
        component.addSkinPart('testSkinPart', element);
        expect(component.testProperty === element).toBe(true);
        expect(component.skinParts.skinPartsByLabel['testSkinPart'].element === element ).toBe(true);

    });
});
