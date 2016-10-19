/**
 * Created by dsmiley on 9/15/16.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ImageGalleryMediatorTest', function () {

    it('check functions', function () {
        var view = new Lotus.ImageGalleryCollectionView();
        SampleApp.init();
        var context = SampleApp.resources;
        var mediator = new SampleApp.ImageGalleryMediator(view, context);
        var model = context.injector.inject(SampleApp.MODEL_KEY)
        expect(mediator.componentInstance).toBe(view);
        expect(mediator.context).toBe(context);
        expect(mediator.id.length > 0).toBe(true);
        expect(mediator.toString()).toBe(mediator.id);

        var element = document.createElement('div');
        element.setAttribute('attribute-item-view', 'SampleApp.ImageGalleryView');
        element.setAttribute('source', 'sampleAPI');
        document.body.appendChild(element);
        element.innerHTML = '<div skin-part="collectionContainer">' +
            '<div skin-part="itemTemplate">' +
            '<div skin-part="thumbnailContainer" selected-class="someClass">' +
            '<img skin-part="thumbnail"></image>' +
            '</div>';
        '</button>' +
        '</div>' +
        '</div>';
        var collectionContainer = element.querySelector('[skin-part=collectionContainer]');
        var itemTemplate = element.querySelector('[skin-part=itemTemplate]');
        
        view.created(element,context);

        expect(mediator.componentInstance.collection).toBe(model.recordsetModel.recordSets.recordSetsBySource['sampleAPI']);
        expect(mediator.componentInstance.collection.source).toBe('sampleAPI');

        mediator.destroy();
        expect(mediator.id).toBe(null);
        expect(mediator.componentInstance).toBe(null);

    });
});