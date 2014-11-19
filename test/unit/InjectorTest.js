/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('InjectorTest', function () {

    it('check InjectorTest function and values', function () {
        var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
        expect(context.injector instanceof Lotus.Injector).toBe(true);
        //this is how you use the injector with factories or singletons
        context.injector.mapSingletonInstance('model', Lavender.ModelLocator.getInstance());
        var model = context.injector.inject('model');
        expect( model ).toBeDefined();
        expect( model instanceof Lavender.ModelLocator).toBe(true);
        expect( model.config instanceof Lavender.Config).toBe(true);
        var model2 = context.injector.inject('model');
        var model3 = context.injector.inject('model');
        expect( model === model2 && model2 == model3 && model3 === model ).toBe(true);

        context.injector.mapObject('recordSetList', Lavender.RecordSetList);
        var recordSetList = context.injector.inject('recordSetList');
        expect( recordSetList).toBeDefined();
        expect( recordSetList instanceof Lavender.RecordSetList).toBe(true);
        var recordSetList2 = context.injector.inject('recordSetList');
        expect( recordSetList2).toBeDefined();
        expect( recordSetList2 instanceof Lavender.RecordSetList).toBe(true);
        expect( recordSetList2 === recordSetList).toBe(false);
    });
});
