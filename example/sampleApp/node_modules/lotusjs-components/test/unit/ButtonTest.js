/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AbstractComponentTest', function () {

    it('check AbstractComponent function and values', function () {
        var element = document.createElement('div');
        var skinBart = document.createElement('button');
        var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
        var button = new Lotus.Button();
        button.created(element, context);
        button.addSkinPart('button', skinBart);
        expect(button.buttonSkinPart === skinBart).toBe(true);
        button.destroy();
        expect(button.buttonSkinPart === null).toBe(true);

    });
});
