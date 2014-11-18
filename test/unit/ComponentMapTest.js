/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ComponentMapTest', function () {

    it('check ComponentMap function and values', function () {
        var buttonDOMElement = document.createElement('x-lotus-button');
        buttonDOMElement.setAttribute('id', 'myButton');
        buttonDOMElement.setAttribute('skin-part', 'button');
        buttonDOMElement.innerHTML = '<button id="myButton" skin-part="button"><label>testButton</label></button>';
        //document.appendChild(buttonHTML)
        var componentMap = new Lotus.ComponentMap();
        componentMap.mapComponent('x-lotus-button', null, Lotus.Button);
        expect(componentMap.componentInstances.length()).toBe(0);
        //IMPORTANT: need to find a way to get xTag to parse the newly added component
        //create is not being called here hence the component map is not adding the instance
        document.body.appendChild(buttonDOMElement);
        expect(componentMap.componentInstances.length()).toBe(1);
    });
});
