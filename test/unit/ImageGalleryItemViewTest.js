/**
 * Created by dsmiley on 6/26/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ImageGalleryItemViewTest', function() {

    describe('SampleApp.ImageGalleryItemView', function(){

        it('should test default AlternateLayoutView values', function() {
            var component = new Lotus.ImageGalleryView();
            var element = document.createElement('div');
            document.body.appendChild(element);
            element.innerHTML = '<div skin-part="thumbnailContainer">' +
                '<img skin-part="thumbnail"></image>' +
                '</div>';
            component.id = '1234';
            var model = {};
            model.layoutId = '7862938';
            model.position = 1;
            model.thumbUrl = 'http://www.someuri.com';
            //IMPORTANT: the model is always set before  created is called
            component.model = model;
            component.created(element);

            expect( component.element === element ).toBe( true );
            expect( component.model === model ).toBe( true );
            expect( component.id ).toBe( '1234' );
            expect( component.thumbnail === element.querySelector('[skin-part=thumbnail]') ).toBe( true );
            expect( component.thumbnail.getAttribute('src') ).toBe( 'http://www.someuri.com' );
            component.destroy();
            expect( component.element === null ).toBe( true );
            expect( component.model === null ).toBe( true );
            expect( component.id ).toBe( null );
        });

    });
});
