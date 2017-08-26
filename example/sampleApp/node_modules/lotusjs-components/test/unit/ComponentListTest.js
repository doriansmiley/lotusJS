/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('RecordSetListTest', function () {

    it('check RecordSetList function and values', function () {
        var lotusComponentList = new Lotus.ComponentList();

        var button1 = new Lotus.Button();

        var button2 = new Lotus.Button();

        var button3 = new Lotus.Button();

        lotusComponentList.addItem(button1);
        lotusComponentList.addItem(button2);
        lotusComponentList.addItem(button3);

        expect(lotusComponentList.length()).toBe(3);
        expect(lotusComponentList.instancesByConstructor[Lotus.Button].length).toBe(3);
        expect(lotusComponentList.instancesByConstructor[Lotus.Button][0]).toBe(button1);
        expect(lotusComponentList.instancesByConstructor[Lotus.Button][1]).toBe(button2);
        expect(lotusComponentList.instancesByConstructor[Lotus.Button][2]).toBe(button3);
        lotusComponentList.removeItemAt(2);
        expect(lotusComponentList.length()).toBe(2);
        expect(lotusComponentList.instancesByConstructor[Lotus.Button].length).toBe(2);
        expect(lotusComponentList.instancesByConstructor[Lotus.Button][0]).toBe(button1);
        expect(lotusComponentList.instancesByConstructor[Lotus.Button][1]).toBe(button2);
        lotusComponentList.removeItemAt(0);
        expect(lotusComponentList.instancesByConstructor[Lotus.Button][0]).toBe(button2);
        lotusComponentList.clear();
        expect(lotusComponentList.length()).toBe(0);
        expect(lotusComponentList.instancesByConstructor[Lotus.Button]).toBe(undefined);
    });
});
