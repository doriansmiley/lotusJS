/**
 * Created by dsmiley on 8/19/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('AbstractThumbnailView', function() {

    describe('Lotus.ThumbnailPageNavigation', function(){

        it('should test default AbstractThumbnailView values', function() {

            var component = new Lotus.AbstractThumbnailView();
            var element = document.createElement('div');
            element.setAttribute('data-attribute-thumb-width', '96');
            element.setAttribute('data-attribute-thumb-height', '96');
            document.body.appendChild(element);
            element.innerHTML = '<div data-skin-part="thumbnailContainer">' +
                '<img data-skin-part="thumbnail"></image>' +
                '</div>';
            component.element = element;
            component.id = '1234';
            var asset = {};
            asset.type = 'image';//String
            asset.uid = '1234';//String
            asset.fileName = 'test file name';//String
            asset.name = 'test name';//String
            asset.categories = [];
            asset.printFileName = 'test print file name';//String
            asset.printFileType = 'test print file type';//String
            asset.printFilePart = 'test print file part';//String
            asset.printFileCrop = 'test print file crop';//String
            asset.printFileVisibleLayerList = 'test layers';//String
            asset.thumbnailFilename = 'test thumb file name';//String
            asset.source = 'test source';//String
            asset.thumbnailUriPath = '/base/unit/assets/test.png';//String
            asset.webUriPath = '/base/unit/assets.test.png';//String
            asset.uriPath = asset.webUriPath;
            asset.thumbUrl = asset.thumbnailUriPath;
            //IMPORTANT: the model is always set before  created is called
            component.model = asset;
            component.created(element);


            expect( component.element === element ).toBe( true );
            expect( component.model === asset ).toBe( true );
            expect( component.id ).toBe( '1234' );
            expect( component.thumbnailContainer === element.querySelector('[data-skin-part=thumbnailContainer]') ).toBe( true );
            expect( component.thumbnail === element.querySelector('[data-skin-part=thumbnail]') ).toBe( true );
            expect( component.thumbnail.getAttribute('src') ).toBe( '/base/unit/assets/test.png' );
            component.destroy();
            expect( component.element === null ).toBe( true );
            expect( component.model === null ).toBe( true );
            expect( component.thumbnail === null ).toBe( true );
            expect( component.thumbnailContainer === null ).toBe( true );
            expect( component.thumbnailSelectedClass === null ).toBe( true );
            expect( component.thumbClickProxy === null ).toBe( true );
            expect( component.id ).toBe( null );
        });

    });
});
