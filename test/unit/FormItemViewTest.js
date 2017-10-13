/**
 * Created by dsmiley on 8/19/15.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('FormItemView Test', function() {

    it('Test FormItemView Input view', function(done) {
        var handler = {
            onChange:function(event){
                component.input.lotusComponentInstance.removeEventListener(Lotus.InputEvent.CHANGE, handler, 'onChange');
                expect(event.type === Lotus.InputEvent.CHANGE).toBe(true);
                expect(inputModel.value === 'xxx-test value').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value === 'xxx-test value').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value === 'xxx-test value').toBe(true);
                expect(event.payload.target.getAttribute('type') === 'text').toBe(true);
                //test two way binding
                inputModel.value = 'another value';
                expect(inputModel.value === 'xxx-another value').toBe(true);
                expect(inputModel.value === 'xxx-another value').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value  === 'xxx-another value').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value  === 'xxx-another value').toBe(true);
                component.input.lotusComponentInstance.inputSkinPart.value = 'new value';
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                //event callbacks and bindings are executes synchronously
                component.input.lotusComponentInstance.inputSkinPart.dispatchEvent(evt);
                expect(inputModel.value === 'xxx-new value').toBe(true);
                expect(inputModel.value === 'xxx-new value').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value  === 'xxx-new value').toBe(true);
                component.input.lotusComponentInstance.inputSkinPart.value = 'hello world';
                component.input.lotusComponentInstance.inputSkinPart.dispatchEvent(evt);
                expect(inputModel.value === 'xxx-hello world').toBe(true);
                expect(inputModel.value === 'xxx-hello world').toBe(true);
                expect(component.input.lotusComponentInstance.inputSkinPart.value  === 'xxx-hello world').toBe(true);
                //end binding tests
                component.destroy();
                document.body.removeChild(element);
                expect(component.input === null).toBe(true);
                done();
            },
            onInputReady:function(event){
                component.input.lotusComponentInstance.removeEventListener(Lotus.ComponentEvent.READY, handler, 'onInputReady');
                expect( component.input.lotusComponentInstance.inputSkinPart.value).toBe( 'xxx-test value' );
                //note setting the inputs value in javascript will not trigger an on change event by itself
                //we have to manually dispatch and the change event is triggered after the element is interacted with by the end user
                component.input.lotusComponentInstance.addEventListener(Lotus.InputEvent.CHANGE, handler, 'onChange');
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                component.input.lotusComponentInstance.inputSkinPart.dispatchEvent(evt);
            },
            onReady:function(event){
                handler.initComponent(event.payload.target);
            },
            initComponent:function(component){
                inputModel = new Lotus.InputModel('some label', 'test value', null, false, true);
                inputModel.format = function(value){
                    return 'xxx-' + value;
                }
                inputModel.value = 'test value';//triggers formatting
                model = new Lotus.InputCollectionModel(Lotus.InputCollectionModel.TYPE_INPUT, new Lavender.ArrayList([ inputModel ]));
                //IMPORTANT: the model is always set before  created is called
                component.model = model;
                expect( component.element === element ).toBe( true );
                expect( component.model === model ).toBe( true );
                expect( component.id ).toBe( '1234' );
                expect( component.input !== null && component.input !== undefined).toBe( true );
                expect( component.model.collection.getItemAt(0)).toBe( inputModel );
                if(!component.input.lotusComponentInstance.ready){
                    component.input.lotusComponentInstance.addEventListener(Lotus.ComponentEvent.READY, handler, 'onInputReady');
                }else{
                    handler.onInputReady();
                }
            },
            addEventListeners:function (component) {
                //Do not set up data providers until the component is ready!
                //if you use lotusjs-mvw you can take advantage of component mediators that have built in onReady callbacks
                if(!component.ready){
                    component.addEventListener(Lotus.ComponentEvent.READY, handler, 'onReady')
                }else{
                    handler.initComponent(component)
                }
            }
        };
        var model
        var inputModel
        var component;
        var element = document.createElement('x-lotus-form-view');
        element.setAttribute('data-attribute-id', '1234');
        element.setAttribute('data-component-root', '[data-skin-part="collectionContainer"]');
        element.innerHTML = '<div data-skin-part="collectionContainer">' +
            '<x-lotus-radio data-skin-part="radioGroup" data-template-url="base/unit/templates/radio.html" data-component-root="[data-skin-part=\'collectionContainer\']"></x-lotus-radio>' +
            '<x-lotus-select data-skin-part="list" data-template-url="base/unit/templates/select.html" data-component-root=\'[data-skin-part="collectionContainer"]\' data-attribute-type="text"></x-lotus-select>' +
            '<x-lotus-input data-skin-part="input" data-template-url="base/unit/templates/input.html" data-component-root=\'[data-skin-part="input"]\' data-attribute-type="text"></x-lotus-input>' +
            '<x-lotus-upload data-skin-part="file" data-template-url="base/unit/templates/fileUpload.html" data-component-root="[data-attribute-item-view=\'Lotus.FileView\']" data-attribute-type="text"></x-lotus-upload>';
        '</div>';
        //set up context to define tag mappings
        var context = (function (xtag) {
            var context = new Lotus.Context(new Lavender.Config);
            context.componentMap.mapComponent('x-lotus-radio', Lotus.LotusHTMLElement.prototype, Lotus.RadioCollectionView, xtag);
            context.componentMap.mapComponent('x-lotus-select', Lotus.LotusHTMLElement.prototype, Lotus.ListCollectionView, xtag);
            context.componentMap.mapComponent('x-lotus-input', Lotus.LotusHTMLElement.prototype, Lotus.Input, xtag);
            context.componentMap.mapComponent('x-lotus-upload', Lotus.LotusHTMLElement.prototype, Lotus.FileCollectionView, xtag);
            context.componentMap.mapComponent('x-lotus-form-view', Lotus.LotusHTMLElement.prototype, Lotus.FormItemView, xtag);
            return context;
        }(xtag));
            //trigger creation
        document.body.appendChild(element);
        //set up component
        var list = document.getElementsByTagName('x-lotus-form-view');
        for (var i = 0; i < list.length; i++) {
            component = list[i].lotusComponentInstance;
            handler.addEventListeners(list[i].lotusComponentInstance);
        }
    });

});
