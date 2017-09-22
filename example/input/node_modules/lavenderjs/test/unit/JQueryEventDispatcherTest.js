/**
 * Created by dsmiley on 1/23/14.
 */
'use strict';
describe('JQueryEventDispatcherTest test', function () {

    it('check JQueryEventDispatcher', function () {
        var eventDispatcher = new Lavender.JqueryEventDispatcher();
        var testObject = {};
        var testObject2 = {};
        var event = new Lavender.AbstractEvent('test', {data:'test data'});
        testObject.handler = function( event ){
            expect( event.payload.data ).toBe('test data');
        }
        testObject.handler2 = function( event ){
            expect( event.payload.data ).toBe('test data');
        }
        testObject2.handler = function( event ){
            expect( event.payload.data ).toBe('test data');
        }
        eventDispatcher.addEventListener('test', testObject, 'handler');
        eventDispatcher.addEventListener('test', testObject, 'handler2');
        expect( eventDispatcher.canListen('test', testObject, 'handler') ).toBe(true);
        expect( eventDispatcher.canListen('test', testObject, 'handler2') ).toBe(true);
        eventDispatcher.dispatch( event );
        eventDispatcher.removeEventListener('test', testObject, 'handler');
        expect( eventDispatcher.canListen('test', testObject, 'handler') ).toBe(false);
        eventDispatcher.dispatch( event );
        eventDispatcher.addEventListener('test', testObject, 'handler');
        eventDispatcher.addEventListener('test', testObject2, 'handler');
        expect( eventDispatcher.canListen('test', testObject, 'handler') ).toBe(true);
        expect( eventDispatcher.canListen('test', testObject, 'handler2') ).toBe(true);
        eventDispatcher.dispatch( event );
        eventDispatcher.removeAllEventListeners( testObject );
        expect( eventDispatcher.canListen('test', testObject, 'handler') ).toBe(false);
        expect( eventDispatcher.canListen('test', testObject, 'handler2') ).toBe(false);
        eventDispatcher.dispatch( event );
    });
});