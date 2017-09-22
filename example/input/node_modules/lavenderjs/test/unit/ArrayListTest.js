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
            //test adding duplicates when allowDuplicates is true
            list.addItem( {name: "TestObj", variants:[ {name:'variant 1'}, { name:'varaint 2' } ] } );
            list.addItem( {name: "TestObj2", variants:[ {name:'variant 1'}, { name:'varaint 2' } ] } );
            expect(list.length()).toBe(4);
            //test duplicates
            list.allowDuplicates = false;
            var hash = {TestObj:{}, TestObj2:{}};
            var key = 'name';
            var item1 = {name: "TestObj", variants:[ {name:'variant 1'}, { name:'varaint 2' } ] };
            var item2 = {name: "TestObj2", variants:[ {name:'variant 1'}, { name:'varaint 2' } ] };
            list.addItem( item1, hash, key );//should prohibit add based on the hash/key lookup
            list.addItem( item2, hash, key );//should prohibit add based on the hash/key lookup
            expect(list.length()).toBe(4);
            var item3 = {name: "TestObj3", variants:[ {name:'variant 3'}, { name:'varaint 3' } ] };
            list.addItem( item3, hash, key );
            expect(list.length()).toBe(5);
            list.addItem( item3 );//should prohibit add based on quality
            expect(list.length()).toBe(5);
            list.insert(item3, 0 );//should prohibit add based on quality
            expect(list.length()).toBe(5);
            list.insert( item3, hash, key );//should prohibit add based on the hash/key lookup
            expect(list.length()).toBe(5);
            list.clear();
            list.addAll([1,2,3,4,5]);
            expect(list.length()).toBe(5);
            //change index
            list.changeIndex(1,0);
            expect(list.getItemAt(0)).toBe(2);
            //swap index
            list.swapIndex(2,4);
            expect(list.getItemAt(2)).toBe(5);
            expect(list.getItemAt(4)).toBe(3);
        });

    });
});
