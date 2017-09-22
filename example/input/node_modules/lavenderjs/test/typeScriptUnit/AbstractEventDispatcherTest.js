/**
 * Created by dsmiley on 1/23/14.
 */
'use strict';
describe('EventDispatcher test', function () {

    it('check event bus', function () {
        var eventDispatcher = new Lavender.EventDispatcher();
        var testObject = {};
        var testObject2 = {};
        var event = new Lavender.AbstractEvent('test', {data:'test data'});
        var counter = 0;
        testObject.handler = function( event ){
            expect( event.payload.data ).toBe('test data');
            ++counter;
            eventDispatcher.removeEventListener('test', testObject, 'handler');
        }
        testObject.handler2 = function( event ){
            ++counter;
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
        expect( eventDispatcher.canListen('test', testObject, 'handler') ).toBe(false);
        expect( counter ).toBe(2);
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