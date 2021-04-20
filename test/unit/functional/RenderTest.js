describe('redner function test', function () {

    it('render a component with properties', async function () {
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
            tagName: 'lotus-render-with-props',
            tagFunction: Lotus.useButton
        };
        // create our component
        const element = await Lotus.render(tagDef, document.body, (element) => {
            element.component.arr = ['l', 'o', 't', 'u', 's'];
            element.component.obj = { org: "lotus", repo: "lotus" };
        });
        const button = element.component;
        expect(button.arr).toEqual(['l', 'o', 't', 'u', 's']);
        expect(JSON.stringify(button.obj)).toEqual(JSON.stringify({ org: "lotus", repo: "lotus" }));
        expect(button.skinPartMap.get('button') instanceof HTMLButtonElement).toBe(true);
    });
});
