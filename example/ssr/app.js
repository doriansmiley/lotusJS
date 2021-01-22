const tagDef = {
    inserted: (component) => {
        console.log('example component inserted');
    },
    removed: (component) => {
        console.log('example component removed');
        component.element = null;
    },
    templateUrl: 'http://localhost:3000/ssp',
    tagName: 'lotus-ssr',
    tagFunction: Lotus.useButton
};
Lotus.register(tagDef);
