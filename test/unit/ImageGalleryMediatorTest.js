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
        var model = context.injector.inject(SampleApp.MODEL_KEY);
        expect(mediator.componentInstance).toBe(view);
        expect(mediator.context).toBe(context);
        expect(mediator.id.length > 0).toBe(true);
        expect(mediator.toString()).toBe(mediator.id);

        var element = document.createElement('div');
        element.setAttribute('data-attribute-item-view', 'Lotus.ImageGalleryView');
        document.body.appendChild(element);
        element.innerHTML = '<div data-skin-part="collectionContainer">' +
            '<div data-skin-part="itemTemplate">' +
            '<div data-skin-part="thumbnailContainer" selected-class="someClass">' +
            '<img data-skin-part="thumbnail"></image>' +
            '</div>';
        '</button>' +
        '</div>' +
        '</div>';
        var collectionContainer = element.querySelector('[data-skin-part=collectionContainer]');
        var itemTemplate = element.querySelector('[data-skin-part=itemTemplate]');
        
        view.created(element,context);

        mediator.destroy();
        expect(mediator.id).toBe(null);
        expect(mediator.componentInstance).toBe(null);

    });
});