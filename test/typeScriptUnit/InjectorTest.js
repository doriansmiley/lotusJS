/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('InjectorTest', function () {

    it('check InjectorTest function and values', function () {
        var context = {}
        var injector = new Lotus.Injector(context);
        expect(injector instanceof Lotus.Injector).toBe(true);
        //this is how you use the injector with factories or singletons
        injector.mapSingletonInstance('model', new Lotus.ErrorModel());
        var model = injector.inject('model');
        expect( model ).toBeDefined();
        expect( model instanceof Lotus.ErrorModel).toBe(true);
        var model2 = injector.inject('model');
        var model3 = injector.inject('model');
        expect( model === model2 && model2 == model3 && model3 === model ).toBe(true);

        injector.mapObject('recordSetList', Lotus.RecordSetList);
        var recordSetList = injector.inject('recordSetList');
        expect( recordSetList).toBeDefined();
        expect( recordSetList instanceof Lotus.RecordSetList).toBe(true);
        var recordSetList2 = injector.inject('recordSetList');
        expect( recordSetList2).toBeDefined();
        expect( recordSetList2 instanceof Lotus.RecordSetList).toBe(true);
        expect( recordSetList2 === recordSetList).toBe(false);
    });
});
