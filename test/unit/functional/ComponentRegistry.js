describe('ComponentRegistry', function () {

    it('check Lotus.register and Lotus.getComponents functions and values', function (done) {
        const template = document.createElement('div');
        template.innerHTML = '<template id="app">\n' +
            '  <div data-component-root="root">\n' +
            '    <button data-skin-part="button">\n' +
            '      <label>Hello World</label>\n' +
            '    </button>\n' +
            '  </div>\n' +
            '</template>\n' +
            '\n';
        const tagDef = {
            inserted: (component) => {
                expect(component).toBeDefined();
            },
            removed: (component) => {
                component.element = null;
                const componentIndex = buttons.findIndex((view) => view === component);
                buttons.splice(componentIndex,1);
                expect(Lotus.getComponents(tagDef.tagName).length).toBe(2);
            },
            template: template.firstChild,
            tagName: 'lotus-button',
            tagFunction: Lotus.useButton
        };
        const responder = {
            onEvent: (event) => {
                done();
            }
        };
        Lotus.register(tagDef);
        const button2 = document.createElement('lotus-button');
        document.body.append(document.createElement('lotus-button'));
        document.body.append(button2);
        document.body.append(document.createElement('lotus-button'));
        const buttons = Lotus.getComponents(tagDef.tagName);
        const domButtons = document.getElementsByTagName('lotus-button');
        expect(buttons.length).toBe(3);
        expect(domButtons.length).toBe(3);
        // trigger lifecycle callbacks
        document.body.removeChild(button2);
        buttons[0].addEventListener(Lotus.Events.CLICK, responder, 'onEvent');
        // test event listeners
        buttons[0].skinPartMap.get('button').click();
    });
});
