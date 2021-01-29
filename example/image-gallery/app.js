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
    inserted: (component) => {
        console.log('example component inserted');
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
const gallery = document.getElementById('gallery');
const list = [
    {name: '', src: 'http://localhost:3000/image-gallery/assets/0.jpg', caption: '<h5>0.jpg</h5>'},
    {name: '', src: 'http://localhost:3000/image-gallery/assets/6.jpg', caption: '<h5>1.jpg</h5>'},
    {name: '', src: 'http://localhost:3000/image-gallery/assets/2.jpg', caption: '<h5>2.jpg</h5>'},
    {name: '', src: 'http://localhost:3000/image-gallery/assets/3.jpg', caption: '<h5>3.jpg</h5>'},
    {name: '', src: 'http://localhost:3000/image-gallery/assets/4.jpg', caption: '<h5>4.jpg</h5>'},
    {name: '', src: 'http://localhost:3000/image-gallery/assets/5.jpg', caption: '<h5>5.jpg</h5>'},
];
const isSsr = !!document.querySelector(tagDef.tagName)?.shadowRoot;
// wait for the component to initialize
const interval = setInterval(()=>{
    if (gallery.component) {
        clearInterval(interval);
        // always use replaceWith when you call render again!!!! render will always create
        // a new element and return it
        // SSR example, navigator.webdriver denote puppeteer agent
        // if the shadowRoot is present we know the component was rendered server side
        gallery.component.element.replaceWith(gallery.component.render(list, isSsr));
    }
}, 100);

