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
                console.log('ComponentMap responder1 success called');
                success = true;
            },
            fault:function(faultObj){
                console.log('ComponentMap responder1 fault called');
            }
        };
        var buttonDOMElement = document.createElement('x-lotus-button');
        buttonDOMElement.setAttribute('id', 'myButton');
        buttonDOMElement.setAttribute('skin-part', 'button');
        buttonDOMElement.innerHTML = '<button id="myButton" skin-part="button"><label>testButton</label></button>';
        //document.appendChild(buttonHTML)
        var context = new Lotus.Context(Lavender.ModelLocator.getInstance().config);
        context.componentMap.mapComponent('x-lotus-button', null, Lotus.Button);
        expect(context.componentMap.componentInstances.length()).toBe(0);
        //IMPORTANT: need to find a way to get xTag to parse the newly added component
        //create is not being called here hence the component map is not adding the instance
        document.body.appendChild(buttonDOMElement);
        // notify the system that we are bootstrapped
        document.body.addEventListener('WebComponentsReady',responder1.success);
        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ComponentMap service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect(context.componentMap.componentInstances.length()).toBe(1);
            success = false;
        });
    });
});
