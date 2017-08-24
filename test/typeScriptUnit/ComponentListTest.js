/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('RecordSetListTest', function () {

    it('check RecordSetList function and values', function () {
        var lotusComponentList = new Lotus.ComponentList();

        var button1 = new Lotus.AbstractItemView();

        var button2 = new Lotus.AbstractItemView();

        var button3 = new Lotus.AbstractItemView();

        lotusComponentList.addItem(button1);
        lotusComponentList.addItem(button2);
        lotusComponentList.addItem(button3);

        expect(lotusComponentList.length).toBe(3);
        expect(lotusComponentList.instancesByConstructor[Lotus.AbstractItemView].length).toBe(3);
        expect(lotusComponentList.instancesByConstructor[Lotus.AbstractItemView][0]).toBe(button1);
        expect(lotusComponentList.instancesByConstructor[Lotus.AbstractItemView][1]).toBe(button2);
        expect(lotusComponentList.instancesByConstructor[Lotus.AbstractItemView][2]).toBe(button3);
        lotusComponentList.removeItemAt(2);
        expect(lotusComponentList.length).toBe(2);
        expect(lotusComponentList.instancesByConstructor[Lotus.AbstractItemView].length).toBe(2);
        expect(lotusComponentList.instancesByConstructor[Lotus.AbstractItemView][0]).toBe(button1);
        expect(lotusComponentList.instancesByConstructor[Lotus.AbstractItemView][1]).toBe(button2);
        lotusComponentList.removeItemAt(0);
        expect(lotusComponentList.instancesByConstructor[Lotus.AbstractItemView][0]).toBe(button2);
        lotusComponentList.clear();
        expect(lotusComponentList.length).toBe(0);
        expect(lotusComponentList.instancesByConstructor[Lotus.AbstractItemView]).toBe(undefined);
    });
});
