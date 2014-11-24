/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AbstractComponentTest', function () {

    it('check AbstractComponent function and values', function () {
        var component = new Lotus.AbstractComponent();
        component.testProperty = null;
        component.skinParts.addItem(new Lotus.SkinPart('testSkinPart', this, 'testProperty'));
        var element = {};
        var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
        component.created(element, context);
        expect(component.element === element).toBe(true);
        expect(component.context === context).toBe(true);
        component.addSkinPart('testSkinPart', element);
        expect(component.testProperty.element === element).toBe(true);

    });
});
