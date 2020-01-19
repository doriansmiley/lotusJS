const createComponent = require('../../../lib/view/functional/Button').createComponent;
const ComponentEvent = require('../../../lib/control/events/ComponentEvent').ComponentEvent;
const register = require('../../../lib/context/functional/ComponentRegistry').register;
const getComponents = require('../../../lib/context/functional/ComponentRegistry').getComponents;

describe('ButtonComponent', function () {

    it('check createComponent function and values', function (done) {
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
            created: () => {},
            inserted: () => {},
            removed: () => {},
            attributeChanged: (attrName, oldValue, newValue) => {},
            template: template.firstChild,
            tagName: 'lotus-button',
            tagFunction: createComponent
        };
        const responder = {
            onEvent: (event) => {
                done();
            }
        };
        register(tagDef);
        document.body.append(document.createElement('lotus-button'));
        document.body.append(document.createElement('lotus-button'));
        document.body.append(document.createElement('lotus-button'));
        const buttons = getComponents(tagDef.tagName);
        const domButtons = document.getElementsByTagName('lotus-button');
        const domButton = document.getElementsByTagName('lotus-button')[0];
        buttons[0].addEventListener(ComponentEvent.CLICK, responder, 'onEvent');
        expect(buttons.length).toBe(3);
        expect(domButtons.length).toBe(3);
        buttons[0].skinPartMap.get('button').click();
    });
});
