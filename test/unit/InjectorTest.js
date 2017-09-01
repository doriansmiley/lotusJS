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
        injector.mapSingletonInstance('model', new Lavender.ErrorModel());
        var model = injector.inject('model');
        expect( model ).toBeDefined();
        expect( model instanceof Lavender.ErrorModel).toBe(true);
        var model2 = injector.inject('model');
        var model3 = injector.inject('model');
        expect( model === model2 && model2 == model3 && model3 === model ).toBe(true);

        injector.mapObject('recordSetList', Lavender.RecordSetList);
        var recordSetList = injector.inject('recordSetList');
        expect( recordSetList).toBeDefined();
        expect( recordSetList instanceof Lavender.RecordSetList).toBe(true);
        var recordSetList2 = injector.inject('recordSetList');
        expect( recordSetList2).toBeDefined();
        expect( recordSetList2 instanceof Lavender.RecordSetList).toBe(true);
        expect( recordSetList2 === recordSetList).toBe(false);

        injector.mapObject(Lotus.AbstractComponent, Lotus.Button);
        var button = injector.inject(Lotus.AbstractComponent);
        expect( button).toBeDefined();
        expect( button instanceof Lotus.Button).toBe(true);
        var button2 = injector.inject(Lotus.AbstractComponent);
        expect( button2).toBeDefined();
        expect( button2 instanceof Lotus.Button).toBe(true);
        expect( button2 === button).toBe(false);

        //this is how you use the injector with factories or singletons
        injector.mapSingletonInstance(Lavender.ImageAsset, new Lavender.ErrorModel());
        var injectedModel = injector.inject(Lavender.ImageAsset);
        expect( injectedModel ).toBeDefined();
        expect( injectedModel instanceof Lavender.ErrorModel).toBe(true);
        var injectedModel2 = injector.inject(Lavender.ImageAsset);
        var injectedModel3 = injector.inject(Lavender.ImageAsset);
        expect( injectedModel === injectedModel2 && injectedModel2 == injectedModel3 && injectedModel3 === injectedModel ).toBe(true);
    });
});
