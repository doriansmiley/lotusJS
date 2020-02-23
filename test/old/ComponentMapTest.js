/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ComponentMapTest', function () {

    it('check ComponentMap function and values', function () {
        var buttonDOMElement = document.createElement('x-lotus-button2');
        buttonDOMElement.setAttribute('id', 'myButton');
        buttonDOMElement.setAttribute('data-skin-part', 'button');
        buttonDOMElement.setAttribute('data-attribute-type', 'test');
        buttonDOMElement.setAttribute('data-attribute-not-an-attribute', 'test');
        buttonDOMElement.innerHTML = '<button id="myButton" data-skin-part="button"><label>testButton</label></button>';

        var buttonDOMElement2 = document.createElement('x-lotus-button');
        buttonDOMElement2.setAttribute('id', 'myButton');
        buttonDOMElement2.setAttribute('data-skin-part', 'button');
        buttonDOMElement2.setAttribute('data-template-url', '/base/unit/assets/button.html');//'/base/unitNode/services/assets/template.zip',
        buttonDOMElement2.setAttribute('template-root', '#lotusButton');
        buttonDOMElement2.setAttribute('data-component-root', '[data-skin-part="button"]');
        //document.appendChild(buttonHTML)
        var componentMap = new Lotus.ComponentMap(new Lotus.Context());
        componentMap.mapComponent('x-lotus-button2', HTMLButtonElement.prototype, Lotus.AbstractItemView);
        componentMap.mapComponent('x-lotus-button', HTMLButtonElement.prototype, Lotus.AbstractItemView);
        expect(componentMap.componentInstances.length).toBe(2);
        //TODO: comment in when view components are done
        //expect(componentMap.componentInstances.getItemAt(0).type).toBe('test');
        expect(componentMap.componentInstances.getItemAt(0).notAnAttribute).toBe(undefined);
        //IMPORTANT: need to find a way to get xTag to parse the newly added component
        //create is not being called here hence the component map is not adding the instance
        document.body.appendChild(buttonDOMElement);
        document.body.appendChild(buttonDOMElement2);

    });
});
