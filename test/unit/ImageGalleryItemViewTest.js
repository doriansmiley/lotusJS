/**
 * Created by dsmiley on 6/26/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ImageGalleryItemViewTest', function() {

    describe('SampleApp.ImageGalleryItemView', function(){

        it('should test default AlternateLayoutView values', function() {
            var component = new SampleApp.ImageGalleryItemView();
            var element = document.createElement('div');
            document.body.appendChild(element);
            element.innerHTML = '<img skin-part="image"/>';
            component.id = '1234';
            var model = {};
            model.layoutId = '7862938';
            model.position = 1;
            model.uriPath = 'http://www.someuri.com';
            component.model = model;
            var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
            component.created(element, context);
            expect( component.element === element ).toBe( true );
            expect( component.model === model ).toBe( true );
            expect( component.id ).toBe( '1234' );
            expect( component.image === element.querySelector('[skin-part=image]') ).toBe( true );
            expect( component.image.getAttribute('src') ).toBe( 'http://www.someuri.com' );
            component.destroy();
            expect( component.element === null ).toBe( true );
            expect( component.model === null ).toBe( true );
            expect( component.id ).toBe( null );
        });

    });
});
