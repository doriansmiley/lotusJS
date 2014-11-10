/**
 * Created by dsmiley on 1/23/14.
 */
'use strict';
describe('AbstractEventDispatcher test', function () {

    it('check event bus', function () {
        Lavender.ModelLocator.getInstance().config.eventDispatcherCode = 'jquery';
        Lavender.init( Lavender.ModelLocator.getInstance().config );
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
        Lavender.EventDispatcher.addEventListener('test', testObject, 'handler');
        Lavender.EventDispatcher.addEventListener('test', testObject, 'handler2');
        expect( Lavender.EventDispatcher.canListen('test', testObject, 'handler') ).toBe(true);
        expect( Lavender.EventDispatcher.canListen('test', testObject, 'handler2') ).toBe(true);
        Lavender.EventDispatcher.dispatch( event );
        Lavender.EventDispatcher.removeEventListener('test', testObject, 'handler');
        expect( Lavender.EventDispatcher.canListen('test', testObject, 'handler') ).toBe(false);
        Lavender.EventDispatcher.dispatch( event );
        Lavender.EventDispatcher.addEventListener('test', testObject, 'handler');
        Lavender.EventDispatcher.addEventListener('test', testObject2, 'handler');
        expect( Lavender.EventDispatcher.canListen('test', testObject, 'handler') ).toBe(true);
        expect( Lavender.EventDispatcher.canListen('test', testObject, 'handler2') ).toBe(true);
        Lavender.EventDispatcher.dispatch( event );
        Lavender.EventDispatcher.removeAllEventListeners( testObject );
        expect( Lavender.EventDispatcher.canListen('test', testObject, 'handler') ).toBe(false);
        expect( Lavender.EventDispatcher.canListen('test', testObject, 'handler2') ).toBe(false);
        Lavender.EventDispatcher.dispatch( event );
    });
});