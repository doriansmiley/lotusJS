/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('RecordSetListTest', function () {

    it('check RecordSetList function and values', function () {
        var recordSetList = new Lavender.RecordSetList();

        var recordSet1 = new Lavender.RecordSet();
        recordSet1.id = '1234';
        recordSet1.source = 'source1';

        var recordSet2 = new Lavender.RecordSet();
        recordSet2.id = '5678';
        recordSet2.source = 'source2';

        var recordSet3 = new Lavender.RecordSet();
        recordSet3.id = '89101';
        recordSet3.source = 'source3';

        recordSetList.addItem(recordSet1);
        recordSetList.addItem(recordSet2);
        recordSetList.addItem(recordSet3);

        expect(recordSetList.length).toBe(3);
        expect(recordSetList.recordSetsBySource[recordSet1.source]).toBe(recordSet1);
        expect(recordSetList.recordSetsBySource[recordSet2.source]).toBe(recordSet2);
        expect(recordSetList.recordSetsBySource[recordSet3.source]).toBe(recordSet3);
        expect(recordSetList.recordSetsById[recordSet1.id]).toBe(recordSet1);
        expect(recordSetList.recordSetsById[recordSet2.id]).toBe(recordSet2);
        expect(recordSetList.recordSetsById[recordSet3.id]).toBe(recordSet3);
        recordSetList.removeItemAt(2);
        expect(recordSetList.length).toBe(2);
        expect(recordSetList.recordSetsById[recordSet3.id]).toBe(undefined);
        expect(recordSetList.recordSetsById[recordSet1.id]).toBe(recordSet1);
        expect(recordSetList.recordSetsById[recordSet2.id]).toBe(recordSet2);
        expect(recordSetList.recordSetsBySource[recordSet1.source]).toBe(recordSet1);
        expect(recordSetList.recordSetsBySource[recordSet2.source]).toBe(recordSet2);
        recordSetList.clear();
        expect(recordSetList.recordSetsById[recordSet1.id]).toBe(undefined);
        expect(recordSetList.recordSetsById[recordSet2.id]).toBe(undefined);
        expect(recordSetList.recordSetsBySource[recordSet1.source]).toBe(undefined);
        expect(recordSetList.recordSetsBySource[recordSet2.source]).toBe(undefined);
    });
});
