/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('RecordSetTest ', function () {
    var recordSet = new Lavender.RecordSet();
    recordSet.id = '1234';

    recordSet.createdOn = new Date(2014,1,1);//Date;;
    recordSet.timeToLive = 500000;
    recordSet.source = 'test source';
    recordSet.totalRecords = 300;
    recordSet.recordsPerPage = 10;
    var routeController = {};
    recordSet.recordsPerPage = 10;
    recordSet.routeController = routeController;
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

    it('check RecordSet assign records', function () {
        recordSet.addEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, resultSetHandler, 'handler');
        recordSet.results = resultSet;
    });

    it('check RecordSet values after population', function () {
        recordSet.removeEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, resultSetHandler, 'handler');
        recordSet.selectedPage = 1;
        expect( recordSet.id ).toBe('1234');
        expect( recordSet.totalRecords ).toBe(300);
        expect( recordSet.totalPages ).toBe(30);
        expect( recordSet.selectedPage ).toBe(1);
        expect( recordSet.resultsByPage[recordSet.selectedPage].length).toBe(10);
        expect( recordSet.createdOn.getDate() ).toBe(1);
        expect( recordSet.timeToLive ).toBe(500000);
        expect( recordSet.source ).toBe('test source');
        expect( recordSet.routeController ).toBe(routeController);
        recordSet.addEventListener(Lavender.RecordSetEvent.RECORDS_PER_PAGE_CHANGE, resultSetHandler, 'handler');
        eventTriggered = false;
        recordSet.recordsPerPage = 5;
    });

    it('check RecordSet values after updating recordsPerPage', function () {
        recordSet.removeEventListener(Lavender.RecordSetEvent.RECORDS_PER_PAGE_CHANGE, resultSetHandler, 'handler');
        expect( recordSet.totalPages ).toBe(60);
        expect( recordSet.selectedPage ).toBe(1);
        expect( recordSet.resultsByPage[recordSet.selectedPage].length).toBe(5);
        eventTriggered = false;
        recordSet.addEventListener(Lavender.RecordSetEvent.SELECTED_PAGE_CHANGE, resultSetHandler, 'handler');
        recordSet.selectedPage = 3;
    });

    it('check RecordSet values after updating selectedPage', function () {
        recordSet.removeEventListener(Lavender.RecordSetEvent.SELECTED_PAGE_CHANGE, resultSetHandler, 'handler');
        expect( recordSet.totalPages ).toBe(60);
        expect( recordSet.selectedPage ).toBe(3);
        expect( recordSet.resultsByPage[recordSet.selectedPage].length).toBe(4);
        expect( recordSet.pageList.length ).toBe(4);
        eventTriggered = false;
        recordSet.addEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, resultSetHandler, 'handler');
        recordSet.results.addItem( {someAttribute:1, someOther:5});
    });

    it('check RecordSet values after manually adding an item', function () {
        recordSet.removeEventListener(Lavender.RecordSetEvent.RESULTS_CHANGE, resultSetHandler, 'handler');
        expect( recordSet.totalPages).toBe(60);
        expect( recordSet.selectedPage ).toBe(3);
        expect( recordSet.resultsByPage[recordSet.selectedPage].length).toBe(5);
        expect( recordSet.pageList.length ).toBe(5);
        eventTriggered = false;
    });

});
