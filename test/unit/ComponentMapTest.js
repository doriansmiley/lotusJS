/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ComponentMapTest', function () {

    it('check ComponentMap function and values', function () {
        var success = false;
        var responder1 = {
            success:function(sucessObj){
                console.log('ComponentMapTest responder1 success called');
                success = true;
            },
            fault:function(faultObj){
                console.log('ComponentMapTest responder1 fault called');
            }
        };
        var buttonDOMElement = document.createElement('x-lotus-button2');
        buttonDOMElement.setAttribute('id', 'myButton');
        buttonDOMElement.setAttribute('skin-part', 'button');
        buttonDOMElement.innerHTML = '<button id="myButton" skin-part="button"><label>testButton</label></button>';

        var buttonDOMElement2 = document.createElement('x-lotus-button');
        buttonDOMElement2.setAttribute('id', 'myButton');
        buttonDOMElement2.setAttribute('skin-part', 'button');
        buttonDOMElement2.setAttribute('template-url', '/local/templates/button.html');
        buttonDOMElement2.setAttribute('template-root', '#lotusButton');
        buttonDOMElement2.setAttribute('component-root', '[skin-part="button"]');
        //document.appendChild(buttonHTML)
        var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
        context.componentMap.mapComponent('x-lotus-button2', null, Lotus.Button);
        context.componentMap.mapComponent('x-lotus-button', null, Lotus.Button);
        expect(context.componentMap.componentInstances.length()).toBe(0);
        //IMPORTANT: need to find a way to get xTag to parse the newly added component
        //create is not being called here hence the component map is not adding the instance
        document.body.appendChild(buttonDOMElement);
        document.body.appendChild(buttonDOMElement2);
        // notify the system that we are bootstrapped
        document.body.addEventListener('WebComponentsReady',responder1.success);
        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ComponentMapTest service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect(context.componentMap.componentInstances.length()).toBe(2);
            success = false;
        });
    });
});
