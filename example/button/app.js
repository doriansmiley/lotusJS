const template = document.createElement('div');
template.innerHTML = '<template id="app">\n' +
    '  <div data-component-root="root">\n' +
    '    <button data-skin-part="button">\n' +
    '      <label>Hello World with Bootsrap</label>\n' +
    '    </button>\n' +
    '  </div>\n' +
    '</template>\n'
const tagDef = {
    inserted: (component) => {
        console.log('example component inserted');
    },
    removed: (component) => {
        console.log('example component removed');
        component.element = null;
    },
    template: template.firstChild,
    tagName: 'lotus-button',
    tagFunction: Lotus.createButtonComponent
};
Lotus.register(tagDef);
const button = document.getElementById('button');
const responder = {
    onEvent: (event) => {
        console.log('click');
    }
};
button.component.addEventListener(Lotus.Events.CLICK, responder, 'onEvent');
