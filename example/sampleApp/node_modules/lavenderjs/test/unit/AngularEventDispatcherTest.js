/**
 * Created by dsmiley on 1/27/14.
 */
'use strict';
var app = angular.module('myApp', []);
describe('AngularEventDispatcherTest test', function () {
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
    it('check AngularEventDispatcher', function () {
        var eventDispatcher = new Lavender.AngularEventDispatcher($rootScope);
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