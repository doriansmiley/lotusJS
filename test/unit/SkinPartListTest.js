/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AbstractComponentTest', function () {

    it('check AbstractComponent function and values', function () {
        var skinPartList = new Lotus.SkinPartList();
        var component1 = new Lotus.AbstractComponent();
        var component2 = new Lotus.AbstractComponent();
        var component3 = new Lotus.AbstractComponent();
        var component4 = new Lotus.AbstractComponent();
        var skinPart1 = new Lotus.SkinPart('testSkinPart1', component1, 'testProperty');
        var skinPart2 = new Lotus.SkinPart('testSkinPart2', component2, 'testProperty');
        var skinPart3 = new Lotus.SkinPart('testSkinPart3', component3, 'testProperty');
        skinPartList.addAll([skinPart1, skinPart2, skinPart3]);
        expect(skinPartList.length()).toBe(3);
        var skinPart4 = new Lotus.SkinPart('testSkinPart4', component4, 'testProperty');
        skinPartList.insert(skinPart4,1);
        expect(skinPartList.getItemAt(1) === skinPart4).toBe(true);
        expect(skinPartList.getItemAt(0) === skinPart1).toBe(true);
        expect(skinPartList.skinPartsByLabel['testSkinPart1'] === skinPart1).toBe(true);
        expect(skinPartList.skinPartsByLabel['testSkinPart2'] === skinPart2).toBe(true);
        expect(skinPartList.skinPartsByLabel['testSkinPart3'] === skinPart3).toBe(true);
        expect(skinPartList.skinPartsByLabel['testSkinPart4'] === skinPart4).toBe(true);

    });
});
