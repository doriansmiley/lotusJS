const createComponent = require('../../../lib/view/functional/ImageGallery').createComponent;
const createImageView = require('../../../lib/view/functional/ImageGallery').createImageView;
const Events = require('../../../lib/view/functional/AbstractComponent').Events;
const register = require('../../../lib/context/functional/ComponentRegistry').register;
const getComponents = require('../../../lib/context/functional/ComponentRegistry').getComponents;

describe('ImageGalleryComponent', function () {

    it('check createComponent function and values', function (done) {

        const galleryTemplate = document.createElement('div');
        galleryTemplate.innerHTML = '<template id="imageGallery">\n' +
            '  <div data-component-root="root">\n' +
            '    <div data-skin-part="collectionContainer">\n' +
            '      <div data-skin-part="itemTemplate">' +
            '          <lotus-image-view/>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</template>\n';
        const itemTemplate = document.createElement('div');
        itemTemplate.innerHTML = '<template id="imageView">\n' +
            '  <div data-component-root="root">\n' +
            '    <img data-skin-part="thumbnail"/>\n' +
            '  </img>\n' +
            '</template>\n';
        // create our components
        const galleryTagDef = {
            inserted: (component) => {
            },
            removed: (component) => {
                component.element = null;
            },
            template: galleryTemplate.firstChild,
            tagName: 'lotus-image-gallery',
            tagFunction: createComponent
        };
        const imageViewTagDeg = {
            inserted: (component) => {
            },
            removed: (component) => {
                component.element = null;
            },
            template: itemTemplate.firstChild,
            tagName: 'lotus-image-view',
            tagFunction: createImageView
        };
        register(imageViewTagDeg);
        register(galleryTagDef);
        const gallery = document.createElement('lotus-image-gallery');
        // TODO figure out how to call render on the component passing a list. The issue right
        //  now is that the component's element is recreated as part of render. However the new
        //  element is not part of the shadow root. I think we should add this to the AbstractComponent
        //  and refactor our ComponentRegistry test to test that the new created element is added and
        //  the old element removed with each call to render. At that point I can call render on the
        //  on the component instance retrieved in the inserted callback passing an Immutable List
        //  We want to also test creating multiple gallery instances and ensure we can get a specific
        //  one and set it's data provider. I think we can check the ID attribute of the component
        //  after calling getComponents. We can also filter by parent element
    });
});
