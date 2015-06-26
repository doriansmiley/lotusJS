/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('SkinPartTest', function () {

    it('check SkinPart function and values', function () {
        var component = new Lotus.AbstractComponent();
        component.testProperty = null;
        var skinPart = new Lotus.SkinPart('testSkinPart', component, 'testProperty');
        expect(skinPart.label).toBe('testSkinPart');
        component.skinParts.addItem(skinPart);
        var element = document.createElement('div');;
        var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
        component.created(element, context);
        //call add skin part on the component to set the element property of the skin part
        component.addSkinPart('testSkinPart', element);
        expect(skinPart.element === element ).toBe(true);

    });
});
