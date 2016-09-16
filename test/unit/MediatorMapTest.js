/**
 * Created by dsmiley on 9/15/16.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('MediatorMap', function () {

    it('check functions', function () {
        var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
        //Lotus.AbstractMediator
        var mediatorMap = new Lotus.MediatorMap(context)
        expect(mediatorMap.context).toBe(context);
        expect(mediatorMap.mediatorInstanceMap.length).toBe(0);
        expect(typeof mediatorMap.tagConstructorMap == 'object').toBe(true);
        mediatorMap.add('x-lotus-button',Lotus.ButtonMediator);
        mediatorMap.add('x-lotus-data-grid',Lotus.AbstractMediator);
        mediatorMap.add('x-lotus-button',Lotus.ButtonMediator);
        mediatorMap.add('x-lotus-list',Lotus.ListMediator);
        //add singleton tag test
        mediatorMap.add('x-lotus-service-status',Lotus.AbstractMediator, true);
        mediatorMap.add('x-lotus-service-status',Lotus.AbstractMediator, true);
        mediatorMap.add('x-lotus-service-status',Lotus.AbstractMediator, true);
        mediatorMap.add('x-lotus-service-status',Lotus.AbstractMediator, true);
        expect(mediatorMap.tagConstructorMap['x-lotus-button'].constructor).toBe(Lotus.ButtonMediator);
        expect(mediatorMap.tagConstructorMap['x-lotus-button'].useSingleton).toBe(false);
        expect(mediatorMap.tagConstructorMap['x-lotus-data-grid'].constructor).toBe(Lotus.AbstractMediator);
        expect(mediatorMap.tagConstructorMap['x-lotus-data-grid'].useSingleton).toBe(false);
        expect(mediatorMap.tagConstructorMap['x-lotus-list'].constructor).toBe(Lotus.ListMediator);
        expect(mediatorMap.tagConstructorMap['x-lotus-list'].useSingleton).toBe(false);
        expect(mediatorMap.tagConstructorMap['x-lotus-service-status'].constructor).toBe(Lotus.AbstractMediator);
        expect(mediatorMap.tagConstructorMap['x-lotus-service-status'].useSingleton).toBe(true);
    });
});