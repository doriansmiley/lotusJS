let gallery = undefined;
// default to false
let isSsr = false;
// placeholder array for data
let list = [];
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
    hydrated: false,
    loadData: async () => {
        // loadData will be called by the component registry
        // this simulates data fetch. In more advanced application this can be done in parallel with
        // component code loading. This is a trivial example to support the use case for SSR
        const result = await fetch('http://localhost:3000/sample');
        const parsedResult = await result.json();
        list = Object.keys(parsedResult)
            .filter((attr) => attr !== 'id')
            .map((each) => parsedResult[each]);
        return true;
    },
    inserted: async (component) => {
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

