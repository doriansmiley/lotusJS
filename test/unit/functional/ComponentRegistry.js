describe('ComponentRegistry', function () {

    it('check Lotus.register functions and values', function (done) {
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
                expect(Lotus.getTagDef(tagDef.tagName)).toBe(tagDef);
                done();
            },
            template: template.firstChild,
            tagName: 'lotus-button',
            tagFunction: Lotus.useButton
        };
        Lotus.register(tagDef);
        const button2 = document.createElement('lotus-button');
        document.body.append(document.createElement('lotus-button'));
        document.body.append(button2);
        document.body.append(document.createElement('lotus-button'));
        const domButtons = document.getElementsByTagName('lotus-button');
        expect(domButtons.length).toBe(3);
        // trigger lifecycle callbacks
        document.body.removeChild(button2);
    });
});
