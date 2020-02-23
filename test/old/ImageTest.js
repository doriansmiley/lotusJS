/**
 * Created by dsmiley on 8/19/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('Image', function() {

    it('should test default Image values', function() {

        var component = new Lotus.Image();
        var element = document.createElement('div');
        element.setAttribute('data-attribute-thumb-width', '96');
        element.setAttribute('data-attribute-thumb-height', '96');
        document.body.appendChild(element);
        element.innerHTML = '<div data-skin-part="thumbnailContainer">' +
            '<img data-skin-part="thumbnail"></image>' +
            '<svg data-skin-part="loadingSVG" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeType="xml"attributeName="transform"type="rotate"from="0 25 25"to="360 25 25"dur="0.6s"repeatCount="indefinite"/></path></svg>' +
            '</div>';
        component.element = element;
        component.id = '1234';
        var asset = {};
        asset.src = '/base/unit/assets/test.png';//String
        //IMPORTANT: the model is always set before  created is called
        component.model = asset;
        component.created(element);


        expect( component.element === element ).toBe( true );
        expect( component.model === asset ).toBe( true );
        expect( component.id ).toBe( '1234' );
        expect( component.thumbnailContainer === element.querySelector('[data-skin-part=thumbnailContainer]') ).toBe( true );
        expect( component.thumbnail === element.querySelector('[data-skin-part=thumbnail]') ).toBe( true );
        expect( component.loadingSVG === element.querySelector('[data-skin-part=loadingSVG]') ).toBe( true );
        expect( component.thumbnail.getAttribute('src') ).toBe( '/base/unit/assets/test.png' );
        component.destroy();
        expect( component.element === null ).toBe( true );
        expect( component.model === null ).toBe( true );
        expect( component.thumbnail === null ).toBe( true );
        expect( component.loadingSVG === null ).toBe( true );
        expect( component.thumbnailContainer === null ).toBe( true );
        expect( component.id ).toBe( null );
    });
});
