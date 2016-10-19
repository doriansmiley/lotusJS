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
            element.innerHTML = '<label skin-part="nameLabel"></label>' +
                '<label skin-part="dateCreatedLabel"></label>' +
                '<label skin-part="urlLabel"></label>';
            component.id = '1234';
            var model = {};
            model.createdDate = new Date();
            model.url = 'http://www.someuri.com/sampleFile.jpg';
            model.objectName = model.url.substr(model.url.lastIndexOf('/')+1);
            component.asset = model;
            component.created(element);

            expect( component.element === element ).toBe( true );
            expect( component.asset === model ).toBe( true );
            expect( component.dateCreatedLabel === element.querySelector('[skin-part=dateCreatedLabel]') ).toBe( true );
            expect( component.nameLabel === element.querySelector('[skin-part=nameLabel]') ).toBe( true );
            expect( component.urlLabel === element.querySelector('[skin-part=urlLabel]') ).toBe( true );
            expect( component.nameLabel.value ).toBe( 'sampleFile.jpg' );
            expect( component.dateCreatedLabel.value ).toBe( model.createdDate.toDateString() );
            expect( component.urlLabel.value ).toBe( 'http://www.someuri.com/sampleFile.jpg' );
            component.destroy();
            expect( component.element ).toBe( null );
            expect( component.asset ).toBe( null );
            expect( component.nameLabel ).toBe( null );
            expect( component.urlLabel ).toBe( null );
            expect( component.dateCreatedLabel ).toBe( null );
        });

    });
});
