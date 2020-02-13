const createComponent = require('../../../lib/view/functional/ImageGallery').createComponent;
const createImageView = require('../../../lib/view/functional/ImageGallery').createImageView;
const Events = require('../../../lib/view/functional/AbstractComponent').Events;
const register = require('../../../lib/context/functional/ComponentRegistry').register;
const getComponents = require('../../../lib/context/functional/ComponentRegistry').getComponents;
const {List} = require('immutable');

describe('ImageGalleryComponent', function () {

    it('check createComponent function and values', function (done) {

        const galleryTemplate = document.createElement('div');
        galleryTemplate.innerHTML = '<template id="imageGallery">\n' +
            '<div data-component-root="root">\n' +
            '    <div data-skin-part="collectionContainer">\n' +
            '      <lotus-image-view data-skin-part="itemTemplate" />\n' +
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
        let list = List([
            {name: '', src: '/base/unit/assets/0.jpg'},
            {name: '', src: '/base/unit/assets/2.jpg'},
            {name: '', src: '/base/unit/assets/3.jpg'},
        ]);
        document.body.append(gallery);
        console.log(`gallery.component: ${gallery.component}`);
        gallery.component.element.replaceWith(gallery.component.render(list));
        list = List([
            {name: '', src: '/base/unit/assets/4.jpg'},
            {name: '', src: '/base/unit/assets/5.jpg'},
            {name: '', src: '/base/unit/assets/6.jpg'},
        ]);
        // always use replaceWith when you call render again!!!! render will always create
        // a new element and return it
        gallery.component.element.replaceWith(gallery.component.render(list));
        done();
    });
});
