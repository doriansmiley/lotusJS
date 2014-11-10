/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('RecordSetTest ', function () {

    it('check RecordSet function and values', function () {
        var recordSet = new Lavender.RecordSet();
        recordSet.id = '1234';
        recordSet.selectedPage = 1;
        recordSet.createdOn = new Date(2014,1,1);//Date;;
        recordSet.timeToLive = 500000;
        recordSet.source = 'test source';
        recordSet.totalRecords = 300;
        recordSet.recordsPerPage = 10;
        var resultSet = new Lavender.ArrayList();
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        resultSet.addItem( {someAttribute:1, someOther:5});
        var eventType;
        var eventTriggered = false;
        var resultSetHandler = {};
        resultSetHandler.handler = function( event ){
            eventType = event.type;
            eventTriggered = true;
        }
        recordSet.addEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, resultSetHandler, 'handler');
        recordSet.results = resultSet;

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return eventTriggered == true;
        }, 'RecordSetTest service request failed', 1000);
        //runs will execute after success == true
        runs(function(){
            expect( recordSet.id ).toBe('1234');
            expect( recordSet.totalRecords ).toBe(300);
            expect( recordSet.totalPages ).toBe(2);
            expect( recordSet.selectedPage ).toBe(1);
            expect( recordSet.resultsByPage[recordSet.selectedPage].length()).toBe(10);
            expect( recordSet.createdOn.getDate() ).toBe(1);
            expect( recordSet.timeToLive ).toBe(500000);
            expect( recordSet.source ).toBe('test source');
            recordSet.addEventListener(Lavender.RecordSetEvent.RECORDS_PER_PAGE_CHANGE, resultSetHandler, 'handler');
            eventTriggered = false;
            recordSet.recordsPerPage = 5;
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return eventTriggered == true;
        }, 'RecordSetTest service request failed', 1000);
        //runs will execute after success == true
        runs(function(){
            expect( recordSet.totalPages ).toBe(3);
            expect( recordSet.selectedPage ).toBe(1);
            expect( recordSet.resultsByPage[recordSet.selectedPage].length()).toBe(5);
            eventTriggered = false;
            recordSet.addEventListener(Lavender.RecordSetEvent.SELECTED_PAGE_CHANGE, resultSetHandler, 'handler');
            recordSet.selectedPage = 3;
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return eventTriggered == true;
        }, 'RecordSetTest service request failed', 1000);
        //runs will execute after success == true
        runs(function(){
            expect( recordSet.totalPages ).toBe(3);
            expect( recordSet.selectedPage ).toBe(3);
            expect( recordSet.resultsByPage[recordSet.selectedPage].length()).toBe(4);
            expect( recordSet.pageList.length() ).toBe(4);
            eventTriggered = false;
            recordSet.results.addItem( {someAttribute:1, someOther:5});
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return eventTriggered == true;
        }, 'RecordSetTest test results listener failed', 1000);
        //runs will execute after success == true
        runs(function(){
            expect( recordSet.totalPages).toBe(3);
            expect( recordSet.selectedPage ).toBe(3);
            expect( recordSet.resultsByPage[recordSet.selectedPage].length()).toBe(5);
            expect( recordSet.pageList.length() ).toBe(5);
            eventTriggered = false;
        });
    });
});
