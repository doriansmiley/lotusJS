describe('ButtonComponent', function () {

    it('check createComponent function and values', function (done) {
        const responder = {
            onEvent: (event) => {
                button.destroy();
                expect(button.skinPartMap.get('button')).toBe(undefined);
                buttonElement.remove();
                done();
            }
        }
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
            },
            removed: (component) => {
                component.element = null;
            },
            template: template.firstChild,
            tagName: 'lotus-button-2',
            tagFunction: Lotus.useButton
        };
        Lotus.register(tagDef);
        // create our component
        const buttonElement = document.createElement('lotus-button-2');
        document.body.append(buttonElement);
        const button = buttonElement.component;
        expect(button.skinPartMap.get('button') instanceof HTMLButtonElement).toBe(true);
        console.log('Lotus.Events.CLICK: ' + Lotus.Events.CLICK);
        button.addEventListener(Lotus.Events.CLICK, responder, 'onEvent');
        button.skinPartMap.get('button').click({});
    });
});
