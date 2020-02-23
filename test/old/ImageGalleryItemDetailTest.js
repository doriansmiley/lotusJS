/**
 * Created by dsmiley on 6/26/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ImageGalleryItemDetailTest', function() {

    describe('SampleApp.ImageGalleryItemDetail', function(){

        it('should test default AlternateLayoutView values', function() {
            var component = new Lotus.ImageGalleryItemDetail();
            var element = document.createElement('div');
            document.body.appendChild(element);
            element.innerHTML = '<label data-skin-part="nameLabel"></label>' +
                '<label data-skin-part="dateCreatedLabel"></label>' +
                '<label data-skin-part="urlLabel"></label>';
            component.id = '1234';
            var model = {};
            model.createdDate = new Date();
            model.url = 'http://www.someuri.com/sampleFile.jpg';
            model.objectName = model.url.substr(model.url.lastIndexOf('/')+1);
            component.created(element);
            component.asset = model;

            expect( component.element === element ).toBe( true );
            expect( component.asset === model ).toBe( true );
            expect( component.dateCreatedLabel === element.querySelector('[data-skin-part=dateCreatedLabel]') ).toBe( true );
            expect( component.nameLabel === element.querySelector('[data-skin-part=nameLabel]') ).toBe( true );
            expect( component.urlLabel === element.querySelector('[data-skin-part=urlLabel]') ).toBe( true );
            expect( component.nameLabel.innerHTML ).toBe( 'sampleFile.jpg' );
            expect( component.dateCreatedLabel.innerHTML ).toBe( model.createdDate.toDateString() );
            expect( component.urlLabel.innerHTML ).toBe( 'http://www.someuri.com/sampleFile.jpg' );
            component.destroy();
            expect( component.element ).toBe( null );
            expect( component.asset ).toBe( null );
            expect( component.nameLabel ).toBe( null );
            expect( component.urlLabel ).toBe( null );
            expect( component.dateCreatedLabel ).toBe( null );
        });

    });
});
