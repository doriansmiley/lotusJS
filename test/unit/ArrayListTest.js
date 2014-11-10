'use strict';

/* jasmine specs for controllers go here */
describe('SPISDK Lists', function () {

    describe('Lavender.ArrayList ', function () {

        it('should add a item to the list', function () {
            var list = new Lavender.ArrayList ();
            list.addItem( {name: "TestObj", variants:[ {name:'variant 1'}, { name:'varaint 2' } ] } );
            list.addItem( {name: "TestObj2", variants:[ {name:'variant 1'}, { name:'varaint 2' } ] } );
            expect(list.length()).toBe(2);
            for( var itemIndex = 0; itemIndex < list.length(); itemIndex++ ) {
                var fontVariant = list.getItemAt( itemIndex );
                for( var fontVariantIndex = 0; fontVariantIndex < fontVariant.variants.length; fontVariantIndex++ ) {
                    var variant = fontVariant.variants[ fontVariantIndex ];
                    expect(variant.name).toBeDefined();
                }
            }
            list.removeItemAt(0);
            expect(list.length()).toBe(1);
            list.insert({name: "TestObj", variants:[ {name:'variant 1'}, { name:'varaint 2' } ] }, 0 );
            expect(list.getItemAt(0).name).toBe("TestObj");

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
            list.addEventListener('test', testObject, 'handler');
            list.addEventListener('test', testObject, 'handler2');
            list.dispatch( event );
            list.clear();
            list.addAll([1,2,3,4,5]);
            expect(list.length()).toBe(5);
        });

    });
});
