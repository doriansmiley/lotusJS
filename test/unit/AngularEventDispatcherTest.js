/**
 * Created by dsmiley on 1/27/14.
 */
'use strict';
var app = angular.module('myApp', []);
describe('AbstractEventDispatcher test', function () {
    var $compile;
    var $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(module('myApp'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));
    it('check event bus', function () {
        Lavender.ModelLocator.getInstance().config.eventDispatcherCode = 'angular';
        Lavender.init( Lavender.ModelLocator.getInstance().config, $rootScope );
        var testObject = {};
        var testObject2 = {};
        var event = new Lavender.AbstractEvent('test', {data:'test data'});
        testObject.handler = function( event, data ){
            expect( data.payload.data ).toBe('test data');
        }
        testObject.handler2 = function( event, data ){
            expect( data.payload.data ).toBe('test data');
        }
        testObject2.handler = function( event, data ){
            expect( data.payload.data ).toBe('test data');
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