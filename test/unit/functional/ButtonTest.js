const createComponent = require('../../..//lib/view/functional/Button').createComponent;

describe('ButtonComponent', function () {

    it('check createComponent function and values', function () {
        const template = document.createElement('div');
        template.innerHTML = '<template id="app">\n' +
            '  <div data-component-root="root">\n' +
            '    <button data-skin-part="button">\n' +
            '      <label>Hello World</label>\n' +
            '    </button>\n' +
            '  </div>\n' +
            '</template>\n' +
            '\n' +
            '<lotus-button></lotus-button>';
        // create our component
        const button = createComponent();
        const clone = document.importNode(template.firstChild.content, true);
        button.element = clone.querySelector('[data-component-root="root"]');
        const renderedComponent = button.render();
        expect(button.skinPartMap.get('button') instanceof HTMLButtonElement).toBe(true);
        expect(renderedComponent instanceof HTMLDivElement).toBe(true);
        expect(renderedComponent === button.element).toBe(true);
        button.destroy();
        expect(button.skinPartMap.get('button')).toBe(undefined);
    });
});
