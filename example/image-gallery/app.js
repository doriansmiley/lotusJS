let gallery = undefined;
// default to false
let isSsr = false;
const list = [
    {name: '', src: 'http://localhost:3000/image-gallery/assets/0.jpg', caption: '<h5>0.jpg</h5>'},
    {name: '', src: 'http://localhost:3000/image-gallery/assets/6.jpg', caption: '<h5>1.jpg</h5>'},
    {name: '', src: 'http://localhost:3000/image-gallery/assets/2.jpg', caption: '<h5>2.jpg</h5>'},
    {name: '', src: 'http://localhost:3000/image-gallery/assets/3.jpg', caption: '<h5>3.jpg</h5>'},
    {name: '', src: 'http://localhost:3000/image-gallery/assets/4.jpg', caption: '<h5>4.jpg</h5>'},
    {name: '', src: 'http://localhost:3000/image-gallery/assets/5.jpg', caption: '<h5>5.jpg</h5>'},
];
// image view tag def
const imageViewTagDeg = {
    inserted: (component) => {
        console.log('image inserted');
    },
    removed: (component) => {
        component.element = null;
    },
    templateUrl: 'templates/image.html',
    tagName: 'lotus-image-view',
    tagFunction: Lotus.useImageView
};
Lotus.register(imageViewTagDeg);
// image gallery tag def
const tagDef = {
    constructed: (ssr) => {
        // the value of ssr is set by the ComponentRegistry and determined voa
        // !!document.querySelector(tagDef.tagName)?.shadowRoot;
        isSsr = ssr;
    },
    inserted: (component) => {
        console.log('example component inserted');
        // always use replaceWith when you call render again!!!! render will always create
        // a new element and return it
        component.element.replaceWith(gallery.component.render(list, isSsr));
    },
    removed: (component) => {
        console.log('example component removed');
        component.element = null;
    },
    templateUrl: 'templates/gallery.html',
    tagName: 'lotus-image-gallery',
    tagFunction: Lotus.useImageGallery
};
// register gallery
Lotus.register(tagDef);
// app setup
gallery = document.getElementById('gallery');

